"use client";
import { useEffect, useRef } from "react";
import Navigation from "src/components/Navigation/Navigation.jsx";
import * as THREE from "three";

export default function ExperiencePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const starsVertices = [];

    for (let i = 0; i < 6000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (canvasRef.current) {
        canvasRef.current.innerHTML = "";
      }
    };
  }, []);

  const containerStyle = {
    position: 'relative',
    height: '100vh',
    width: '100%',
    color: 'white',
    overflow: 'hidden'
  };

  const contentContainerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-10%, -50%)',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const mainTitleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    textAlign: 'right'
  };

  const canvasContainerStyle = {
    position: 'absolute',
    inset: 0,
    zIndex: 0
  };

  return (
    <div style={containerStyle}>
      <Navigation />
      <div style={contentContainerStyle}>
        <h1 style={mainTitleStyle}>What I can do</h1>
      </div>
      <div ref={canvasRef} style={canvasContainerStyle} />
    </div>
  );
}