'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Bounds, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// This is the 3D model component with the custom shader logic.
function Model({ onAnimationComplete }: { onAnimationComplete: () => void; }) {
  const { nodes } = useGLTF('/logo.glb');
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Initialize shader material
  const material = new THREE.ShaderMaterial({
    uniforms: {
      fillColor: { value: new THREE.Color('#00FF88') },
      baseColor: { value: new THREE.Color('#FFFFFF') },
      fillAmount: { value: 0.0 }, // Start with 0 fill
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
        // Normalize the world Y position based on the bounding box
        float height = (vWorldPosition.y - boundingBoxMin.y) / (boundingBoxMax.y - boundingBoxMin.y);
        
        // Determine color based on fill amount
        vec3 finalColor = mix(baseColor, fillColor, step(height, fillAmount));

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
  });

  // Calculate bounding box once the model is loaded
  useEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current);
      if (materialRef.current) {
        materialRef.current.uniforms.boundingBoxMin.value = box.min;
        materialRef.current.uniforms.boundingBoxMax.value = box.max;
      }
    }
  }, [nodes]);

  // Animation loop
  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    
    // Animate fillAmount from 0 to 1 over 2.5 seconds
    const elapsedTime = clock.getElapsedTime();
    let progress = elapsedTime / 2.5;

    if (progress < 1.0) {
      materialRef.current.uniforms.fillAmount.value = progress;
    } else {
      materialRef.current.uniforms.fillAmount.value = 1.0;
      // Trigger completion after a short delay
      setTimeout(onAnimationComplete, 300);
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <mesh 
        geometry={(nodes.DentiSystems_Logo_SVG as THREE.Mesh).geometry} 
        material={material} 
        ref={materialRef} 
      />
    </group>
  );
}

// Preload the model to improve initial render time
useGLTF.preload('/logo.glb');


// The main scene component that gets dynamically imported
export default function Scene({ onAnimationComplete }: { onAnimationComplete: () => void; }) {
  return (
    <Canvas>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={2} castShadow />
      <Bounds fit clip observe margin={1.2}>
        <Model onAnimationComplete={onAnimationComplete} />
      </Bounds>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
