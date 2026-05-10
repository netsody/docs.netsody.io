---
title: Controller Overview
description: Understand the role of the Netsody web controller.
---

# Controller Overview

The Netsody controller is the central place to configure and view your Netsody network. Use it to manage users, nodes, networks, groups, resources, DNS, and access policies.

Nodes periodically contact the controller to fetch the configuration that is relevant to them. At the same time, they report whether they applied the requested configuration successfully or whether a problem occurred.

## What the controller manages

- Networks and their private address ranges.
- Nodes that are allowed to join those networks.
- Users and the nodes associated with them.
- Groups used to express access rules.
- Policies that allow communication.
- Resources that make private subnets, addresses, or services reachable through gateway nodes.

The controller configuration is scoped to known nodes. A device becomes manageable after it has been paired with a Netsody account. For account-paired devices, the controller only provides configuration for networks where the user added that node. A device can also become manageable by joining a network through a join key. For join-key devices, the controller only provides configuration for the network that the join key allowed the node to join.

## What remains local

Each device keeps its own cryptographic identity. The private key is generated and stored locally by the agent and must not leave the device.

The agent creates the local Netsody network interface and establishes peer-to-peer connections with other devices. The controller is not in the data path for those device-to-device connections, including relayed connections.

Access policies are enforced locally by the agent through an embedded firewall.

A device can locally enable or disable networks. This allows the user to temporarily leave a network from that device without changing the node's membership in the controller.

## Basic workflow

1. Create or select a network in the controller.
2. Add users and nodes.
3. Assign nodes to groups.
4. Create policies for the traffic that should be allowed.
5. Add resources when devices should reach private subnets, addresses, or services behind a gateway.
6. Verify node connectivity from the controller and from the local agent.

For the first setup, start with [Get Started](../get-started).
