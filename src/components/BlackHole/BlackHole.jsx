import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const BlackHole = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false
    });
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Lower pixel ratio for performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    mountRef.current.appendChild(renderer.domElement);

    // Camera setup
    camera.position.set(0, -4, 6);
    camera.lookAt(0, 0, 0);

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.minPolarAngle = Math.PI * 0.15;
    controls.enableZoom = false;

    // Starfield creation
    const createStarfield = () => {
      // Lowered star count for performance
      const starCount = 1500; // was 15000
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      for (let i = 0; i < starCount; i++) {
        const radius = 40 + Math.random() * 460;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        const colorBase = 0.85;
        const colorVariation = 0.15;
        colors[i * 3] = colorBase + Math.random() * colorVariation;
        colors[i * 3 + 1] = colorBase + Math.random() * colorVariation;
        colors[i * 3 + 2] = colorBase + Math.random() * colorVariation;

        sizes[i] = Math.random() * 3 + 1;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 1,
        sizeAttenuation: true
      });

      return new THREE.Points(geometry, material);
    };

    const starfield = createStarfield();
    scene.add(starfield);

    // Shooting stars creation
    const createShootingStars = () => {
      // Lowered shooting star count for performance
      const starCount = 10; // was 100
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const velocities = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 1000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;

        // Slower velocities
        velocities[i * 3] = (Math.random() - 0.5) * 0.03; // was 0.1
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.03;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        size: 2,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      });

      return {
        points: new THREE.Points(geometry, material),
        velocities: velocities
      };
    };

    const shootingStars = createShootingStars();
    scene.add(shootingStars.points);

    // Black hole system setup
    const blackHoleSystem = new THREE.Group();
    scene.add(blackHoleSystem);
    
    blackHoleSystem.rotation.x = Math.PI * 0.2;
    blackHoleSystem.rotation.z = Math.PI * 0.05;

    const eventHorizon = new THREE.Mesh(
      // Lowered segments for performance
      new THREE.SphereGeometry(2, 24, 24), // was 64, 64
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    
    const outline = new THREE.Mesh(
      // Lowered segments for performance
      new THREE.RingGeometry(2, 2.15, 24), // was 64
      new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide
      })
    );
    
    blackHoleSystem.add(eventHorizon);
    blackHoleSystem.add(outline);

    // Particle system setup
    const colors = {
      innerWhite: new THREE.Color('#eae9dd'),
      lightBeige: new THREE.Color('#bfb9a7'),
      yellow: new THREE.Color('#FFF1A3'),
      orange: new THREE.Color('#e72107')
    };

    const getColorForDistance = (distance) => {
      if (distance < 0.25) {
        return new THREE.Color().lerpColors(
          colors.innerWhite,
          colors.lightBeige,
          distance * 4
        );
      } else if (distance < 0.5) {
        return new THREE.Color().lerpColors(
          colors.lightBeige,
          colors.yellow,
          (distance - 0.25) * 4
        );
      } else {
        return new THREE.Color().lerpColors(
          colors.yellow,
          colors.orange,
          (distance - 0.5) * 4
        );
      }
    };

    const createParticleSystem = (count, radius, height) => {
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const speeds = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = radius + (Math.random() - 0.5) * 0.8;
        positions[i * 3] = Math.cos(angle) * r;
        positions[i * 3 + 1] = height;
        positions[i * 3 + 2] = Math.sin(angle) * r;
        // Slower speeds
        speeds[i] = Math.random() * 0.003 + 0.001; // was 0.01 + 0.005

        const distanceFromCenter = Math.abs(r - 2) / 2;
        const color = getColorForDistance(distanceFromCenter);
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      return {
        geometry: particles,
        speeds: speeds,
        system: new THREE.Points(
          particles,
          new THREE.PointsMaterial({
            size: 0.02,
            transparent: true,
            opacity: 0.8,
            vertexColors: true
          })
        )
      };
    };

    // Create infalling matter system
    const createInfallingMatter = () => {
      // Lowered particle count for performance
      const particleCount = 100; // was 1000
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const accelerations = new Float32Array(particleCount);
      const startRadii = new Float32Array(particleCount);
      
      // Initialize particles in a spiral pattern
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 8 + Math.random() * 4; // Start particles further out
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2; // Slight vertical spread
        positions[i * 3 + 2] = Math.sin(angle) * radius;
        
        startRadii[i] = radius;
        // Slower acceleration
        accelerations[i] = 0.0003 + Math.random() * 0.0007; // was 0.001 + 0.002
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const material = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x88ccff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      
      return {
        system: particles,
        accelerations: accelerations,
        startRadii: startRadii
      };
    };

    // Lowered particle counts for performance
    const diskParticles = createParticleSystem(2000, 3, 0); // was 200000
    const verticalParticles = createParticleSystem(1600, 3, 0); // was 160000
    verticalParticles.system.rotation.x = Math.PI / 2;
    const infallingMatter = createInfallingMatter();

    blackHoleSystem.add(diskParticles.system);
    blackHoleSystem.add(verticalParticles.system);
    blackHoleSystem.add(infallingMatter.system);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const starPositions = starfield.geometry.attributes.position.array;
      for (let i = 0; i < starPositions.length; i += 3) {
        // Basic movement
        starPositions[i] += 0.003; // was 0.01
        starPositions[i + 1] += 0.0015; // was 0.005
        starPositions[i + 2] += 0.0007; // was 0.002
      
        // Calculate distance from black hole center
        const x = starPositions[i];
        const y = starPositions[i + 1];
        const z = starPositions[i + 2];
        const distance = Math.sqrt(x * x + y * y + z * z);
      
        // Apply enhanced gravitational lensing effect for stars near the black hole
        if (distance < 30) {
          const gravityFactor = Math.max(0.05, (distance - 2) / 28);
          const angle = Math.atan2(z, x);
          const orbitSpeed = 0.005 / gravityFactor;
          const newAngle = angle + orbitSpeed;
          const newRadius = distance * (1 - 0.003 / gravityFactor);
          
          starPositions[i] = newRadius * Math.cos(newAngle);
          starPositions[i + 2] = newRadius * Math.sin(newAngle);
          
          if (distance < 15) {
            starPositions[i + 1] *= 0.995;
          }
        }
      
        // Reset stars that move out of bounds
        if (starPositions[i] > 500) starPositions[i] = -500;
        if (starPositions[i + 1] > 500) starPositions[i + 1] = -500;
        if (starPositions[i + 2] > 500) starPositions[i + 2] = -500;
      }
      starfield.geometry.attributes.position.needsUpdate = true;

      // Animate black hole particles
      [diskParticles, verticalParticles].forEach(particleSystem => {
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const z = positions[i + 2];
          // Slower rotation
          const angle = Math.atan2(z, x) + particleSystem.speeds[i / 3];
          const radius = Math.sqrt(x * x + z * z);
          positions[i] = Math.cos(angle) * radius;
          positions[i + 2] = Math.sin(angle) * radius;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
      });

      // Animate infalling matter
      const infallingPositions = infallingMatter.system.geometry.attributes.position.array;
      for (let i = 0; i < infallingPositions.length; i += 3) {
        const x = infallingPositions[i];
        const y = infallingPositions[i + 1];
        const z = infallingPositions[i + 2];
        
        const radius = Math.sqrt(x * x + z * z);
        const angle = Math.atan2(z, x);
        
        const particleIndex = Math.floor(i / 3);
        const acceleration = infallingMatter.accelerations[particleIndex];
        
        if (radius > 2.2) {
          // Slower infall and rotation
          const newRadius = radius - (acceleration * (2.5 / radius)); // was 8
          const angularSpeed = 0.006 * (2.5 / radius); // was 0.02 * 8
          
          infallingPositions[i] = Math.cos(angle + angularSpeed) * newRadius;
          infallingPositions[i + 1] *= 0.99;
          infallingPositions[i + 2] = Math.sin(angle + angularSpeed) * newRadius;
          
          const opacity = Math.min(1, (radius - 2.2) / 3);
          infallingMatter.system.material.opacity = opacity;
        } else {
          const startRadius = infallingMatter.startRadii[particleIndex];
          const newAngle = Math.random() * Math.PI * 2;
          infallingPositions[i] = Math.cos(newAngle) * startRadius;
          infallingPositions[i + 1] = (Math.random() - 0.5) * 2;
          infallingPositions[i + 2] = Math.sin(newAngle) * startRadius;
        }
      }
      infallingMatter.system.geometry.attributes.position.needsUpdate = true;

      controls.update();
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full bg-black relative" style={{ zIndex: 1 }}>
      <div ref={mountRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />
    </div>
  );
};

export default BlackHole;