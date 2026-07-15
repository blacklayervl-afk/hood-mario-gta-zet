# TET HOOD — Open World Mini-Planet Adventure

> **Hood Mario GTA Zet** – A fully functional 3-D open-world game built with **Next.js**, **React Three Fiber**, and **Three.js**.

![TET HOOD](https://img.shields.io/badge/TET%20HOOD-Open%20World-yellow?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-0.160-blue?style=for-the-badge&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)

---

## 🎮 Features

- **Spherical planet** with procedural terrain generation and 8 unique zones
- **Hood-style character** (CJ-inspired: hoodie, bandana, baggy pants, gold chain)
- **WASD movement** on the curved planet surface with spherical gravity
- **Space to jump** with physics simulation
- **4 interactive camera modes:**
  - 🌍 **Godvision** – orbital overview
  - 👁️ **Surface** – third-person follow
  - ✈️ **Aerial** – drone view
  - 🎬 **Orbit** – cinematic orbit
- **Collectibles system** – Coins (+10 pts) and Stars (+50 pts) with animations
- **Score tracking** and toast notifications
- **Zone selector** with 8 zones, each with unique color and features
- **Planet info panel** with detailed specifications
- **Starfield background** with 6,000 stars

---

## 🌍 Planet Specifications

| Property | Value |
|----------|-------|
| Radius | 668.45 m |
| Circumference | 4,200 m (4.2 km) |
| Surface Area | 5.62 km² |
| Gravity | 9.80665 m/s² |

---

## 🗺️ 8 Zones

| Zone | Color | Elevation | Area |
|------|-------|-----------|------|
| Arrival Plateau | 🟢 #4ade80 | Low (0–30 m) | 0.68 km² |
| Core / Plaza | 🔵 #60a5fa | Mid (30–60 m) | 0.72 km² |
| Mobility Belt | 🟡 #f59e0b | Low (10–40 m) | 0.85 km² |
| Industry Quarter | 🔴 #ef4444 | Mid (40–80 m) | 0.60 km² |
| Service Basin | 🟣 #a78bfa | Low (0–20 m) | 0.55 km² |
| Open Surface | 💚 #10b981 | Flat (0–15 m) | 1.20 km² |
| Lookout Ridge | 🩷 #f472b6 | High (80–150 m) | 0.52 km² |
| Quiet Side | 🔵 #6366f1 | Mid (20–50 m) | 0.50 km² |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/blacklayervl-afk/hood-mario-gta-zet.git
cd hood-mario-gta-zet

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

### Build for production

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | ^15.1.0 | Framework + Turbopack |
| React | ^19.0.0 | UI library |
| Three.js | ^0.160.0 | 3D rendering |
| @react-three/fiber | ^9.0.0 | React renderer for Three.js |
| @react-three/drei | ^9.120.0 | Three.js helpers |
| Tailwind CSS | ^3.4.17 | Styling |
| Framer Motion | ^11.15.0 | UI animations |
| Radix UI | latest | Accessible UI primitives |
| Lucide React | ^0.468.0 | Icons |
| TypeScript | ^5.7.2 | Type safety |

---

## 📁 Project Structure

```
hood-mario-gta-zet/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main game component + HUD
│   └── globals.css         # Global styles + Tailwind
├── components/
│   ├── GameScene.tsx        # Three.js Canvas wrapper
│   ├── TerrainPlanet.tsx    # Procedural planet terrain
│   ├── CharacterController.tsx # Physics + WASD controls
│   ├── Character.tsx        # Hood-style character model
│   ├── GameCamera.tsx       # 4 camera modes
│   ├── Collectibles.tsx     # Coins & stars system
│   ├── PlanetInfo.tsx       # Zone info panel
│   ├── ZoneSelector.tsx     # Zone selection UI
│   ├── ViewModeSelector.tsx # Camera mode UI
│   ├── Loader.tsx           # Loading screen
│   └── ui/
│       ├── card.tsx         # Card component
│       ├── badge.tsx        # Badge component
│       ├── toast.tsx        # Toast primitives
│       └── toaster.tsx      # Toast container
├── hooks/
│   └── use-toast.ts         # Toast notification system
├── lib/
│   └── utils.ts             # cn() utility
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── postcss.config.mjs
```

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| W / A / S / D | Move character |
| Space | Jump |
| Mouse | Look around (click canvas to lock) |
| Scroll | Zoom (Orbit mode) |

---

## 📜 License

MIT – feel free to fork and build upon this project!

