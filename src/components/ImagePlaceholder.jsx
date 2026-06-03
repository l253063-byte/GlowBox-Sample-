/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';

export function ImagePlaceholder({ 
  id, 
  width = '100%', 
  height = '100%', 
  label, 
  borderColor = '#FF006E', 
  style = {} 
}) {
  const [hasError, setHasError] = useState(false);

  if (!hasError) {
    return (
      <img 
        src={`/assets/images/${id}.jpg`} 
        alt={label} 
        style={{ 
          width, 
          height, 
          objectFit: 'cover', 
          borderRadius: 16, 
          border: `2px solid ${borderColor}`,
          boxShadow: `0 0 12px ${borderColor}, 0 0 30px ${borderColor}40`,
          ...style 
        }}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <div
      data-img-id={id}
      style={{
        width,
        height,
        background: '#16002A',
        border: `2px solid ${borderColor}`,
        boxShadow: `0 0 12px ${borderColor}, 0 0 30px ${borderColor}40`,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        ...style
      }}
    >
      {/* Neon corner brackets */}
      <div style={{ position: 'absolute', top: 12, left: 12, width: 22, height: 22, borderTop: `2px solid ${borderColor}`, borderLeft: `2px solid ${borderColor}` }} />
      <div style={{ position: 'absolute', top: 12, right: 12, width: 22, height: 22, borderTop: `2px solid ${borderColor}`, borderRight: `2px solid ${borderColor}` }} />
      <div style={{ position: 'absolute', bottom: 12, left: 12, width: 22, height: 22, borderBottom: `2px solid ${borderColor}`, borderLeft: `2px solid ${borderColor}` }} />
      <div style={{ position: 'absolute', bottom: 12, right: 12, width: 22, height: 22, borderBottom: `2px solid ${borderColor}`, borderRight: `2px solid ${borderColor}` }} />
      
      {/* Decorative Grid Mesh Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
        pointerEvents: 'none'
      }} />

      {/* Center content */}
      <div style={{ 
        fontSize: 36, 
        marginBottom: 8, 
        opacity: 0.65, 
        filter: `drop-shadow(0 0 8px ${borderColor})`,
        animation: 'floatY 4s ease-in-out infinite' 
      }}>
        🖼️
      </div>
      
      <p style={{ 
        color: '#FFFFFF',
        fontFamily: 'Orbitron, sans-serif', 
        fontSize: 11, 
        margin: '0 16px 4px 16px',
        fontWeight: 'bold',
        letterSpacing: 2, 
        textAlign: 'center',
        textShadow: `0 0 5px ${borderColor}`
      }}>
        {label.toUpperCase()}
      </p>
      
      <p style={{ 
        color: borderColor,
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 10,
        fontWeight: 500,
        opacity: 0.8,
        letterSpacing: 1
      }}>
        GLOWBOX ROOMS
      </p>

      <p style={{ 
        color: 'rgba(255,255,255,0.25)', 
        fontSize: 9, 
        marginTop: 6, 
        fontFamily: 'Space Grotesk, sans-serif',
        letterSpacing: 0.5
      }}>
        img_{id}
      </p>
    </div>
  );
}
