import React from 'react';

const Navigation = () => {
  const linkStyle = {
    fontFamily: 'var(--roboto-condensed)',
    fontSize: '48px', // Increased font size
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'white',
    margin: '16px 0', // Vertical margin between links
    position: 'relative',
    padding: '8px 16px', // Adjusted padding for better spacing
    transition: 'all 0.3s ease', // Smooth transition for hover effects
  };

  const boldLinkStyle = {
    ...linkStyle,
    fontWeight: 700,
  };

  const navStyle = {
    '--roboto-condensed': '"Roboto Condensed", sans-serif',
    display: 'flex',
    flexDirection: 'column', // Vertical layout
    justifyContent: 'flex-end', // Align to the bottom
    alignItems: 'flex-start', // Align to the left
    position: 'fixed',
    bottom: '32px', // Position from the bottom
    left: '32px', // Position from the left
    zIndex: 10,
  };

  return (
    <nav style={navStyle}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
      />
      <link
        rel="stylesheet"
        href={`data:text/css;base64,${btoa(`
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
            color: #df8e40; // Change text color on hover
            text-shadow: 0 0 10px #df8e40, 0 0 20px #df8e40; // Glow effect
          }
        `)}`}
      />
      <a href="#home" style={boldLinkStyle} className="nav-link">
        Home
      </a>
      <a href="#projects" style={linkStyle} className="nav-link">
        Projects
      </a>
      <a href="#experience" style={boldLinkStyle} className="nav-link">
        Experience
      </a>
      <a href="#events" style={linkStyle} className="nav-link">
        Events
      </a>
      <a href="#featured" style={boldLinkStyle} className="nav-link">
        Featured
      </a>
    </nav>
  );
};

export default Navigation;