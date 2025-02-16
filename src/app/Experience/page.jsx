"use client";
import { Bebas_Neue } from 'next/font/google';
import React, { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation/Navigation.jsx";
import * as THREE from "three";
import SocialLinks from "@/components/SocialLinks/SocialLinks.jsx";
import Logo from '@/components/Logo/Logo.jsx';

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--bebas-neue-font'
});

const experiences = [
  {
    id: 1,
    number: "01",
    title: "Senior Software Engineer",
    company: "Tech Innovation Labs",
    period: "2021 - Present",
    description: "Leading full-stack development of enterprise applications, managing a team of 5 developers, and implementing microservices architecture.",
    skills: ["React", "Node.js", "AWS", "Microservices", "Team Leadership"]
  },
  {
    id: 2,
    number: "02",
    title: "Full Stack Developer",
    company: "Digital Solutions Inc",
    period: "2019 - 2021",
    description: "Developed scalable web applications, improved system performance by 40%, and implemented CI/CD pipelines.",
    skills: ["JavaScript", "Python", "Docker", "MongoDB", "DevOps"]
  },
  {
    id: 3,
    number: "03",
    title: "Frontend Developer",
    company: "Creative Web Agency",
    period: "2017 - 2019",
    description: "Created responsive web interfaces, collaborated with designers, and optimized web performance.",
    skills: ["HTML/CSS", "React", "UI/UX", "Performance Optimization"]
  }
];

export default function ExperiencePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef(null);

  const nextExperience = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const prevExperience = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

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

  const styles = {
    container: {
      position: 'relative',
      height: '100vh',
      width: '100%',
      color: 'white',
      overflow: 'hidden'
    },
    contentContainer: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    },
    experienceCard: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '40px',
      width: '900px',
      maxWidth: '900px',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px',
      padding: '40px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease'
    },
    leftContent: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    rightContent: {
      width: '200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    title: {
      fontFamily: 'var(--bebas-neue-font)',
      fontSize: '48px',
      letterSpacing: '0.1em',
      margin: '0'
    },
    number: {
      fontFamily: 'var(--bebas-neue-font)',
      fontSize: '64px',
      color: 'rgba(255, 255, 255, 0.3)',
      margin: '0'
    },
    company: {
      fontSize: '24px',
      color: 'rgba(255, 255, 255, 0.8)',
      margin: '0'
    },
    period: {
      fontSize: '18px',
      color: 'rgba(255, 255, 255, 0.6)',
      marginTop: '5px'
    },
    description: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: 'rgba(255, 255, 255, 0.8)',
      marginTop: '20px'
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '20px'
    },
    skill: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    navigationArrows: {
      display: 'flex',
      gap: '20px',
      marginTop: '30px'
    },
    arrow: {
      fontSize: '24px',
      cursor: 'pointer',
      padding: '10px 20px',
      border: '1px solid white',
      background: 'transparent',
      color: 'white',
      transition: 'all 0.3s ease'
    },
    canvas: {
      position: 'absolute',
      inset: 0,
      zIndex: 0
    }
  };

  return (
    <div className={bebasNeue.variable} style={styles.container}>
      <Logo />
      <Navigation />
      <div style={styles.contentContainer}>
        <h1 style={styles.title}>Experience</h1>
        <div style={styles.experienceCard}>
          <div style={styles.leftContent}>
            <h2 style={styles.title}>{experiences[currentIndex].title}</h2>
            <h3 style={styles.company}>{experiences[currentIndex].company}</h3>
            <p style={styles.period}>{experiences[currentIndex].period}</p>
            <p style={styles.description}>{experiences[currentIndex].description}</p>
            <div style={styles.skillsContainer}>
              {experiences[currentIndex].skills.map((skill, index) => (
                <span key={index} style={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div style={styles.rightContent}>
            <div style={styles.number}>{experiences[currentIndex].number}</div>
          </div>
        </div>
        <div style={styles.navigationArrows}>
          <button 
            onClick={prevExperience} 
            style={styles.arrow}
            onMouseEnter={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = 'black';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'white';
            }}
          >
            ←
          </button>
          <button 
            onClick={nextExperience} 
            style={styles.arrow}
            onMouseEnter={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = 'black';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'white';
            }}
          >
            →
          </button>
        </div>
      </div>
      <SocialLinks />
      <div ref={canvasRef} style={styles.canvas} />
    </div>
  );
}