'use client';
import React from 'react';
import { Bebas_Neue } from 'next/font/google';

// Configure the Google Font with Bebas Neue
const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--bebas-neue-font'
});

const Logo = () => {
  const containerStyle = {
    position: 'fixed',
    top: '20px',
    left: '40px',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'var(--bebas-neue-font)',
    fontSize: '54px',
    textTransform: 'uppercase',
    letterSpacing: '0'
  };

  return (
    <div className={bebasNeue.variable} style={containerStyle}>
      VG
    </div>
  );
};

export default Logo;