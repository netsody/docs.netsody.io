---
title: Android (soon)
description: Step-by-step guide for installing Netsody on Android devices.
pagination_prev: null
pagination_next: get-started/first-network
---

# Installing Netsody on Android

:::info Coming Soon
Netsody for Android is currently in internal testing. The app will soon allow you to connect your Android devices to Netsody networks.
:::

## Preview

The mobile app will provide the same core functionality as the desktop agents. The app will be implemented as a VPN service that supports [split tunneling](https://en.wikipedia.org/wiki/Split_tunneling). This means you can run the VPN continuously in the background while your regular network traffic remains unaffected, and you'll be simultaneously connected to the Netsody network.

## Availability

The Android app will be released in the following phases:

1. **Internal Testing** (current) - Closed beta for selected testers
2. **TestFlight** - Public beta
3. **Play Store** - Full release on the Google Play Store

## Platform Limitations

- **Custom Routes**: Due to restrictions of the [VpnService](https://developer.android.com/reference/android/net/VpnService), [custom routes](../../concepts/routes.md) are only supported for the first enabled network. 
Custom routes defined for additional networks will be ignored. This is because Android does not allow specifying a gateway for custom routes, which causes the system to always use the first IP address of the network interface as the source address. If this address does not belong to the actual Netsody network associated with the route, packet delivery fails. This limitation only applies to custom routes. Direct communication with other Netsody nodes works as expected, regardless of the Netsody network they belong to. To use custom routes from different networks, ensure that only the currently needed network is enabled. Alternatively, installing the Netsody agent directly on the target device allows direct communication via the overlay IP, bypassing this limitation.
- **Private DNS**: When using the [Private DNS feature](https://support.google.com/android/answer/9654714?hl=en#zippy=%2Cprivate-dns) feature (DNS-over-TLS) with setting _“On”_, Netsody will no longer be able to resolve hostnames of Netsody nodes (`*.netsody.me`).
This is because Android always attempts to route private DNS traffic through the active VPN and does not allow us to add additional DNS servers nor DNS entries.
Therefore, you need to ensure your private DNS provider is reachable through the Netsody network, otherwise it will be displayed as _“Couldn’t connect”_ in your settings app and classic DNS will be used.
For best compatbility, we suggest setting Private DNS to _“Automatic”_.
We are planning to support DNS-over-TLS servers within Netsody as upstream resolvers in the future. Let us know if you’re interested 🤙.

## Stay Updated

To be notified about the availability of the Android app, you can:

- Follow the [Netsody Blog](https://netsody.io/blog)
- Join our [Discord Server](https://netsody.io/discord)
- Follow us on [Mastodon](https://mastodon.world/@drasyl)
- Watch the [GitHub Repository](https://github.com/drasyl/drasyl-rs)
