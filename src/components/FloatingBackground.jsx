import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './FloatingBackground.css';

export function FloatingBackground() {
  const bgRef = useRef(null);

  useGSAP(() => {
    // Select all glowing orbs
    const orbs = gsap.utils.toArray('.orb');
    
    orbs.forEach((orb) => {
      // Create a slow, mesmerising breathing and drifting effect
      gsap.to(orb, {
        x: () => gsap.utils.random(-150, 150),
        y: () => gsap.utils.random(-150, 150),
        scale: () => gsap.utils.random(0.8, 1.2),
        duration: gsap.utils.random(15, 25),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, { scope: bgRef });

  return (
    <div className="floating-background" ref={bgRef}>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <div className="orb orb-4"></div>
    </div>
  );
}
