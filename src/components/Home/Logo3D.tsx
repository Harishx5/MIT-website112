
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const Logo3DModel = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a simple 3D logo using geometry
  const logoGeometry = useMemo(() => {
    // Create a phoenix-like shape using multiple geometries
    return new THREE.CylinderGeometry(0.1, 0.3, 1, 8);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Add a subtle glow effect through scale pulsing
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Main logo mesh */}
      <mesh ref={meshRef} geometry={logoGeometry} position={[0, 0, 0]}>
        <meshPhongMaterial 
          color="#4F46E5" 
          emissive="#1E40AF" 
          emissiveIntensity={0.3}
          shininess={100}
        />
      </mesh>
      
      {/* Wing-like elements */}
      <mesh position={[-0.5, 0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshPhongMaterial 
          color="#7C3AED" 
          emissive="#4C1D95" 
          emissiveIntensity={0.2}
        />
      </mesh>
      
      <mesh position={[0.5, 0.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshPhongMaterial 
          color="#7C3AED" 
          emissive="#4C1D95" 
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Glowing particles around the logo */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={new Float32Array(Array.from({ length: 150 }, () => (Math.random() - 0.5) * 4))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#60A5FA"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

const Logo3D = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-64">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <pointLight position={[-2, -2, -2]} intensity={0.5} color="#4F46E5" />
          <Logo3DModel />
        </Canvas>
      </div>
    </div>
  );
};

export default Logo3D;
