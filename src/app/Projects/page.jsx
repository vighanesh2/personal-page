"use client";
import { Bebas_Neue } from 'next/font/google';
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navigation from "src/components/Navigation/Navigation.jsx";
import SocialLinks from "src/components/SocialLinks/SocialLinks.jsx";
import Logo from 'src/components/Logo/Logo.jsx';
import * as THREE from "three";

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--bebas-neue-font'
});

export default function ProjectsPage() {
  // Project data array with links
  const projects = [
    {
      id: 1,
      number: "01",
      title: "Projects",
      subtitle: "Developed personal website using ThreeJs",
      image: "/project1.png",
      link: "https://project1.com"
    },
    {
      id: 2,
      number: "02",
      title: "Projects",
      subtitle: "Innovative Solutions for Modern Challenges",
      image: "/project2.png",
      link: "https://project2.com"
    },
    {
      id: 3,
      number: "03",
      title: "Projects",
      subtitle: "Education app for sharing notes, homeworks, and more",
      image: "/project3.png",
      link: "https://project3.com"
    },
    {
      id: 4,
      number: "04",
      title: "Projects",
      subtitle: "Education app for students with learning disabilities",
      image: "/project4.png",
      link: "https://project3.com"
    },
    {
      id: 5,
      number: "05",
      title: "Projects",
      subtitle: "Web Design and Devlopment",
      image: "/project5.png",
      link: "https://project3.com"
    },
    {
      id: 6,
      number: "06",
      title: "Projects",
      subtitle: "Location Sharing App",
      image: "/project6.png",
      link: "https://project3.com"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef(null);

  const nextProject = () => {
    console.log('Next clicked');
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    console.log('Previous clicked');
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
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
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  };

  const projectContentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    pointerEvents: 'auto',
    width: '900px', // Fixed total width
    maxWidth: '900px'
  };

  const titleStyle = {
    fontFamily: 'var(--bebas-neue-font)',
    fontSize: '48px',
    letterSpacing: '0.1em'
  };

  const imageContainerStyle = {
    position: 'relative',
    width: '500px', // Fixed width
    height: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: '10px',
    overflow: 'hidden'
  };

  const imageWrapperStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const imageStyle = {
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '100%'
  };

  const rightContentStyle = {
    width: '360px', // Remaining width to match total 900px
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '500px',
    paddingBottom: '20px',
    boxSizing: 'border-box'
  };

  const numberStyle = {
    fontFamily: 'var(--bebas-neue-font)',
    fontSize: '64px',
    letterSpacing: '0.05em',
    marginBottom: '20px',
    whiteSpace: 'nowrap'
  };

  const subtitleStyle = {
    fontSize: '24px',
    color: 'white',
    opacity: '0.8',
    wordWrap: 'break-word',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const linkIconStyle = {
    width: '40px',
    height: '40px',
    marginTop: '20px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease'
  };

  const navigationArrowsStyle = {
    display: 'flex',
    gap: '20px',
    marginTop: '20px'
  };

  const arrowStyle = {
    fontSize: '24px',
    cursor: 'pointer',
    padding: '10px 20px',
    border: '1px solid white',
    background: 'transparent',
    color: 'white',
    transition: 'all 0.3s ease'
  };

  const canvasContainerStyle = {
    position: 'absolute',
    inset: 0,
    zIndex: 0
  };

  return (
    <div className={bebasNeue.variable} style={containerStyle}>
      <Logo />
      <Navigation />
      <div style={contentContainerStyle}>
        <h1 style={titleStyle}>{projects[currentIndex].title}</h1>
        <div style={projectContentStyle}>
          <div style={imageContainerStyle}>
            <div style={imageWrapperStyle}>
              <Image
                key={projects[currentIndex].id}
                src={projects[currentIndex].image}
                alt={projects[currentIndex].title}
                width={500}
                height={500}
                priority
                style={imageStyle}
              />
            </div>
          </div>
          <div style={rightContentStyle}>
            <div style={numberStyle}>{projects[currentIndex].number}</div>
            <p style={subtitleStyle}>{projects[currentIndex].subtitle}</p>
          </div>
        </div>
        <a 
          href={projects[currentIndex].link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <svg 
            style={linkIconStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <div style={navigationArrowsStyle}>
          <button 
            onClick={prevProject} 
            style={arrowStyle}
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
            onClick={nextProject} 
            style={arrowStyle}
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
      <div ref={canvasRef} style={canvasContainerStyle} />
    </div>
  );
}