---
title: Linux
description: Step-by-step guide for installing drasyl on Linux.
pagination_prev: null
pagination_next: get-started/first-network
---

# Installing drasyl on Linux

This guide explains how to install drasyl on Linux. drasyl consists of two components:

* **drasyl daemon**: background service
* **drasyl UI**: desktop application to manage the daemon

You can install either the daemon alone (headless setup) or both components.

:::info Supported Distributions
We currently provide `.deb` packages for Debian-based systems (e.g., Ubuntu). drasyl may work on other distributions as well.
Need support for your distribution? Contact us, we're happy to help!
:::

## Installing the drasyl Daemon

### Step 1: Download the Daemon Package

Choose your system architecture:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="amd64" label="x86_64" default>

📦 [drasyl_0.1.0_amd64.deb](https://download.drasyl.org/binaries/0.1.0/linux-amd64/drasyl_0.1.0_amd64.deb)

  </TabItem>
  <TabItem value="arm64" label="ARM64">

📦 [drasyl_0.1.0_arm64.deb](https://download.drasyl.org/binaries/0.1.0/linux-amd64/drasyl_0.1.0_arm64.deb)

  </TabItem>
</Tabs>

### Step 2: Install the Package

<Tabs>
  <TabItem value="amd64" label="x86_64" default>

```bash
sudo dpkg -i drasyl_0.1.0_amd64.deb
```

  </TabItem>
  <TabItem value="arm64" label="ARM64">

```bash
sudo dpkg -i drasyl_0.1.0_arm64.deb
```

  </TabItem>
</Tabs>

After this, the daemon runs as a background service.

### Step 3: Configure authentication

Copy the authentication token to the current user's directory:
   
```
mkdir -p ~/.drasyl
sudo cat /etc/drasyl/auth.token > ~/.drasyl/auth.token
chmod 600 ~/.drasyl/auth.token
```

## Installing the drasyl UI (Desktop only)

### Step 1: Download the UI Package

<Tabs>
  <TabItem value="amd64" label="x86_64" default>

📦 [drasyl-ui_0.1.0_amd64.deb](https://download.drasyl.org/binaries/0.1.0/linux-amd64/drasyl-ui_0.1.0_amd64.deb) (UI is currently only available for `x86_64`)

  </TabItem>
</Tabs>

### Step 2: Install the Package

<Tabs>
  <TabItem value="amd64" label="x86_64" default>

   ```bash
   sudo dpkg -i drasyl-ui_0.1.0_amd64.deb
   ```

  </TabItem>
</Tabs>

### Step 3: Start the drasyl UI

* Open your application launcher, search for **"drasyl UI"**, and launch it.
* The UI icon will appear in your system tray.

:::info First Startup Delay
On first startup, the UI may take a few seconds to connect to the daemon while it completes the proof-of-work process.
:::

Once connected, the public key of your device is displayed.

<figure style={{ textAlign: 'center' }}>
  <img
    src="/img/linux-systray.png"
    alt="Linux system tray showing the drasyl UI application"
    style={{
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
      margin: '1rem auto'
    }}
  />
  <figcaption style={{ textAlign: 'center', color: '#666' }}>
    Figure 1: Linux system tray showing the drasyl UI application
  </figcaption>
</figure>

:::tip Copy Public Key
You can copy your public key by clicking on it in the drasyl UI.
Alternatively, run `drasyl status` in your terminal to display it.
:::

## Next Step

* ✅ drasyl is now installed.
* 👉 Proceed to [set up your first network](../first-network.mdx) to start connecting devices.