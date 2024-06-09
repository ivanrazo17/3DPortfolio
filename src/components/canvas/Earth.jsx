import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"

import CanvasLoader from '../Loader'

// Earth component to load and render the 3D model of the Earth
const Earth = () => {
  // Load the GLTF model
  const earth = useGLTF('./planet/scene.gltf');
  return (
    // Render the loaded GLTF model as a primitive in the scene
    <primitive  
      object={earth.scene}
      scale={2.5} // Scale the model to 2.5 times its original size
      position-y={0} // Position the model along the y-axis
      rotation-y={0} // Rotate the model along the y-axis
    />
  )
}

// EarthCanvas component to set up the Three.js canvas and controls
const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{ 
        fov: 45, // Field of view
        near: 0.1, // Near clipping plane
        far: 200, // Far clipping plane
        position: [-4, 3, 6] // Initial camera position
      }}
    >
      {/* Suspense fallback to show loader while the model is being loaded */}
      <Suspense fallback={<CanvasLoader />}>
        {/* Controls for orbiting the camera around the model */}
        <OrbitControls
          autoRotate // Automatically rotate the camera around the model
          enableZoom={false} // Disable zooming
          maxPolarAngle={Math.PI / 2} // Maximum vertical angle for camera rotation
          minPolarAngle={Math.PI / 2} // Minimum vertical angle for camera rotation
        />
        {/* Render the Earth model */}
        <Earth />
      </Suspense>
      {/* Preload all assets for a smoother experience */}
      <Preload all />
    </Canvas>
  )
}

export default EarthCanvas;
