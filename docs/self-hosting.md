---
title: Self-Hosting
description: Step-by-step guide for running Netsody on your own infrastructure.
pagination_prev: null
pagination_next: null
---

# Self-Hosting Netsody

Netsody can be deployed and self-hosted on your own infrastructure. This enables full control over your Netsody deployment and makes it suitable for environments where using our public super peers is either unwanted or restricted by governance policies.

[Since Netsody works without a centralized network controller](../concepts/networks#configuration-distribution), the only infrastructure component you need to operate yourself is at least one super peer. Super peers handle the signaling process that allows SDN devices to establish direct peer-to-peer connections over the underlying [P2P network](../architecture/p2p-protocol).

## Requirements

Super peers primarily assist in peer discovery and connection setup. They are rarely involved in actual data transfer and only relay traffic when a direct connection cannot be established. As a result, system requirements are minimal.

**Recommended Platform**: A Linux-based virtual machine. While other platforms may work, we have no production experience outside of Linux.

**CPU & RAM**: 1 vCPU and 1 GB of RAM are sufficient to handle several thousand concurrent nodes. As a rule of thumb, estimate ~16 MB of RAM and ~40 KB/s bandwidth per 1000 concurrent nodes.

**Disk Usage**: Negligible. The super peer is stateless except for its identity file. Logs may require a few hundred MB depending on verbosity.

**Network**:

- Low latency improves the setup time for direct peer-to-peer connections.
- High  bandwidth capacity is important if the super peer is expected to relay traffic.
- The server should be reachable via public IPv4 and IPv6 addresses to ensure global connectivity.

**Ports**:

- **Signaling:** `22527/UDP` (default; used for connection setup between peers).
- **Fallback when UDP is blocked:** `443/TCP` (default; often the most promising option to bypass restrictive firewalls).

## Installation

Follow these steps to set up a Netsody super peer server.

### Step 1: Download netsody-sp

Download the `netsody-sp` binary for Linux x86_64:

```bash
curl -LO https://download.netsody.io/binaries/0.1.0/linux-amd64/netsody-sp
chmod +x netsody-sp
```

:::info Platform Support
The super peer binary is currently only available for Linux x86_64. If you need support for other platforms, please contact us.
:::

### Step 2: Install the binary

Copy the binary to the system path:

```bash
sudo cp netsody-sp /usr/local/sbin/netsody-sp
```

### Step 3: Create system user

```bash
useradd --system --create-home --home-dir /etc/netsody-sp --shell /bin/false netsody-sp
```

### Step 4: Secure configuration directory

```bash
chmod 700 /etc/netsody-sp
```

### Step 5: Create service

```bash
cat > /etc/systemd/system/netsody-sp.service <<EOF
[Unit]
Description=Netsody super peer
After=network-online.target

[Service]
User=netsody-sp
Group=netsody-sp
Type=simple
AmbientCapabilities=CAP_NET_BIND_SERVICE
Environment=NETSODY_IDENTITY_FILE=/etc/netsody-sp/netsody-sp.identity
Environment=NETSODY_TCP4_LISTEN=
Environment=NETSODY_TCP6_LISTEN=[::]:443
Environment=NETSODY_UDP4_LISTEN=
Environment=NETSODY_UDP6_LISTEN=[::]:22527
Environment=RUST_LOG=info
ExecStart=/usr/local/sbin/netsody-sp
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=default.target
EOF
```

### Step 6: Enable and start the service

```bash
systemctl enable netsody-sp
systemctl start netsody-sp
```
Verify the service has started:

```bash
journalctl -fu netsody-sp
```

You should see logs like:
```
Aug 16 10:10:05 sp netsody-sp[1567]: Identity file '/etc/netsody-sp/netsody-sp.identity' not found. Generate new one...
Aug 16 10:10:22 sp netsody-sp[1567]: Super peer listening on:
Aug 16 10:10:22 sp netsody-sp[1567]:   udp://192.0.2.1:22527?publicKey=...&networkId=1234567890&tcpPort=443
Aug 16 10:10:22 sp netsody-sp[1567]:   udp://[2001:db8::1]:22527?publicKey=...&networkId=1234567890&tcpPort=443
```

The URLs listed above must be configured in your netsody nodes (see configuration section below). For production use, it's recommended to configure a domain name with A/AAAA records pointing to your server instead of using the raw IP addresses directly.

:::warning Important
Back up `/etc/netsody-sp/netsody-sp.identity`. This file contains the identity (including secret key) of your super peer and must persist across reboots or redeployments.
:::

## Running multiple super peers

You can operate multiple super peers to increase availability and reduce latency. Super peers are stateless and do not need to coordinate. This makes it easy to deploy them globally and achieve natural load balancing as node peers automatically connect to the nearest super peer.

## Configure Netsody to use your super peer(s)

To use your own super peer(s), add a `super_peers` setting in the `config.toml` file of your Netsody agent:

```toml title="config.toml"
super_peers = [
    "udp://192.0.2.1:22527?publicKey=<your-public-key>&networkId=1234567890&tcpPort=443",
    "udp://198.51.100.1:22527?publicKey=<your-public-key>&networkId=1234567890&tcpPort=443"
]
```