import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface ModelProps {
  mousePosition: { x: number; y: number };
}

const Model = ({ mousePosition }: ModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const modelPath = '/Snowman/assets/models/snow_man.glb';
  const { scene } = useGLTF(modelPath);
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useEffect(() => {
    setTargetRotation({
      x: mousePosition.y * 0.3,
      y: mousePosition.x * 0.5,
    });
  }, [mousePosition]);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth inertia-based rotation
      const springStrength = 0.08;
      const damping = 0.92;

      velocity.current.x += (targetRotation.x - groupRef.current.rotation.x) * springStrength;
      velocity.current.y += (targetRotation.y - groupRef.current.rotation.y) * springStrength;

      velocity.current.x *= damping;
      velocity.current.y *= damping;

      groupRef.current.rotation.x += velocity.current.x;
      groupRef.current.rotation.y += velocity.current.y;

      // Gentle floating animation (relative to base position)
      const baseY = -0.8;
      groupRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={[0.7, 0.7, 0.7]} position={[0, -0.8, 0]}>
      <primitive object={scene} />
    </group>
  );
};

const SnowmanModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      setMousePosition(prev => ({
        x: prev.x + deltaX * 0.01,
        y: prev.y + deltaY * 0.01,
      }));
    } else {
      setMousePosition({ x, y: -y });
    }
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-[420px] md:h-[520px] cursor-grab active:cursor-grabbing"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        shadows
        camera={{ position: [0, 1, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#a5d8ff" />
        
        <Model mousePosition={mousePosition} />
        
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
        
        <Environment preset="city" />
      </Canvas>
    </motion.div>
  );
};

export default SnowmanModel;
