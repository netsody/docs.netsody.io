---
title: Troubleshooting
description: First checks for Netsody connectivity and setup issues.
---

# Troubleshooting

Start with the controller, then verify the local agent state.

## Device does not appear connected

Check:

- The agent is installed and running.
- The device identity shown by the local UI or `netsody status` matches the device in the controller.
- The device is assigned to the expected network.
- The device has network connectivity to the controller.

## Devices cannot reach each other

Check:

- Both devices are connected to the same Netsody network.
- A policy allows communication between their groups.
- Their Netsody IP addresses are in the expected network range.
- No local firewall blocks the traffic on either device.
- The Netsody subnet does not overlap with a local LAN subnet.

## Resource is unreachable

Check:

- The gateway device is online.
- The gateway can reach the target subnet locally.
- Linux IP forwarding and NAT are enabled on the gateway.
- A resource exists for the destination.
- Access to the resource is allowed for the source group.

## Local diagnostics

Use `netsody status` to inspect the local agent state and retrieve the device public key. Use `netsody status -v` for technical details, including effective direct-connection exclusions and the network and gateway involved in a route conflict.

The CLI reaches the agent through its Unix socket or Windows named pipe, using operating-system caller identity rather than a bearer token. If the agent uses a non-default endpoint, pass it with the global option, for example `netsody --daemon-socket /run/netsody/agent.sock status`.

Login, network membership changes, exit-node selection, updates, and support-bundle operations require root on Linux and macOS or an elevated caller on Windows. A privilege error is resolved by running the command with `sudo` or from an elevated prompt, not by supplying an API token.

On desktop systems, the local Netsody UI can also show whether the agent is connected and which networks are active.

## Support bundles

Create a bundle while reproducing the problem:

```bash
sudo netsody bundle create --comment "Unable to reach the resource"
```

The default capture lasts one minute. Use `--duration <DURATION>` to change it, or `--output <DIR>` to keep a copy in another directory. Upload the newest bundle with:

```bash
sudo netsody bundle upload
```

Quote the returned bundle ID when contacting support. Uploads go only to the built-in Netsody support service; there is no option to supply another upload URL.

## Support

If the issue persists, contact the Netsody team through:

- [Discord](https://netsody.io/discord)
- [Mastodon](https://mastodon.world/@netsody)
- [Email](mailto:info@netsody.io)
