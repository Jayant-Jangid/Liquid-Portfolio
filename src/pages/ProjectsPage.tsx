import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List, Terminal, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types/portfolio';
import { FluidDistortionImage } from '../components/effects/FluidDistortionImage';
import { ProjectDetailModal } from '../components/projects/ProjectDetailModal';
import { sound } from '../utils/audio';

const CATEGORIES = [
  { id: 'all', label: 'All Deployments' },
  { id: 'fullstack', label: 'Full-Stack Architecture' },
  { id: 'webgl', label: 'WebGL & Graphics' },
  { id: 'distributed', label: 'Distributed Systems' },
  { id: 'design-eng', label: 'Design Engineering' },
];

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Modal View */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
          <Terminal className="w-4 h-4" /> REPOSITORY_REGISTRY // ARCHITECTURAL ARCHIVES
        </div>
        <h1 className="font-syne text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Systems & <span className="text-iridescent">Deployments</span>
        </h1>
        <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base font-sans leading-relaxed">
          A curated archive of mission-critical full-stack architectures, high-throughput distributed engines, and GPU-accelerated WebGL shader systems.
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl glass-panel border border-white/10 mb-10 shadow-xl">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playHover(480);
                  setActiveCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & Layout Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-grow md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search stack, Kafka, Wasm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
          </div>

          <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
            <button
              onClick={() => {
                sound.playHover(420);
                setViewMode('grid');
              }}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.playHover(420);
                setViewMode('list');
              }}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-24 glass-panel rounded-3xl border border-white/10">
          <div className="text-slate-400 font-mono text-sm">NO_MATCHING_ARCHITECTURAL_DEPLOYMENTS_FOUND</div>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-full bg-white/10 text-xs font-mono text-cyan-300 hover:bg-white/20 transition-all"
          >
            RESET FILTERS
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => {
                  sound.playHarmonicChime(620, 0.2);
                  setSelectedProject(project);
                }}
                className="group cursor-pointer rounded-3xl glass-panel border border-white/10 hover:border-purple-500/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl"
                data-cursor="INSPECT"
              >
                {/* Image preview with liquid wave displacement */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                  <FluidDistortionImage
                    src={project.image}
                    alt={project.title}
                    intensity={1.2}
                  />
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[11px] font-mono bg-black/60 backdrop-blur-md border border-white/20 text-cyan-300">
                    {project.categoryLabel}
                  </div>
                  <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/60 backdrop-blur-md border border-white/20 text-slate-300">
                    {project.year}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-syne text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-slate-300 font-sans mt-3 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-cyan-400">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono pt-1">
                      <span className="text-purple-400 font-semibold">
                        {project.metrics[0].label}: {project.metrics[0].value}
                      </span>
                      <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        DETAILS <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              onClick={() => {
                sound.playHarmonicChime(620, 0.2);
                setSelectedProject(project);
              }}
              className="cursor-pointer p-6 rounded-3xl glass-panel border border-white/10 hover:border-purple-500/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group transition-all"
              data-cursor="INSPECT"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-cyan-400">{project.categoryLabel}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs font-mono text-slate-400">{project.year}</span>
                  </div>
                  <h3 className="font-syne text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans max-w-xl mt-1">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 self-end md:self-center shrink-0">
                <div className="text-right hidden sm:block">
                  <div className="font-mono text-sm font-bold text-purple-300">
                    {project.metrics[0].value}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    {project.metrics[0].label}
                  </div>
                </div>
                <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
