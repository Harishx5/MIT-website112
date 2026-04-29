
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

const MilkyWayStars = () => {
  const ref = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(12000 * 3);
    const colors = new Float32Array(12000 * 3);
    
    for (let i = 0; i < 12000; i++) {
      // Create a more pronounced spiral galaxy pattern
      const angle = Math.random() * Math.PI * 6;
      const radius = Math.random() * 20 + 1;
      const spiral = angle * 0.4;
      
      // Enhanced spiral arm positions with more density in the center
      const x = Math.cos(angle + spiral) * radius + (Math.random() - 0.5) * 3;
      const z = Math.sin(angle + spiral) * radius + (Math.random() - 0.5) * 3;
      const y = (Math.random() - 0.5) * 3;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Create more varied star colors - dark colors for light theme
      const starType = Math.random();
      let r, g, b;
      
      if (theme === 'light') {
        // Dark colors for light theme to make them visible
        if (starType < 0.4) {
          r = 0.1 + Math.random() * 0.2; // Dark blue tones
          g = 0.1 + Math.random() * 0.15;
          b = 0.3 + Math.random() * 0.3;
        } else if (starType < 0.7) {
          const intensity = 0.1 + Math.random() * 0.2; // Dark gray
          r = g = b = intensity;
        } else {
          r = 0.2 + Math.random() * 0.2; // Dark purple tones
          g = 0.1 + Math.random() * 0.1;
          b = 0.3 + Math.random() * 0.2;
        }
      } else {
        // Original bright colors for dark theme
        if (starType < 0.4) {
          r = 0.4 + Math.random() * 0.2;
          g = 0.5 + Math.random() * 0.1;
          b = 0.6;
        } else if (starType < 0.7) {
          const intensity = 0.3 + Math.random() * 0.2;
          r = g = b = intensity;
        } else {
          r = 0.3 + Math.random() * 0.2;
          g = 0.2 + Math.random() * 0.15;
          b = 0.4 + Math.random() * 0.2;
        }
      }
      
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }
    
    return [positions, colors];
  }, [theme]);

  useFrame((state) => {
    if (ref.current) {
      // Slow rotation to simulate galaxy rotation
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      
      // Gentle floating movement
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
      ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.08) * 0.3;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={theme === 'light' ? 0.03 : 0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={theme === 'light' ? 0.8 : 0.5}
      />
    </Points>
  );
};

const SpaceBackground = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`absolute inset-0 ${theme === 'light' ? 'opacity-80' : 'opacity-40'}`}>
      <div className={`absolute inset-0 z-10 ${
        theme === 'light' ? 'bg-white/10' : 'bg-slate-900/60'
      }`}></div>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <MilkyWayStars />
      </Canvas>
    </div>
  );
};

export default SpaceBackground;
