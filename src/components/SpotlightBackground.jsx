import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function SpotlightBackground() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth springs for cursor spotlight tracking
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-black">
      {/* Background Mesh Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Mouse Following White Spotlight */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Monochromatic Ambient Blobs */}
      <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full aurora-blob-1 opacity-15 blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full aurora-blob-2 opacity-10 blur-3xl" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full aurora-blob-3 opacity-10 blur-3xl" />

      {/* Low-opacity floating particles */}
      <div className="absolute inset-0 opacity-25">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
