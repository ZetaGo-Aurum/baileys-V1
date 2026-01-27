# <div align="center">ZetaGo-Aurum-Socket</div>

<div align="center">

![ZetaGo-Aurum](https://img.shields.io/badge/ZetaGo--Aurum--Socket-v2.0.8-gold?style=for-the-badge&logo=whatsapp&logoColor=white)
![Version](https://img.shields.io/badge/Version-2.0.8-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**The Ultimate WhatsApp Socket Connection Library**
*Premium. Secure. Humanized.*

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Safety](#safety)

</div>

---

## 🌟 Introduction

**ZetaGo-Aurum-Socket** is a high-performance, modified version of the Baileys library, engineered for stability, security, and human-like behavior. It is designed to act as a direct replacement for standard Baileys, providing "Business API" grade connectivity while running on your own infrastructure.

We have rebuilt the core connection logic to ensure your bot stays online, avoids bans, and interacts seamlessly with WhatsApp's servers.

## 🚀 Key Features

### 🛡️ **Unmatched Security (Anti-Ban)**
*   **Browser Masquerading**: Identifies as a legitimate Chrome browser on Windows (`Windows`, `Chrome`, `22.0.0.0`) instead of a generic bot signature.
*   **Traffic Jitter**: Implemented randomized timing for "keep-alive" pings (1-6s jitter) to disrupt robotic traffic pattern analysis.
*   **Human Latency**: Increased default timeouts (`connectTimeoutMs: 60s`) to mimic human network behavior.
*   **Trust Score**: Enabled `syncFullHistory` and `generateHighQualityLinkPreview` to behave more like a legitimate "Companion" device.

### 🔗 **Robust Custom Pairing**
*   **Universal Compatibility**: Custom pairing code input is now auto-sanitized (removes non-alphanumeric chars) and normalized.
*   **Flexibility**: Works seamlessly with any pairing number or custom key format.

### 🤖 **AI-Enhanced Humanization**
*   **Smart Jitter**: Every packet is sent with micro-randomized delays to mimic human interaction.
*   **Clean Fingerprint**: Removed all legacy tracking codes and "bot" markers.

### ⚡ **Professional Performance**
*   **Anti-Crash Architecture**: Global error handlers prevent the process from dying.
*   **High Stability**: Optimized for long-running sessions with automatic reconnection logic.

---

## 📦 Installation

Install the package directly from your project:

```bash
npm install @zetagoaurum-socket/zetago-aurum-socket
# or install directly from GitHub (Recommended if NPM fails)
npm install github:ZetaGo-Aurum/baileys-V1
# or
yarn add github:ZetaGo-Aurum/baileys-V1
# or
yarn add @zetagoaurum-socket/zetago-aurum-socket
```

## 🛠️ Usage

Simply import `makeWASocket` exactly as you would with standard Baileys. The enhancements work automagically in the background.

```javascript
const { default: makeWASocket, useMultiFileAuthState } = require('@zetagoaurum-socket/zetago-aurum-socket');

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: !usePairingCode, // Set to false if using pairing code
        // Browser masquerading is handled automatically!
    });

    if (usePairingCode && !sock.authState.creds.registered) {
        // Pairing code is now robust and handles formatting automatically!
        const code = await sock.requestPairingCode('6281234567890');
        console.log(`Pairing code: ${code}`);
    }

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if(connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            if(shouldReconnect) {
                connectToWhatsApp();
            }
        } else if(connection === 'open') {
            console.log('opened connection');
        }
    });
}

connectToWhatsApp();
```

---

## 🛡️ Safety & Anti-Ban Details

We take account safety seriously. **ZetaGo-Aurum-Socket** implements:

1.  **Packet Inspection Prevention**: Headers are normalized to look like official clients.
2.  **Rate Limiting**: Built-in delays prevent you from sending messages too fast (the #1 cause of bans).
3.  **Clean Dependencies**: We removed all dubious "peer dependencies" that were present in previous forks.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">
    <sub>Built with ❤️ by the ZetaGo Team</sub>
</div>
