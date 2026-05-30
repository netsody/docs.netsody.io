---
title: Self-Hosting
description: Run the Netsody controller, dashboard, Super Peer, and supporting services on your own infrastructure.
pagination_prev: null
pagination_next: null
---

# Self-Host Netsody

Use this guide to run Netsody on your own infrastructure with Docker Compose. The deployment includes the web-based controller, super peer, and an optional OpenID Connect identity provider.

This guide is for operators who want to own the full Netsody control plane and relay infrastructure. Netsody agents still run on the devices that join your networks.

## Download the Docker Compose file

Download the current self-hosting Docker Compose file:

- [Download `docker-compose.yml`](/downloads/docker-compose.yml)

From a server shell, you can also fetch it with:

```bash
curl -fsSLo docker-compose.yml https://docs.netsody.io/downloads/docker-compose.yml
```

Place the file in a dedicated directory. The examples below assume the Docker Compose file and `.env` file are in the same directory.

## Architecture

The Docker Compose stack starts these services:

- `traefik`: public edge proxy for HTTP, HTTPS, and Super Peer traffic.
- `netsody-dashboard`: browser frontend for the controller API.
- `netsody-controller`: controller API.
- `netsody-controller-db`: PostgreSQL database for the controller.
- `netsody-controller-minio`: local S3-compatible object storage.
- `netsody-sp`: Super Peer for relay and peer discovery.
- `netsody-sp-certbot`: obtains and renews the Super Peer certificate.
- `pocket-id`: optional Pocket ID service, enabled only with `--profile pocket-id`.

The controller services use the `netsody-controller` Docker network. The Super Peer and Certbot use the `netsody-sp` Docker network. The Super Peer is not attached to the controller network.

Pocket ID is isolated on its own `netsody-idp` Docker network. The controller talks to it only through OIDC URLs, so you can use another OIDC provider without changing the controller services. When the included Pocket ID profile is used, the Pocket ID public domain resolves to Traefik inside the controller Docker network so OIDC discovery uses the same HTTPS URL internally and externally.

Traefik terminates TLS for the controller domain and the optional Pocket ID domain. The dashboard is served from the controller domain root. Controller API, OpenAPI, and Swagger UI paths are routed to `netsody-controller`. For the Super Peer domain, Traefik passes TCP 443 through to `netsody-sp` for HTTP/2 fallback mode, forwards UDP 443 to `netsody-sp` for HTTP/3 mode, and forwards TCP 80 to `netsody-sp-certbot` for the ACME HTTP-01 challenge that Certbot uses to provide the Super Peer certificate.

## Requirements

- Docker with Docker Compose v2.
- An HTTPS OpenID Connect provider. The Pocket ID example below uses `id.example.com`; replace it with your own identity domain.
- Public DNS records for the deployment domains:
  - `NETSODY_CONTROLLER_DOMAIN` points to this host.
  - `NETSODY_SP_DOMAIN` points to this host.
  - `POCKET_ID_DOMAIN` points to this host if you enable the Pocket ID profile.
- Public inbound firewall rules:
  - TCP 80 for the ACME HTTP-01 challenge that `netsody-sp-certbot` uses to provide a certificate for the Super Peer.
  - TCP 443 for the controller, the optional identity provider, and the Super Peer in HTTP/2 fallback mode.
  - UDP 443 for the Super Peer in HTTP/3 mode.

## Create the environment file

Create a `.env` file next to `docker-compose.yml`:

```bash
touch .env
openssl rand -base64 32
```

Use the `openssl` output for `POCKET_ID_ENCRYPTION_KEY` if you use the included Pocket ID profile. Replace the example domains, OIDC client IDs, passwords, and secrets before using the stack with real users.

```properties title=".env"
# Controller service
APP_HOST=0.0.0.0
APP_PORT=8080
RUST_LOG=info,sqlx::query=warn
NETSODY_CONTROLLER_SECRET_PATH=./controller_secret
USER_CACHE_MAX_ENTRIES=10000
USER_CACHE_TTL_SECS=300
NODE_HMAC_CACHE_MAX_ENTRIES=10000
NODE_HMAC_CACHE_TTL_SECS=3600

# OpenID Connect provider
OAUTH_CLIENT_ID=replace-with-controller-client-id
OAUTH_PATH=https://id.example.com/.well-known/openid-configuration
OAUTH_AUDIENCE=replace-with-controller-client-id
OAUTH_AGENT_PATH=https://id.example.com/.well-known/openid-configuration
OAUTH_AGENT_AUDIENCE=replace-with-agent-client-id

# Optional Authentik-only invitation automation
AUTHENTIK_BASE_URL=
AUTHENTIK_TOKEN=
AUTHENTIK_INVITATION_FLOW_ID=
AUTHENTIK_INVITATION_EXPIRES_SECS=1209600
INVITATION_RATE_LIMIT_USER=10
INVITATION_RATE_LIMIT_NETWORK=20
INVITATION_RATE_LIMIT_WINDOW_SECS=3600
TRUSTED_PROXIES=127.0.0.1/32,172.16.0.0/12
ZITADEL_CACHE_INVALIDATE_SECRET=
PROFILE_PICTURE_MAX_BYTES=1048576
GRAVATAR_BASE_URL=https://www.gravatar.com/avatar
GRAVATAR_SIZE=200
GRAVATAR_DEFAULT=identicon

# Traefik and public domains
TRAEFIK_HTTP_PORT=80
TRAEFIK_HTTPS_PORT=443
TRAEFIK_LOG_LEVEL=INFO
TRAEFIK_ACME_EMAIL=admin@example.com
NETSODY_CONTROLLER_DOMAIN=controller.example.com
NETSODY_SP_DOMAIN=sp.example.com

# Dashboard frontend
NETSODY_DASHBOARD_API_BASE_URL=https://controller.example.com/api
NETSODY_DASHBOARD_OIDC_AUTHORITY=https://id.example.com
NETSODY_DASHBOARD_OIDC_CLIENT_ID=replace-with-controller-client-id
NETSODY_DASHBOARD_OIDC_SCOPE="openid profile email"
NETSODY_DASHBOARD_DEVICE_AUTHORIZATION_URL=https://id.example.com/device

# Optional Pocket ID profile
POCKET_ID_DOMAIN=id.example.com
POCKET_ID_ENCRYPTION_KEY=replace-with-openssl-output
POCKET_ID_TRUST_PROXY=true
POCKET_ID_PUID=1000
POCKET_ID_PGID=1000
POCKET_ID_MAXMIND_LICENSE_KEY=

# Controller database
POSTGRES_DB=service-db
POSTGRES_USER=service
POSTGRES_PASSWORD=replace-with-database-password
NETSODY_CONTROLLER_DB_PORT=5433

# Controller object storage
S3_BUCKET=netsody-profile-pictures
S3_REGION=eu-central-1
S3_ACCESS_KEY_ID=minio
S3_SECRET_ACCESS_KEY=replace-with-object-storage-password
S3_FORCE_PATH_STYLE=true
NETSODY_CONTROLLER_MINIO_PORT=9000
NETSODY_CONTROLLER_MINIO_CONSOLE_PORT=40091

# Super Peer
NETSODY_SP_UDP_PORT=443
NETSODY_SP_ALT_SVC_PORT=443
NETSODY_SP_PROMETHEUS_PORT=9898
NETSODY_PROMETHEUS_LISTEN=[::]:9898
CERTBOT_RETRY_INTERVAL_SECONDS=300
CERTBOT_RENEW_INTERVAL_SECONDS=43200
```

The controller uses OIDC discovery and expected audiences. It validates access tokens with the provider JWKS and refreshes user profile data from the provider userinfo endpoint. If you use another OIDC provider instead of Pocket ID, keep the same Netsody environment variables and replace the provider URLs and client IDs.

Pocket ID does not provide the Authentik invitation API used by the optional controller invitation automation. Leave `AUTHENTIK_BASE_URL`, `AUTHENTIK_TOKEN`, and `AUTHENTIK_INVITATION_FLOW_ID` empty unless you intentionally integrate Authentik for invitations. With Pocket ID, an admin must create users in Pocket ID first. Each user must then sign in to the Netsody controller once before they can be added to an existing Netsody network.

## Set up Pocket ID

Skip this section if you already operate another OIDC provider.

Start only Traefik and Pocket ID first:

```bash
docker compose --profile pocket-id up -d traefik pocket-id
```

Create the initial Pocket ID admin account:

```text
https://id.example.com/setup
```

Pocket ID must be reachable over HTTPS because passkeys require a secure browser context.

Create the users or groups that should be allowed to use Netsody, or plan to set the OIDC clients to `Unrestricted Access` so every Pocket ID user can use them. Pocket ID can manage users manually, through signup tokens, or through LDAP synchronization.

In `Administration` > `Application Configuration`, enable `Emails Verified` so new Pocket ID users get verified email addresses by default. For existing users, open each user in `Administration` > `Users` and mark the email address as verified. Netsody rejects API access when the OIDC userinfo response contains `email_verified=false`.

Create two OIDC clients in Pocket ID:

- `Netsody Controller`: used by the dashboard, controller Swagger UI, and browser-based API authorization. Configure it as a public client with authorization code plus PKCE, and add these callback URLs:

  ```text
  https://<NETSODY_CONTROLLER_DOMAIN>/callback
  https://<NETSODY_CONTROLLER_DOMAIN>/swagger-ui/oauth2-redirect.html
  ```

- `Netsody Agent`: used by desktop and CLI login through the OAuth device authorization flow. Configure it as a public or native client and allow the device authorization grant if your Pocket ID version exposes this setting.

For both clients, expand `Allowed User Groups` and click `Unrestrict` to enable `Unrestricted Access`. Without this, newly created Pocket ID OIDC clients do not allow any users to access them. If you want narrower access later, select the explicit Pocket ID groups that should be allowed instead.

Keep both client IDs and put them into `.env`. Netsody does not currently consume an OIDC client secret from `.env`; use public clients for these flows.

Verify the discovery document before starting Netsody:

```bash
curl -fsS https://id.example.com/.well-known/openid-configuration
```

The document must contain `issuer`, `jwks_uri`, `userinfo_endpoint`, `authorization_endpoint`, `token_endpoint`, and `device_authorization_endpoint`.

## Start the stack

Render and validate the Docker Compose config:

```bash
docker compose --profile pocket-id config --quiet
```

Start the stack. If you use the included Pocket ID profile, keep the profile enabled:

```bash
docker compose --profile pocket-id up -d
```

If you use another OIDC provider instead, omit `--profile pocket-id`:

```bash
docker compose up -d
```

Watch certificate and startup logs:

```bash
docker compose logs -f traefik pocket-id netsody-sp-certbot netsody-sp netsody-controller netsody-dashboard
```

On first startup, `netsody-sp` can restart until Certbot has written the certificate files into the shared `netsody_sp_letsencrypt` volume. This is expected. Once the files exist, the next restart should start the Super Peer normally.

Check service state:

```bash
docker compose ps
```

The dashboard should be reachable at:

```text
https://<NETSODY_CONTROLLER_DOMAIN>/
```

The controller Swagger UI should remain reachable at:

```text
https://<NETSODY_CONTROLLER_DOMAIN>/swagger-ui/
```

The Super Peer should accept TCP and UDP traffic on:

```text
<NETSODY_SP_DOMAIN>:443
```

## Configure agents

The dashboard shows the exact `netsody login` command for your configured controller, OIDC provider, agent client ID, and Super Peers.

For completeness, configure each agent that should log in through this self-hosted controller with the same agent OIDC client:

```bash
netsody login \
  --controller https://<NETSODY_CONTROLLER_DOMAIN>/api \
  --auth-url https://id.example.com \
  --auth-client-id <agent-client-id> \
  --super-peer https://<NETSODY_SP_DOMAIN>/
```

Repeat `--super-peer` to configure more than one Super Peer. The command stores the controller, OIDC, and Super Peer settings in the local agent config before starting the browser login flow. The controller, Super Peer list, and OIDC settings can be changed independently; `--auth-url` and `--auth-client-id` must always be supplied together.

## Operations

Restart the stack:

```bash
docker compose --profile pocket-id restart
```

Stop the stack while keeping data:

```bash
docker compose down
```

Stop the stack and delete all Docker Compose-managed data:

```bash
docker compose down --volumes
```

Inspect the effective configuration:

```bash
docker compose config
```

For backups, preserve the Docker Compose-managed controller database, object storage, controller service data, Pocket ID data if used, and ACME certificate volumes. The Docker Compose file defines these volumes at the bottom of `docker-compose.yml`.

## Troubleshooting

If controller certificates fail, check `NETSODY_CONTROLLER_DOMAIN`, DNS, TCP 443, and the Traefik logs. Traefik uses the ACME TLS-ALPN challenge for the controller so it does not intercept the Super Peer HTTP-01 challenge path.

If Super Peer certificates fail, check `NETSODY_SP_DOMAIN`, DNS, TCP 80, and the `netsody-sp-certbot` logs. HTTP requests for the Super Peer domain are routed to Certbot, not to the Super Peer.

If `netsody-sp` keeps restarting, check whether these files exist in the `netsody_sp_letsencrypt` volume:

```text
/etc/letsencrypt/live/<NETSODY_SP_DOMAIN>/fullchain.pem
/etc/letsencrypt/live/<NETSODY_SP_DOMAIN>/privkey.pem
```

If they do not exist, solve the Certbot or DNS issue first. The Super Peer will start once the files are present.
