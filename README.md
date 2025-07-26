JoyDrill – Ethical Crypto Mining for Good Causes

JoyDrill is an Electron-based mining app that donates cryptocurrency earnings to churches, charities, and shelters. This repository contains the source code for the JoyDrill desktop application.

INSTALLATION (For Developers)

Clone this repository:
git clone https://github.com/YOUR_USERNAME/joydrill.git
cd joydrill

Install dependencies:
npm install

Run the app in development mode:
npm start

BUILDING JOYDRILL

To package JoyDrill into an executable, run:
npm run dist

This uses electron-builder to create:

A standalone .exe file

An installer (.exe) with uninstall support

After building, check the dist folder for your installer.

HOW JOYDRILL WORKS

Built with Electron (JavaScript, HTML, CSS)

Uses a bundled version of XMRig for Monero mining

CPU usage is adjustable via the app’s slider control

100% of mining rewards go to vetted charities

REPO STRUCTURE

main.js - Electron main process
preload.js - Preload scripts for renderer
index.html - Main user interface
package.json - Project configuration
build/ - Icons & branding
config.json - Mining config (editable)

CONTRIBUTING

Pull requests are welcome!
If you want to suggest new features, improvements, or charity integrations, open an Issue or submit a PR.

LICENSE

This project is licensed under the MIT License – see LICENSE for details.

CREDITS

Built with Electron

Mining powered by XMRig

Concept & design by Garbagebuild

