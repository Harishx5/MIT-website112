
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

const Planet = () => {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (planetRef.current) {
      // Slow planet rotation
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      planetRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
    
    if (ringsRef.current) {
      // Ring rotation
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.08;
      ringsRef.current.rotation.x = Math.PI / 4;
    }
  });

  const planetColor = theme === 'light' ? '#4F46E5' : '#8B5CF6';
  const ringColor = theme === 'light' ? '#6366F1' : '#A78BFA';

  return (
    <group position={[2, 0, 0]}>
      {/* Planet */}
      <Sphere ref={planetRef} args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <meshPhongMaterial 
          color={planetColor}
          shininess={100}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Planet Rings */}
      <group ref={ringsRef}>
        <Ring args={[1.8, 2.2, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial 
            color={ringColor}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </Ring>
        <Ring args={[2.4, 2.6, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial 
            color={ringColor}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </Ring>
      </group>
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color={theme === 'light' ? '#60A5FA' : '#A78BFA'} />
    </group>
  );
};

const PlanetAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Planet />
      </Canvas>
    </div>
  );
};

export default PlanetAnimation;
