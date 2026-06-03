/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from 'react';
import { NEON } from '../data';

// Deterministic seed-based pseudo-random generator (mulberry32)
function createRandom(seed) {
  let s = seed + 123456789;
  return function() {
    let t = (s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function SplatterBG({ seed = 1 }) {
  const elements = useMemo(() => {
    const rnd = createRandom(seed);
    const colors = [NEON.pink, NEON.cyan, NEON.green, NEON.yellow, NEON.purple, NEON.orange];
    
    const count = Math.floor(rnd() * 11) + 15; // 15 to 25 blobs
    const blobs = [];
    
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(rnd() * colors.length)];
      const w = Math.floor(rnd() * 220) + 80;   // 80 to 300px
      const h = Math.floor(rnd() * 140) + 60;   // 60 to 200px
      const top = Math.floor(rnd() * 100);       // percent
      const left = Math.floor(rnd() * 100);      // percent
      const blur = Math.floor(rnd() * 41) + 40;  // 40 to 80px
      const opacity = (rnd() * 0.1) + 0.08;     // 0.08 to 0.18
      const rot = Math.floor(rnd() * 360);       // degrees
      
      // Organic rounded border ratios
      const br1 = Math.floor(rnd() * 21) + 40; // 40-60
      const br2 = Math.floor(rnd() * 21) + 40; // 40-60
      const br3 = Math.floor(rnd() * 21) + 40; // 40-60
      const br4 = Math.floor(rnd() * 21) + 40; // 40-60
      const borderRadius = `${br1}% ${100 - br1}% ${br2}% ${100 - br2}% / ${br3}% ${br4}% ${100 - br4}% ${100 - br3}%`;

      blobs.push({
        id: `blob-${i}`,
        style: {
          position: 'absolute',
          width: `${w}px`,
          height: `${h}px`,
          top: `${top}%`,
          left: `${left}%`,
          borderRadius,
          background: color,
          filter: `blur(${blur}px)`,
          opacity,
          transform: `rotate(${rot}deg) translate(-50%, -50%)`,
          transformOrigin: 'center',
          pointerEvents: 'none',
        }
      });
    }

    // Paint Drips
    const dripCount = Math.floor(rnd() * 3) + 3; // 3 to 5 drips
    const drips = [];
    for (let i = 0; i < dripCount; i++) {
      const color = colors[Math.floor(rnd() * colors.length)];
      const w = Math.floor(rnd() * 13) + 8; // 8 to 20px
      const h = Math.floor(rnd() * 61) + 80; // 80 to 140px
      const left = Math.floor(rnd() * 85) + 5; // offset 5-90%
      const opacity = (rnd() * 0.2) + 0.15; // slightly more visible
      
      drips.push({
        id: `drip-${i}`,
        style: {
          position: 'absolute',
          width: `${w}px`,
          height: `${h}px`,
          top: '0px',
          left: `${left}%`,
          borderRadius: '0 0 50% 50%',
          background: color,
          filter: 'blur(3px)',
          opacity,
          pointerEvents: 'none',
          animation: 'paintDrip 4s ease-out forwards',
          animationDelay: `${rnd() * 2}s`,
        }
      });
    }

    return { blobs, drips };
  }, [seed]);

  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      {elements.blobs.map((blob) => (
        <div key={blob.id} style={blob.style} />
      ))}
      {elements.drips.map((drip) => (
        <div key={drip.id} style={drip.style} />
      ))}
    </div>
  );
}
