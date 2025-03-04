"use client";
import { Bebas_Neue } from 'next/font/google';
import React, { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation/Navigation.jsx";
import SocialLinks from "@/components/SocialLinks/SocialLinks.jsx";
import Logo from '@/components/Logo/Logo.jsx';
import * as THREE from "three";

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--bebas-neue-font'
});

// Sample featured links
const featuredLinks = [
  {
    id: 1,
    title: "Hackathon Win!",
    publication: "NYIT",
    date: "March 04 2024",
    description: "CyberHack & ACM Hosts their First Hackathon of the Year!",
    link: "https://blogs.nyit.edu/inside_engineering/cyberhack_and_acm_hosts_their_first_hackathon_of_the_year"
  },
  {
    id: 2,
    title: "Research",
    publication: "NYIT",
    date: "2024",
    description: "Students Impress in 2024 UREP Project Presentations",
    link: "https://www.nyit.edu/news/articles/students-impress-in-2024-urep-project-presentations-2/"
  },
  {
    id: 3,
    title: "Research Recognition",
    publication: "NYIT",
    date: "May 2024",
    description: "Students Impress with 2024 UREP Projects",
    link: "https://nyit.meritpages.com/achievements/Students-Impress-with-2024-UREP-Projects/176977?"
  },
  {
    id: 4,
    title: "Tutoring Recognition",
    publication: "NYIT",
    date: "2024",
    description: "NYIT's Learning Center is here to help all students meet their course goals 🎯 Watch & learn more about our Peer Tutoring program, directly from Tech students who utilize the LC, and from our very own Peer Tutors!",
    link: "https://www.instagram.com/reel/C5WNVeOiCXR/"
  }
];

export default function FeaturedPage() {
  const [activeIndex, setActiveIndex] = useState(null);
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

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.innerHTML = "";
      }
    };
  }, []);

  const toggleDescription = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div ref={canvasRef} style={styles.canvas} />
      <div className={bebasNeue.variable} style={styles.container}>
        <Logo />
        <Navigation />
        <div style={styles.contentContainer}>
        <h1 style={styles.title}>Featured</h1>
        <p style={styles.subtitle}>
          Honored to have my work recognized by these publications and platforms.
        </p>
        
        <div style={styles.featuredGrid}>
          {featuredLinks.map((feature, index) => (
            <div 
              key={feature.id} 
              style={{
                ...styles.featuredCard,
                ...(activeIndex === index ? styles.cardExpanded : {})
              }}
              onClick={() => toggleDescription(index)}
            >
              <div style={styles.cardContent}>
                <h2 style={styles.cardTitle}>{feature.title}</h2>
                <p style={styles.cardPublication}>
                  {feature.publication}
                  <span style={styles.cardDate}>{feature.date}</span>
                </p>
                <p style={{
                  ...styles.cardDescription,
                  ...(activeIndex === index ? styles.descriptionExpanded : {})
                }}>
                  {feature.description}
                </p>
                <a 
                  href={feature.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{
                    ...styles.cardButton,
                    ...(activeIndex === index ? styles.buttonExpanded : {})
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  View Feature
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SocialLinks />
      </div>
    </>
  );
}

const styles = {
  canvas: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none' // This allows clicking through the canvas
  },
  container: {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    color: 'white',
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    overflow: 'hidden'
  },
  contentContainer: {
    position: 'relative',
    padding: '120px 20px 60px',
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'var(--bebas-neue-font)',
    fontSize: '48px',
    letterSpacing: '0.05em',
    marginBottom: '15px',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    maxWidth: '600px',
    textAlign: 'center',
    marginBottom: '40px'
  },
  featuredGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
    gap: '25px',
    width: '100%'
  },
  featuredCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer'
  },
  cardExpanded: {
    transform: 'translateY(-5px)',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
  },
  cardContent: {
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  cardTitle: {
    fontFamily: 'var(--bebas-neue-font)',
    fontSize: '24px',
    margin: '0',
    letterSpacing: '0.05em'
  },
  cardPublication: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0'
  },
  cardDate: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)'
  },
  cardDescription: {
    fontSize: '15px',
    lineHeight: '1.5',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: '5px',
    height: '0',
    overflow: 'hidden',
    transition: 'height 0.3s ease, opacity 0.3s ease',
    opacity: '0'
  },
  descriptionExpanded: {
    height: 'auto',
    marginTop: '12px',
    marginBottom: '12px',
    opacity: '1'
  },
  cardButton: {
    background: 'transparent',
    border: '1px solid white',
    color: 'white',
    padding: '10px 16px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '8px',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    textAlign: 'center',
    textDecoration: 'none',
    height: '0',
    overflow: 'hidden',
    opacity: '0'
  },
  buttonExpanded: {
    height: 'auto',
    opacity: '1'
  }
};