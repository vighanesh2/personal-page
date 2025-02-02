'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'; // Import icons from react-icons

const SocialLinks = () => {
  const socialStyle = {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    zIndex: 10,
  };

  const iconStyle = {
    color: 'white',
    fontSize: '45px',
    transition: 'color 0.3s ease, transform 0.3s ease',
  };

  const hoverStyle = {
    color: '#df8e40', // Change to your preferred hover color
    transform: 'scale(1.2)', // Slightly enlarge on hover
  };

  return (
    <div style={socialStyle}>
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle}
        onMouseOver={(e) => (e.currentTarget.style.color = hoverStyle.color)}
        onMouseOut={(e) => (e.currentTarget.style.color = iconStyle.color)}
      >
        <FaGithub />
      </a>
      <a
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle}
        onMouseOver={(e) => (e.currentTarget.style.color = hoverStyle.color)}
        onMouseOut={(e) => (e.currentTarget.style.color = iconStyle.color)}
      >
        <FaLinkedin />
      </a>
      <a
        href="https://twitter.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle}
        onMouseOver={(e) => (e.currentTarget.style.color = hoverStyle.color)}
        onMouseOut={(e) => (e.currentTarget.style.color = iconStyle.color)}
      >
        <FaTwitter />
      </a>
      <a
        href="mailto:youremail@example.com"
        style={iconStyle}
        onMouseOver={(e) => (e.currentTarget.style.color = hoverStyle.color)}
        onMouseOut={(e) => (e.currentTarget.style.color = iconStyle.color)}
      >
        <FaEnvelope />
      </a>
    </div>
  );
};

export default SocialLinks;