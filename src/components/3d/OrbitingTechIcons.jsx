import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const TECH_ICONS = [
  { symbol: '⚡', name: 'React', color: '#61dafb' },
  { symbol: '🤖', name: 'AI/ML', color: '#a855f7' },
  { symbol: '⚙️', name: 'Python', color: '#38bdf8' },
  { symbol: '🧠', name: 'C++', color: '#3b82f6' },
  { symbol: '📡', name: 'IoT', color: '#10b981' },
  { symbol: '💻', name: 'Node.js', color: '#22c55e' }
];

export default function OrbitingTechIcons({ isActiveSection = false, isCelebrating = false }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      const speed = isCelebrating ? 2.5 : isActiveSection ? 1.2 : 0.5;
      groupRef.current.rotation.y += delta * speed;
    }
  });

  const radius = isActiveSection || isCelebrating ? 1.8 : 1.3;
  const count = TECH_ICONS.length;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {TECH_ICONS.map((tech, idx) => {
        const angle = (idx / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 0.25;

        return (
          <Float
            key={tech.name}
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
            position={[x, y, z]}
          >
            <mesh scale={isActiveSection ? 0.22 : 0.16}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial
                color={tech.color}
                emissive={tech.color}
                emissiveIntensity={isActiveSection ? 0.8 : 0.4}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}
