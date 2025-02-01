// src/components/Scene.jsx
'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Stars } from '@react-three/drei'
import BlackHole from './BlackHole'
import { Suspense } from 'react'

export default function Scene() {
  return (
    <div className="w-full h-full" style={{ background: '#000000' }}>
      <Canvas>
        <color attach="background" args={['#000000']} />
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5} 
          />
          <BlackHole />
        </Suspense>
      </Canvas>
    </div>
  )
}