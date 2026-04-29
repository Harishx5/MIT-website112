
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const PhoenixMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load the phoenix texture
  const texture = useLoader(TextureLoader, '/lovable-uploads/ea4b0375-50fd-4c5e-83fd-3830452ef78b.png');
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      // Subtle scale pulsing
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Main phoenix plane */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial 
          map={texture} 
          transparent 
          alphaTest={0.1}
        />
      </mesh>
      
      {/* Floating particles around the phoenix */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={30}
            array={new Float32Array(Array.from({ length: 90 }, () => (Math.random() - 0.5) * 6))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#FFD700"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

const PhoenixAnimation = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#FFD700" />
        <PhoenixMesh />
      </Canvas>
    </div>
  );
};

export default PhoenixAnimation;
