# Ethereal Liquid Motion Portfolio

An avant-garde, high-performance digital portfolio engineered at the intersection of high-concurrency distributed systems and real-time WebGL motion graphics. Built with React 19, TypeScript, Tailwind CSS v4, custom GLSL shaders, and native Web Audio API procedural synthesis.

---

## Architecture & Core Capabilities

- **Real-Time WebGL Fluid Shader**: Custom fragment shader computing Navier-Stokes viscous wave propagation with interactive cursor impulses, multi-octave Simplex noise, and spectral chromatic aberration ($\Delta(R,G,B)$) in real time.
- **5 Chromatic Liquid Presets**:
  - `Ethereal Prism`: Holographic oil-slick and thin-film interference spectrum.
  - `Neon Cyber`: High-contrast cyan and electric violet laser wave dynamics.
  - `Molten Chrome`: Highly reflective liquid mercury with dynamic specular highlights.
  - `Aurora Borealis`: Ethereal emerald and deep violet magnetic storm simulation.
  - `Opal Pearl`: High-key iridescent pastel dispersion.
- **Fluid Ripple Image Displacement**: Dynamic canvas slice-displacement shader on project preview cards producing viscous surface ripples upon user interaction.
- **Kinetic Trailing Cursor**: Velocity-interpolated (Lerp) spring-physics cursor with chromatic fluid glow and contextual micro-labels (`VIEW`, `EXPLORE`, `PLAY`, `TOP`, `DISPATCH`).
- **Interactive Procedural Audio Engine**: Lightweight Web Audio API synthesizer generating soft harmonic sine and triangle chimes on user interactions without external audio assets.
- **Kinetic Neural Skill Galaxy**: Interactive canvas force-directed graph where skill nodes float with spring tension and repel dynamically on pointer proximity.
- **Liquid Physics Laboratory**: Real-time experimental sandbox featuring live parameters for fluid viscosity, flow velocity, and turbulence, complete with direct canvas PNG snapshot export.
- **Encrypted Contact Terminal**: Glassmorphic terminal interface with custom engagement focus selectors, field validation, and celebratory holographic confetti orchestration.

---

## Tech Stack

| Domain | Technologies |
|---|---|
| **Core Architecture** | React 19, TypeScript, React Router DOM v7, Vite 8 |
| **Graphics & Shaders** | WebGL (GLSL ES 3.0), Three.js, Canvas 2D, Framer Motion |
| **Styling & Design** | Tailwind CSS v4, Custom Glassmorphism, Syne & Space Grotesk Typography |
| **Audio Synthesis** | Native Web Audio API (Procedural Oscillator Harmonics) |
| **Performance** | Off-main-thread compute, 60 FPS GPU frame pacing, WCAG AAA compliance |

---

## System Structure

```
liquid-portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── effects/        # WebGL Liquid Canvas, Fluid Distortion, Custom Cursor
│   │   ├── layout/         # Glass Navbar, Editorial Footer
│   │   └── projects/       # Architectural Case Study Modal
│   ├── data/               # Project archives, skills taxonomy, metrics
│   ├── pages/              # Home, Projects, About, Lab, Contact
│   ├── types/              # TypeScript interfaces & declarations
│   ├── utils/              # Procedural audio synthesis engine
│   ├── App.tsx             # Multi-page routing & layout transitions
│   ├── index.css           # Iridescent utilities & base styles
│   └── main.tsx            # Application entry point
├── index.html              # Typography preconnects & root layout
└── vite.config.ts          # Tailwind v4 & Vite build pipeline
```
