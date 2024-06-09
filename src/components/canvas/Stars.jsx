import { useState, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Preload } from "@react-three/drei"
import * as random from 'maath/random/dist/maath-random.esm'

// Stars component to render a field of stars
const Stars = (props) => {
  const ref = useRef()

  // Generate random positions for the stars within a sphere
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.2 })
  
  // Update the rotation of the stars in each frame
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  })

  return (
    // Group to hold the stars with initial rotation
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        {/* Material for the points */}
        <PointMaterial 
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

// StarCanvas component to set up the Three.js canvas and render the Stars component
const StarCanvas = () => {
  return (
    // Full-screen container for the canvas
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Suspense fallback to handle loading state */}
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        {/* Preload all assets for a smoother experience */}
        <Preload all />
      </Canvas>
    </div>
  )
}

export default StarCanvas
