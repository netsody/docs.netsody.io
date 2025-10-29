---
title: Linux
description: Step-by-step guide for installing Netsody on Linux.
pagination_prev: null
pagination_next: get-started/first-network
---

# Installing Netsody on Linux

This guide explains how to install Netsody on Linux. Netsody consists of two components:

* **Netsody agent**: background service
* **Netsody UI**: desktop application to manage the agent

You can install either the agent alone (headless setup) or both components.

:::info Supported Distributions
We currently provide:
* `.deb` packages for:
  * **Ubuntu 22.04 (Jammy)** and newer.
  * **Debian 12 (Bookworm)** and newer.
* `.rpm` packages for:
  * **Fedora 41** and newer (agent only, x86_64 only).

If you need to install Netsody on other platforms, you can contact us for assistance.
:::

## Installing the Netsody Agent

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="distribution">
  <TabItem value="debian-ubuntu" label="Debian / Ubuntu" default>

### Step 1: Download the Agent Package

Choose your system architecture:

<Tabs groupId="architecture">
  <TabItem value="amd64" label="x86_64" default>

```bash
curl -LO https://download.netsody.io/binaries/0.1.0/linux-amd64/netsody_0.1.0_amd64.deb
```

  </TabItem>
  <TabItem value="arm64" label="ARM64">

```bash
curl -LO https://download.netsody.io/binaries/0.1.0/linux-arm64/netsody_0.1.0_arm64.deb
```

  </TabItem>
</Tabs>

### Step 2: Install the Package

<Tabs groupId="architecture">
  <TabItem value="amd64" label="x86_64" default>

```bash
sudo dpkg -i netsody_0.1.0_amd64.deb
```

  </TabItem>
  <TabItem value="arm64" label="ARM64">

```bash
sudo dpkg -i netsody_0.1.0_arm64.deb
```

  </TabItem>
</Tabs>

After this, the agent runs as a background service.

### Step 3: Configure authentication

Copy the authentication token to the current user's directory:
   
```
mkdir -p ~/.netsody
su -c "cat /etc/netsody/auth.token" > ~/.netsody/auth.token
chmod 600 ~/.netsody/auth.token
```

  </TabItem>
  <TabItem value="fedora" label="Fedora">

:::info Fedora Support
Fedora support is available for **agent only** and **x86_64 architecture only**. The UI is currently not available for Fedora.
:::

### Step 1: Download the Agent Package

```bash
curl -LO https://download.netsody.io/binaries/0.1.0/linux-amd64/netsody-0.1.0-1.x86_64.rpm
```

### Step 2: Install the Package

```bash
sudo dnf install netsody-0.1.0-1.x86_64.rpm
```

Alternatively, you can use `rpm`:

```bash
sudo rpm -i netsody-0.1.0-1.x86_64.rpm
```

After this, the agent runs as a background service.

### Step 3: Configure authentication

Copy the authentication token to the current user's directory:
   
```
mkdir -p ~/.netsody
su -c "cat /etc/netsody/auth.token" > ~/.netsody/auth.token
chmod 600 ~/.netsody/auth.token
```

  </TabItem>
</Tabs>

## Installing the Netsody UI (Desktop only)

<Tabs groupId="distribution-ui">
  <TabItem value="debian-ubuntu" label="Debian / Ubuntu" default>

### Step 1: Download the UI Package

📦 [netsody-ui_0.1.0_amd64.deb](https://download.netsody.io/binaries/0.1.0/linux-amd64/netsody-ui_0.1.0_amd64.deb) (UI is currently only available for `x86_64`)

### Step 2: Install the Package

```bash
sudo dpkg -i netsody-ui_0.1.0_amd64.deb
```

### Step 3: Start the Netsody UI

* Open your application launcher, search for **"Netsody UI"**, and launch it.
* The UI icon will appear in your system tray.

:::info First Startup Delay
On first startup, the UI may take a few seconds to connect to the agent while it completes the proof-of-work process.
:::

Once connected, the public key of your device is displayed.

<figure style={{ textAlign: 'center' }}>
  <img
    src="/img/linux-systray.png"
    alt="Linux system tray showing the Netsody UI application"
    style={{
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
      margin: '1rem auto'
    }}
  />
  <figcaption style={{ textAlign: 'center', color: '#666' }}>
    Figure 1: Linux system tray showing the Netsody UI application
  </figcaption>
</figure>

:::tip Copy Public Key
You can copy your public key by clicking on it in the Netsody UI.
Alternatively, run `netsody status` in your terminal to display it.
:::

  </TabItem>
</Tabs>

## Next Step

* ✅ Netsody is now installed.
* 👉 Proceed to [set up your first network](../first-network.mdx) to start connecting devices.
