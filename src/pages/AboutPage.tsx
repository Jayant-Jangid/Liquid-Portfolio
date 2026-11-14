import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  Download,
  Calendar,
  CheckCircle2,
  Cpu,
  FileText,
} from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES, TIMELINE } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const AboutPage: React.FC = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState(SKILL_CATEGORIES[0].id);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentCategory = SKILL_CATEGORIES.find((c) => c.id === activeSkillCategory) || SKILL_CATEGORIES[0];

  // Interactive Kinetic Skill Node Galaxy Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const skills = currentCategory.skills;
    const nodes = skills.map((s, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const radius = Math.min(rect.width, rect.height) * 0.32;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      return {
        name: s.name,
        level: s.level,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        baseX: cx + Math.cos(angle) * radius,
        baseY: cy + Math.sin(angle) * radius,
        radius: 6 + (s.level / 100) * 8,
        color: s.highlight ? '#06b6d4' : '#8b5cf6',
      };
    });

    let mouseX = -100;
    let mouseY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      const crect = canvas.getBoundingClientRect();
      mouseX = e.clientX - crect.left;
      mouseY = e.clientY - crect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw connective web
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      nodes.forEach((node) => {
        // Subtle organic float towards base
        node.x += (node.baseX - node.x) * 0.05 + node.vx;
        node.y += (node.baseY - node.y) * 0.05 + node.vy;

        // Mouse repel interaction
        const mdx = node.x - mouseX;
        const mdy = node.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 100) {
          const force = (100 - mdist) * 0.08;
          node.x += (mdx / mdist) * force;
          node.y += (mdy / mdist) * force;
        }

        // Draw node glow
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2.2);
        grad.addColorStop(0, node.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Draw node core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '11px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + node.radius + 14);

        // Level
        ctx.fillStyle = '#06b6d4';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText(`${node.level}%`, node.x, node.y + node.radius + 25);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentCategory]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-hidden">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0c0c16] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-slate-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-syne text-2xl font-bold text-white">Curriculum Vitae</h3>
                <p className="text-xs font-mono text-cyan-400">STAFF_ARCHITECT // AURA_VANCE.PDF</p>
              </div>
              <button
                onClick={() => setShowResumeModal(false)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>IDENTITY:</span>
                <span className="text-white font-bold">{PERSONAL_INFO.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CURRENT ROLE:</span>
                <span className="text-cyan-400">Staff Full-Stack & Systems Architect</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>TOTAL EXPERIENCE:</span>
                <span className="text-purple-400">9+ Years Enterprise Production</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>LOCATION:</span>
                <span className="text-white">{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Full architectural dossier includes detailed patents, Kafka clustering blueprints, WebGPU shader papers, and verified performance benchmarks across 14M+ active creators.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playHover(420);
                  setShowResumeModal(false);
                }}
                className="px-5 py-2 rounded-xl glass-panel text-xs font-mono text-slate-400 hover:text-white"
              >
                CLOSE
              </button>
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  sound.playSuccessCelebration();
                  alert("Dossier transmission simulated! In production, this delivers Aura Vance's high-res PDF dossier.");
                  setShowResumeModal(false);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-lg"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD COMPLETE DOSSIER</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Bio Section */}
      <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Terminal className="w-4 h-4" /> BIOGRAPHICAL_DOSSIER // THE PHILOSOPHY
          </div>
          <h1 className="font-syne text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
            Bridging <span className="text-iridescent">Distributed Rigor</span> with Visceral Aesthetics.
          </h1>
          <p className="text-base text-slate-300 font-sans leading-relaxed">
            I am a Senior Full-Stack & Creative Systems Architect with over 9 years of experience engineering high-throughput microservices, WebGL/WebGPU visual experiences, and mission-critical cloud pipelines.
          </p>
          <p className="text-sm text-slate-400 font-sans leading-relaxed">
            My engineering philosophy centers on the belief that large-scale enterprise platforms need not be aesthetically sterile. By pairing zero-allocation Go/Rust ingestion services with custom GLSL shaders and tokenized design systems, I build software that performs with sub-millisecond precision while mesmerizing users.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                sound.playHarmonicChime(540, 0.2);
                setShowResumeModal(true);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-xl shadow-purple-950/40 transition-all hover:scale-105 active:scale-95"
              data-cursor="DOSSIER"
            >
              <FileText className="w-4 h-4" />
              <span>VIEW ARCHITECTURAL CV</span>
            </button>
            <div className="px-4 py-2 rounded-full glass-panel border border-white/10 text-xs font-mono text-slate-400">
              EXP: <span className="text-cyan-400 font-semibold">{PERSONAL_INFO.experienceYears}</span>
            </div>
          </div>
        </div>

        {/* Holographic Portrait Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-sm rounded-3xl glass-panel p-3 border border-white/20 shadow-2xl overflow-hidden group">
            {/* Iridescent shimmer border */}
            <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                alt="Aura Vance"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090912] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/20 to-pink-500/10 mix-blend-color" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel border border-white/10">
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  PRINCIPAL_ENGINEER
                </div>
                <div className="font-syne font-bold text-white text-base">Aura Vance</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">San Francisco, CA</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 3D Kinetic Skill Galaxy */}
      <section className="my-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">
              <Cpu className="w-4 h-4" /> INTERACTIVE_NEURAL_CAPABILITIES
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white">
              Kinetic <span className="text-iridescent">Skill Galaxy</span>
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            HOVER_ORBS_TO_INTERACT // GRAVITY_PHYSICS_ENABLED
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playHover(460);
                setActiveSkillCategory(cat.id);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-300 ${
                activeSkillCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-900/30'
                  : 'glass-panel text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Interactive Galaxy Canvas + Detail Cards */}
        <div className="grid lg:grid-cols-12 gap-8 items-center glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          {/* Canvas visualization */}
          <div className="lg:col-span-7 h-80 sm:h-96 w-full rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full block" />
            <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-500">
              TOPOLOGY // {currentCategory.name.toUpperCase()}
            </div>
          </div>

          {/* Skill detail breakdown */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <h3 className="font-syne text-xl font-bold text-white">
                {currentCategory.name}
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                {currentCategory.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {currentCategory.skills.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-200 font-medium">{skill.name}</span>
                    <span className="text-cyan-400">{skill.experience} • {skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        skill.highlight
                          ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                          : 'bg-purple-500/70'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="my-24">
        <div className="max-w-xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <Calendar className="w-4 h-4" /> CHRONOLOGICAL_MILESTONES
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white">
            Career & <span className="text-iridescent">Architectural Journey</span>
          </h2>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-cyan-500 before:to-transparent">
          {TIMELINE.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-12 sm:pl-20"
            >
              {/* Dot */}
              <div className="absolute left-2.5 sm:left-6.5 top-2 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_12px_#38bdf8] border-2 border-black" />

              <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 hover:border-purple-500/30 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {item.year}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {item.period}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {item.location}
                  </span>
                </div>

                <h3 className="font-syne text-xl sm:text-2xl font-bold text-white mt-1">
                  {item.role}
                </h3>
                <div className="text-sm font-mono text-cyan-400 font-medium">
                  {item.company}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-sans mt-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 space-y-2">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-400 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
