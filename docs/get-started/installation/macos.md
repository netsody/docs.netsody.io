---
title: macOS
description: Step-by-step guide for installing Netsody on macOS.
pagination_prev: null
pagination_next: get-started/first-network
---

# Installing Netsody on macOS

This guide walks you through installing Netsody on macOS. Netsody consists of two main components:

* **Netsody agent**: runs as a background service
* **Netsody UI**: menu bar application to manage the agent

## Installation Methods

We provide two installation methods:

* **macOS Package Installer (.pkg)** _(Recommended)_
* **Homebrew**

### Method 1: macOS Package Installer (Recommended)

The simplest way to install Netsody is via the provided `.pkg` installer, which sets up both the agent and UI automatically.

#### Step 1: Download the Installer

Choose the appropriate installer for your Mac:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple-silicon" label="Apple Silicon" default>

Click the following link to download the Apple Silicon installer:
📦 [netsody_0.1.0_macos_arm64.pkg](https://download.netsody.io/binaries/0.1.0/macos-arm64/netsody_0.1.0_macos_arm64.pkg)

  </TabItem>
  <TabItem value="intel" label="Intel">

Click the following link to download the Intel installer:
📦 [netsody_0.1.0_macos_x86_64.pkg](https://download.netsody.io/binaries/0.1.0/macos-amd64/netsody_0.1.0_macos_x86_64.pkg)

  </TabItem>
</Tabs>

:::info macOS Security Warning
If macOS warns you that the file can't be verified, open **System Settings > Privacy & Security**, scroll down, and click **"Open Anyway"**.
:::

#### Step 2: Run the Installer

* Open the `.pkg` file from your Downloads folder or browser.
* macOS will ask you to confirm that you want to install the software. Click **"Allow"**.
* Follow the steps in the installation wizard.
* After completion, the agent starts automatically as a background service.

<div style={{ maxWidth: '550px', margin: '1rem auto', textAlign: 'center' }}>
  <img
    src="/img/macos-installer.png"
    alt="Screenshot showing the welcome screen of macOS installer"
    style={{
      maxWidth: '100%',
      width: '100%',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
      margin: '0 auto',
      backgroundColor: '#ddd',
    }}
  />
  <div style={{ textAlign: 'center', color: '#666' }}>
    Figure 1: macOS installer welcome screen
  </div>
</div>

#### Step 3: Start the Netsody UI

* Open Spotlight (`Cmd + Space`), search for **"Netsody UI"**, and launch it.
* The UI will appear as an icon in your **menu bar** (top-right corner).
* If you don’t see it, check the overflow area of the menu bar.

:::info First Startup Delay
On first startup, the UI may take a few seconds to connect to the agent while it completes the proof-of-work process to generate your device identity.
:::

Once connected, the Netsody UI displays the public key of your device.

<div style={{ maxWidth: '600px', margin: '1rem auto', textAlign: 'center' }}>
  <img
    src="/img/macos-menubar.png"
    alt="macOS menu bar showing the Netsody UI application"
    style={{
      maxWidth: '100%',
      width: '100%',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
      margin: '0 auto',
      backgroundColor: '#ddd',
    }}
  />
  <div style={{ textAlign: 'center', color: '#666' }}>
    Figure 2: macOS menu bar showing the Netsody UI application
  </div>
</div>

:::tip Copy Public Key
You can copy your public key by clicking on it in the Netsody UI.
Alternatively, run `netsody status` in your terminal to display it.
:::

### Method 2: Homebrew Installation

If you prefer managing software via [Homebrew](https://brew.sh/), you can install Netsody from the terminal.

#### Step 1: Install the Netsody Agent

```bash
brew install netsody/tap/netsody
```

Copy the authentication token: 
```
An API auth token has been created at:
  /opt/homebrew/etc/netsody/auth.token

To use netsody you must copy it into your home directory:
  mkdir -p ~/.netsody
  cp /opt/homebrew/etc/netsody/auth.token ~/.netsody/auth.token
  chmod 600 ~/.netsody/auth.token
```

Start the agent:
```bash
sudo brew services start netsody/tap/netsody
```

This ensures that the Netsody agent starts automatically with macOS.

#### Step 2: Install and start the UI

```bash
brew install netsody/tap/netsody-ui
```

* Open Spotlight (`Cmd + Space`), search for **"Netsody UI"**, and launch it.
* The UI will appear as an icon in your **menu bar** (top-right corner).
* If you don’t see it, check the overflow area of the menu bar.

:::info First Startup Delay
On first startup, the UI may take a few seconds to connect to the agent while it completes the proof-of-work process to generate your device identity.
:::

Once connected, the Netsody UI displays the public key of your device.

<div style={{ maxWidth: '600px', margin: '1rem auto', textAlign: 'center' }}>
  <img
    src="/img/macos-menubar.png"
    alt="macOS menu bar showing the Netsody UI application"
    style={{
      maxWidth: '100%',
      width: '100%',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
      margin: '0 auto',
      backgroundColor: '#ddd',
    }}
  />
  <div style={{ textAlign: 'center', color: '#666' }}>
    Figure 2: macOS menu bar showing the Netsody UI application
  </div>
</div>

:::tip Copy Public Key
You can copy your public key by clicking on it in the Netsody UI.
Alternatively, run `netsody status` in your terminal to display it.
:::

## Next Step

* ✅ Netsody is now installed.
* 👉 Proceed to [set up your first network](../first-network.mdx) to start connecting devices.
