---
title: Users
description: Manage users and access ownership in Netsody.
---

# Users

The controller is the central place for user-oriented administration. Use users to model who is responsible for access and which nodes belong to that person or team.

<figure>
  <img src="/img/users-list.jpeg" alt="Netsody controller Users page showing user roles and default groups" />
  <figcaption>The Users view lists users, their roles, and their default groups. New nodes added by a user automatically receive that user's default groups, keeping resource access consistent across the user's devices.</figcaption>
</figure>

The current documentation does not assume a specific identity provider or user lifecycle integration. Document only the user model that is available in your deployment.

## Roles

Users have one of these roles:

| Permission | Owner | Admin | Editor | Member |
| --- | --- | --- | --- | --- |
| Full access to everything | ✅ | ✅ | ❌ | ❌ |
| Transfer ownership | ✅ | ❌ | ❌ | ❌ |
| Remove Owner | ❌ | ❌ | ❌ | ❌ |
| Edit nodes, resources, and policies | ✅ | ✅ | ✅ | ❌ |
| Manage members and tokens | ✅ | ✅ | ❌ | ❌ |
| Access member list | ✅ | ✅ | ❌ | ❌ |
| Read-only network access | ✅ | ✅ | ✅ | ✅ |

Only one user can be Owner. Admin, Editor, and Member can be assigned to multiple users.

## Recommended model

- Keep users distinct from nodes.
- Assign access through groups and policies instead of broad network membership.
- Remove or disable access when a user no longer needs it.
- Review nodes associated with a user before granting sensitive access.

## Related pages

Users help administrators reason about ownership. Actual traffic permissions are still expressed through Netsody networks, groups, and policies.

See [Groups](./groups.md) and [Policies](./policies.md) for the access model.
