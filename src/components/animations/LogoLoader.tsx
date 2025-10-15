
'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// This component is responsible for loading and rendering the 3D model.
function Model(props: any) {
  // The useGLTF hook loads the .glb file from the public directory.
  // Make sure your file is located at `public/logo.glb`.
  const { scene } = useGLTF('/logo.glb');
  const modelRef = useRef<any>();

  // This useFrame hook will rotate the model on every frame, creating an animation.
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  // The primitive object is used to render the loaded scene directly.
  return <primitive object={scene} ref={modelRef} {...props} />;
}

// The main loader component that sets up the 3D scene.
const LogoLoader = () => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-background z-50 pointer-events-none"
      style={{
        animation: 'logo-fade-out 0.5s ease-out 2.5s forwards',
      }}
    >
      <Canvas style={{ width: '150px', height: '150px' }}>
        {/* Suspense is crucial. It shows a fallback (null here) while the 3D model is loading. */}
        <Suspense fallback={null}>
          {/* Add some lighting to make the model visible. */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          
          {/* Render the model component. */}
          <Model scale={1.5} />
          
          {/* Optional: OrbitControls allow you to drag and rotate the model with your mouse.
              This is helpful for debugging but should be disabled for a real loader.
          <OrbitControls enableZoom={false} /> 
          */}
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the model so it's ready faster.
useGLTF.preload('/logo.glb');

export default LogoLoader;
