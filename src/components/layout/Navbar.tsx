import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Terminal } from 'lucide-react';
import { InteractiveAudioToggle } from '../effects/InteractiveAudioToggle';
import { sound } from '../../utils/audio';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About & Skills', path: '/about' },
  { name: 'Liquid Lab', path: '/lab', badge: 'FX' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    sound.playHarmonicChime(580, 0.15);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-40 px-4 md:px-8 max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand logo */}
        <NavLink
          to="/"
          onClick={handleLinkClick}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-white/10 hover:border-purple-500/40 transition-all duration-300"
          data-cursor="HOME"
        >
          <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center p-[1px] group-hover:rotate-180 transition-transform duration-700">
            <div className="w-full h-full bg-[#07070e] rounded-full flex items-center justify-center">
              <span className="text-[10px] font-mono font-bold text-white tracking-tighter">AV</span>
            </div>
          </div>
          <span className="font-syne font-bold tracking-tight text-sm text-white group-hover:text-iridescent transition-all">
            AURA VANCE
          </span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full glass-panel border border-white/10 shadow-2xl backdrop-blur-xl">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleLinkClick}
                onMouseEnter={() => sound.playHover(420)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-100'
                }`}
                data-cursor="GOTO"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 via-cyan-500/20 to-pink-500/30 border border-white/20 shadow-inner"
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
                {link.badge && (
                  <span className="relative z-10 text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <InteractiveAudioToggle />

          {/* Quick Terminal / Connect CTA */}
          <NavLink
            to="/contact"
            onClick={handleLinkClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-lg shadow-purple-900/30 border border-white/20 transition-all hover:scale-105 active:scale-95"
            data-cursor="TALK"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET'S TALK</span>
          </NavLink>

          {/* Mobile menu burger */}
          <button
            onClick={() => {
              sound.playHover(520);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-full glass-panel border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 pt-24 px-6 bg-[#06060c]/95 backdrop-blur-2xl md:hidden flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-3">
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" /> NAVIGATION_INDEX
              </div>
              {NAV_LINKS.map((link, idx) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-4 rounded-2xl border transition-all text-lg font-syne font-semibold ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-950/60 to-cyan-950/40 border-purple-500/40 text-white'
                        : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-cyan-400">0{idx + 1}</span>
                </NavLink>
              ))}
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-white/10 text-xs font-mono text-slate-400 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span>SYSTEM STATUS:</span>
                <span className="text-emerald-400">ONLINE 99.999%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>LATENCY:</span>
                <span className="text-cyan-400">&lt; 42MS EDGE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
