---
title: Networks
description: Manage Netsody networks in the controller.
---

# Networks

A Netsody network is a private overlay network that belongs to a user. The owner decides which other users and nodes are added to or shared into the network. The network provides the address space in which its nodes communicate.

## When to create a network

Create separate networks for separate trust zones or administrative boundaries. Common examples include:

- Company devices and internal services.
- A home or lab environment.
- A contractor or partner access environment.
- A test network for rollout validation.

Avoid putting unrelated environments into one broad network just because it is technically possible. Policies can restrict access, but separate networks make ownership and troubleshooting clearer.

## Address ranges

Each network has a name and a private IPv4 subnet range. The name is used for display and log output. The subnet defines the overlay address space used by the nodes in this network.

Choose a private IPv4 range from [RFC1918](https://datatracker.ietf.org/doc/html/rfc1918):

- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`

The range must not overlap with:

- The local LANs used by participating devices.
- Other Netsody networks used by the same devices.
- Private networks reachable through Netsody resources.

Overlapping subnets can make resources ambiguous and can prevent traffic from reaching the intended destination.

The last usable address before the broadcast address is reserved by Netsody and must not be assigned to a node.

## Multiple networks

Devices can be part of multiple Netsody networks at the same time. This is useful when different networks serve different administrative purposes, for example a private home network and an organizational network.

When a device joins multiple networks, make sure the subnet ranges do not overlap.

## Related tasks

- Add nodes in [Nodes](./nodes.md).
- Organize access targets in [Groups](./groups.md).
- Allow communication in [Policies](./policies.md).
- Add private resources in [Resources](./resources.md).
