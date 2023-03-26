import React, { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, OrbitControls, Html, Loader, useProgress } from '@react-three/drei';

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);

  return (
    <mesh>
      <bufferGeometry attach="geometry" {...gltf.scene.children[0].geometry} />
      <meshBasicMaterial attach="material" color="white" wireframe />
    </mesh>
  );
}

function CustomLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span>{progress.toFixed()} %</span>
    </Html>
  );
}

export default function ThreeDModel({ modelUrl }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={<CustomLoader />}>
          <Model url={modelUrl} />
        </Suspense>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
}
