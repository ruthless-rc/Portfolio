import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  personalInfo, 
  heroStats,
  strengths, 
  skillCategories, 
  projects, 
  leadershipExperience, 
  education, 
  certifications, 
  trainingMentorship 
} from './data/portfolioData';
import { translations } from './data/translations';
import SpotlightBackground from './components/SpotlightBackground';
import ProjectModal from './components/ProjectModal';
import WhyHireMeOverlay from './components/WhyHireMeOverlay';
import MultilingualIntro from './components/MultilingualIntro';
import InteractiveAvatar from './components/InteractiveAvatar';
import { 
  Terminal, 
  Code, 
  Cpu, 
  Globe, 
  Database, 
  Sparkles, 
  Zap, 
  Users, 
  Presentation, 
  Award, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  Download, 
  CheckCircle2, 
  Menu, 
  X, 
  ArrowUp, 
  Briefcase, 
  Smartphone, 
  BrainCircuit, 
  Play, 
  FileCode, 
  Coffee, 
  Layout, 
  Code2, 
  Binary, 
  Layers, 
  Monitor, 
  HardDrive, 
  Send, 
  Copy, 
  Check,
  Eye,
  Github,
  Linkedin,
  Instagram,
  Loader2
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const [showIntro, setShowIntro] = useState(true);
  const [portfolioVisible, setPortfolioVisible] = useState(true);
  const [activeNav, setActiveNav] = useState('about');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectCategory, setProjectCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWhyHireMe, setShowWhyHireMe] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };
  
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/rishimadeforindia@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject ? `[Portfolio Direct Message] ${formData.subject}` : `New Portfolio Direct Message from ${formData.name}`,
          message: formData.message,
          _replyto: formData.email,
          _captcha: "false"
        })
      });

      if (response.ok) {
        setFormSubmitted(true);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error("FormSubmit response was not OK");
      }
    } catch (err) {
      console.error("Direct email submission failed:", err);
      // Fallback: Mailto trigger
      const mailtoUrl = `mailto:rishimadeforindia@gmail.com?subject=${encodeURIComponent(formData.subject || 'Direct Message from Portfolio')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderIcon = (iconName, className = "w-5 h-5") => {
    const icons = {
      Zap: <Zap className={className} />,
      Users: <Users className={className} />,
      Presentation: <Presentation className={className} />,
      Sparkles: <Sparkles className={className} />,
      Code: <Code className={className} />,
      Globe: <Globe className={className} />,
      Database: <Database className={className} />,
      FileCode: <FileCode className={className} />,
      Terminal: <Terminal className={className} />,
      Coffee: <Coffee className={className} />,
      Cpu: <Cpu className={className} />,
      Layout: <Layout className={className} />,
      Code2: <Code2 className={className} />,
      Smartphone: <Smartphone className={className} />,
      MapPin: <MapPin className={className} />,
      Binary: <Binary className={className} />,
      Layers: <Layers className={className} />,
      Monitor: <Monitor className={className} />,
      HardDrive: <HardDrive className={className} />,
      BrainCircuit: <BrainCircuit className={className} />,
      Play: <Play className={className} />
    };
    return icons[iconName] || <Sparkles className={className} />;
  };

  const filteredProjects = projectCategory === 'all' 
    ? projects 
    : projects.filter(p => p.shortCategory.toLowerCase() === projectCategory.toLowerCase());

  return (
    <>
      {/* ── Multilingual Intro Overlay ── */}
      {showIntro && (
        <MultilingualIntro onComplete={handleIntroComplete} />
      )}

      {/* ── Main Portfolio ── */}
      <div
        className="min-h-screen bg-black text-zinc-100 relative overflow-x-hidden selection:bg-white selection:text-black"
        style={{
          opacity: portfolioVisible ? 1 : 0,
          transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
      {/* Dynamic Cursor Spotlight & Background Mesh */}
      <SpotlightBackground />

      {/* Interactive AI Companion Avatar (Mouse & Touch Tracking) */}
      <InteractiveAvatar />

      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-2xl' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform shrink-0 border border-zinc-700">
              <AnimatePresence mode="wait">
                {scrolled ? (
                  <motion.div
                    key="rc-logo"
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="w-full h-full bg-white text-black flex items-center justify-center font-black text-lg"
                  >
                    RC
                  </motion.div>
                ) : (
                  <motion.div
                    key="profile-photo"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="w-full h-full relative bg-zinc-900"
                  >
                    <img
                      src={personalInfo.photo}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight block text-white group-hover:text-zinc-300 transition-colors leading-tight">
                Rishi Choudhary
              </span>
              <span className="text-[11px] text-zinc-400 font-medium hidden sm:block">
                {t.subtitle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 glass-pill px-3 py-1.5 rounded-full border border-zinc-800 shadow-inner">
            {[
              { label: t.nav.about, href: '#about' },
              { label: t.nav.strengths, href: '#strengths' },
              { label: t.nav.skills, href: '#skills' },
              { label: t.nav.projects, href: '#projects' },
              { label: t.nav.leadership, href: '#leadership' },
              { label: t.nav.education, href: '#education' },
              { label: t.nav.contact, href: '#contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Quick CTA & Language Switcher */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 transition-all shadow-md cursor-pointer"
              title="Switch Language (English / Hindi)"
            >
              <span className="text-sm">{lang === 'en' ? '🇺🇸' : '🇮🇳'}</span>
              <span>{lang === 'en' ? 'EN' : 'हिंदी'}</span>
            </button>

            <a
              href="#contact"
              className="px-5 py-2.5 text-xs font-bold rounded-2xl bg-white hover:bg-zinc-200 text-black shadow-lg shadow-white/10 hover:scale-105 transition-all"
            >
              {t.getInTouch}
            </a>
          </div>

          {/* Mobile Toggle & Language button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200"
            >
              <span>{lang === 'en' ? '🇺🇸 EN' : '🇮🇳 हिंदी'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-4 pb-6 space-y-2 mt-2"
          >
            {[
              { label: t.nav.about, href: '#about' },
              { label: t.nav.strengths, href: '#strengths' },
              { label: t.nav.skills, href: '#skills' },
              { label: t.nav.projects, href: '#projects' },
              { label: t.nav.leadership, href: '#leadership' },
              { label: t.nav.education, href: '#education' },
              { label: t.nav.contact, href: '#contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="about" className="pt-32 pb-20 md:pt-44 md:pb-32 relative overflow-hidden">
        {/* College Background Image Overlay - Focused on Face & Campus */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/college.png"
            alt="Rishi Choudhary College Background"
            className="w-full h-full object-cover object-top opacity-50 filter blur-[2px] scale-105 transition-all"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/30 to-zinc-950/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Shimmer Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border border-zinc-700 text-zinc-200 text-xs font-semibold shadow-lg">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>{t.badge}</span>
              </div>

              {/* Large Impact Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-white font-display">
                {t.heroTitle1}<span className="text-gradient-primary">{t.heroTitle2}</span>
              </h1>

              <p className="text-lg sm:text-xl font-medium text-zinc-300 leading-relaxed">
                {t.bioIntro}<span className="font-bold text-white">Rishi Choudhary</span>. {lang === 'hi' ? t.bioText : personalInfo.bio}
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#projects"
                  className="px-7 py-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold text-sm shadow-xl shadow-white/10 hover:-translate-y-0.5 transition-all flex items-center gap-2.5"
                >
                  <Briefcase className="w-4 h-4 text-black" />
                  <span>{t.exploreProjects}</span>
                </a>
                <a
                  href="#contact"
                  className="px-7 py-4 rounded-2xl glass-card border border-zinc-700 hover:border-zinc-500 text-white font-semibold text-sm hover:bg-zinc-900 transition-all flex items-center gap-2.5"
                >
                  <Mail className="w-4 h-4 text-white" />
                  <span>{t.getInTouch}</span>
                </a>
                <a
                  href="/RISHI_CV (1).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-medium text-sm transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-zinc-400" />
                  <span>{t.resumePdf}</span>
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-zinc-900 hover:bg-blue-600/20 border border-zinc-800 hover:border-blue-500/50 text-zinc-300 hover:text-blue-400 font-medium text-sm transition-all flex items-center gap-2"
                  title="Visit LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-zinc-900 hover:bg-pink-600/20 border border-zinc-800 hover:border-pink-500/50 text-zinc-300 hover:text-pink-400 font-medium text-sm transition-all flex items-center gap-2"
                  title="Visit Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>

              {/* Quick Metrics Bar */}
              <div className="pt-8 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {heroStats.map((stat, idx) => (
                  <div key={idx} className="glass-card p-4 rounded-2xl border border-zinc-800">
                    <div className="text-2xl sm:text-3xl font-extrabold text-gradient-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-zinc-200 mt-1">{stat.label}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Profile Portrait Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div 
                className="relative group w-full max-w-sm cursor-pointer"
                onMouseEnter={() => setShowWhyHireMe(true)}
                onMouseLeave={() => setShowWhyHireMe(false)}
                onClick={() => setShowWhyHireMe(!showWhyHireMe)}
              >
                {/* Refined Monochrome Aura */}
                <div className="absolute -inset-1 bg-gradient-to-r from-zinc-500/30 via-zinc-400/20 to-zinc-600/30 rounded-3xl blur-lg opacity-40 group-hover:opacity-80 transition duration-700"></div>

                {/* Main Visual Glass Card */}
                <div className="relative glass-card border border-zinc-700 p-4 rounded-3xl shadow-2xl bg-zinc-950 overflow-hidden">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-zinc-900">
                    <img
                      src={personalInfo.photo}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

                    {/* Floating Status Pill */}
                    <div className="absolute bottom-3 left-3 right-3 glass-card p-3 rounded-xl border border-zinc-800 flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-white animate-ping shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">Ahmedabad, India</div>
                        <div className="text-[10px] text-zinc-300">Shree Swaminarayan Institute of Technology</div>
                      </div>
                    </div>
                  </div>

                  {/* Info Tag below image */}
                  <div className="mt-4 flex items-center justify-between text-xs text-zinc-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-white" /> B.E. CSE (2023-27)
                    </span>
                    <span className="text-white font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Profile
                    </span>
                  </div>

                  {/* Why Hire Me Overlay Card */}
                  <AnimatePresence>
                    {showWhyHireMe && (
                      <WhyHireMeOverlay onClose={() => setShowWhyHireMe(false)} />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE STRENGTHS SECTION */}
      <section id="strengths" className="py-20 relative border-t border-zinc-800 bg-zinc-950/90 overflow-hidden">
        {/* 123 Background Image Overlay - Focused on Face */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/123.jpeg"
            alt="Rishi Choudhary Strengths Background"
            className="w-full h-full object-cover object-top opacity-50 filter blur-[2px] scale-105 transition-all"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/30 to-zinc-950/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-200 bg-zinc-900 px-3.5 py-1.5 rounded-full border border-zinc-800">
              {t.coreStrengths}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-display">
              {t.strengthsTitle}
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              {t.strengthsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-7 rounded-3xl border border-zinc-700/80 bg-zinc-950/85 backdrop-blur-md glass-card-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:border-zinc-700 transition-all">
                    {renderIcon(item.icon, "w-6 h-6 text-white")}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL SKILLS MATRIX */}
      <section id="skills" className="py-20 relative border-t border-zinc-800 bg-zinc-950/90 overflow-hidden">
        {/* POS1 Background Image Overlay - Focused on Face */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/pos1.png"
            alt="Rishi Choudhary Skills Background"
            className="w-full h-full object-cover object-top opacity-50 filter blur-[2px] scale-105 transition-all"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/30 to-zinc-950/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-200 bg-zinc-900 px-3.5 py-1.5 rounded-full border border-zinc-800">
              {t.techMatrix}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-display">
              {t.skillsTitle}
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              {t.skillsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-7 rounded-3xl border border-zinc-700/80 bg-zinc-950/85 backdrop-blur-md relative overflow-hidden"
              >
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-zinc-800">
                  <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shadow-inner">
                    {renderIcon(cat.icon, "w-6 h-6 text-white")}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{cat.category}</h3>
                    <span className="text-xs text-zinc-400 font-medium">{cat.skills.length} Technical Focus Areas</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-semibold text-zinc-200">
                          <span className="text-white">{renderIcon(skill.icon, "w-4 h-4")}</span>
                          <span>{skill.name}</span>
                        </div>
                        <span className="text-[11px] font-bold text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-800">
                          {skill.badge}
                        </span>
                      </div>
                      {/* Monochromatic Progress Bar */}
                      <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + sIdx * 0.1 }}
                          className="h-full bg-white rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="py-24 relative border-t border-zinc-800 bg-zinc-950/90 overflow-hidden">
        {/* PRO Background Image Overlay - Focused on Face & Poster */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/pro.png"
            alt="Rishi Choudhary Projects Background"
            className="w-full h-full object-cover object-top opacity-50 filter blur-[2px] scale-105 transition-all"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/30 to-zinc-950/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-200 bg-zinc-900 px-3.5 py-1.5 rounded-full border border-zinc-800">
                {t.portfolioShowcase}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 font-display">
                {t.featuredProjects}
              </h2>
              <p className="text-zinc-400 text-sm mt-2 max-w-xl">
                {t.projectsDesc}
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 glass-pill p-1.5 rounded-2xl border border-zinc-800 shrink-0">
              {['all', 'IoT', 'Web', 'AI', 'Software'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    projectCategory === cat 
                      ? 'bg-white text-black shadow-md' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {cat === 'all' ? 'All Systems' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-3xl border border-zinc-800 glass-card-hover flex flex-col justify-between overflow-hidden group"
                >
                  {/* Image Cover Preview */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-zinc-950">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                    
                    <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-zinc-950/90 backdrop-blur-md text-zinc-200 border border-zinc-800">
                      {proj.category}
                    </span>

                    {/* Quick Preview Trigger Button */}
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-all flex items-center gap-1.5 shadow-lg backdrop-blur-md"
                    >
                      <Eye className="w-3.5 h-3.5 text-black" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Details Body */}
                  <div className="p-7 space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-zinc-300 transition-colors">
                      {proj.title}
                    </h3>

                    <p className="text-zinc-300 text-xs leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 pt-2">
                      {proj.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges & Live Action Link */}
                    <div className="pt-4 border-t border-zinc-800 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {proj.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {proj.demo && proj.demo !== '#' && (
                        <div className="pt-1 flex items-center justify-between">
                          <a
                            href={proj.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-black" />
                            <span>Visit Live Portal</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* LEADERSHIP & EXTRACURRICULARS */}
      <section id="leadership" className="py-24 relative border-t border-zinc-800 bg-zinc-950/90 overflow-hidden">
        {/* RC Background Image Overlay - Focused on Face */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/rc.jpeg"
            alt="Rishi Choudhary Leadership"
            className="w-full h-full object-cover object-top opacity-50 filter blur-[2px] scale-105 transition-all"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/30 to-zinc-950/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-200 bg-zinc-900 px-3.5 py-1.5 rounded-full border border-zinc-800">
              {t.communityGov}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-display">
              {t.leadershipTitle}
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              {t.leadershipDesc}
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Vertical Line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 -translate-x-1/2 hidden sm:block" />

            <div className="space-y-10">
              {leadershipExperience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative flex flex-col sm:flex-row items-start group"
                >
                  {/* Timeline dot */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-black border-2 border-white items-center justify-center text-white z-10 group-hover:scale-125 transition-transform">
                    <Users className="w-4 h-4" />
                  </div>

                  {/* Timeline Card */}
                  <div className={`w-full sm:w-1/2 ${idx % 2 === 0 ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:ml-auto'}`}>
                    <div className="glass-card p-6 sm:p-7 rounded-3xl border border-zinc-700/80 bg-zinc-950/85 backdrop-blur-md glass-card-hover shadow-2xl">
                      <div className="flex items-center gap-2 mb-2 flex-wrap sm:justify-start">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
                          {exp.badge}
                        </span>
                        <span className="text-xs text-zinc-400 font-medium">
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1">
                        {exp.role}
                      </h3>
                      <div className="text-xs font-semibold text-zinc-400 mb-3">
                        {exp.organization}
                      </div>

                      <p className="text-zinc-300 text-xs leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded-md border border-zinc-800">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION & CERTIFICATIONS */}
      <section id="education" className="py-24 relative border-t border-zinc-800 bg-zinc-950/90 overflow-hidden">
        {/* RC1 Background Image Overlay - Focused on Face */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/rc1.jpeg"
            alt="Rishi Choudhary Education & Certifications"
            className="w-full h-full object-cover object-top opacity-50 filter blur-[2px] scale-105 transition-all"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/30 to-zinc-950/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Education Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-display">Education</h2>
                  <p className="text-xs text-zinc-400">Academic degree & qualifications</p>
                </div>
              </div>

              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="glass-card p-6 rounded-3xl border border-zinc-800 glass-card-hover">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-white px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                        {edu.period}
                      </span>
                      <span className="text-xs font-bold text-zinc-300 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                        {edu.score}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-2">{edu.degree}</h3>
                    <div className="text-xs font-semibold text-zinc-400 mt-0.5">{edu.institution}</div>
                    <p className="text-zinc-400 text-xs mt-2 leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Mentorship Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-display">Certifications & Mentorship</h2>
                  <p className="text-xs text-zinc-400">Verified credentials & intensive training</p>
                </div>
              </div>

              {/* Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="glass-card p-4 rounded-2xl border border-zinc-800 glass-card-hover flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-3 shadow">
                        {renderIcon(cert.icon, "w-4.5 h-4.5 text-white")}
                      </div>
                      <h4 className="text-xs font-bold text-white mb-1">{cert.title}</h4>
                      <p className="text-[10px] text-zinc-400 leading-relaxed">{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mentorship Program Highlight */}
              <div className="glass-card p-7 rounded-3xl border border-zinc-800 bg-zinc-950">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                    Mentorship Program
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">1-Month Intensive</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{trainingMentorship.title}</h3>
                <div className="text-xs font-semibold text-zinc-400 mb-3">{trainingMentorship.tech}</div>
                <p className="text-zinc-300 text-xs leading-relaxed">{trainingMentorship.summary}</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 relative border-t border-zinc-800 bg-zinc-950/90 overflow-hidden">
        {/* BG Background Image Overlay - Focused on Face */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/bg.png"
            alt="Rishi Choudhary Contact Background"
            className="w-full h-full object-cover object-top opacity-50 filter blur-[2px] scale-105 transition-all"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/30 to-zinc-950/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-200 bg-zinc-900 px-3.5 py-1.5 rounded-full border border-zinc-800">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 font-display">
              Let's Connect & Build
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              Interested in software collaboration, technical roles, or hackathons? Reach out directly!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
            {/* Quick Contact Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="glass-card p-5 rounded-2xl border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400">Email Address</div>
                    <a href={personalInfo.socials.email} className="text-xs font-bold text-white hover:text-zinc-300 transition-colors">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.email, 'email')}
                  className="p-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400">Mobile Phone</div>
                    <a href={personalInfo.socials.phone} className="text-xs font-bold text-white hover:text-zinc-300 transition-colors">
                      {personalInfo.mobile}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.mobile, 'phone')}
                  className="p-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-zinc-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-400">Location</div>
                  <div className="text-xs font-bold text-white">{personalInfo.location}</div>
                </div>
              </div>

              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 rounded-2xl border border-zinc-800 flex items-center justify-between hover:border-zinc-500 hover:bg-zinc-900/90 transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Linkedin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400">LinkedIn Profile</div>
                    <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">rishi-choudhary</div>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 text-zinc-400 group-hover:text-white border border-zinc-800 flex items-center gap-1 text-xs font-medium">
                  <span>Visit</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>

              <a
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 rounded-2xl border border-zinc-800 flex items-center justify-between hover:border-zinc-500 hover:bg-zinc-900/90 transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                    <Instagram className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400">Instagram Profile</div>
                    <div className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">l__rishi_choudhary__l</div>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 text-zinc-400 group-hover:text-white border border-zinc-800 flex items-center gap-1 text-xs font-medium">
                  <span>Visit</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>

            {/* Interactive Direct Message Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleFormSubmit} className="glass-card p-7 sm:p-8 rounded-3xl border border-zinc-800 space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Send a Direct Message</h3>
                
                {formSubmitted ? (
                  <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-white mx-auto" />
                    <h4 className="text-base font-bold text-white">Message Sent Successfully!</h4>
                    <p className="text-xs text-zinc-300">Thank you for reaching out, Rishi will get back to you shortly.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Smith"
                          className="w-full px-4 py-3 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Your Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@example.com"
                          className="w-full px-4 py-3 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Subject</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Project Collaboration / Opportunity"
                        className="w-full px-4 py-3 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Message</label>
                      <textarea
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your message..."
                        className="w-full px-4 py-3 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl bg-white text-black hover:bg-zinc-200 disabled:opacity-50 font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 text-black animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-black" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-zinc-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-black text-xs">
              RC
            </div>
            <span className="text-xs text-zinc-400 font-medium">
              © {new Date().getFullYear()} Rishi Choudhary. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-blue-400 border border-zinc-800 hover:border-blue-500/40 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-pink-400 border border-zinc-800 hover:border-pink-500/40 transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:bg-zinc-800 transition-all flex items-center gap-2 text-xs font-semibold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      </div>
    </>
  );
}

