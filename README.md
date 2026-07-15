# HUDDY

> Minimalist overlay HUD with timers - build with Electron, React and TypeScript

## Features

- **Overlay** - transparemt, always-on-top
- **Multiple Timers** - you can run several timers simultaneously
- **Inline editing** - click to change time or name
- **Preset list** - save to presets to have commonly used timers
- **Personalize** - assign colors to your timers
- **Persistent** - timers are saved after app shutdown
- **Mini mode** - double-click for mini mode, or use in full view

## Tech stack

- Electron
- React + TypeScript
- Zustand
- Framer Motion
- CSS Modules
- Vite
- Vitest

## Architecture

- IPC via contextBridge - secure comunication
- Custom hooks - clean code, separation of concerns
- Separate store for UI - separateion of UI from business data
- Presist middleware - automatic presistance of data

## Scripts

`npm run dev`
|
Start development mode

`npm run build`
|
Build for production

`npm test`
|
Run unit tests
