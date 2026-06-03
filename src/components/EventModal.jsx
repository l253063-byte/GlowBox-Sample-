/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { NEON } from '../data';
import { X } from 'lucide-react';

export function EventModal({ onClose }) {
  const [eventType, setEventType] = useState('Birthday');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requests, setRequests] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [particles, setParticles] = useState([]);
  
  const submitBtnRef = useRef(null);

  // Confetti effect tracker
  useEffect(() => {
    if (particles.length === 0) return;

    let animId;
    const update = () => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.3, // gravity
            alpha: p.alpha - 0.018
          }))
          .filter(p => p.alpha > 0)
      );
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [particles]);

  const handleSubmit = () => {
    if (!name || !phone || !date) {
      alert("Please fill in Name, Phone Number, and Preferred Date to file an inquiry!");
      return;
    }

    const btn = submitBtnRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const colors = [NEON.pink, NEON.cyan, NEON.green, NEON.yellow, NEON.purple, NEON.orange];
      const newParticles = [];
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 4;
        newParticles.push({
          id: i + Math.random(),
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 5,
          alpha: 1.0
        });
      }
      setParticles(newParticles);
    }

    setIsSubmitted(true);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 0, 16, 0.9)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
      className="animate-[fadeIn_0.3s_ease-out_forwards] style-scrollbar"
    >
      {/* Floating Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
            opacity: p.alpha,
            pointerEvents: 'none',
            zIndex: 100001,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Centering wrapper — uses min-height + flex so card centers when short, scrolls when tall */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          padding: '24px 16px'
        }}
      >
      {/* Modal Card */}
      <div 
        style={{
          background: NEON.bgMid,
          border: `2px solid ${NEON.pink}`,
          boxShadow: `0 0 35px rgba(255,0,110,0.3), inset 0 0 15px rgba(255,0,110,0.1)`,
          borderRadius: '24px',
          maxWidth: '560px',
          width: '100%',
          position: 'relative'
        }}
        className="p-6 md:p-8 select-none animate-[scaleIn_0.3s_cubic-bezier(0.175, 0.885, 0.32, 1.2)_forwards]"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-400 hover:text-white transition-all w-8 h-8 rounded-full bg-[#1b002f] flex items-center justify-center border border-purple-500/20 shadow-lg cursor-pointer"
        >
          <X size={18} />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div 
              style={{
                width: '74px',
                height: '74px',
                border: `2px solid ${NEON.green}`,
                borderRadius: '50%',
                boxShadow: `0 0 15px ${NEON.green}`,
                background: '#120022'
              }}
              className="flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-3xl animate-bounce">✨</span>
            </div>
            
            <h3 
              style={{
                fontFamily: '"Black Ops One", monospace',
                color: '#FFFFFF',
                textShadow: `0 0 10px ${NEON.green}`,
                letterSpacing: '1px'
              }}
              className="text-2xl md:text-3xl mb-4"
            >
              We'll be in touch soon! ✨
            </h3>

            <p className="text-gray-300 text-sm max-w-sm mx-auto mb-8 font-sans">
              Your planning brief for <span className="text-white font-bold">{eventType}</span> on <span className="text-white font-bold">{date}</span> has been received! Our Event Coordinator will message or dial you at <span className="text-[#00F5FF] font-black">{phone}</span> to curate the perfect custom neon set.
            </p>

            <button
              onClick={onClose}
              style={{
                fontFamily: '"Orbitron", sans-serif',
                border: `1px solid ${NEON.green}`,
                boxShadow: `0 0 10px ${NEON.green}22`,
                color: NEON.green
              }}
              className="px-8 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#18002d]/60 hover:bg-[#18002d] transition-all cursor-pointer"
            >
              Return to Gallery
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span 
                style={{
                  fontFamily: '"Orbitron", sans-serif',
                  letterSpacing: '3px',
                  color: NEON.pink,
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}
              >
                EVENT INQUIRY
              </span>
              <h3 
                style={{
                  fontFamily: '"Black Ops One", monospace',
                  color: '#FFFFFF',
                  textShadow: `0 0 8px ${NEON.pink}`
                }}
                className="text-2xl mt-1 tracking-wide"
              >
                PLAN A GLOW PARTY
              </h3>
            </div>

            <div className="space-y-4 text-left">
              {/* Event Type & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={e => setEventType(e.target.value)}
                    className="w-full bg-[#1a012d] border border-purple-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-pink-500"
                  >
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Corporate">Corporate Team Building</option>
                    <option value="School">School/Institution Outing</option>
                    <option value="Kitty Party">Kitty Party</option>
                    <option value="Other">Custom Celebration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full bg-[#1a012d] border border-purple-500/20 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              {/* Guests Count & Planner Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                    Estimated Guest Volume
                  </label>
                  <input
                    type="number"
                    value={guests}
                    onChange={e => setGuests(e.target.value)}
                    placeholder="e.g. 15-20"
                    className="w-full bg-[#1a012d] border border-purple-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                    Planner's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-[#1a012d] border border-purple-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. 0326 8644458"
                    className="w-full bg-[#1a012d] border border-purple-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="hello@gmail.com"
                    className="w-full bg-[#1a012d] border border-purple-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                  Aesthetic Theme & Special Catering Requirements
                </label>
                <textarea
                  value={requests}
                  onChange={e => setRequests(e.target.value)}
                  placeholder="Tell us if you need custom t-shirt stencils, specific music playlists, customized mocktail counts, or special accessibility support..."
                  rows={3}
                  className="w-full bg-[#1a012d] border border-purple-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500 resize-none font-sans"
                />
              </div>

              {/* CTAs */}
              <div className="pt-2">
                <button
                  ref={submitBtnRef}
                  onClick={handleSubmit}
                  style={{
                    fontFamily: '"Orbitron", sans-serif',
                    background: `linear-gradient(90deg, ${NEON.pink}, ${NEON.purple})`,
                    boxShadow: `0 0 15px ${NEON.pink}`,
                    color: '#FFFFFF'
                  }}
                  className="w-full py-3.5 rounded-xl font-bold text-xs tracking-widest uppercase cursor-pointer hover:scale-[1.01] transition-all text-center"
                >
                  SUBMIT RESERVATION BRIEF ✨
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
