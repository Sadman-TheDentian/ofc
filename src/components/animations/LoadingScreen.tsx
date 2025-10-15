'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Bounds, Edges } from '@react-three/drei';
import * as THREE from 'three';

// This component is responsible for loading and rendering the 3D model.
function Model(props) {
  const { nodes } = useGLTF('/logo.glb');
  const meshRef = useRef();

  // Custom shader material for the liquid fill effect
  const material = new THREE.ShaderMaterial({
    uniforms: {
      fillColor: { value: new THREE.Color('#00FF88') },
      baseColor: { value: new THREE.Color('#FFFFFF') },
      fillAmount: { value: 0.0 },
      boundingBoxMin: { value: new THREE.Vector3() },
      boundingBoxMax: { value: new THREE.Vector3() },
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 fillColor;
      uniform vec3 baseColor;
      uniform float fillAmount;
      uniform vec3 boundingBoxMin;
      uniform vec3 boundingBoxMax;
      varying vec3 vWorldPosition;

      void main() {
        float height = (vWorldPosition.y - boundingBoxMin.y) / (boundingBoxMax.y - boundingBoxMin.y);
        if (height < fillAmount) {
          gl_FragColor = vec4(fillColor, 1.0);
        } else {
          gl_FragColor = vec4(baseColor, 1.0);
        }
      }
    `,
  });

  // Calculate the bounding box of the model to control the fill animation
  useEffect(() => {
    if (meshRef.current) {
      const box = new THREE.Box3().setFromObject(meshRef.current);
      material.uniforms.boundingBoxMin.value = box.min;
      material.uniforms.boundingBoxMax.value = box.max;
    }
  }, [nodes, material.uniforms.boundingBoxMin, material.uniforms.boundingBoxMax]);

  return (
    <group {...props} dispose={null}>
      <mesh ref={meshRef} geometry={(nodes.DentiSystems_Logo_SVG as THREE.Mesh).geometry} material={material} />
    </group>
  );
}

// Preload the model so it's ready when the component mounts
useGLTF.preload('/logo.glb');

// This component controls the animation and fade-out logic
function AnimationController({ onAnimationComplete }) {
  const [fill, setFill] = useState(0);
  const startTime = useRef(Date.now());

  useFrame(() => {
    const elapsedTime = Date.now() - startTime.current;
    let progress = elapsedTime / 2500; // 2.5 second duration

    if (progress < 1) {
      setFill(progress);
    } else {
      setFill(1);
      setTimeout(onAnimationComplete, 300); // Wait a bit before fading out
    }
  });
  
  // This is a bit of a hack to get the fill amount to the shader
  // A more robust solution would use context or a shared store
  useEffect(() => {
    const interval = setInterval(() => {
      document.dispatchEvent(new CustomEvent('fillUpdate', { detail: fill }));
    }, 16);
    return () => clearInterval(interval);
  }, [fill]);

  return null;
}

// The main loading screen component
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const materialRef = useRef<THREE.ShaderMaterial>();
  
  useEffect(() => {
    const handleFillUpdate = (e: CustomEvent) => {
        if(materialRef.current) {
            materialRef.current.uniforms.fillAmount.value = e.detail;
        }
    };
    document.addEventListener('fillUpdate', handleFillUpdate as EventListener);
    return () => document.removeEventListener('fillUpdate', handleFillUpdate as EventListener);
  }, []);

  const handleAnimationComplete = () => {
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      // Clean up Three.js resources
      const canvas = document.querySelector('canvas');
      const renderer = canvas?.getContext('webgl2');
      if (renderer) {
        (renderer as any).getExtension('WEBGL_lose_context')?.loseContext();
      }
    }, 500); // Match fade duration
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a0a',
        zIndex: 9999,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      <Suspense fallback={null}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
           <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={2} castShadow />
          <Bounds fit clip observe margin={1.2}>
            <Model />
          </Bounds>
          <AnimationController onAnimationComplete={handleAnimationComplete} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </Suspense>
    </div>
  );
}
