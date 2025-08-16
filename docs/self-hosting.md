---
title: Self-Hosting
description: Step-by-step guide for running drasyl on your own infrastructure.
pagination_prev: null
pagination_next: null
---

# Self-Hosting drasyl

drasyl is released under a permissive open-source license, which explicitly grants you the rights to run, modify, and deploy the software on your own infrastructure. This enables full control over your drasyl deployment and makes it suitable for environments where using our public super peers is either unwanted or restricted by governance policies.

[Since drasyl works without a centralized network controller](../concepts/networks#configuration-distribution), the only infrastructure component you need to operate yourself is at least one super peer. Super peers handle the signaling process that allows SDN devices to establish direct peer-to-peer connections over the underlying [P2P network](../architecture/p2p-protocol).

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

Follow these steps to set up a drasyl super peer server.

### Step 1: Build drasyl-sp

First, build the `drasyl-sp` binary from source:

```bash
cargo build --package drasyl-sp --release --features prometheus
```

### Step 2: Install the binary

Copy the built binary to the system path:

```bash
cp target/release/drasyl-sp /usr/local/sbin/
```

### Step 3: Create system user

```bash
useradd --system --create-home --home-dir /etc/drasyl-sp --shell /bin/false drasyl-sp
```

### Step 4: Secure configuration directory

```bash
chmod 700 /etc/drasyl-sp
```

### Step 5: Create service

Each super peer must be assigned a `DRASYL_NETWORK_ID`, which identifies the P2P network it belongs to. All super peers intended to operate within the same drasyl P2P network must use the same `DRASYL_NETWORK_ID` value.

```bash
cat > /etc/systemd/system/drasyl-sp.service <<EOF
[Unit]
Description=drasyl super peer
After=network-online.target

[Service]
User=drasyl-sp
Group=drasyl-sp
Type=simple
AmbientCapabilities=CAP_NET_BIND_SERVICE
Environment=DRASYL_NETWORK_ID=1234567890
Environment=DRASYL_IDENTITY_FILE=/etc/drasyl-sp/drasyl-sp.identity
Environment=DRASYL_TCP4_LISTEN=
Environment=DRASYL_TCP6_LISTEN=[::]:443
Environment=DRASYL_UDP4_LISTEN=
Environment=DRASYL_UDP6_LISTEN=[::]:22527
Environment=RUST_LOG=info
ExecStart=/usr/local/sbin/drasyl-sp
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=default.target
EOF
```

### Step 6: Enable and start the service

```bash
systemctl enable drasyl-sp
systemctl start drasyl-sp
```
Verify the service has started:

```bash
journalctl -fu drasyl-sp
```

You should see logs like:
```
Aug 16 10:10:05 sp drasyl-sp[1567]: Identity file '/etc/drasyl-sp/drasyl-sp.identity' not found. Generate new one...
Aug 16 10:10:22 sp drasyl-sp[1567]: Super peer listening on:
Aug 16 10:10:22 sp drasyl-sp[1567]:   udp://37.27.1.207:22527?publicKey=...&networkId=1234567890&tcpPort=443
Aug 16 10:10:22 sp drasyl-sp[1567]:   udp://[2a01:4f9:c013:422e::1]:22527?publicKey=...&networkId=1234567890&tcpPort=443
```

The URLs listed above must be configured in your drasyl nodes (see configuration section below). For production use, it's recommended to configure a domain name with A/AAAA records pointing to your server instead of using the raw IP addresses directly.

:::warning Important
Back up `/etc/drasyl-sp/drasyl-sp.identity`. This file contains the identity (including secret key) of your super peer and must persist across reboots or redeployments.
:::

## Running multiple super peers

You can operate multiple super peers to increase availability and reduce latency. Super peers are stateless and do not need to coordinate. This makes it easy to deploy them globally and achieve natural load balancing as node peers automatically connect to the nearest super peer.

## Configure drasyl to use your super peer(s)

To use your own super peer(s), configure the `DRASYL_SUPER_PEERS` environment variable when starting the drasyl daemon:

```bash
DRASYL_NETWORK_ID=1234567890
DRASYL_SUPER_PEERS="udp://<your-ip>:22527?publicKey=<your-public-key>&networkId=1234567890&tcpPort=443"
```

Multiple super peers can be provided by separating them with commas.