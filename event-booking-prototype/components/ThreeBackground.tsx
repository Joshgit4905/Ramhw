'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Edges } from '@react-three/drei';
import * as THREE from 'three';

function BrutalistShape() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.1;
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          {/* Icosahedron provides a harsh geometric brutalist look */}
          <icosahedronGeometry args={[4.5, 0]} />
          <meshBasicMaterial color="#020202" />
          <Edges color="#facc15" threshold={15} />
        </mesh>
      </Float>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -2, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        {/* Subtle geometric starfield */}
        <Stars radius={100} depth={50} count={2500} factor={3} saturation={0} fade speed={1.5} />
        
        <BrutalistShape />
      </Canvas>
    </div>
  );
}
