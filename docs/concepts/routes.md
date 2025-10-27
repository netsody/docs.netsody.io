# Routes

Routes allow nodes in a Netsody network to reach external IP networks.

## Concept

Each route defines how traffic to an external destination is forwarded through a specific gateway node.  
Communication is only allowed for nodes belonging to permitted groups.

Route enforcement is decentralized: both the sending node and the gateway apply the rules independently.

Currently, the gateway must be a Linux system with IP forwarding and NAT enabled.

## Route Attributes

Each route entry consists of the following attributes:

### `dest`
The destination network (in CIDR notation) that should be reachable through this route.

* Must be unique within a Netsody network.
* Must be a network address (not a host address).
* Overlapping routes are resolved by prefix length (longest match wins).

:::warning Duplicate Routes
Defining the same `dest` in multiple networks on the same device results in undefined behavior. Run `netsody status` in the terminal to check if duplicate routes exist and which one is currently applied.
:::

### `gw`
The public key (`pk`) of the node that will act as a gateway.  

This device must:
* Be part of the current Netsody network.
* Run a Linux system.

### `groups`
A list of node groups allowed to use this route.
Only nodes in one of the listed groups may send traffic to the specified destination.

If omitted, the route is accessible to all nodes in the network.

## Example Route Configuration

```toml
[[route]]
dest   = "192.168.188.0/24"
gw     = "689a1b9f5efcb861ac67ce185ddb2396444326e12fe1df353731416f5a3a2706" # john-desktop
groups = [ "admins" ]
```
