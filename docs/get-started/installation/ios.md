---
title: iOS/iPadOS (soon)
description: Step-by-step guide for installing Netsody on iOS and iPadOS devices.
pagination_prev: null
pagination_next: get-started/first-network
---

# Installing Netsody on iOS/iPadOS

:::info Coming Soon
Netsody for iOS and iPadOS is currently in internal testing. The app will soon allow you to connect your iPhone or iPad to Netsody networks.
:::

## Preview

<figure style={{ textAlign: 'center' }}>
  <img
    src="/img/ios-app-preview.png"
    alt="Netsody iOS App Preview"
    style={{
      maxWidth: '300px',
      width: '100%',
    }}
  />
  <figcaption style={{ textAlign: 'center', color: '#666' }}>
    Figure 1: Screenshot of the Netsody iOS app
  </figcaption>
</figure>

The mobile app will provide the same core functionality as the desktop agents. The app will be implemented as a VPN service that supports [split tunneling](https://en.wikipedia.org/wiki/Split_tunneling). This means you can run the VPN continuously in the background while your regular network traffic remains unaffected, and you'll be simultaneously connected to the Netsody network.

## Availability

The Netsody iOS/iPadOS app will be released in the following phases:

1. **Internal Testing** (current) - Closed beta for selected testers
2. **TestFlight** - Public beta via Apple TestFlight
3. **App Store** - Full release on the Apple App Store

## Platform Limitations

- **Custom Routes**: Due to restrictions of the [Packet tunnel provider](https://developer.apple.com/documentation/networkextension/packet-tunnel-provider), [custom routes](../../concepts/routes.md) are only supported for the first enabled network. 
Custom routes defined for additional networks will be ignored. This is because iOS/iPadOS does not allow specifying a gateway for custom routes, which causes the system to always use the first IP address of the network interface as the source address. If this address does not belong to the actual Netsody network associated with the route, packet delivery fails. This limitation only applies to custom routes. Direct communication with other Netsody nodes works as expected, regardless of the Netsody network they belong to. To use custom routes from different networks, ensure that only the currently needed network is enabled. Alternatively, installing the Netsody agent directly on the target device allows direct communication via the overlay IP, bypassing this limitation.

## Stay Updated

To be notified about the availability of the iOS/iPadOS app, you can:

- Follow the [Netsody Blog](https://netsody.io/blog)
- Join our [Discord Server](https://netsody.io/discord)
- Follow us on [Mastodon](https://mastodon.world/@netsody)