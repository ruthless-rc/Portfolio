import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Zap, Layers, BarChart3 } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B1120]/80 backdrop-blur-xl -z-10"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl glass-card rounded-3xl border border-white/15 overflow-hidden shadow-2xl bg-[#0F172A]/95 my-auto"
        >
          {/* Header Image / Cover */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-slate-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-slate-300 hover:text-white transition-all backdrop-blur-md shadow-lg"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Category Badge inside Header */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-2">
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Extended Description */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Overview</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Key Metrics Pill */}
            {project.metrics && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/25">
                <BarChart3 className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="text-xs sm:text-sm font-medium text-blue-200">
                  <span className="font-bold text-white">Impact Highlight: </span>
                  {project.metrics}
                </div>
              </div>
            )}

            {/* Key Features List */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Capabilities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800/80 text-purple-300 border border-purple-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl glass-pill hover:bg-white/10 text-slate-200 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>View Source</span>
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Project</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
