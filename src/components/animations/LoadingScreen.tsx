
'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Bounds, Edges } from '@react-three/drei';
import * as THREE from 'three';

const FILL_DURATION = 2.5; // seconds
const FADE_OUT_DURATION = 0.5; // seconds

const brandColor = new THREE.Color("hsl(135, 94%, 45%)");

const LiquidFillMaterial = {
  uniforms: {
    time: { value: 0.0 },
    fillColor: { value: brandColor },
    baseColor: { value: new THREE.Color('white') },
    minY: { value: 0.0 },
    maxY: { value: 0.0 },
    fillProgress: { value: 0.0 },
  },
  vertexShader: `
    varying vec3 vWorldPosition;
    void main() {
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 fillColor;
    uniform vec3 baseColor;
    uniform float minY;
    uniform float maxY;
    uniform float fillProgress;
    varying vec3 vWorldPosition;

    void main() {
      float fillHeight = mix(minY, maxY, fillProgress);
      vec3 color = baseColor;
      if (vWorldPosition.y < fillHeight) {
        color = fillColor;
      }
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

function LogoModel({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const { scene } = useGLTF('/logo.glb');
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const [bbox, setBbox] = useState<THREE.Box3 | null>(null);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    setBbox(box);
    if(shaderRef.current) {
        shaderRef.current.uniforms.minY.value = box.min.y;
        shaderRef.current.uniforms.maxY.value = box.max.y;
    }
  }, [scene]);

  useFrame(({ clock }) => {
    if (shaderRef.current) {
        const elapsedTime = clock.getElapsedTime();
        const progress = Math.min(elapsedTime / FILL_DURATION, 1.0);
        shaderRef.current.uniforms.fillProgress.value = progress;

        if (progress >= 1.0) {
            onAnimationComplete();
        }
    }
  });

  return (
    <primitive object={scene}>
      <shaderMaterial 
        ref={shaderRef} 
        attach="material" 
        args={[LiquidFillMaterial]} 
      />
    </primitive>
  );
}

useGLTF.preload('/logo.glb');

export default function LoadingScreen() {
    const [visible, setVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    const handleAnimationComplete = () => {
        setIsFading(true);
    };

    useEffect(() => {
        if(isFading) {
            const timer = setTimeout(() => setVisible(false), FADE_OUT_DURATION * 1000);
            return () => clearTimeout(timer);
        }
    }, [isFading]);

    if(!visible) return null;

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
                opacity: isFading ? 0 : 1,
                transition: `opacity ${FADE_OUT_DURATION}s ease-out`,
            }}
        >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color={brandColor} />

                <Suspense fallback={null}>
                    <Bounds fit clip observe margin={1.2}>
                         <LogoModel onAnimationComplete={handleAnimationComplete} />
                    </Bounds>
                </Suspense>
            </Canvas>
        </div>
    );
}
