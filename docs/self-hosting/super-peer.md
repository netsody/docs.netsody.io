---
title: Super Peer Setup
description: Set up a Netsody super peer for relay and peer discovery.
---

# Super Peer Setup

This page documents the standalone Netsody super peer setup.

It is not a complete self-hosting guide for controller-based deployments. For deployments that include the controller, see [Self-Hosting](../self-hosting.md).

## Requirements

Super peers assist with peer coordination and relayed connectivity. Current Netsody super peers use MASQUE over HTTP/3 and QUIC for relayed traffic, with HTTP/2 over TLS available as a fallback when QUIC is blocked.

**Recommended platform:** A Linux-based virtual machine.

**TLS:** `netsody-sp` requires a server certificate chain and private key. Use a certificate that clients can validate for the public super peer hostname.

**Disk usage:** Minimal. Preserve the TLS private key and certificate material across redeployments. Logs may require additional disk space depending on verbosity.

**Network:**

- Low latency improves the setup time for direct peer-to-peer connections.
- High bandwidth capacity matters if the super peer is expected to relay traffic.
- The server should be reachable through public IPv4 and IPv6 addresses where possible.

**Ports:**

- `443/UDP` for HTTP/3 over QUIC when using the example below.
- `443/TCP` for HTTP/2 over TLS fallback when using the example below.
- UDP proxy ports from the configured `--proxy-ports` range when MASQUE tunneling is enabled.

## Install `netsody-sp`

Download the `netsody-sp` binary for Linux x86_64:

```bash
curl -LO https://download.netsody.io/binaries/linux-amd64/1.0.0-beta.9/netsody-sp
chmod +x netsody-sp
```

Copy the binary to the system path:

```bash
sudo cp netsody-sp /usr/local/sbin/netsody-sp
```

Create a system user:

```bash
sudo useradd --system --create-home --home-dir /etc/netsody-sp --shell /bin/false netsody-sp
sudo chmod 700 /etc/netsody-sp
```

Place the TLS certificate chain and private key where the service can read them. The example below uses:

- `/etc/netsody-sp/cert.pem`
- `/etc/netsody-sp/key.pem`

## Create a systemd service

```ini title="/etc/systemd/system/netsody-sp.service"
[Unit]
Description=Netsody super peer
After=network-online.target

[Service]
User=netsody-sp
Group=netsody-sp
Type=simple
AmbientCapabilities=CAP_NET_BIND_SERVICE
Environment=RUST_LOG=info
ExecStart=/usr/local/sbin/netsody-sp \
  --cert /etc/netsody-sp/cert.pem \
  --key /etc/netsody-sp/key.pem \
  --listen [::]:443 \
  --alt-svc-port 443 \
  --proxy-ports 49152-65535
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=default.target
```

Enable and start the service:

```bash
sudo systemctl enable netsody-sp
sudo systemctl start netsody-sp
sudo journalctl -fu netsody-sp
```

## Configure agents

Agents can be configured to use custom super peers through `config.toml`:

```toml title="config.toml"
super_peers = [
    "https://sp.example.com"
]
```
