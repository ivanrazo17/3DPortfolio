import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei'
import CanvasLoader from '../Loader'

// Ball component that renders a floating ball with a decal texture
const Ball = (props) => {
  // Load the texture from the provided image URL
  const [decal] = useTexture([props.imgUrl]);

  return (
    // Float provides floating animation to the ball
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} /> {/* Ambient light for soft illumination */}
      <directionalLight position={[0, 0, 0.05]} /> {/* Directional light for more focused illumination */}
      <mesh castShadow receiveShadow scale={2.75}> {/* Mesh for the ball */}
        <icosahedronGeometry args={[1, 1]} /> {/* Geometry of the ball, an icosahedron */}
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        /> {/* Material of the ball with specific color and shading */}
        <Decal 
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}
        /> {/* Decal to apply the texture on the ball */}
      </mesh>
    </Float>
  )
}

// BallCanvas component that sets up the canvas and controls for rendering the Ball
const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* Suspense fallback to show loader while the model is being loaded */}
      <Suspense fallback={<CanvasLoader />}>
        {/* Controls for orbiting the camera around the model */}
        <OrbitControls enableZoom={false}/>
        {/* Render the Ball component with the provided icon URL */}
        <Ball imgUrl={icon} />
      </Suspense>
      {/* Preload all assets for a smoother experience */}
      <Preload all />
    </Canvas>
  )
}

export default BallCanvas
