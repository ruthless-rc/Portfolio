import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─── Greeting Data ────────────────────────────────────────────────────────────
const GREETINGS = [
  { flag: '🇺🇸', lang: 'English',    line1: 'Hello!',          line2: 'Welcome to my portfolio.' },
  { flag: '🇮🇳', lang: 'Hindi',      line1: 'नमस्ते!',          line2: 'मेरे पोर्टफोलियो में आपका स्वागत है।' },
  { flag: '🇫🇷', lang: 'French',     line1: 'Bonjour !',        line2: 'Bienvenue sur mon portfolio.' },
  { flag: '🇪🇸', lang: 'Spanish',    line1: '¡Hola!',           line2: 'Bienvenido a mi portafolio.' },
  { flag: '🇩🇪', lang: 'German',     line1: 'Hallo!',           line2: 'Willkommen in meinem Portfolio.' },
  { flag: '🇮🇹', lang: 'Italian',    line1: 'Ciao!',            line2: 'Benvenuto nel mio portfolio.' },
  { flag: '🇵🇹', lang: 'Portuguese', line1: 'Olá!',             line2: 'Bem-vindo ao meu portfólio.' },
  { flag: '🇷🇺', lang: 'Russian',    line1: 'Здравствуйте!',    line2: 'Добро пожаловать в мое портфолио.' },
  { flag: '🇨🇳', lang: 'Chinese',    line1: '你好！',            line2: '欢迎来到我的作品集。' },
  { flag: '🇯🇵', lang: 'Japanese',   line1: 'こんにちは！',       line2: '私のポートフォリオへようこそ。' },
  { flag: '🇰🇷', lang: 'Korean',     line1: '안녕하세요!',        line2: '제 포트폴리오에 오신 것을 환영합니다.' },
  { flag: '🇸🇦', lang: 'Arabic',     line1: 'مرحبًا!',          line2: 'أهلاً بك في معرض أعمالي.' },
];

const GREETING_DURATION  = 1100;  // ms each greeting is visible
const TRANSITION_DURATION = 380;  // ms fade between greetings

// ─── Photo collage — tiles pulled from /public ────────────────────────────────
const COLLAGE_TILES = [
  { src: '/rc.jpeg',          area: '1 / 1 / 3 / 2' },   // tall left
  { src: '/college.png',      area: '1 / 2 / 2 / 4' },   // wide top-mid
  { src: '/123.jpeg',         area: '2 / 2 / 3 / 3' },   // mid-center
  { src: '/pos1.png',         area: '2 / 3 / 3 / 4' },   // mid-right
  { src: '/rc1.jpeg',         area: '1 / 4 / 2 / 5' },   // top-right
  { src: '/pro.png',          area: '2 / 4 / 3 / 5' },   // mid-far-right
  { src: '/rishi-photo.jpg',  area: '3 / 1 / 4 / 3' },   // wide bottom-left
  { src: '/cs.png',           area: '3 / 3 / 4 / 5' },   // wide bottom-right
];

// ─── Blurred Photo Collage Background ────────────────────────────────────────
function PhotoCollage() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows:    'repeat(3, 1fr)',
          width: '100%',
          height: '100%',
          gap: 4,
          filter: 'blur(18px) saturate(0.6) brightness(0.35)',
          transform: 'scale(1.06)',
        }}
      >
        {COLLAGE_TILES.map((tile, i) => (
          <div
            key={i}
            style={{
              gridArea: tile.area,
              overflow: 'hidden',
              borderRadius: 0,
            }}
          >
            <img
              src={tile.src}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Subtle particle layer on top of collage ─────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(55, Math.floor((window.innerWidth * window.innerHeight) / 14000));
    particles.current = Array.from({ length: count }, () => ({
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      r:       Math.random() * 1.2 + 0.3,
      vx:      (Math.random() - 0.5) * 0.25,
      vy:      (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.45 + 0.1,
      pulse:   Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.012;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const alpha = p.opacity * (0.55 + 0.45 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 155, 255, ${alpha})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MultilingualIntro({ onComplete }) {
  const [phase, setPhase]           = useState('greeting'); // 'greeting' | 'reveal' | 'exit'
  const [greetingIdx, setGreetingIdx] = useState(0);
  const [visible, setVisible]       = useState(true);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const timeoutsRef = useRef([]);
  const touchStartY = useRef(null);

  const triggerExit = useCallback(() => {
    if (phase === 'exit') return;
    setPhase('exit');
    setTimeout(() => onComplete?.(), 850);
  }, [phase, onComplete]);

  // Touch Swipe Up and Scroll Handlers
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (!touchStartY.current || phase === 'exit') return;
    const currentY = e.touches[0].clientY;
    const diffY = touchStartY.current - currentY;
    if (diffY > 35) { // Swiped UP by >35px
      triggerExit();
    }
  };

  const handleWheel = (e) => {
    if (phase === 'exit') return;
    if (e.deltaY > 15) { // Mouse scroll down / trackpad swipe up
      triggerExit();
    }
  };

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setPrefersReduced(true);
      onComplete?.();
    }
  }, [onComplete]);

  // Greeting cycle
  useEffect(() => {
    if (prefersReduced || phase === 'exit') return;

    const schedule = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timeoutsRef.current.push(id);
      return id;
    };

    const cycleGreeting = (idx) => {
      if (idx >= GREETINGS.length) {
        // All done → switch to reveal phase
        schedule(() => {
          setVisible(false);
          schedule(() => {
            setPhase('reveal');
            setVisible(true);
          }, TRANSITION_DURATION);
        }, 200);
        return;
      }

      setGreetingIdx(idx);
      setVisible(true);

      schedule(() => {
        setVisible(false);
        schedule(() => cycleGreeting(idx + 1), TRANSITION_DURATION);
      }, GREETING_DURATION);
    };

    // Small startup delay for paint
    schedule(() => cycleGreeting(0), 250);

    return () => timeoutsRef.current.forEach(clearTimeout);
  }, [prefersReduced, phase]);

  // After reveal phase, auto-swipe exit after ~2.8s
  useEffect(() => {
    if (phase !== 'reveal') return;
    const id = setTimeout(() => {
      triggerExit();
    }, 2800);
    return () => clearTimeout(id);
  }, [phase, triggerExit]);

  if (prefersReduced) return null;

  const isExit   = phase === 'exit';
  const isReveal = phase === 'reveal';
  const greeting = GREETINGS[greetingIdx];
  const isArabic = greeting?.lang === 'Arabic';

  return (
    <div
      aria-label="Portfolio intro animation"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onWheel={handleWheel}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#04020a',
        transform: isExit ? 'translateY(-105%)' : 'translateY(0%)',
        opacity: isExit ? 0.95 : 1,
        borderRadius: isExit ? '0 0 50px 50px' : '0px',
        boxShadow: isExit ? '0 30px 100px rgba(0, 0, 0, 0.95)' : 'none',
        transition: isExit
          ? 'transform 0.85s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.85s ease-in-out, border-radius 0.85s ease'
          : 'none',
        pointerEvents: isExit ? 'none' : 'auto',
      }}
    >
      {/* ── Layer 0: Blurred photo collage ── */}
      <PhotoCollage />

      {/* ── Layer 1: Subtle floating particles ── */}
      <ParticleCanvas />

      {/* ── Layer 2: Greeting Card ── */}
      {!isReveal && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            padding: '0 20px',
            opacity: visible ? 1 : 0,
            transform: visible
              ? 'translateY(0px) scale(1)'
              : 'translateY(14px) scale(0.97)',
            filter: visible ? 'blur(0px)' : 'blur(5px)',
            transition: `
              opacity ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1),
              transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1),
              filter ${TRANSITION_DURATION}ms ease
            `,
          }}
        >
          {/* Glass card */}
          <div
            style={{
              background: 'rgba(6, 4, 20, 0.60)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(99,102,241,0.22)',
              borderRadius: 32,
              padding: 'clamp(36px, 6vw, 60px) clamp(32px, 7vw, 68px)',
              boxShadow: `
                0 0 0 1px rgba(99,102,241,0.06),
                0 40px 90px rgba(0,0,0,0.75),
                0 0 60px rgba(99,102,241,0.07) inset
              `,
              minWidth: 'min(500px, 88vw)',
              maxWidth: '88vw',
            }}
          >
            {/* Flag + language label */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                marginBottom: 28,
              }}
            >
              <span style={{ fontSize: 30, lineHeight: 1 }}>{greeting.flag}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(120,112,255,0.9)',
                  background: 'rgba(99,102,241,0.12)',
                  border: '1px solid rgba(99,102,241,0.22)',
                  borderRadius: 100,
                  padding: '4px 14px',
                }}
              >
                {greeting.lang}
              </span>
            </div>

            {/* Main greeting line 1 */}
            <p
              dir={isArabic ? 'rtl' : 'ltr'}
              style={{
                fontSize: 'clamp(2.1rem, 6.5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 14,
                letterSpacing: '-0.02em',
                background:
                  'linear-gradient(135deg, #ffffff 0%, #c7d2fe 45%, #a5b4fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              {greeting.line1}
            </p>

            {/* Greeting line 2 */}
            <p
              dir={isArabic ? 'rtl' : 'ltr'}
              style={{
                fontSize: 'clamp(0.9rem, 2.4vw, 1.15rem)',
                fontWeight: 400,
                color: 'rgba(200,200,230,0.78)',
                lineHeight: 1.65,
                letterSpacing: isArabic ? 0 : '0.01em',
              }}
            >
              {greeting.line2}
            </p>

            {/* Bottom accent line */}
            <div
              style={{
                height: 1,
                background:
                  'linear-gradient(90deg, transparent, rgba(99,102,241,0.45), rgba(139,92,246,0.35), transparent)',
                margin: '30px 0 0',
                borderRadius: 1,
              }}
            />
          </div>
        </div>
      )}

      {/* ── Layer 3: Reveal Card ── */}
      {isReveal && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            padding: '0 20px',
            opacity: visible ? 1 : 0,
            transform: visible
              ? 'translateY(0px) scale(1)'
              : 'translateY(22px) scale(0.95)',
            filter: visible ? 'blur(0px)' : 'blur(7px)',
            transition:
              'opacity 0.75s cubic-bezier(0.4,0,0.2,1), transform 0.75s cubic-bezier(0.4,0,0.2,1), filter 0.75s ease',
          }}
        >
          {/* Sparkle ring */}
          <div
            style={{
              marginBottom: 28,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'rgba(99,102,241,0.14)',
                border: '1px solid rgba(99,102,241,0.32)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 36px rgba(99,102,241,0.28)',
                fontSize: 28,
              }}
            >
              ✨
            </div>
          </div>

          <p
            style={{
              fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(99,102,241,0.8)',
              marginBottom: 14,
            }}
          >
            Hello, I&apos;m
          </p>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 9vw, 5.2rem)',
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              background:
                'linear-gradient(135deg, #ffffff 0%, #e0e7ff 35%, #a5b4fc 70%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 22,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            Rishi Choudhary
          </h1>

          {/* Tagline pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            {['Full Stack Developer', 'AI Enthusiast', 'Problem Solver'].map(
              (tag, i) => (
                <React.Fragment key={tag}>
                  <span
                    style={{
                      fontSize: 'clamp(0.7rem, 1.8vw, 0.88rem)',
                      fontWeight: 500,
                      color: 'rgba(165,180,252,0.88)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {tag}
                  </span>
                  {i < 2 && (
                    <span
                      style={{
                        color: 'rgba(99,102,241,0.5)',
                        fontSize: '1rem',
                        lineHeight: 1,
                      }}
                    >
                      •
                    </span>
                  )}
                </React.Fragment>
              )
            )}
          </div>

          {/* Shimmer underline */}
          <div
            style={{
              height: 2,
              width: '75%',
              maxWidth: 300,
              margin: '38px auto 0',
              borderRadius: 2,
              background:
                'linear-gradient(90deg, transparent, rgba(99,102,241,0.75), rgba(139,92,246,0.7), transparent)',
              animation: 'shimmer 2s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* ── Swipe Up / Skip Indicator at Bottom ── */}
      {!isExit && (
        <div
          onClick={triggerExit}
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            opacity: 0.85,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            ↑
          </div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.85)',
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            Swipe Up to Enter
          </span>
        </div>
      )}

      {/* Keyframe */}
      <style>{`
        @keyframes shimmer {
          0%   { opacity: 0.4; transform: scaleX(0.65); }
          50%  { opacity: 1;   transform: scaleX(1); }
          100% { opacity: 0.4; transform: scaleX(0.65); }
        }
      `}</style>
    </div>
  );
}
