'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from 'src/components/Navigation/Navigation.jsx';
import FooterText from 'src/components/FooterText/FooterText.jsx';
import SocialLinks from 'src/components/SocialLinks/SocialLinks.jsx';
import Logo from 'src/components/Logo/Logo.jsx'; // Import the new Logo component

const BlackHole = dynamic(() => import('src/components/BlackHole/BlackHole.jsx'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center text-white">
      Loading...
    </div>
  ),
});

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <Logo /> {/* Add the Logo component */}
      <Navigation />
      <div className="relative w-full h-full">
        <BlackHole />
        <FooterText />
        <SocialLinks />
      </div>
    </main>
  );
}