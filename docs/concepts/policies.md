# Policies

Policies define which nodes in a Netsody network are allowed to communicate with other nodes and which nodes may use resources. These policies are enforced on both endpoints.

## Concept

Each policy rule defines communication permissions between groups.
Although policies are written in a unidirectional format with `source_groups` and `destination_groups`,
they are currently evaluated symmetrically: if group A can contact group B, group B can also contact group A.

:::info Directional format
The directional structure (`source_groups` → `destination_groups`) was chosen intentionally to support future extensions.  
We plan to support unidirectional policies, where only the defined direction will be allowed.
:::

Netsody follows a default-deny approach: Without a matching policy, no node-to-node communication is possible and no resource can be used, even if the node and the destination share a group name. All communication must be explicitly granted via policy configuration.

## Policy Attributes

Each policy entry must include the following fields:

### `source_groups`

A list of groups that are allowed to initiate communication.
For node-to-node access, these are node groups. For resource access, the recommended spelling is to put the node groups that should use the resource here.
Use `ALL` to refer to all nodes in the network.

:::info Directional format
Although policies are currently evaluated symmetrically, the `source_groups` field indicates the intended direction of communication and prepares for future support of unidirectional rules.
:::

### `destination_groups`

A list of groups that may be contacted or used by the source groups.
For node-to-node access, these are node groups. For resource access, the recommended spelling is to put the resource groups here.
Use `ALL` to refer to all nodes in the network.

:::info Directional format
This field defines the target of a communication rule. Together with `source_groups`, it forms a directional policy that is, for now, applied symmetrically.
:::

## Example Policy Configuration

Here is an example of a policy entry in a TOML configuration file:

```toml
[[policy]]
source_groups      = ["notebooks"]
destination_groups = ["desktops"]
```

## Resource Access Example

Resource groups identify the resource for policy matching. They are not access lists by themselves.

```toml
[[resource]]
dest   = "192.168.188.0/24"
gw     = "689a1b9f5efcb861ac67ce185ddb2396444326e12fe1df353731416f5a3a2706" # john-desktop
groups = ["office_resources"]

[[policy]]
source_groups      = ["notebooks"]
destination_groups = ["office_resources"]
```

This allows nodes in the `notebooks` group to use the resource. Because policies are evaluated symmetrically, the reversed group order currently matches as well, but the recommended form is node groups as `source_groups` and resource groups as `destination_groups`.
