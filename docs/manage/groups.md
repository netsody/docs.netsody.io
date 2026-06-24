---
title: Groups
description: Use groups to organize devices and access rules.
---

# Groups

Groups are used to express access intent. A policy can allow one group to communicate with another group, and resources can be limited to selected groups.

A group is a label that can be attached to both nodes and resources. When a group is used as the source or destination of a policy, it expands to the union of every node and every resource tagged with it. A resource can therefore be reached in two equivalent ways: by a policy that targets the resource directly, or by tagging the resource with a group and writing a policy that targets that group. Because of this, a group with no member nodes is not necessarily empty — it may still tag resources and grant access through them.

<figure>
  <img src="/img/groups-list.jpeg" alt="Netsody controller Groups page showing group usage across nodes, policies, and resources" />
  <figcaption>The Groups view shows where each group is used: how many nodes belong to it, how many policies reference it, and how many resources use it.</figcaption>
</figure>

## Grouping guidance

Use groups for stable access models:

- Device role, such as `workstations`, `servers`, or `gateways`.
- Environment, such as `production`, `staging`, or `home-lab`.
- Responsibility, such as `admins` or `contractors`.

Avoid creating groups that duplicate every individual device. That makes policies harder to read and harder to review.

## Default access

Netsody follows a default-deny model. Group membership alone does not grant access. Create policies that explicitly allow the communication you want.

See [Policies](./policies.md).
