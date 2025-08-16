---
slug: /
---

# Welcome to drasyl

[drasyl](https://github.com/drasyl/drasyl-rs) ([dʁazy:l]) is a lightweight, software-defined overlay networking solution built on a [fast and secure peer-to-peer protocol](architecture/p2p-protocol.mdx).

It enables you to seamlessly interconnect all your devices in your organization, team, or home, regardless of the network barriers commonly present between physical networks.
Unlike traditional VPNs, drasyl builds direct peer-to-peer connections between all devices, creating a mesh overlay that efficiently utilizes the underlying physical network.
No proprietary, centralized network controller is required, as overlay configurations can be distributed using any standard HTTP server or fully decentralized with local copies on each device.
You retain full control over network membership and which devices are permitted to communicate, following a zero-trust model with all traffic end-to-end encrypted and all devices authenticated.

## Why drasyl?

drasyl is open-source, easy to use, secure, and runs on many platforms. It can operate entirely on your own infrastructure.

### Typical use cases

- **Access your personal devices from anywhere**: securely reach your home desktop, NAS, or other devices without the hassle of setting up a VPN, configuring port forwarding, or maintaining DynDNS.
- **Access restricted organizational resources from home**: gain controlled access to internal services without opening firewall ports or exposing systems to the public Internet.
- **Create ad-hoc secure networks between peers**: instantly connect devices for collaboration in temporary setups like workshops, hackathons, or emergency response teams without altering existing infrastructure.
- **Link distributed teams or sites**: work securely across locations as if everyone were connected to the same local network.

## What’s in this documentation?

- 🚀 [**Get Started**](get-started): Install drasyl and set up your first network.
- 📖 [**Concepts**](concepts): Learn how networks, nodes, policies, and routes work in drasyl.
- ⚙️ [**How drasyl Works**](architecture): Understand the technical architecture and inner workings of drasyl.
- 🏠 [**Self-Hosting**](self-hosting): Run drasyl on your own infrastructure.

## Community & Support

Need help or want to report a bug? Reach out to us via the following channels:

- [GitHub](https://github.com/drasyl/drasyl)
- [Discord](https://drasyl.org/discord)
- [Blog](https://drasyl.org/blog)

## License

drasyl is open-source software (FOSS), licensed under the [MIT License](https://github.com/drasyl/drasyl-rs/blob/master/LICENSE).
