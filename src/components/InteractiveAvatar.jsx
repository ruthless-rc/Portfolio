import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const DIALOG_MESSAGES = [
  "Hi! I'm Rishi's AI Companion 🤖",
  "Tracking your movements ✨",
  "Check out the Featured Projects! 🚀",
  "Robotics & AI Engineer ⚡",
  "Explore Skills & Strengths 📍",
  "Need to get in touch? Head to Contact 📧"
];

export default function InteractiveAvatar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isTouch, setIsTouch] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isClicking, setIsClicking] = useState(false);

  // Initial position in bottom-right corner before first movement
  const initialX = typeof window !== 'undefined' ? window.innerWidth - 100 : 300;
  const initialY = typeof window !== 'undefined' ? window.innerHeight - 150 : 500;

  const rawX = useMotionValue(initialX);
  const rawY = useMotionValue(initialY);

  // Physics spring for smooth organic tracking behind cursor / finger
  const springConfig = { stiffness: 80, damping: 20, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const prevPosRef = useRef({ x: initialX, y: initialY });

  // Mouse & Touch Movement Listeners
  useEffect(() => {
    const handleMove = (x, y, touchDevice = false) => {
      // Offset comfortably away from cursor/finger so avatar NEVER covers the point of click/touch
      const offsetX = touchDevice ? 40 : 50;
      const offsetY = touchDevice ? -75 : 50;

      const destX = x + offsetX;
      const destY = y + offsetY;

      // Calculate velocity vector for eye movement & tilt angle
      const dx = destX - prevPosRef.current.x;
      const dy = destY - prevPosRef.current.y;

      prevPosRef.current = { x: destX, y: destY };

      // Eye offset based on velocity direction (-5 to +5 px limit)
      const clampedEyeX = Math.max(-5, Math.min(5, dx * 0.3));
      const clampedEyeY = Math.max(-5, Math.min(5, dy * 0.3));
      setEyeOffset({ x: clampedEyeX, y: clampedEyeY });

      // Body tilt based on horizontal speed (-15 to +15 deg)
      const tilt = Math.max(-18, Math.min(18, dx * 0.5));
      setRotationDegree(tilt);

      rawX.set(destX);
      rawY.set(destY);
    };

    const onMouseMove = (e) => {
      setIsTouch(false);
      handleMove(e.clientX, e.clientY, false);
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        setIsTouch(true);
        handleMove(e.touches[0].clientX, e.touches[0].clientY, true);
      }
    };

    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        setIsTouch(true);
        handleMove(e.touches[0].clientX, e.touches[0].clientY, true);
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 300);
      }
    };

    const onMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 300);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [rawX, rawY]);

  // Periodic Blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Periodic Dialog Message Rotation
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % DIALOG_MESSAGES.length);
    }, 5500);
    return () => clearInterval(messageInterval);
  }, []);

  if (!isVisible) return null;

  return (
    // Entire overlay container MUST be pointer-events-none so website elements (buttons, inputs, links) work 100% seamlessly
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      <motion.div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="relative flex flex-col items-center pointer-events-none">
          
          {/* Speech Bubble Above Avatar (Pointer-events-none so clicks pass straight through to website) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 8, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="mb-2 pointer-events-none"
            >
              <div className="relative px-3.5 py-1.5 rounded-2xl bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 shadow-2xl text-white text-[11px] font-semibold flex items-center gap-1.5 whitespace-nowrap pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>{DIALOG_MESSAGES[currentMessageIndex]}</span>
                {/* Speech Bubble Arrow */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 border-r border-b border-zinc-700 rotate-45" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* MAIN AVATAR BODY (Pointer-events-none) */}
          <motion.div
            animate={{
              y: [0, -6, 0],
              rotate: rotationDegree,
              scale: isClicking ? 1.15 : 1,
            }}
            transition={{
              y: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
              rotate: { type: 'spring', stiffness: 200, damping: 15 },
              scale: { duration: 0.15 },
            }}
            className="relative pointer-events-none"
          >
            {/* Glowing Aura Ring around Bot */}
            <div className="absolute -inset-2 bg-gradient-to-r from-zinc-400/20 via-white/30 to-zinc-400/20 rounded-full blur-md opacity-75 animate-pulse" />

            {/* Futuristic Bot SVG Visual */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 drop-shadow-2xl pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="botHelmet" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#27272a" />
                    <stop offset="50%" stopColor="#18181b" />
                    <stop offset="100%" stopColor="#09090b" />
                  </linearGradient>

                  <linearGradient id="visorGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#18181b" />
                    <stop offset="100%" stopColor="#000000" />
                  </linearGradient>

                  <linearGradient id="eyeNeon" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e4e4e7" />
                  </linearGradient>

                  <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#71717a" />
                  </linearGradient>
                </defs>

                {/* Antenna */}
                <path d="M50 22 V12" stroke="#a1a1aa" strokeWidth="3" strokeLinecap="round" />
                <circle cx="50" cy="10" r="4.5" fill="#ffffff" className="animate-ping" style={{ transformOrigin: '50px 10px' }} />
                <circle cx="50" cy="10" r="3.5" fill="#ffffff" />

                {/* Ears / Side Pods */}
                <rect x="18" y="32" width="6" height="14" rx="3" fill="#3f3f46" stroke="#71717a" strokeWidth="1" />
                <rect x="76" y="32" width="6" height="14" rx="3" fill="#3f3f46" stroke="#71717a" strokeWidth="1" />

                {/* Outer Head Frame */}
                <rect x="22" y="20" width="56" height="42" rx="16" fill="url(#botHelmet)" stroke="#52525b" strokeWidth="2" />
                <rect x="23" y="21" width="54" height="40" rx="15" fill="none" stroke="#71717a" strokeWidth="0.8" opacity="0.6" />

                {/* Glossy Visor Screen */}
                <rect x="28" y="27" width="44" height="28" rx="10" fill="url(#visorGlass)" stroke="#3f3f46" strokeWidth="1.5" />

                {/* Eyes Container with Pupil Motion */}
                <g style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}>
                  {isBlinking ? (
                    <>
                      {/* Blink Line Left Eye */}
                      <line x1="36" y1="41" x2="44" y2="41" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                      {/* Blink Line Right Eye */}
                      <line x1="56" y1="41" x2="64" y2="41" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                    </>
                  ) : (
                    <>
                      {/* Left Eye */}
                      <ellipse cx="40" cy="41" rx="4.5" ry="6" fill="url(#eyeNeon)" />
                      <circle cx="41.5" cy="39" r="1.5" fill="#ffffff" />
                      
                      {/* Right Eye */}
                      <ellipse cx="60" cy="41" rx="4.5" ry="6" fill="url(#eyeNeon)" />
                      <circle cx="61.5" cy="39" r="1.5" fill="#ffffff" />
                    </>
                  )}
                </g>

                {/* Cheek Glow Accents */}
                <circle cx="34" cy="48" r="2" fill="#e4e4e7" opacity="0.3" />
                <circle cx="66" cy="48" r="2" fill="#e4e4e7" opacity="0.3" />

                {/* Torso Body */}
                <path d="M 33 62 L 67 62 L 61 80 L 39 80 Z" fill="url(#botHelmet)" stroke="#52525b" strokeWidth="1.5" />

                {/* Chest Core Indicator */}
                <circle cx="50" cy="70" r="4.5" fill="url(#coreGlow)" />
                <circle cx="50" cy="70" r="2" fill="#ffffff" />

                {/* Floating Robot Arms */}
                <ellipse cx="26" cy="69" rx="3.5" ry="6" fill="#3f3f46" stroke="#71717a" strokeWidth="1" />
                <ellipse cx="74" cy="69" rx="3.5" ry="6" fill="#3f3f46" stroke="#71717a" strokeWidth="1" />

                {/* Anti-Gravity Jet Thruster Glow */}
                <ellipse cx="50" cy="83" rx="10" ry="3.5" fill="#ffffff" opacity="0.6" className="animate-pulse" />
                <path d="M44 83 L50 91 L56 83 Z" fill="#e4e4e7" opacity="0.8" />
              </svg>
            </div>

            {/* Touch Active Label on Mobile */}
            {isTouch && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-0.5 rounded-full text-[9px] font-bold shadow-md tracking-wider uppercase whitespace-nowrap opacity-90 pointer-events-none">
                Touch Active
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
