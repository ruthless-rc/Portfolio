import React, { useState, useEffect, useRef, Suspense, Component } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import AIAvatarCanvas, { SVGBotVisual } from './3d/AIAvatarCanvas';
import AIChatModal from './AIChatModal';
import { useSectionObserver } from '../hooks/useSectionObserver';

class AvatarErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.warn("Avatar WebGL Fallback Activated:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const SECTION_DIALOGS = {
  about: "Hi! I'm Rishi's AI Guide 🤖 Wave at me!",
  strengths: "Exploring Rishi's Core Competencies ✨",
  skills: "Orbiting Rishi's Technical Stack & Skills ⚡",
  projects: "Check out featured IoT & CS Projects! 🚀",
  leadership: "Robotics Club & Event Leadership 🏛️",
  education: "Certificates & B.E. CS Engineering 🎓",
  contact: "Need to get in touch? Send a message! 📧"
};

export default function InteractiveAvatar({
  externalTriggerAction = null
}) {
  const { activeSection, isScrolling } = useSectionObserver();

  // State management
  const [actionState, setActionState] = useState('wave');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [userRotation, setUserRotation] = useState(0);
  const [dialogText, setDialogText] = useState(SECTION_DIALOGS.about);

  // Position motion values for Framer Motion spring physics
  const initialX = typeof window !== 'undefined' ? window.innerWidth - 120 : 300;
  const initialY = typeof window !== 'undefined' ? window.innerHeight - 180 : 500;

  const rawX = useMotionValue(initialX);
  const rawY = useMotionValue(initialY);

  const springConfig = { stiffness: 100, damping: 20, mass: 0.6 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const dragStartPos = useRef({ x: 0, rotation: 0 });

  // Initial load animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setActionState('wave');
    }, 800);

    const timer2 = setTimeout(() => {
      setActionState('idle');
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Update position and animation state based on active scroll section
  useEffect(() => {
    if (isDragging) return;

    if (SECTION_DIALOGS[activeSection]) {
      setDialogText(SECTION_DIALOGS[activeSection]);
    }

    let targetX = window.innerWidth - 130;
    let targetY = window.innerHeight - 180;
    let nextState = 'idle';

    if (activeSection === 'about') {
      targetX = window.innerWidth > 1024 ? 120 : window.innerWidth - 100;
      targetY = window.innerHeight > 800 ? 320 : 260;
      nextState = isScrolling ? 'walk' : 'point';
    } else if (activeSection === 'strengths') {
      targetX = window.innerWidth - 110;
      targetY = 280;
      nextState = isScrolling ? 'walk' : 'nod';
    } else if (activeSection === 'skills') {
      targetX = window.innerWidth - 120;
      targetY = 320;
      nextState = 'skills';
    } else if (activeSection === 'projects') {
      targetX = 110;
      targetY = 360;
      nextState = isScrolling ? 'walk' : 'point';
    } else if (activeSection === 'leadership') {
      targetX = window.innerWidth - 110;
      targetY = 340;
      nextState = isScrolling ? 'walk' : 'idle';
    } else if (activeSection === 'education') {
      targetX = 110;
      targetY = 320;
      nextState = isScrolling ? 'walk' : 'point';
    } else if (activeSection === 'contact') {
      targetX = window.innerWidth - 120;
      targetY = window.innerHeight - 220;
      nextState = isScrolling ? 'walk' : 'wave';
    }

    if (externalTriggerAction) {
      nextState = externalTriggerAction;
    }

    setActionState(nextState);

    gsap.to(rawX, { duration: 1.2, value: targetX, ease: 'power2.out' });
    gsap.to(rawY, { duration: 1.2, value: targetY, ease: 'power2.out' });

  }, [activeSection, isScrolling, isDragging, externalTriggerAction, rawX, rawY]);

  const handleDoubleClick = () => {
    setUserRotation(0);
    const defaultX = window.innerWidth - 130;
    const defaultY = window.innerHeight - 180;
    rawX.set(defaultX);
    rawY.set(defaultY);
    setActionState('wave');
    setTimeout(() => setActionState('idle'), 2000);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartPos.current = { x: clientX, rotation: userRotation };
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartPos.current.x;
    setUserRotation(dragStartPos.current.rotation + deltaX * 0.015);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const fallbackUI = <SVGBotVisual actionState={actionState} isHovered={isHovered} />;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none">
        <motion.div
          className="absolute top-0 left-0 pointer-events-auto"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <div className="relative flex flex-col items-center">
            
            {/* Speech Bubble */}
            <AnimatePresence mode="wait">
              <motion.div
                key={dialogText}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="mb-1 pointer-events-none"
              >
                <div className="relative px-3.5 py-1.5 rounded-2xl bg-zinc-950/90 backdrop-blur-md border border-zinc-700/80 shadow-2xl text-white text-[11px] font-semibold flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>{dialogText}</span>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-950 border-r border-b border-zinc-700 rotate-45" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* AVATAR WRAPPER */}
            <motion.div
              drag
              dragConstraints={{
                left: 50,
                right: typeof window !== 'undefined' ? window.innerWidth - 50 : 1000,
                top: 50,
                bottom: typeof window !== 'undefined' ? window.innerHeight - 50 : 800
              }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              onDoubleClick={handleDoubleClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`w-32 h-32 sm:w-40 sm:h-40 relative rounded-full cursor-grab active:cursor-grabbing transition-transform hover:scale-105 ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              <div className="absolute inset-2 bg-gradient-to-r from-zinc-500/20 via-white/30 to-zinc-500/20 rounded-full blur-md opacity-60 animate-pulse pointer-events-none" />

              <AvatarErrorBoundary fallback={fallbackUI}>
                <Suspense fallback={fallbackUI}>
                  <AIAvatarCanvas
                    actionState={isHovered ? 'wave' : actionState}
                    userRotation={userRotation}
                    isHovered={isHovered}
                  />
                </Suspense>
              </AvatarErrorBoundary>

              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-zinc-900/80 border border-zinc-700 text-[9px] font-bold text-zinc-300 shadow-md whitespace-nowrap opacity-80 pointer-events-none">
                Click AI • Drag Move
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isChatOpen && (
          <AIChatModal onClose={() => setIsChatOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
