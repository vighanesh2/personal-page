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
      alpha: false // Changed from true to false
    });
    renderer.setClearColor(0x000000, 1); // Set background color to black
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
      const starCount = 15000;
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
      const starCount = 100; // Number of shooting stars
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const velocities = new Float32Array(starCount * 3); // Velocity for each star

      for (let i = 0; i < starCount; i++) {
        // Random starting position
        positions[i * 3] = (Math.random() - 0.5) * 1000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;

        // Random velocity (direction and speed)
        velocities[i * 3] = (Math.random() - 0.5) * 0.1;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
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
      new THREE.SphereGeometry(2, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    
    const outline = new THREE.Mesh(
      new THREE.RingGeometry(2, 2.15, 64),
      new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide
      })
    );
    
    blackHoleSystem.add(eventHorizon);
    blackHoleSystem.add(outline);

    // Particle system setup (existing code)
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
        speeds[i] = Math.random() * 0.01 + 0.005;

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

    const diskParticles = createParticleSystem(200000, 3, 0);
    const verticalParticles = createParticleSystem(160000, 3, 0);
    verticalParticles.system.rotation.x = Math.PI / 2;

    blackHoleSystem.add(diskParticles.system);
    blackHoleSystem.add(verticalParticles.system);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate starfield (move stars slowly)
      const starPositions = starfield.geometry.attributes.position.array;
      for (let i = 0; i < starPositions.length; i += 3) {
        starPositions[i] += 0.01; // Move stars along the x-axis
        starPositions[i + 1] += 0.005; // Move stars along the y-axis
        starPositions[i + 2] += 0.002; // Move stars along the z-axis

        // Reset stars that move out of bounds
        if (starPositions[i] > 500) starPositions[i] = -500;
        if (starPositions[i + 1] > 500) starPositions[i + 1] = -500;
        if (starPositions[i + 2] > 500) starPositions[i + 2] = -500;
      }
      starfield.geometry.attributes.position.needsUpdate = true;

      // Animate shooting stars
      const positions = shootingStars.points.geometry.attributes.position.array;
      const velocities = shootingStars.velocities;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Reset position if star goes out of bounds
        if (Math.abs(positions[i]) > 500 || Math.abs(positions[i + 1]) > 500 || Math.abs(positions[i + 2]) > 500) {
          positions[i] = (Math.random() - 0.5) * 1000;
          positions[i + 1] = (Math.random() - 0.5) * 1000;
          positions[i + 2] = (Math.random() - 0.5) * 1000;
        }
      }
      shootingStars.points.geometry.attributes.position.needsUpdate = true;

      // Animate black hole particles (existing code)
      [diskParticles, verticalParticles].forEach(particleSystem => {
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const z = positions[i + 2];
          const angle = Math.atan2(z, x) + particleSystem.speeds[i / 3];
          const radius = Math.sqrt(x * x + z * z);
          positions[i] = Math.cos(angle) * radius;
          positions[i + 2] = Math.sin(angle) * radius;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
      });

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