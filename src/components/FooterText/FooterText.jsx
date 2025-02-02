'use client';
import React from 'react';
import Image from 'next/image';
import { Bebas_Neue } from 'next/font/google';

// Configure the Google Font with Bebas Neue
const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--bebas-neue-font'
});

const FooterText = () => {
  const footerStyle = {
    fontFamily: 'var(--bebas-neue-font)',
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '32px',
    textAlign: 'center',
    color: 'white',
    zIndex: 2,
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0'
  };

  const imageContainerStyle = {
    position: 'relative',
    width: '150px',
    height: '150px',
    marginLeft: '20px'
  };

  return (
    <div className={bebasNeue.variable} style={footerStyle}>
      <div>
        <h1 style={{ 
          fontSize: '54px', 
          margin: '0',
          lineHeight: '1.2'
        }}>VIGHANESH GAUND</h1>
        <p style={{ 
          fontSize: '36px', 
          margin: '0',
          lineHeight: '1.2'
        }}>SOFTWARE ENGINEER</p>
      </div>
      <div style={imageContainerStyle}>
        <Image
          src="/welcome.svg"
          alt="Welcome"
          fill
          style={{
            objectFit: 'contain'
          }}
          priority
        />
      </div>
    </div>
  );
};

export default FooterText;