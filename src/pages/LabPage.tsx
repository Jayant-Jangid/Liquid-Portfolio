import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Sliders,
  Camera,
  RotateCcw,
  Terminal,
  Atom,
  Flame,
} from 'lucide-react';
import { LiquidShaderCanvas } from '../components/effects/LiquidShaderCanvas';
import type { LiquidColorPreset } from '../components/effects/LiquidShaderCanvas';
import { sound } from '../utils/audio';

export const LabPage: React.FC = () => {
  const [preset, setPreset] = useState<LiquidColorPreset>('iridescent');
  const [viscosity, setViscosity] = useState<number>(0.9);
  const [speed, setSpeed] = useState<number>(0.9);
  const [turbulence, setTurbulence] = useState<number>(1.3);
  const [activeSubTab, setActiveSubTab] = useState<'sandbox' | 'magnetic' | 'metaballs'>('sandbox');

  const containerRef = useRef<HTMLDivElement | null>(null);

  const presetsList: { id: LiquidColorPreset; label: string; icon: string; desc: string }[] = [
    { id: 'iridescent', label: 'Ethereal Prism', icon: '🌈', desc: 'Holographic oil-slick and thin-film interference' },
    { id: 'cyber', label: 'Neon Cyber', icon: '⚡', desc: 'Electric cyan and violet plasma wave' },
    { id: 'mercury', label: 'Molten Chrome', icon: '🪞', desc: 'Reflective liquid metal and mercury flow' },
    { id: 'aurora', label: 'Aurora Borealis', icon: '🌌', desc: 'Cosmic emerald and deep violet magnetic storm' },
    { id: 'opal', label: 'Opal Pearl', icon: '🦪', desc: 'Luxury high-key iridescent pastel shimmer' },
  ];

  const handlePresetChange = (p: LiquidColorPreset) => {
    sound.playLiquidRipple();
    setPreset(p);
  };

  const handleReset = () => {
    sound.playHover(400);
    setViscosity(0.9);
    setSpeed(0.9);
    setTurbulence(1.3);
    setPreset('iridescent');
  };

  const handleSnapshot = () => {
    sound.playSuccessCelebration();
    const canvas = containerRef.current?.querySelector('canvas');
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `iridescent-liquid-${preset}-${Date.now()}.png`;
      a.click();
    }
  };

  // Magnetic kinetic words
  const magneticWords = ['HIGH-SCALE', 'DISTRIBUTED', 'IRIDESCENT', 'SUB-42MS', 'GLSL_SHADERS', 'ZERO-JANK'];

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
          <Terminal className="w-4 h-4" /> EXPERIMENTAL_LABORATORY // SHADER_STUDIO_V3
        </div>
        <h1 className="font-syne text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Liquid Graphics & <span className="text-iridescent">Motion Lab</span>
        </h1>
        <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base font-sans leading-relaxed">
          An interactive laboratory demonstrating real-time WebGL fluid dynamics, Navier-Stokes viscosity calculations, chromatic dispersion, and spring physics.
        </p>
      </div>

      {/* Lab Sub-navigation */}
      <div className="flex items-center gap-2 p-1.5 rounded-full glass-panel border border-white/10 mb-8 max-w-md">
        <button
          onClick={() => {
            sound.playHover(420);
            setActiveSubTab('sandbox');
          }}
          className={`flex-1 py-2 rounded-full text-xs font-mono transition-all ${
            activeSubTab === 'sandbox'
              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Fluid Shader Deck
        </button>
        <button
          onClick={() => {
            sound.playHover(460);
            setActiveSubTab('magnetic');
          }}
          className={`flex-1 py-2 rounded-full text-xs font-mono transition-all ${
            activeSubTab === 'magnetic'
              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Kinetic Typography
        </button>
        <button
          onClick={() => {
            sound.playHover(500);
            setActiveSubTab('metaballs');
          }}
          className={`flex-1 py-2 rounded-full text-xs font-mono transition-all ${
            activeSubTab === 'metaballs'
              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Gooey Metaballs
        </button>
      </div>

      {/* Main Sandbox Tab */}
      {activeSubTab === 'sandbox' && (
        <div className="space-y-6">
          {/* Main Visualizer Stage */}
          <div
            ref={containerRef}
            className="relative h-[520px] w-full rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl"
          >
            {/* The active WebGL Shader Canvas */}
            <LiquidShaderCanvas
              preset={preset}
              viscosity={viscosity}
              speed={speed}
              turbulence={turbulence}
              interactive={true}
            />

            {/* Floating Top Telemetry Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>INTERACTIVE_FLUID: DRAG_OR_MOVE_POINTER</span>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={handleSnapshot}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-white hover:bg-white/20 transition-all hover:scale-105"
                  title="Capture Snapshot of Canvas"
                  data-cursor="CAPTURE"
                >
                  <Camera className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">SNAPSHOT</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-slate-300 hover:text-white transition-all hover:rotate-180"
                  title="Reset Parameters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom floating helper tip */}
            <div className="absolute bottom-4 left-4 pointer-events-none text-[11px] font-mono text-slate-400 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              PHYSICS: NAVIER-STOKES PRESSURE SOLVER // CHROMATIC OFFSET: Δ(R,G,B)
            </div>
          </div>

          {/* Interactive Control Deck */}
          <div className="grid lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10">
            {/* Preset selector */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> SELECT_CHROMATIC_PRESET
              </div>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {presetsList.map((p) => {
                  const isActive = preset === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handlePresetChange(p.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isActive
                          ? 'bg-purple-950/60 border-purple-500/50 shadow-lg shadow-purple-950/50 text-white'
                          : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-syne font-bold text-sm">
                        <span>{p.icon}</span>
                        <span>{p.label}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans mt-1 line-clamp-1">
                        {p.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono uppercase text-purple-400 tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4" /> FLUID_DYNAMICS_CONTROLS
              </div>

              <div className="space-y-4 p-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-mono">
                {/* Viscosity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>VISCOSITY (DAMPING):</span>
                    <span className="text-cyan-400">{viscosity.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="1.8"
                    step="0.05"
                    value={viscosity}
                    onChange={(e) => setViscosity(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Loose Water</span>
                    <span>Molten Glass</span>
                  </div>
                </div>

                {/* Speed */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>EVOLUTION SPEED:</span>
                    <span className="text-purple-400">{speed.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-purple-400 bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Tranquil Flow</span>
                    <span>Kinetic Torrent</span>
                  </div>
                </div>

                {/* Turbulence */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>TURBULENCE / EDDIES:</span>
                    <span className="text-pink-400">{turbulence.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={turbulence}
                    onChange={(e) => setTurbulence(parseFloat(e.target.value))}
                    className="w-full accent-pink-400 bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Laminar</span>
                    <span>Chaotic Vortices</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Magnetic Kinetic Typography Tab */}
      {activeSubTab === 'magnetic' && (
        <div className="p-8 sm:p-14 rounded-3xl glass-panel border border-white/15 text-center min-h-[460px] flex flex-col justify-center items-center">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <Atom className="w-4 h-4 animate-spin text-cyan-400" /> KINETIC_SPRING_REPULSION_MATRIX
          </div>
          <h2 className="font-syne text-2xl sm:text-4xl font-bold text-white mb-2">
            Magnetic Kinetic Words
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-md mx-auto mb-10">
            Hover over any word to watch it disperse with spring inertia and snap back with buttery dampening physics.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto">
            {magneticWords.map((word, idx) => (
              <motion.div
                key={word}
                whileHover={{
                  scale: 1.15,
                  y: -8,
                  boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => sound.playHover(400 + idx * 50)}
                className="px-6 py-3 rounded-2xl glass-panel border border-white/20 text-white font-syne font-bold text-lg sm:text-2xl cursor-pointer hover:border-cyan-400/60 hover:text-cyan-300 transition-colors shadow-lg"
                data-cursor="REPEL"
              >
                {word}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Gooey Liquid Metaballs Tab */}
      {activeSubTab === 'metaballs' && (
        <div className="p-8 rounded-3xl glass-panel border border-white/15 min-h-[460px] relative overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <Flame className="w-4 h-4 text-purple-400" /> VISCOUS_MERCURY_METABALLS
          </div>
          <h2 className="font-syne text-2xl sm:text-3xl font-bold text-white mb-2">
            Liquid Surface Tension
          </h2>
          <p className="text-xs text-slate-400 font-sans max-w-md mx-auto mb-8">
            SVG Matrix filter calculating gooey fluid coalescence between dynamic drifting nodes.
          </p>

          {/* SVG Gooey Filter Definition */}
          <svg className="hidden">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>

          {/* Interactive Gooey Container */}
          <div
            style={{ filter: 'url(#goo)' }}
            className="relative w-80 h-80 flex items-center justify-center"
          >
            {/* Center anchor ball */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 absolute"
            />
            {/* Orbiting viscous bead 1 */}
            <motion.div
              animate={{
                x: [-60, 60, -60],
                y: [40, -40, 40],
              }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full bg-gradient-to-bl from-purple-500 to-cyan-400 absolute"
            />
            {/* Orbiting viscous bead 2 */}
            <motion.div
              animate={{
                x: [50, -50, 50],
                y: [-50, 50, -50],
              }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 absolute"
            />
          </div>
        </div>
      )}
    </div>
  );
};
