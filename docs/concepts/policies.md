# Policies

Policies define which nodes in a drasyl network are allowed to communicate. These policies are enforced on both endpoints.

## Concept

Each policy rule defines communication permissions between groups of nodes.  
Although policies are written in a unidirectional format with `source_groups` and `destination_groups`,
they are currently evaluated symmetrically: if group A can contact group B, group B can also contact group A.

:::info Directional format
The directional structure (`source_groups` → `destination_groups`) was chosen intentionally to support future extensions.  
We plan to support unidirectional policies, where only the defined direction will be allowed.
:::

drasyl follows a default-deny approach: Without a matching policy, no communication between nodes is possible, even if they are in the same group. All communication must be explicitly granted via policy configuration.

## Policy Attributes

Each policy entry must include the following fields:

### `source_groups`

A list of node groups that are allowed to initiate communication.  
Each group name must match one defined in the node configuration.  
Use `ALL` to refer to all nodes in the network.

:::info Directional format
Although policies are currently evaluated symmetrically, the `source_groups` field indicates the intended direction of communication and prepares for future support of unidirectional rules.
:::

### `destination_groups`

A list of node groups that may be contacted by the source groups.  
Each group name must also match one defined in the node configuration.  
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