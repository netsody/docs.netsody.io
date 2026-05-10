---
title: Join Keys
description: Use join keys to add nodes to a Netsody network.
---

# Join Keys

Join keys allow a device to join a Netsody network without first being paired with a user's account.

A join key belongs to a specific network. When a device joins through that key, the controller only provides configuration for the network associated with the key.

## When to use join keys

Use join keys when a device should be added directly to a network during setup, automation, or headless installation.

For personal or interactive setup, pairing a device with a Netsody account and adding it from the web interface is usually easier to audit.

## Operational guidance

- Create join keys only for the network where the device should join.
- Treat join keys like credentials.
- Rotate or remove join keys that are no longer needed.
- Prefer short-lived or narrowly scoped join keys when your deployment supports them.
