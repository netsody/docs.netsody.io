# Nodes

Nodes define devices that are eligible to join a drasyl network.

## Concept

A drasyl node represents a physical or virtual device within a single network. A device may join multiple drasyl networks simultaneously.

Nodes are the fundamental building blocks of a drasyl network, similar to hosts in traditional IP networks, but operate within drasyl's secure overlay. Each node entry specifies which device may join the network, how it is addressed, and how it is grouped.

:::info Configuration Distribution
Make sure to not only define the node in the configuration file, but also **distribute the configuration** to the device using one of the available [distribution methods](networks.md#configuration-distribution).
:::

## Node Attributes

Each node entry includes the following fields:

### `pk`
The cryptographic public key that uniquely identifies the device allowed to join the network.
You can retrieve it from the drasyl UI or via the `drasyl status` command.

### `hostname`
A hostname that can be used instead of the IP address to address the node.  
It must be valid according to [RFC 1123](https://tools.ietf.org/html/rfc1123) and unique within the network.  
Nodes can be reached using either the hostname or the fully qualified domain name (FQDN) `<hostname>.drasyl.network`.

:::warning Duplicate hostnames across networks
If a device is part of multiple drasyl networks with the same hostname, the name resolution order behavior is undefined.  
In such cases, use the IP address to avoid ambiguity.
:::

### `ip`
The static IPv4 address assigned to the node within the network's subnet.  
The address must:
- Belong to the defined [network subnet](networks#basic-configuration).
- Not be the subnet base address.
- Not be the broadcast address.
- Not be a reserved address (see [Reserved IPs](networks#basic-configuration)).

### `groups` (optional)
A node may belong to one or more groups. Groups are used in [policies](policies.md) to control which nodes may communicate, and in [routes](routes.md) to define access to external networks. Group names are free-form strings.

:::info Default Group
Every node is implicitly part of the group `ALL`.
:::

## Example Node Configuration

Here is an example of a node entry in a TOML configuration file:

```toml
[[node]]
pk       = "689a1b9f5efcb861ac67ce185ddb2396444326e12fe1df353731416f5a3a2706"
hostname = "john-desktop"
ip       = "10.96.41.1"
groups   = ["john", "desktops", "windows"]
```