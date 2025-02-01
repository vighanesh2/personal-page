// src/components/FooterText/FooterText.jsx
'use client'; // Mark this component as client-side only

import React from 'react';

const FooterText = () => {
  const footerStyle = {
    fontFamily: '"Roboto Condensed", sans-serif',
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '32px',
    textAlign: 'center',
    color: 'white',
    zIndex: 2,
    textTransform: 'uppercase', // Make text all caps
  };

  return (
    <div style={footerStyle}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
      />
      <h1 className="text-2xl font-bold">Vighanesh Gaund</h1>
      <p className="text-lg">Software Engineer</p>
    </div>
  );
};

export default FooterText;