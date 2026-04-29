import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const FloatingImageMesh = ({ imageUrl }: { imageUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  // Remove all movement - keep the image completely static
  // Only keep subtle floating particles animation for visual interest

  return (
    <group>
      {/* Main static image - no movement */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
      
      {/* Floating particles around the image with subtle movement */}
      <mesh position={[2, 1, -1]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
      </mesh>
      
      <mesh position={[-2, -1, 1]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
      </mesh>
      
      <mesh position={[1.5, -2, 0.5]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

const FloatingImage = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingImageMesh imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
};

export default FloatingImage;
