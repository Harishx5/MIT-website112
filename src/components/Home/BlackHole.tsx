
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const BlackHoleParticles = () => {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    const colors = new Float32Array(3000 * 3);
    
    for (let i = 0; i < 3000; i++) {
      // Create spiral pattern around black hole
      const angle = Math.random() * Math.PI * 8;
      const radius = Math.random() * 8 + 1;
      const spiral = angle * 0.5;
      
      // Spiral positions
      const x = Math.cos(angle + spiral) * radius;
      const z = Math.sin(angle + spiral) * radius;
      const y = (Math.random() - 0.5) * 0.5;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Orange/yellow colors for accretion disk effect
      const intensity = Math.random() * 0.8 + 0.2;
      const distanceFromCenter = Math.sqrt(x * x + z * z);
      const colorIntensity = Math.max(0.1, 1 - distanceFromCenter / 8);
      
      colors[i * 3] = intensity * colorIntensity;         // R - orange/red
      colors[i * 3 + 1] = intensity * colorIntensity * 0.6; // G - yellow
      colors[i * 3 + 2] = intensity * colorIntensity * 0.2; // B - minimal blue
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      // Rotate the entire particle system to simulate orbital motion
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      // Gentle floating effect
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
};

const BlackHole = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <BlackHoleParticles />
        {/* Central black sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </Canvas>
    </div>
  );
};

export default BlackHole;
