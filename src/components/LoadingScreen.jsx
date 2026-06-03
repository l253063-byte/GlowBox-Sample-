/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { GlowCube } from './GlowCube';
import { NEON } from '../data';

export function LoadingScreen({ onDone }) {
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    // Hide scrolling on major page container during introduction
    document.body.style.overflow = 'hidden';
    
    // Play for 2.2 seconds then initiate transition
    const timer = setTimeout(() => {
      setShouldFadeOut(true);
    }, 2200);

    // Completely finish fade out 500ms later
    const doneTimer = setTimeout(() => {
      document.body.style.overflow = 'unset';
      onDone();
    }, 2700);

    return () => {
      clearTimeout(timer);
      clearTimeout(doneTimer);
      document.body.style.overflow = 'unset';
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050009',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: shouldFadeOut ? 0 : 1,
        pointerEvents: shouldFadeOut ? 'none' : 'auto',
        transition: 'opacity 0.5s ease-out-in',
      }}
    >
      {/* Decorative background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(191,0,255,0.05) 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
        opacity: 0.7,
        pointerEvents: 'none'
      }} />

      {/* Main Container */}
      <div className="flex flex-col items-center select-none text-center px-4">
        {/* Animated GlowCube scale(0) -> scale(1) */}
        <div 
          className="mb-8"
          style={{
            animation: 'scaleIn 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          }}
        >
          <GlowCube size={110} />
        </div>

        {/* Brand Header with neonFlicker keyframe */}
        <h1
          style={{
            fontFamily: '"Black Ops One", monospace',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            letterSpacing: '0.05em',
            color: '#FFFFFF',
            textShadow: `0 0 10px ${NEON.cyan}, 0 0 25px ${NEON.cyan}, 0 0 50px ${NEON.cyan}`,
            animation: 'neonFlicker 2s infinite alternate',
            lineHeight: 1.1
          }}
        >
          GLOWBOX
        </h1>
        
        {/* Sub-label */}
        <p
          style={{
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '11px',
            letterSpacing: '0.45em',
            color: NEON.pink,
            textShadow: `0 0 8px ${NEON.pink}`,
            marginTop: '8px',
            textTransform: 'uppercase',
          }}
        >
          Pakistan's First Neon Art Studio
        </p>

        {/* Progress percent mockup */}
        <div style={{
          marginTop: '36px',
          fontFamily: '"Orbitron", monospace',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '10px',
          letterSpacing: '2px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ 
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: NEON.green,
            boxShadow: `0 0 8px ${NEON.green}`,
            animation: 'glowPulse 1.5s infinite'
          }} />
          CHARGING BLACKLIGHT FILAMENTS...
        </div>
      </div>

      {/* Sweeping bottom gradient bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: `linear-gradient(90deg, ${NEON.pink}, ${NEON.cyan}, ${NEON.yellow}, ${NEON.green}, ${NEON.purple}, ${NEON.pink})`,
          backgroundSize: '200% 100%',
          animation: 'shimmerBar 3s linear infinite',
        }}
      />
    </div>
  );
}
