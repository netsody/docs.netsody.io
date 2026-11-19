---
title: Service Exposures
description: Publish an HTTP, TLS, or TCP service through the public Netsody reverse proxy.
---

# Service Exposures

A service exposure publishes a service on a node, or at one address inside a resource, through the public Netsody reverse proxy.
Use an exposure when clients outside Netsody need to reach a service without joining its network.

For access restricted to other Netsody nodes, use a [resource](resources.md) and its access policies instead.
Do not create a public exposure for a private resource unless public access is intentional.

## Create an exposure

Before creating an exposure, verify that the backend node is online and its service accepts connections on the intended address and TCP port.
For a backend inside a resource, verify that the resource is enabled and its gateway can reach that address.

1. Open the network in the controller and select **Service Exposures**.
2. Select **Create Service Exposure**.
3. Select HTTP, TLS passthrough, or TCP, then choose the backend node or resource and its port.
4. For HTTP or TLS, configure the domain shown to clients.
   For a custom domain, follow the domain instructions in the controller; in the hosted service, point a CNAME record at `service.netsody.io`.
5. Configure the availability and access controls described below before saving.

An HTTP exposure terminates TLS at the proxy and forwards HTTP requests to the backend.
A TLS passthrough exposure selects a route by SNI and forwards the encrypted connection without terminating TLS.
A TCP exposure forwards a raw TCP connection on its allocated public listen port.
UDP services are not supported by these exposure modes.

HTTP requires a certificate for the public domain.
When the proxy uses ACME for that certificate, the domain must resolve to the proxy and the certificate authority must be able to connect to it.
Check **Proxy Status** on the exposure for pending, active, certificate, and error states and for its reported cause.

## Control access

For HTTP exposures, **Required User Groups** limits access to authenticated users who belong to at least one selected group.
Leave this list empty only when the service does not require a Netsody login.

All exposure modes support ordered source-address rules.
A source can be an IP address or CIDR range, and the first matching allow or deny rule applies.
With no rules, every source is allowed; with one or more rules, a source that matches none of them is denied.

Disabling an exposure keeps its configuration but stops accepting traffic.
Changing or removing an exposure updates the proxy without restarting its embedded Netsody node.
The backend node must still participate in its network and satisfy the controller-managed access that connects it to the proxy.

### Client addresses and PROXY protocol

HTTP exposures strip client-supplied forwarding headers and set `X-Forwarded-For` and `X-Real-IP` from the connected client.
They also set `X-Forwarded-Proto` to `https` and `X-Forwarded-Host` to the configured public host.
For an HTTP exposure with required user groups, `X-Netsody-User` and `X-Netsody-Groups` identify the authenticated user to the backend, and client-supplied versions of those headers are removed.

For TCP and TLS passthrough exposures, optionally enable **PROXY Protocol v2** so the backend receives the real client address.
The proxy sends exactly one PROXY v2 header before forwarding any client bytes.
Enable this only when the backend expects that header: a mismatch between the exposure and backend configuration breaks connections.
Configure the backend to accept PROXY headers only from the proxy's overlay address, since other clients that can reach the backend could otherwise forge an address.
This option does not apply to HTTP exposures, which use the HTTP headers above.

## Reverse-proxy deployment settings

These settings apply when operating the Netsody reverse proxy itself; they are not agent configuration options.
Apply the same relevant controls when a separately managed public edge fronts a deployment.

### HTTP redirects and trusted front proxies

`NETSODY_PROXY_HTTP_REDIRECT_LISTEN` enables one cleartext listener, for example `0.0.0.0:80`.
It answers requests for enabled HTTP-exposure domains with `301 Moved Permanently` to the configured HTTPS endpoint and preserves the path and query; it does not proxy cleartext requests.
Without this setting, no cleartext redirect listener is started.
TLS passthrough exposures are not redirect targets.

`NETSODY_PROXY_TRUSTED_PROXIES` accepts a comma-separated list of trusted front-proxy IP addresses or CIDRs.
For requests arriving through one of these peers, the proxy retains and extends the inbound `X-Forwarded-For` chain and derives `X-Real-IP` from the validated chain instead of treating the edge address as the client.
By default, no front proxy is trusted and the proxy replaces these headers.

### Connection limits

An exposure's optional `max_connections` limits its concurrent public connections.
If that limit is unset, the exposure has no separate connection limit.
The process-wide `NETSODY_PROXY_MAX_CONNECTIONS`, which defaults to `1024`, applies across every exposure and listener, including redirect and error paths.

When either limit is reached, a new HTTP request receives `503 Service Unavailable` with a `Retry-After` header; a new TCP or TLS passthrough connection is closed without data.
The empty per-exposure limit does not remove the process-wide ceiling.
Unlike the exposure-specific limit, the process-wide limit is startup configuration.

### Backend errors

For HTTP exposures, a backend dial that exhausts its connect timeout produces `504 Gateway Timeout`.
A refused or unreachable backend connection produces `502 Bad Gateway`.
A limit refusal is not a backend health signal: the service can be healthy while new clients receive `503` because its configured slots are full.

## Support-bundle upload service

The built-in support-bundle upload service is separate from user-created service exposures.
It accepts diagnostic bundles from the agent, streams each accepted upload to disk, and returns `413 Payload Too Large` when the body exceeds its limit.
`NETSODY_SUPPORT_BUNDLE_SERVER_MAX_UPLOAD_MB` configures that limit in MiB; its default is `256`, or 256 MiB.
The limit remains active for chunked bodies and other requests whose advertised size proves nothing about their content.

When deploying behind the bundled `nginx.conf.example`, the proxy contributes these limits:

- Upload-URL issuance is limited to ten requests per minute per client address, plus a global ceiling of 60 requests per second.
- At most three concurrent bundle-upload connections are accepted per client address.
- `client_max_body_size 256m` rejects an excessive declared request body before streaming it, while the service's own streamed-body limit remains in force.

Keep the nginx body-size setting and `NETSODY_SUPPORT_BUNDLE_SERVER_MAX_UPLOAD_MB` aligned.
These limits belong to the bundled example; retain equivalent abuse controls when replacing it.
