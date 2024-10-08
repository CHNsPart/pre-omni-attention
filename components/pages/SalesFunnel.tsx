"use client";

import React, { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useTexture, Svg } from '@react-three/drei';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import MultiStepModal from '../ui/MultiStepModal';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Define a type for the expected structure of the SVG data
type SVGData = {
  paths: THREE.ShapePath[];
};

const Screen = ({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture('/oa_og.png');

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + rotation[1];
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[2, 1.5, 0.1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const AIParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particles = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000 * 3; i++) {
      particles[i] = (Math.random() - 0.5) * 10;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    return geometry;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" {...particlesGeometry} />
      <pointsMaterial attach="material" size={0.05} color="#00FFFF" />
    </points>
  );
};

const Logo = () => {
  const svgRef = useRef<THREE.Group>(null);

  // Cast the returned value from useLoader to SVGData type
  const svgData = useLoader(SVGLoader, '/oa_icon.svg') as SVGData;

  const shapes = useMemo(() => {
    // Flattening the paths into shapes
    return svgData.paths.flatMap((path) => path.toShapes(true));
  }, [svgData]);

  return (
    <group ref={svgRef} scale={[0.01, -0.01, 0.01]} position={[0, 3, 0]}>
      {shapes.map((shape: THREE.Shape, index: number) => (
        <mesh key={index}>
          <shapeGeometry args={[shape]} />
          <meshPhongMaterial color="#2563eb" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
};

const Scene = () => (
  <>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <AIParticles />
    <Screen position={[-3, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
    <Screen position={[0, 0, -2]} rotation={[0, 0, 0]} />
    <Screen position={[3, 0, 0]} rotation={[0, -Math.PI / 6, 0]} />
    <Logo />
    <OrbitControls enableZoom={false} />
  </>
);

const SalesFunnel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <section className="container relative w-full h-screen bg-gradient-to-br from-white-50 via-blue-50 to-purple-50 flex items-center justify-between px-8 overflow-hidden">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="w-1/2 z-10 absolute bottom-10 mx-auto"
      >
        <div className="backdrop-filter backdrop-blur-lg bg-black/5 bg-opacity-10 p-8 rounded-xl">
          <motion.h2 
            variants={itemVariants} 
            className="text-black text-5xl font-bold mb-6 leading-tight"
          >
            <motion.span
              variants={itemVariants}
              className='bg-gradient-to-b from-blue-700 to-slate-950 text-transparent bg-clip-text'
            >
              Ready
            </motion.span>
            {' '}to{' '}
            <motion.span
              variants={itemVariants}
              className='bg-gradient-to-b from-orange-700 to-slate-950 text-transparent bg-clip-text'
            >
              Convert?
            </motion.span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-500 text-xl mb-8"
          >
            Revolutionize your outdoor advertising with our cutting-edge AI technology. Reach the right audience at the right time, maximizing your campaign&apos;s impact.
          </motion.p>
          <motion.button 
            variants={buttonVariants}
            whileHover="hover"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            Book a free 10 min demo
          </motion.button>
        </div>
      </motion.div>
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      <MultiStepModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </section>
  );
};

export default SalesFunnel;