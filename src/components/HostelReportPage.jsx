import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Layers, 
  Zap, 
  Users, 
  BarChart3, 
  BookOpen, 
  Sparkles,
  Smartphone,
  Globe,
  Lock,
  Server
} from 'lucide-react';

export default function HostelReportPage({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const liveUrl = "https://hostel-management-app-nu.vercel.app/login";
  const githubUrl = "https://github.com";

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Background Ambient Glow & Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      {/* Sticky Top Bar Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/80 border-b border-zinc-800/80 px-4 sm:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Back to Portfolio Button */}
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-300" />
            <span>Back to Portfolio</span>
          </button>

          {/* Quick Action Link Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub Source</span>
              <span className="sm:hidden">GitHub</span>
            </a>

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm shadow-xl shadow-white/10 transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-black" />
              <span>Launch Live Portal ↗</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* HERO HEADER SECTION */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" /> Native Android & Web App
            </span>
            <span className="px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Enterprise MVVM System
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Thread-Safe Architecture
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-tight">
            Hostel Operations & <span className="text-gradient-primary">Management System</span>
          </h1>

          <p className="text-zinc-300 text-base sm:text-xl leading-relaxed max-w-4xl">
            An end-to-end institutional platform engineered to eliminate paper register bottlenecks, prevent bed double-bookings, enforce gender-partitioned room visibility, and deliver real-time occupancy analytics across mobile & web environments.
          </p>

          {/* Hero Banner Cover Card */}
          <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 aspect-[21/9] sm:aspect-[24/9]">
            <img
              src="/hostel.png"
              alt="Hostel Operations Management System Preview"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 bg-zinc-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-zinc-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white">Live System Deployed</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm shadow-xl backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-black" />
                  <span>Live App URL ↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK STATS & METRICS GRID */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-zinc-800 bg-zinc-950/90">
            <div className="text-xs text-zinc-400 font-medium">Response Latency</div>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">&lt; 1.0s</div>
            <div className="text-[11px] text-zinc-400 mt-1">Instant bed reservation</div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-zinc-800 bg-zinc-950/90">
            <div className="text-xs text-zinc-400 font-medium">Target SDK</div>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">SDK 36</div>
            <div className="text-[11px] text-zinc-400 mt-1">Android 14 / Min SDK 24</div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-zinc-800 bg-zinc-950/90">
            <div className="text-xs text-zinc-400 font-medium">Database Engine</div>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">Room DB</div>
            <div className="text-[11px] text-zinc-400 mt-1">SQLite Thread-Safe DAO</div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-zinc-800 bg-zinc-950/90">
            <div className="text-xs text-zinc-400 font-medium">Architecture</div>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">MVVM</div>
            <div className="text-[11px] text-zinc-400 mt-1">Repository + Coroutines</div>
          </div>
        </section>

        {/* SECTION 1: EXECUTIVE SUMMARY & PROBLEM STATEMENT */}
        <section className="space-y-6 glass-card p-8 rounded-3xl border border-zinc-800 bg-zinc-950/90">
          <div className="flex items-center gap-3 text-white border-b border-zinc-800 pb-4">
            <BookOpen className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-extrabold font-display">1. Executive Summary & Problem Statement</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm leading-relaxed text-zinc-300">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                The Operational Bottleneck
              </h3>
              <p>
                Managing student hostels in educational institutions manually using paper registers leads to widespread room allocation errors, double bookings, lack of real-time occupancy metrics, and zero administrative visibility across Male and Female wings.
              </p>
              <p>
                Students face long delays during admission, manual paperwork registration, and risk being allocated inappropriate wings or full rooms due to non-atomic inventory tracking.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                The Engineered Solution
              </h3>
              <p>
                The Hostel Operations & Management System provides a synchronized, role-based platform designed with clean MVVM architecture. It isolates Student self-service from Administrative governance.
              </p>
              <p>
                By automating gender-filtered room discovery, dynamic inventory analytics, and thread-safe bed decrement operations, the system guarantees 100% data integrity and instant bed reservation feedback.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: SYSTEM ARCHITECTURE & TECH SPECS */}
        <section className="space-y-6 glass-card p-8 rounded-3xl border border-zinc-800 bg-zinc-950/90">
          <div className="flex items-center gap-3 text-white border-b border-zinc-800 pb-4">
            <Layers className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-extrabold font-display">2. System Architecture & Component Design</h2>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            The platform follows Google’s recommended MVVM (Model-View-ViewModel) + Repository architecture pattern to maintain strict separation of concerns, offload database IO from main threads, and ensure reactive UI state binding.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Smartphone className="w-4 h-4 text-blue-400" /> View Layer (UI)
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                LoginActivity, RegisterActivity, AdminDashboardActivity, StudentDashboardActivity built with clean Android ViewBinding.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Cpu className="w-4 h-4 text-purple-400" /> ViewModel & Coroutines
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                HostelViewModel exposes LiveData state observers and executes async queries using Kotlin Coroutines on Dispatchers.IO.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Database className="w-4 h-4 text-emerald-400" /> Room DB & SQLite
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                AppDatabase SQLite engine executing thread-safe UserDao & RoomDao queries for atomic state persistence.
              </p>
            </div>
          </div>

          {/* Tech Specs Matrix Table */}
          <div className="pt-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">Technical Stack Specifications</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-500 block">Language</span>
                <span className="text-white font-bold mt-0.5 block">Kotlin 1.9+ / Java</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-500 block">Android SDK</span>
                <span className="text-white font-bold mt-0.5 block">Target 36 (Min 24)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-500 block">ORM Persistence</span>
                <span className="text-white font-bold mt-0.5 block">Jetpack Room DB</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-500 block">Web Deployment</span>
                <span className="text-white font-bold mt-0.5 block">Vercel Cloud Platform</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: KEY CAPABILITIES & MODULE WORKFLOWS */}
        <section className="space-y-6 glass-card p-8 rounded-3xl border border-zinc-800 bg-zinc-950/90">
          <div className="flex items-center gap-3 text-white border-b border-zinc-800 pb-4">
            <Zap className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-extrabold font-display">3. Core Features & Module Workflows</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Role-Based Access Governance</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Strict separation between Administrator and Student credentials. Admin accounts gain permission to add/update room capacities, adjust bed allocations, and monitor real-time occupancy statistics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Gender-Segregated Allocation Filter</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Automated database visibility filtering ensures male students only view and reserve available beds in Male rooms, and female students strictly interact with Female wing inventory.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Real-Time Inventory Analytics</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Dynamic occupancy metrics computation engine (`Occupied Beds = Total Beds - Available Beds`). Dynamic color badges indicate high, low, or exhausted room capacity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Atomic Bed Reservation Mechanism</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Thread-safe SQL transactions atomically decrement available bed counts upon instant student reservation, preventing race conditions or double bookings under heavy concurrent access.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM ACTION CTA BAR */}
        <section className="glass-card p-8 rounded-3xl border border-zinc-700 bg-zinc-950 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-300 bg-zinc-900 px-3.5 py-1.5 rounded-full border border-zinc-800 inline-block">
              Live Interactive Demonstration
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Experience the Live Hostel Ease System
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Access the deployed web portal, explore student self-service bed booking, or review the complete open-source codebase on GitHub.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onBack}
              className="px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-zinc-300" />
              <span>Back to Portfolio</span>
            </button>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Source Code</span>
            </a>

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm shadow-xl shadow-white/10 hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-black" />
              <span>Launch Live Website ↗</span>
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
