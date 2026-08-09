import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import OrbitingTechIcons from './OrbitingTechIcons';

export function SVGBotVisual({ actionState = 'idle', isHovered = false }) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative drop-shadow-2xl select-none">
      <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28">
        <defs>
          <linearGradient id="botHelmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="50%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>

        {/* Antenna */}
        <path d="M50 22 V12" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="10" r="4" fill="#ffffff" className="animate-ping" style={{ transformOrigin: '50px 10px' }} />
        <circle cx="50" cy="10" r="3" fill="#ffffff" />

        {/* Ears */}
        <rect x="18" y="32" width="5" height="12" rx="2.5" fill="#3f3f46" />
        <rect x="77" y="32" width="5" height="12" rx="2.5" fill="#3f3f46" />

        {/* Head Outer */}
        <rect x="22" y="20" width="56" height="40" rx="14" fill="url(#botHelmGrad)" stroke="#52525b" strokeWidth="1.5" />

        {/* Visor Screen */}
        <rect x="28" y="26" width="44" height="26" rx="9" fill="url(#visorGrad)" stroke="#3f3f46" strokeWidth="1" />

        {/* Blinking Eyes */}
        {!isBlinking ? (
          <g>
            <circle cx="40" cy="39" r="4.5" fill={actionState === 'smile' ? '#10b981' : '#ffffff'} />
            <circle cx="60" cy="39" r="4.5" fill={actionState === 'smile' ? '#10b981' : '#ffffff'} />
          </g>
        ) : (
          <g>
            <line x1="36" y1="39" x2="44" y2="39" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="56" y1="39" x2="64" y2="39" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* Torso Body */}
        <path d="M 33 60 L 67 60 L 61 78 L 39 78 Z" fill="url(#botHelmGrad)" stroke="#52525b" strokeWidth="1.5" />

        {/* Chest Core Crystal */}
        <circle cx="50" cy="68" r="4.5" fill="#ffffff" className="animate-pulse" />

        {/* Waving / Posing Right Arm */}
        {(actionState === 'wave' || isHovered) ? (
          <g className="animate-bounce" style={{ transformOrigin: '74px 64px' }}>
            <ellipse cx="74" cy="56" rx="3.5" ry="8" fill="#3f3f46" />
          </g>
        ) : (
          <ellipse cx="74" cy="68" rx="3.5" ry="6" fill="#3f3f46" />
        )}
        <ellipse cx="26" cy="68" rx="3.5" ry="6" fill="#3f3f46" />

        {/* Thruster Flame */}
        <path d="M44 80 L50 88 L56 80 Z" fill="#ffffff" opacity="0.8" className="animate-pulse" />
      </svg>
    </div>
  );
}

function BotMesh({ actionState, userRotation = 0, isHovered = false }) {
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const bodyRef = useRef();
  const coreRef = useRef();
  const thrusterRef = useRef();

  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;

    if (headRef.current && actionState !== 'celebrate') {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mouseX * 0.4, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -mouseY * 0.3, 0.1);
    }

    if (bodyRef.current) {
      bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, userRotation, 0.1);
    }

    if (rightArmRef.current && leftArmRef.current) {
      if (actionState === 'wave' || isHovered) {
        rightArmRef.current.rotation.z = Math.sin(time * 8) * 0.4 + 1.2;
        rightArmRef.current.rotation.x = 0.2;
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.2, 0.1);
      } else if (actionState === 'point') {
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -1.2, 0.1);
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.4, 0.1);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.2, 0.1);
      } else if (actionState === 'thumbsUp') {
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -1.5, 0.1);
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.1, 0.1);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.3, 0.1);
      } else if (actionState === 'walk') {
        rightArmRef.current.rotation.x = Math.sin(time * 6) * 0.5;
        leftArmRef.current.rotation.x = -Math.sin(time * 6) * 0.5;
      } else {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.25 + Math.sin(time * 2) * 0.05, 0.1);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.25 - Math.sin(time * 2) * 0.05, 0.1);
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, 0.1);
      }
    }

    if (headRef.current && actionState === 'nod') {
      headRef.current.rotation.x = Math.sin(time * 5) * 0.25;
    }

    if (bodyRef.current && actionState === 'celebrate') {
      bodyRef.current.rotation.y += delta * 4;
    }

    if (thrusterRef.current) {
      const scale = 0.8 + Math.sin(time * 12) * 0.2;
      thrusterRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={bodyRef} position={[0, 0, 0]}>
      <group ref={headRef} position={[0, 0.7, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.9, 0.7, 0.7]} />
          <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.36]}>
          <planeGeometry args={[0.75, 0.45]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.9} />
        </mesh>
        {!isBlinking && (
          <group position={[0, 0, 0.37]}>
            <mesh position={[-0.2, 0.02, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color={actionState === 'smile' ? '#10b981' : '#ffffff'} />
            </mesh>
            <mesh position={[0.2, 0.02, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color={actionState === 'smile' ? '#10b981' : '#ffffff'} />
            </mesh>
          </group>
        )}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
          <meshStandardMaterial color="#71717a" />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.25, 0.75, 16]} />
        <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.3} />
      </mesh>

      <mesh ref={coreRef} position={[0, 0.1, 0.26]}>
        <octahedronGeometry args={[0.12]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={actionState === 'celebrate' ? 2 : 1}
        />
      </mesh>

      <group ref={rightArmRef} position={[0.45, 0.1, 0]}>
        <mesh position={[0.1, -0.2, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.4, 16]} />
          <meshStandardMaterial color="#3f3f46" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      <group ref={leftArmRef} position={[-0.45, 0.1, 0]}>
        <mesh position={[-0.1, -0.2, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.4, 16]} />
          <meshStandardMaterial color="#3f3f46" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      <mesh ref={thrusterRef} position={[0, -0.45, 0]}>
        <coneGeometry args={[0.2, 0.3, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>

      <OrbitingTechIcons
        isActiveSection={actionState === 'skills'}
        isCelebrating={actionState === 'celebrate'}
      />
    </group>
  );
}

export default function AIAvatarCanvas({
  actionState = 'idle',
  userRotation = 0,
  isHovered = false
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <SVGBotVisual actionState={actionState} isHovered={isHovered} />;
  }

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          if (!gl) setHasError(true);
        }}
        onError={() => setHasError(true)}
      >
        <PerspectiveCamera makeDefault position={[0, 0.2, 3.2]} fov={50} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -2, -2]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, 1, 2]} intensity={0.8} color="#ffffff" />

        <Suspense fallback={null}>
          <Float
            speed={actionState === 'walk' ? 4 : 2}
            rotationIntensity={0.2}
            floatIntensity={actionState === 'walk' ? 0.8 : 0.4}
          >
            <BotMesh
              actionState={actionState}
              userRotation={userRotation}
              isHovered={isHovered}
            />
          </Float>
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.5}
            scale={3}
            blur={1.5}
            far={4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
