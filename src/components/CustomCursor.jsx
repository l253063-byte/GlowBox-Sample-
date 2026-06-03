/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { NEON } from '../data';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Use a ref for standard requestAnimationFrame LERP tracker to prevent excessive state trigger lag
  const cursorRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    // Only enable custom cursor for fine-pointer systems (desktops with mouse/pointers)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsVisible(true);

    const onMouseMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if mouse is over an interactive item to trigger outer cursor burst
      const target = e.target;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('[role="button"]') ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive-glow')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Lerp tracking for the slower background ring
    const render = () => {
      const easeFactor = 0.16;
      const targetX = cursorRef.current.x;
      const targetY = cursorRef.current.y;
      
      trailRef.current.x += (targetX - trailRef.current.x) * easeFactor;
      trailRef.current.y += (targetY - trailRef.current.y) * easeFactor;
      
      setTrail({ x: trailRef.current.x, y: trailRef.current.y });
      animationFrameId.current = requestAnimationFrame(render);
    };
    
    // Set baseline coordinates to match inner state
    trailRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Core Dot: follows immediately */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: NEON.pink,
          boxShadow: `0 0 8px ${NEON.pink}, 0 0 16px ${NEON.pink}`,
          pointerEvents: 'none',
          zIndex: 99999,
          transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0) scale(${isHovered ? 0.75 : 1})`,
          transition: 'transform 0.08s ease-out',
        }}
      />
      {/* Large Outer Target Ring: follows with lerp delay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '48px' : '36px',
          height: isHovered ? '48px' : '36px',
          borderRadius: '50%',
          border: `2.5px solid ${isHovered ? NEON.green : NEON.cyan}`,
          boxShadow: isHovered 
            ? `0 0 15px ${NEON.green}, 0 0 30px ${NEON.green}33, inset 0 0 8px ${NEON.green}44` 
            : `0 0 10px ${NEON.cyan}, 0 0 20px ${NEON.cyan}33`,
          pointerEvents: 'none',
          zIndex: 99998,
          transform: `translate3d(${trail.x - (isHovered ? 24 : 18)}px, ${trail.y - (isHovered ? 24 : 18)}px, 0)`,
          background: isHovered ? 'rgba(57, 255, 20, 0.08)' : 'rgba(0, 245, 255, 0.02)',
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
        }}
      />
    </>
  );
}
