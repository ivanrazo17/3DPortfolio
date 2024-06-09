import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

// Component to render the 3D computer model
const Computers = ({ isMobile }) => {
  // Load the GLTF model of the computer
  const computer = useGLTF('./desktop_pc/scene.gltf');

  return (
    <mesh>
      {/* Adding lighting to the scene */}
      <hemisphereLight intensity={5} groundColor="black" />
      <pointLight intensity={2} />
      <spotLight 
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      {/* Adding the computer model to the scene with responsive scaling and positioning */}
      <primitive  
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
}

// Component to set up the canvas and handle responsiveness
const ComputersCanvas = () => {
  // State to check if the screen width is for mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Media query to check screen width
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    
    // Set the initial value based on the media query
    setIsMobile(mediaQuery.matches);

    // Handler for media query changes
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    // Add event listener for changes in screen size
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Cleanup event listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* Suspense fallback to show loader while the model is being loaded */}
      <Suspense fallback={<CanvasLoader />}>
        {/* Controls for orbiting the camera around the model */}
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        {/* Render the computer model with the isMobile prop */}
        <Computers isMobile={isMobile} />
      </Suspense>
      {/* Preload all assets for smoother experience */}
      <Preload all />
    </Canvas>
  );
}

export default ComputersCanvas;
