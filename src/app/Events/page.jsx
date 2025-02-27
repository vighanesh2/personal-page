'use client'
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

const events = [
  {
    id: 1,
    title: "HackNYU 2025",
    date: "2025-02-09",
    timestamp: "T+1Y 280D 14H",
    messageCount: "Message 1/23",
    thumbnail: "./HackNYU",
    description: "My journey of NYU hackathon",
    duration: "4:21"
  },
  {
    id: 2,
    title: "AI Hackathon Journey",
    date: "2023-11-30",
    timestamp: "T+1Y 204D 6H",
    messageCount: "Message 2/23",
    thumbnail: "/api/placeholder/400/300",
    description: "48-hour hackathon vlog - Building AI solutions",
    duration: "12:15"
  },
  {
    id: 3,
    title: "Workshop: React Advanced",
    date: "2023-12-20",
    timestamp: "T+1Y 224D 9H",
    messageCount: "Message 3/23",
    thumbnail: "/api/placeholder/400/300",
    description: "Advanced React patterns and performance optimization",
    duration: "24:18"
  }
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isTvOn, setIsTvOn] = useState(false);
  const [interference, setInterference] = useState(false);
  const canvasRef = useRef(null);
  const interferenceTimeout = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Create a more dispersed starfield like in Interstellar
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 2,
      transparent: true,
      opacity: 0.8
    });
    const starsVertices = [];

    for (let i = 0; i < 8000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.x += 0.0001;
      stars.rotation.y += 0.0002;
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

  const handleEventSelect = (event) => {
    setIsTvOn(false);
    setInterference(true);
    
    // Clear any existing timeout
    if (interferenceTimeout.current) {
      clearTimeout(interferenceTimeout.current);
    }

    // Simulate digital interference effect
    interferenceTimeout.current = setTimeout(() => {
      setInterference(false);
      setSelectedEvent(event);
      setIsTvOn(true);
    }, 1500);
  };

  const turnOffTV = () => {
    setInterference(true);
    setTimeout(() => {
      setIsTvOn(false);
      setInterference(false);
      setSelectedEvent(null);
    }, 1000);
  };

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
      gap: '40px',
      width: '100%',
      maxWidth: '1200px'
    },
    title: {
      fontFamily: 'var(--bebas-neue-font)',
      fontSize: '48px',
      letterSpacing: '0.1em',
      margin: '0',
      textAlign: 'center'
    },
    tvContainer: {
      position: 'relative',
      width: '800px',
      height: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    tvFrame: {
      position: 'relative',
      width: '100%',
      height: '100%',
      background: '#333',
      borderRadius: '20px',
      padding: '20px',
      boxShadow: '0 0 40px rgba(0,0,0,0.5)'
    },
    tvInner: {
      background: '#222',
      height: '100%',
      borderRadius: '10px',
      overflow: 'hidden',
      position: 'relative'
    },
    tvScreen: {
      width: '100%',
      height: '90%',
      background: '#000',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      animation: 'flicker 2s infinite'
    },
    interference: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '200%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      animation: 'interference 0.5s linear infinite',
      zIndex: 2
    },
    tvStatic: {
      width: '100%',
      height: '100%',
      background: `
        radial-gradient(ellipse, transparent 0%, rgba(0,0,0,0.75) 100%), 
        repeating-radial-gradient(circle at 50%, transparent, rgba(255,255,255,0.1) 1px)
      `,
      animation: 'tvStatic 0.5s infinite linear',
      opacity: 0.3
    },
    tvContent: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0',
      position: 'relative'
    },
    messageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      padding: '10px 20px',
      background: 'rgba(0,0,0,0.7)',
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#00ff00'
    },
    tvImage: {
      width: '100%',
      height: '70%',
      objectFit: 'cover'
    },
    tvInfo: {
      padding: '20px',
      width: '100%',
      background: 'rgba(0,0,0,0.8)'
    },
    tvInfoHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    },
    tvTitle: {
      fontFamily: 'var(--bebas-neue-font)',
      fontSize: '24px',
      margin: '0'
    },
    tvDate: {
      fontSize: '16px',
      color: 'rgba(255,255,255,0.7)',
      margin: '0 0 10px 0'
    },
    tvDescription: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.9)',
      lineHeight: '1.6'
    },
    duration: {
      color: '#00ff00',
      fontFamily: 'monospace',
      fontSize: '14px'
    },
    tvButtons: {
      height: '10%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      background: '#333',
      borderBottomLeftRadius: '10px',
      borderBottomRightRadius: '10px'
    },
    powerButton: {
      background: '#1a1a1a',
      border: '1px solid #00ff00',
      color: '#00ff00',
      padding: '8px 16px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: 'monospace',
      fontSize: '14px'
    },
    tvStand: {
      position: 'absolute',
      bottom: '-50px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '200px',
      height: '50px',
      background: '#333',
      clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
    },
    eventList: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      width: '100%',
      padding: '0 20px'
    },
    eventCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      padding: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '250px'
    },
    eventHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '10px'
    },
    eventTitle: {
      fontFamily: 'var(--bebas-neue-font)',
      fontSize: '20px',
      margin: '0',
      flex: 1,
      paddingRight: '10px'
    },
    eventTimestamp: {
      color: '#00ff00',
      fontFamily: 'monospace',
      fontSize: '12px'
    },
    eventDate: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.6)',
      margin: '0'
    },
    eventMessageCount: {
      color: '#00ff00',
      fontFamily: 'monospace',
      fontSize: '12px',
      marginTop: '10px',
      display: 'block'
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
        <h1 style={styles.title}>Temporal Archives</h1>
        
        {/* Retro TV */}
        <div style={styles.tvContainer}>
          <div style={styles.tvFrame}>
            <div style={styles.tvInner}>
              <div style={{
                ...styles.tvScreen,
                background: isTvOn ? 'black' : '#222',
              }}>
                {interference && (
                  <div style={styles.interference}></div>
                )}
                {selectedEvent && isTvOn && (
                  <div style={styles.tvContent}>
                    <div style={styles.messageHeader}>
                      <span>{selectedEvent.timestamp}</span>
                      <span>{selectedEvent.messageCount}</span>
                    </div>
                    <img 
                      src={selectedEvent.thumbnail} 
                      alt={selectedEvent.title}
                      style={styles.tvImage}
                    />
                    <div style={styles.tvInfo}>
                      <div style={styles.tvInfoHeader}>
                        <h3 style={styles.tvTitle}>{selectedEvent.title}</h3>
                        <span style={styles.duration}>{selectedEvent.duration}</span>
                      </div>
                      <p style={styles.tvDate}>{selectedEvent.date}</p>
                      <p style={styles.tvDescription}>{selectedEvent.description}</p>
                    </div>
                  </div>
                )}
                {!isTvOn && !interference && (
                  <div style={styles.tvStatic}></div>
                )}
              </div>
              <div style={styles.tvButtons}>
                <button 
                  style={{
                    ...styles.powerButton,
                    background: isTvOn ? '#1a1a1a' : '#1a1a1a',
                    ':hover': {
                      background: '#00ff00',
                      color: '#000'
                    }
                  }}
                  onClick={isTvOn ? turnOffTV : () => setIsTvOn(true)}
                >
                  {isTvOn ? 'End Transmission' : 'Initialize'}
                </button>
              </div>
            </div>
            <div style={styles.tvStand}></div>
          </div>
        </div>

        {/* Event Selection */}
        <div style={styles.eventList}>
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                ...styles.eventCard,
                border: selectedEvent?.id === event.id ? '2px solid #fff' : '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onClick={() => handleEventSelect(event)}
            >
              <div style={styles.eventHeader}>
                <h3 style={styles.eventTitle}>{event.title}</h3>
                <span style={styles.eventTimestamp}>{event.timestamp}</span>
              </div>
              <p style={styles.eventDate}>{event.date}</p>
              <span style={styles.eventMessageCount}>{event.messageCount}</span>
            </div>
          ))}
        </div>
      </div>

      <SocialLinks />
      <div ref={canvasRef} style={styles.canvas} />
      
      <style jsx global>{`
        @keyframes interference {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes tvStatic {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100% 100%;
          }
        }
        
        @keyframes flicker {
          0% { opacity: 0.8; }
          5% { opacity: 0.85; }
          10% { opacity: 0.9; }
          15% { opacity: 0.85; }
          20% { opacity: 0.8; }
          25% { opacity: 0.75; }
          30% { opacity: 0.9; }
          35% { opacity: 0.85; }
          40% { opacity: 0.8; }
          45% { opacity: 0.85; }
          50% { opacity: 0.9; }
          55% { opacity: 0.85; }
          60% { opacity: 0.8; }
          65% { opacity: 0.75; }
          70% { opacity: 0.9; }
          75% { opacity: 0.85; }
          80% { opacity: 0.8; }
          85% { opacity: 0.85; }
          90% { opacity: 0.9; }
          95% { opacity: 0.85; }
          100% { opacity: 0.8; }
        }

        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .scanline {
          width: 100%;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          position: absolute;
          animation: scanline 4s linear infinite;
        }

        button:hover {
          background: #00ff00 !important;
          color: #000 !important;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: #000;
          overflow: hidden;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}