"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const canvasRef = useRef(null);

  // Advanced star background effect with nebula and enhanced visuals
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    // Create multiple star layers for depth
    const createStarLayer = (count, size, opacity, color, distance) => {
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      
      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * distance;
        const y = (Math.random() - 0.5) * distance;
        const z = (Math.random() - 0.5) * distance;
        vertices.push(x, y, z);
      }
      
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      
      const material = new THREE.PointsMaterial({ 
        size: size,
        color: color,
        transparent: true,
        opacity: opacity,
        sizeAttenuation: true
      });
      
      return new THREE.Points(geometry, material);
    };

    // Add multiple star layers
    const starLayers = [
      createStarLayer(3000, 1.0, 0.8, 0xffffff, 2000),
      createStarLayer(2000, 1.5, 0.6, 0xaaaaff, 1500),
      createStarLayer(1000, 2.0, 0.4, 0xffffaa, 1200),
      createStarLayer(500, 2.5, 0.2, 0xffaaff, 1000)
    ];
    
    starLayers.forEach(layer => scene.add(layer));

    // Add nebula-like effect with particles
    const nebulaParticles = 800;
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaPositions = [];
    const nebulaSizes = [];
    const nebulaColors = [];
    
    const nebulaColorOptions = [
      new THREE.Color(0x3366ff), // Blue
      new THREE.Color(0xff3366), // Pink
      new THREE.Color(0x33ff66), // Green
      new THREE.Color(0x9933ff)  // Purple
    ];
    
    for (let i = 0; i < nebulaParticles; i++) {
      // Create clusters of particles for nebula effect
      const angle = Math.random() * Math.PI * 2;
      const radius = 300 + Math.random() * 400;
      const tilt = Math.random() * Math.PI * 0.25;
      
      const x = Math.cos(angle) * Math.sin(tilt) * radius;
      const y = Math.cos(tilt) * radius * 0.4; // Flatten the nebula
      const z = Math.sin(angle) * Math.sin(tilt) * radius;
      
      nebulaPositions.push(x, y, z);
      
      // Random size for each particle
      nebulaSizes.push(20 + Math.random() * 30);
      
      // Random color from our options
      const color = nebulaColorOptions[Math.floor(Math.random() * nebulaColorOptions.length)];
      nebulaColors.push(color.r, color.g, color.b);
    }
    
    nebulaGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nebulaPositions, 3));
    nebulaGeometry.setAttribute('size', new THREE.Float32BufferAttribute(nebulaSizes, 1));
    nebulaGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nebulaColors, 3));
    
    // Create shader material for the nebula
    const nebulaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          // Add some gentle movement to the nebula
          pos.x += sin(time * 0.001 + position.z * 0.01) * 10.0;
          pos.y += cos(time * 0.001 + position.x * 0.01) * 5.0;
          pos.z += sin(time * 0.001 + position.y * 0.01) * 10.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create soft, glowing particles
          float r = length(gl_PointCoord - vec2(0.5, 0.5));
          if (r > 0.5) discard;
          
          float alpha = 1.0 - r * 2.0;
          gl_FragColor = vec4(vColor, alpha * 0.2);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);

    // Add a subtle glow to the entire scene
    const glowGeometry = new THREE.SphereGeometry(600, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x0033ff) },
        color2: { value: new THREE.Color(0xff3300) }
      },
      vertexShader: `
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vPosition;
        
        void main() {
          float noise = sin(vPosition.x * 0.01 + time * 0.001) * 
                        cos(vPosition.y * 0.01 + time * 0.0005) * 
                        sin(vPosition.z * 0.01 + time * 0.0007);
          
          noise = (noise + 1.0) * 0.5; // Map to 0-1 range
          vec3 color = mix(color1, color2, noise);
          
          float alpha = 0.03 + 0.02 * sin(time * 0.0005);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    camera.position.z = 800;

    // Clock for animations
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime() * 1000;
      
      // Update nebula and glow time uniform
      nebulaMaterial.uniforms.time.value = time;
      glowMaterial.uniforms.time.value = time;
      
      // Rotate star layers at different speeds
      starLayers.forEach((layer, i) => {
        const speed = 0.0001 * (i + 1);
        layer.rotation.x += speed * 0.5;
        layer.rotation.y += speed;
      });
      
      // Rotate nebula slowly
      nebula.rotation.y += 0.0001;
      
      // Move camera slightly for parallax effect
      const t = time * 0.0001;
      camera.position.x = Math.sin(t * 0.5) * 50;
      camera.position.y = Math.cos(t * 0.3) * 30;
      
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (canvasRef.current && canvasRef.current.firstChild) {
        canvasRef.current.removeChild(canvasRef.current.firstChild);
      }
      
      // Dispose of all THREE.js resources
      renderer.dispose();
      starLayers.forEach(layer => {
        layer.geometry.dispose();
        layer.material.dispose();
      });
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
    };
  }, []);

  return <div ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />;
};

export default ThreeBackground;