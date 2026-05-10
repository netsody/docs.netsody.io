---
title: Self-Hosting
description: Self-hosting guidance for Netsody deployments.
pagination_prev: null
pagination_next: null
---

# Self-Hosting Netsody

A controller-based self-hosted deployment treats the controller as the primary infrastructure component for managing users, nodes, networks, resources, and policies.

The previous self-hosting page described only a standalone super peer. That does not cover controller-based self-hosted deployments.

## Deployment responsibilities

For a self-hosted Netsody deployment, plan ownership for:

- The web-based controller.
- TLS and public reachability for the controller endpoint.
- User and node administration.
- Backups of controller state.
- Upgrade and recovery procedures.
- Any relay infrastructure required by your deployment.

The detailed controller deployment guide is not yet available in this documentation. Do not use the super peer setup page as a substitute for a full controller deployment guide.

## Super peer setup

For relay and peer-discovery infrastructure, see [Super Peer Setup](./self-hosting/super-peer.md).
