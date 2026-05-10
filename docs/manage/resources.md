---
title: Resources
description: Manage access to private resources, services, and remote networks.
---

# Resources

Resources allow Netsody nodes to reach private systems through a gateway node. Use them when the target system cannot run the Netsody agent itself, or when you need access to a subnet, address, or private service behind a Netsody node.

<figure>
  <img src="/img/resources-list.jpeg" alt="Netsody controller Resources page showing destinations, gateways, groups, and resource types" />
  <figcaption>The Resources view lists each destination, the gateway node that forwards traffic, the groups used for access policies, and the resource type.</figcaption>
</figure>

Resource enforcement is decentralized. The sending node and the gateway apply the access rules locally.

## Resource design

Resources can describe:

- A single IPv4 address.
- An IPv4 subnet.
- A single domain name.
- A leading-wildcard domain name, such as `*.example.internal`.

For IPv4 addresses and subnets, access is routed through the selected gateway node.

For domain and wildcard domain resources, DNS queries for the resource are forwarded to the gateway. The DNS response is then used to set up IP routing, so IP communication with the resolved addresses goes through the gateway.

When designing resources:

- Use the narrowest destination CIDR that matches the resource.
- Prefer an individual IPv4 address or domain pattern when the service does not require a whole subnet.
- Avoid overlapping resources where possible.
- Limit resource usage to the groups that need access.
- Prefer installing the Netsody agent directly on a target device when that is simpler and available.

Each resource defines:

- The destination that should be reachable.
- The gateway node that forwards traffic.
- The destination groups used by policies.

Resources require explicit policies. A node does not gain access only because it shares a group with a resource.

## Implementation details

The agent includes a gateway component for IPv4 resources. On Linux, IP forwarding on gateway nodes is implemented in the kernel with iptables. On other platforms, the agent uses a userspace implementation for IPv4 TCP, UDP, and ICMP forwarding.

Before creating a resource, verify that the gateway can reach the destination locally.

## Troubleshooting

If resource traffic does not work, check:

- The gateway node is connected to the Netsody network.
- The gateway can reach the target destination outside Netsody.
- A policy allows the source group to use the resource.
- The destination does not overlap with another local or Netsody network.
