---
title: Networks
description: Understand what a Netsody network is and how it connects devices, controls communication, and sharing of internal resources of physical networks.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Networks

A **network** in Netsody is a logical unit that securely connects selected devices in a peer-to-peer mesh.

It defines:
* Which devices (nodes) are part of the network.
* Which nodes can communicate.
* Which resources can be reached through gateway nodes.

All of this is captured in a single [TOML](https://toml.io/en/) configuration file.
This configuration is easy to create and requires no networking expertise: it simply describes the desired state of the network, and Netsody takes care of the rest.
You can write the file manually using any text editor or use our [web-based network editor](https://editor.netsody.io) to simplify the process.

Each network is fully self-contained and isolated from others. Devices may join multiple networks at the same time.

:::tip Network Organization
Use separate networks for distinct trust zones or administrative boundaries, e.g., home, work, development.
:::

## Basic Configuration

Each network definition starts with basic information, such as a name and a subnet range.

```toml
name    = "My First Network"
network = "10.96.41.0/24"
```

* `name` is used for display and log output. It does not affect routing or security.
* `network` defines the IPv4 subnet used for this overlay. Must be a private range per [RFC1918](https://datatracker.ietf.org/doc/html/rfc1918):
  * `10.0.0.0/8`
  * `172.16.0.0/12`
  * `192.168.0.0/16`

:::info Reserved IPs
The last usable address **before the broadcast address** (e.g `10.96.41.254`) is reserved by Netsody and must not be assigned to a node.
It may be used by Netsody services in the future.
:::

:::warning
Modifying the subnet, even just the prefix length, causes Netsody to assign a new name to its virtual network interface on Windows and Linux systems.  
This may break manually created firewall or routing rules and require adjustments.
:::

## Nodes

To add devices to a Netsody network, you must define them as nodes in the configuration file.

**Each node entry specifies:**
- `pk` – the public key that uniquely identifies the device.
- `hostname` – a human-readable name for the device.
- `ip` – a static IP address within the network subnet.
- `groups` – the node groups this device belongs to.

```toml
[[node]]
pk       = "43c4fda1ed1e810a30b141ae2c644465a8e06d15a2a7259e91aaa2112e1d58c7"
hostname = "john-notebook"
ip       = "10.96.41.34"
groups   = [ "john", "notebooks" ]
```

👉 Learn more in the [Nodes](nodes.md) section.

## Policies

Policies control which nodes in a Netsody network are allowed to communicate and which resources they may use.
Currently, all policies are evaluated bidirectionally: if one group is allowed to contact another, the reverse direction is allowed as well.

**Each policy entry defines:**
- `source_groups` – groups allowed to initiate communication.
- `destination_groups` – node groups or resource groups that may be contacted or used.

```toml
[[policy]]
source_groups      = [ "desktops" ]
destination_groups = [ "notebooks" ]
```

👉 Learn more in the [Policies](policies.md) section.

## Resources

Resources allow devices in a Netsody network to access external IP networks, for example, your home LAN or an organizational subnet. A resource is a destination subnet in CIDR notation and is reached through a gateway node.

**Each resource entry specifies:**
- `dest` – the destination subnet (in CIDR notation) that should be reachable.
- `gw` – the public key of the node that will act as gateway and forward traffic.
- `groups` – resource groups used for policy matching.

```toml
[[resource]]
dest   = "192.168.188.0/24"
gw     = "689a1b9f5efcb861ac67ce185ddb2396444326e12fe1df353731416f5a3a2706" # john-desktop
groups = [ "office_resources" ]

[[policy]]
source_groups      = [ "notebooks" ]
destination_groups = [ "office_resources" ]
```

The resource `groups` value labels the resource. Access requires a matching policy; sharing a group name between a node and a resource does not grant access.

👉  Learn more in the [Resources](resources.md) section.

## Full Example

```toml title="my-first-network.toml"
network = "10.96.41.0/24"
name = "My first network"

[[node]]
hostname = "john-desktop"
ip       = "10.96.41.45"
pk       = "689a1b9f5efcb861ac67ce185ddb2396444326e12fe1df353731416f5a3a2706"
groups   = [ "john", "desktops" ]

[[node]]
hostname = "john-notebook"
ip       = "10.96.41.34"
pk       = "43c4fda1ed1e810a30b141ae2c644465a8e06d15a2a7259e91aaa2112e1d58c7"
groups   = [ "john", "notebooks" ]

[[policy]]
source_groups      = [ "desktops" ]
destination_groups = [ "notebooks" ]
```

## Multi-Homing

Devices can be part of multiple Netsody networks at the same time. This is useful when different networks serve distinct administrative or functional purposes.

Typical scenarios include:
- A device is part of a **private network** for accessing personal devices (e.g., desktop, NAS).
- The same device is also part of an **organizational network** managed by an IT team.

This setup allows users to separate concerns and delegate control while still using the same physical device.

:::warning Avoid overlapping subnets
When a device joins multiple networks, make sure the subnet ranges do not overlap. Overlapping ranges may lead to routing conflicts and unpredictable behavior.
:::

## Configuration Distribution

Netsody does not require a proprietary network controller. Instead, each device retrieves its network configuration from a defined HTTP URL or local file.

Configuration changes are detected without requiring a restart. If the configuration source becomes temporarily unavailable (e.g., an HTTP server is offline or a file is inaccessible) or invalid, the last known valid configuration is kept in memory and used until a new one can be retrieved.

### HTTP(S) Distribution

Devices can fetch configuration files from any reachable HTTP(S) endpoint, e.g., a standard web server. Basic authentication is supported via embedded credentials:

**Example:**
```
https://user:secret@config.example.com/my-first-network.toml
```

### File-based Distribution

Alternatively, configuration files can be stored locally or mounted via a network share.

**Example:**
<Tabs>
  <TabItem value="windows" label="Windows" default>
    <pre>file:///C:/Users/Alice/my-first-network.toml</pre>
  </TabItem>
  <TabItem value="macos" label="macOS">
    <pre>file:///Users/alice/my-first-network.toml</pre>
  </TabItem>
  <TabItem value="linux" label="Linux">
    <pre>file:///home/alice/my-first-network.toml</pre>
  </TabItem>
</Tabs>
