---
title: Windows
description: Step-by-step guide for installing Netsody on Windows.
pagination_prev: null
pagination_next: get-started/first-network
---

# Installing Netsody on Windows

This guide explains how to install and run Netsody on Windows, including the background service (agent) and the system tray UI.

## Step-by-Step Installation

We provide a Windows installer that sets up both the agent and UI automatically.

### Step 1: Download the Installer

* Click the following link to download the installer: 📦 [Netsody_0.1.0_windows.exe](https://download.netsody.io/binaries/0.1.0/windows-amd64/Netsody_0.1.0_windows.exe)
* The download should start automatically.

:::info Windows Security Warning
You might get warned by Microsoft Defender SmartScreen that it couldn't verify if the file is safe. Click **"Show more"** and then **"Keep anyway"**.
:::

### Step 2: Run the Installer

* Open the file directly from your browser, or locate it in your Downloads folder and double-click the installer.
* User Account Control might ask to allow the app to make changes to your device. Click **"Yes"**.
* Follow the installation wizard to complete the installation.
* After installation, the Netsody agent runs automatically as a Windows service.

<figure style={{ textAlign: 'center' }}>
  <img
    src="/img/windows-installer.png"
    alt="Screenshot showing the welcome screen of installer"
    style={{
      maxWidth: '550px',
      width: '100%',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
      margin: '1rem auto',
      backgroundColor: 'rgba(0, 0, 0, 0.05)'
    }}
  />
  <figcaption style={{ textAlign: 'center', color: '#666' }}>
    Figure 1: Windows installer welcome screen
  </figcaption>
</figure>

### Step 3: Start the Netsody UI

* Open the Start menu, search for **"Netsody UI"**, and click to launch it.
* The Netsody UI runs in the system tray (bottom-right corner). If it’s not immediately visible, click the arrow to show hidden icons.

:::info First Startup Delay
On first startup, the UI may take a few seconds to connect to the agent, as the agent completes the proof-of-work process to generate your device identity.
:::

Once started, the Netsody UI will display the public key of your local device.

<figure style={{ textAlign: 'center' }}>
  <img
    src="/img/windows-systray.png"
    alt="Netsody system tray application showing device public key"
    style={{
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
      margin: '1rem auto'
    }}
  />
  <figcaption style={{ textAlign: 'center', color: '#666' }}>
    Figure 2: Netsody system tray application showing device public key
  </figcaption>
</figure>

:::tip Copy Public Key
You can copy your public key by clicking on it in the Netsody UI.
Alternatively, run `"C:\Program Files\netsody\netsody.exe" status --token "C:\ProgramData\netsody\auth.token"` in your command prompt to display it.
:::

## Next Step

* ✅ Netsody is now installed.
* 👉 Proceed to [set up your first network](../first-network.mdx) to start connecting devices.