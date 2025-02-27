'use client';
import React from 'react';
import Link from 'next/link';
import { Bebas_Neue } from 'next/font/google';
import { usePathname } from 'next/navigation';

// Configure the Google Font with Bebas Neue
const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--bebas-neue-font'
});

const Navigation = () => {
  const pathname = usePathname();

  const linkStyle = {
    fontFamily: 'var(--bebas-neue-font)',
    fontSize: '54px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'white',
    margin: '12px 0',
    position: 'relative',
    padding: '8px 16px',
    transition: 'all 0.3s ease',
    letterSpacing: '0', // No additional letter spacing
    lineHeight: '1.2',
  };

  const navStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    position: 'fixed',
    bottom: '32px',
    left: '32px',
    zIndex: 10,
    fontFamily: 'var(--bebas-neue-font)',
  };

  // Navigation items with their paths and styles
  const navItems = [
    { path: '/', label: 'Home', style: linkStyle },
    { path: '/Projects', label: 'Projects', style: linkStyle },
    { path: '/Experience', label: 'Experience', style: linkStyle },
    { path: '/Events', label: 'Events', style: linkStyle },
    { path: '/featured', label: 'Featured', style: linkStyle },
  ];

  return (
    <nav className={`${bebasNeue.variable}`} style={navStyle}>
      <style jsx global>{`
        .nav-link {
          position: relative;
          overflow: hidden;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #df8e40, #ff6f61, #df8e40);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.5s ease-in-out;
        }

        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .nav-link:hover {
          color: #df8e40 !important;
          text-shadow: 0 0 10px #df8e40, 0 0 20px #df8e40;
        }

        .nav-link.active {
          color: #df8e40 !important;
        }
      `}</style>

      {navItems.map(({ path, label, style }) => (
        <Link 
          key={path} 
          href={path} 
          style={style}
          className={`nav-link ${pathname === path ? 'active' : ''}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;