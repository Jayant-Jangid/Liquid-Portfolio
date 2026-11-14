import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUpRight, ArrowUp, Activity, Terminal, ShieldCheck, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

export const Footer: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playLiquidRipple();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#040409]/90 backdrop-blur-2xl text-slate-400 overflow-hidden">
      {/* Subtle iridescent glow blur in background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Top bar with giant editorial signature */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
              <Terminal className="w-3.5 h-3.5" /> ARCHITECTURAL ENGINEERING PORTFOLIO
            </div>
            <h2 className="font-syne text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
              AURA <span className="text-iridescent">VANCE</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-md font-sans leading-relaxed">
              Merging distributed system resilience with ethereal WebGL fluid graphics and cinematic micro-interactions.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* Live Timezone card */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">SF_TIME (PST)</div>
                <div className="text-sm font-mono font-semibold text-white tracking-widest">{timeStr || '12:00:00'}</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">LATENCY_SLA</div>
                <div className="text-sm font-mono font-semibold text-cyan-400">&lt; 42ms P99</div>
              </div>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="self-start md:self-end flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-purple-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
              data-cursor="TOP"
            >
              <span>RETURN_TO_ORBIT</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 border-b border-white/5 text-xs font-mono">
          <div>
            <div className="text-slate-200 font-semibold mb-3 tracking-wider uppercase flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-cyan-400" /> NAVIGATION
            </div>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="hover:text-cyan-400 transition-colors">/home</NavLink>
              </li>
              <li>
                <NavLink to="/projects" className="hover:text-cyan-400 transition-colors">/projects</NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-cyan-400 transition-colors">/about-skills</NavLink>
              </li>
              <li>
                <NavLink to="/lab" className="hover:text-cyan-400 transition-colors text-purple-400 font-semibold">/liquid-lab (FX)</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-cyan-400 transition-colors">/contact</NavLink>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-slate-200 font-semibold mb-3 tracking-wider uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-purple-400" /> SPECIALIZATIONS
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>High-Concurrency Web Systems</li>
              <li>WebGL & Custom GLSL Shaders</li>
              <li>Distributed Kafka / Go Pipelines</li>
              <li>WebGPU / Spatial Canvas</li>
              <li>Micro-Frontend Architecture</li>
            </ul>
          </div>

          <div>
            <div className="text-slate-200 font-semibold mb-3 tracking-wider uppercase">CONNECT</div>
            <ul className="space-y-2">
              <li>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                >
                  GitHub <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                >
                  LinkedIn <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                >
                  X (Twitter) <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                >
                  Direct Email <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-slate-200 font-semibold mb-3 tracking-wider uppercase">METRICS</div>
            <div className="space-y-2 text-slate-400">
              <div className="flex justify-between">
                <span>FPS_TARGET:</span>
                <span className="text-cyan-400 font-semibold">60.00</span>
              </div>
              <div className="flex justify-between">
                <span>SHADERS:</span>
                <span className="text-purple-400">GLSL 100/300 ES</span>
              </div>
              <div className="flex justify-between">
                <span>ACCESSIBILITY:</span>
                <span className="text-emerald-400">WCAG AAA</span>
              </div>
              <div className="flex justify-between">
                <span>SECURITY:</span>
                <span className="text-cyan-300">TLS 1.3 / E2EE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            Engineered with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 mx-0.5" /> using React 19, Three.js & GLSL.
          </div>
        </div>
      </div>
    </footer>
  );
};
