# Resources

Resources allow nodes in a Netsody network to reach external IP networks.
A resource is a destination subnet in CIDR notation.

## Concept

Each resource defines how traffic to a destination subnet is forwarded through a specific gateway node.
Communication is allowed only when a matching [policy](policies.md) connects the node groups of the sender with the resource groups of the resource.

Resource enforcement is decentralized: both the sending node and the gateway apply the rules independently.

The gateway must be a Linux system with IP forwarding and NAT enabled.

## Resource Attributes

Each resource entry consists of the following attributes:

### `dest`
The destination subnet (in CIDR notation) that should be reachable through this resource.

* Must be unique within a Netsody network.
* Must be a network address (not a host address).
* Overlapping resources are resolved by prefix length (longest match wins).

:::warning Duplicate Resources
Defining the same `dest` in multiple networks on the same device results in undefined behavior. Run `netsody status` in the terminal to check if duplicate resources exist and which one is currently applied.
:::

### `gw`
The public key (`pk`) of the node that will act as a gateway.

This device must:
* Be part of the current Netsody network.
* Run a Linux system.

### `groups`
A list of resource groups assigned to this resource.
These groups are used as policy destination groups for access checks.

Resource groups do not grant access by themselves. A node may use a resource only when an explicit [policy](policies.md) matches the node's groups with the resource's groups.

Prefer group names that describe the resource, such as `office_resources` or `admin_resources`, instead of reusing node group names. Reusing a node group name is valid, but a policy for that group can also affect node-to-node access for nodes in the same group.

## Example Resource Configuration

```toml
[[resource]]
dest   = "192.168.188.0/24"
gw     = "689a1b9f5efcb861ac67ce185ddb2396444326e12fe1df353731416f5a3a2706" # john-desktop
groups = [ "office_resources" ]

[[policy]]
source_groups      = [ "admins" ]
destination_groups = [ "office_resources" ]
```

This allows nodes in the `admins` group to use the resource. Sharing a group name between a node and a resource is not enough; the policy is required.

## Public Resource Example

To make a resource available to all nodes, give the resource a dedicated group and allow `ALL` to access that group:

```toml
[[resource]]
dest   = "192.168.188.0/24"
gw     = "689a1b9f5efcb861ac67ce185ddb2396444326e12fe1df353731416f5a3a2706" # john-desktop
groups = [ "public_resources" ]

[[policy]]
source_groups      = [ "ALL" ]
destination_groups = [ "public_resources" ]
```
