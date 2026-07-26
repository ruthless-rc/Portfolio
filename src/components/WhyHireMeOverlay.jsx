import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Briefcase, 
  Sparkles, 
  Zap, 
  Users, 
  GraduationCap, 
  Code2, 
  Smartphone, 
  BrainCircuit, 
  Play, 
  ChevronRight,
  X,
  CheckCircle2
} from 'lucide-react';

export default function WhyHireMeOverlay({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="absolute inset-0 z-30 rounded-3xl bg-zinc-950/95 backdrop-blur-xl border border-zinc-700 p-4 sm:p-5 shadow-2xl flex flex-col justify-between overflow-hidden text-white select-none"
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-300">
              Why Hire Rishi?
            </span>
          </div>

          {onClose && (
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="p-1 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Headline Keywords */}
        <div className="mt-2.5">
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-extrabold bg-white text-black px-2 py-0.5 rounded-md">
              B.E. CSE (2023–27)
            </span>
            <span className="text-[10px] font-bold bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded-md border border-zinc-700">
              Android & Web
            </span>
            <span className="text-[10px] font-bold bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded-md border border-zinc-700">
              IoT & AI
            </span>
          </div>
        </div>

        {/* Section 1: Work Done (Projects Keywords) */}
        <div className="mt-3 space-y-1.5">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-white" /> Work Done & Projects
          </div>

          <div className="space-y-1">
            <div className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between text-[10.5px]">
              <span className="font-bold text-white flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400 shrink-0" /> Fire Hazard System
              </span>
              <span className="text-[9.5px] text-zinc-400 font-medium">IoT • &lt;1s Alert</span>
            </div>

            <div className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between text-[10.5px]">
              <span className="font-bold text-white flex items-center gap-1">
                <Code2 className="w-3 h-3 text-blue-400 shrink-0" /> Career Setu App
              </span>
              <span className="text-[9.5px] text-zinc-400 font-medium">Maps API • Roadmaps</span>
            </div>

            <div className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between text-[10.5px]">
              <span className="font-bold text-white flex items-center gap-1">
                <BrainCircuit className="w-3 h-3 text-purple-400 shrink-0" /> AI Assistant Engine
              </span>
              <span className="text-[9.5px] text-zinc-400 font-medium">LLM Prompts • Automation</span>
            </div>
          </div>
        </div>

        {/* Section 2: Certifications Keywords */}
        <div className="mt-3 space-y-1.5">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
            <Award className="w-3 h-3 text-white" /> Certifications & Credentials
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <div className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px]">
              <div className="font-bold text-white flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-emerald-400 shrink-0" /> Android Dev
              </div>
              <div className="text-[9px] text-zinc-400">Java / Studio / UI</div>
            </div>

            <div className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px]">
              <div className="font-bold text-white flex items-center gap-1">
                <BrainCircuit className="w-3 h-3 text-cyan-400 shrink-0" /> Prompt Eng.
              </div>
              <div className="text-[9px] text-zinc-400">LLMs & Agents</div>
            </div>

            <div className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px]">
              <div className="font-bold text-white flex items-center gap-1">
                <Play className="w-3 h-3 text-red-400 shrink-0" /> Play Console
              </div>
              <div className="text-[9px] text-zinc-400">Google Certified</div>
            </div>

            <div className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px]">
              <div className="font-bold text-white flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-indigo-400 shrink-0" /> 1-Mo Mentorship
              </div>
              <div className="text-[9px] text-zinc-400">Android Intensive</div>
            </div>
          </div>
        </div>

        {/* Section 3: Leadership Keywords */}
        <div className="mt-3 space-y-1.5">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
            <Users className="w-3 h-3 text-white" /> Leadership & Operations
          </div>

          <div className="flex flex-wrap gap-1">
            <span className="text-[9.5px] font-semibold bg-zinc-900 text-zinc-200 px-2 py-0.5 rounded-md border border-zinc-800">
              🏆 Robotics Club President
            </span>
            <span className="text-[9.5px] font-semibold bg-zinc-900 text-zinc-200 px-2 py-0.5 rounded-md border border-zinc-800">
              ⚡ Lead 40-50 Volunteers
            </span>
            <span className="text-[9.5px] font-semibold bg-zinc-900 text-zinc-200 px-2 py-0.5 rounded-md border border-zinc-800">
              🚀 AI Hackathon Convener
            </span>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="pt-2.5 border-t border-zinc-800 flex items-center justify-between">
        <span className="text-[9.5px] text-zinc-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-white" /> High Impact
        </span>
        <a
          href="#contact"
          onClick={(e) => { if (onClose) onClose(); }}
          className="px-2.5 py-1 rounded-lg bg-white text-black hover:bg-zinc-200 text-[10px] font-extrabold transition-all flex items-center gap-1 shadow"
        >
          <span>Get in Touch</span>
          <ChevronRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}
