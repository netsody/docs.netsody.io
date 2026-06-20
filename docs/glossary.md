---
title: Glossary
description: Definitions of key Netsody terms.
---

# Glossary

## Controller / Control plane

The **control plane** is the authority that holds and distributes a network's desired configuration — membership, overlay addresses and hostnames, groups, policies, and resources — and monitors whether each device applied it. The **controller** is the component that implements this: it stores the configuration and, through the dashboard, assigns each device its overlay address and hostname. A central controller is **optional** — the same configuration can instead be served from any HTTP(S) server or copied to each device as a local file. The controller is never in the data path. See [Network Management](architecture/network-management.mdx) and [Manually Managed Networks](other/manually-managed-networks.mdx).

## Dashboard

The web user interface of the [controller](#controller--control-plane). Administrators use the dashboard to create networks, add and configure devices, manage groups, policies, and resources, and to invite users. The dashboard assigns each device its overlay IP address and hostname and writes the resulting configuration to the controller. See [Network Management](architecture/network-management.mdx).

## Netsody agent / Data plane

The **data plane** carries the actual traffic between devices. Devices connect directly over end-to-end encrypted connections whenever possible, assisted by [super peers](#super-peer) when no direct path is available. The **Netsody agent** is the component that implements this: it runs on each device, pulls the part of the network configuration relevant to that device from the [controller](#controller--control-plane), reconciles the local system with that desired state, and reports status back. It performs the end-to-end encryption and enforces access policies locally (Zero Trust), establishing direct or super-peer-relayed connections to its permitted peers. See [Netsody Agent](architecture/agent.mdx) and [Connectivity and Data Plane](architecture/connectivity.mdx).

## QUIC

QUIC is a modern, secure, and high-performance transport protocol that most people use unknowingly every day. When browsing the web, modern clients and servers often use HTTP/3, the latest version of HTTP, which runs on QUIC. Mature and encrypted by design, QUIC is a strong foundation for establishing secure tunnels between devices, with Netsody authenticating peers during connection establishment. Netsody builds its whole data plane on it:

- direct device-to-device connections use QUIC;
- NATs and firewalls are traversed using the QUIC NAT traversal extension;
-     when a direct connection is not possible, traffic is relayed using MASQUE, which is built on HTTP/3 and QUIC.

As a result, Netsody data-plane traffic runs efficiently over QUIC, either directly or via HTTP/3/MASQUE. Because this resembles ordinary HTTP/3 web traffic, Netsody keeps working even in restrictive networks where many VPN protocols are blocked; an HTTP/2-over-TLS path serves as a fallback when UDP or QUIC itself is blocked. See [Connectivity and Data Plane](architecture/connectivity.mdx).

## Super peer

A publicly reachable helper node that lets Netsody devices discover each other, traverse NATs and firewalls to establish a direct connection, and — as a fallback when no direct path exists — relays the end-to-end encrypted connection between them. A super peer forwards only ciphertext and is not a policy authority. Netsody operates public super peers, and you can self-host your own. See [Super Peers](architecture/super-peers.mdx).
