/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NEON } from '../data';

export function GlowCube({ size = 48, color = NEON.cyan, style = {} }) {
  // Beautiful interactive isometric glow cube
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 8px ${color})`,
        transition: 'all 0.4s ease',
        ...style
      }}
    >
      {/* Front Left Face */}
      <path
        d="M50 82L20 65V31L50 48v34z"
        fill="rgba(255, 0, 110, 0.15)"
        stroke={NEON.pink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Front Right Face */}
      <path
        d="M50 82l30-17V31L50 48v34z"
        fill="rgba(0, 245, 255, 0.15)"
        stroke={NEON.cyan}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Top Face */}
      <path
        d="M50 14L80 31L50 48L20 31l30-17z"
        fill="rgba(57, 255, 20, 0.15)"
        stroke={NEON.green}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      
      {/* Central Inner Energy Node */}
      <circle
        cx="50"
        cy="48"
        r="5"
        fill={NEON.yellow}
        style={{
          filter: `drop-shadow(0 0 4px ${NEON.yellow})`,
          animation: 'glowPulse 2s ease-in-out infinite'
        }}
      />
      
      {/* Rays linking core to vertices */}
      <line x1="50" y1="48" x2="50" y2="14" stroke={NEON.yellow} strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
      <line x1="50" y1="48" x2="20" y2="31" stroke={NEON.yellow} strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
      <line x1="50" y1="48" x2="80" y2="31" stroke={NEON.yellow} strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
      <line x1="50" y1="48" x2="50" y2="82" stroke={NEON.yellow} strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
    </svg>
  );
}
