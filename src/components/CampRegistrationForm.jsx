/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { NEON } from '../data';

export function CampRegistrationForm() {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [batch, setBatch] = useState('batch1'); // 'batch1' or 'batch2'
  const [timeslot, setTimeslot] = useState('Monday'); // 'Monday' | 'Wednesday' | 'Friday'
  const [plan, setPlan] = useState('early'); // 'early' | 'standard'
  const [notes, setNotes] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [particles, setParticles] = useState([]);
  
  const submitBtnRef = useRef(null);
  const canvasRef = useRef(null);

  // Trigger confetti particle simulation upon success
  useEffect(() => {
    if (particles.length === 0) return;

    let animId;
    const updateParticles = () => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.28, // gravity
            alpha: p.alpha - 0.015
          }))
          .filter(p => p.alpha > 0)
      );
      animId = requestAnimationFrame(updateParticles);
    };

    animId = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(animId);
  }, [particles]);

  const handleSubmit = () => {
    // Validate minimally to prevent accidental inputs
    if (!childName || !parentPhone || !parentName) {
      alert("Please fill in at least Child Name, Parent Name, and Phone Number to secure registration!");
      return;
    }

    // Generate unique reference
    const randNum = Math.floor(1000 + Math.random() * 9000);
    setBookingRef(`GB-2026-${randNum}`);

    // Trigger colorful confetti explosion from button metrics
    const btn = submitBtnRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const colors = [NEON.pink, NEON.cyan, NEON.green, NEON.yellow, NEON.purple, NEON.orange];
      const newParticles = [];
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 4;
        newParticles.push({
          id: i + Math.random(),
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2, // lift biases upward
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 10 + 6,
          alpha: 1.0
        });
      }
      setParticles(newParticles);
    }

    setIsSuccess(true);
  };

  return (
    <div 
      className="w-full relative bg-[#130022] border-2 border-purple-500/20 rounded-3xl p-6 md:p-10 select-none overflow-hidden"
      style={{
        boxShadow: `0 0 30px rgba(191,0,255,0.08), inset 0 0 15px rgba(191,0,255,0.1)`
      }}
    >
      {/* Absolute Confetti Portal */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '4px',
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            opacity: p.alpha,
            pointerEvents: 'none',
            zIndex: 100000,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {isSuccess ? (
        <div 
          className="flex flex-col items-center justify-center text-center py-12 animate-[fadeSlideUp_0.6s_ease-out_forwards]"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          <div 
            className="w-20 h-20 rounded-full bg-[#1e0a2f] flex items-center justify-center mb-6 border-2"
            style={{ 
              borderColor: NEON.green,
              boxShadow: `0 0 20px ${NEON.green}, inset 0 0 10px ${NEON.green}33`
            }}
          >
            <span style={{ fontSize: '40px' }} className="animate-pulse">✨</span>
          </div>

          <h2 
            style={{ 
              fontFamily: '"Black Ops One", monospace',
              color: '#FFFFFF',
              textShadow: `0 0 12px ${NEON.green}`,
              letterSpacing: '1px'
            }}
            className="text-3xl md:text-4xl mb-4"
          >
            🎉 YOU'RE REGISTERED!
          </h2>

          <p style={{ color: NEON.yellow, fontFamily: '"Orbitron", sans-serif' }} className="text-sm font-bold tracking-widest mb-6">
            BOOKING REFERENCE: <span className="bg-[#1b002f] px-3 py-1 border border-yellow-400 rounded-md shadow-[0_0_10px_rgba(255,215,0,0.3)]">{bookingRef}</span>
          </p>

          <p className="text-gray-300 max-w-lg mb-8 text-base">
            We have locked in your summer camp placeholder. Our registrar will reach out to you at <span className="text-white font-bold">{parentPhone}</span> (or via <span className="text-white font-bold">{parentEmail || 'email'}</span>) within 24 hours to coordinate invoice settlement & finalize onboarding.
          </p>

          <button
            onClick={() => {
              setIsSuccess(false);
              setChildName('');
              setChildAge('');
              setSchoolName('');
              setParentName('');
              setParentPhone('');
              setParentEmail('');
              setNotes('');
            }}
            className="px-6 py-2.5 rounded-full border border-purple-400 text-xs font-bold tracking-widest text-[#BF00FF] uppercase hover:bg-purple-950/40 transition-all shadow-[0_0_10px_rgba(191,0,255,0.2)]"
            style={{ fontFamily: '"Orbitron", sans-serif' }}
          >
            Register another child
          </button>
        </div>
      ) : (
        <div className="w-full">
          <div className="mb-8 text-center md:text-left">
            <h3 
              className="text-xl md:text-2xl font-bold tracking-wide text-white mb-2"
              style={{ fontFamily: '"Orbitron", sans-serif' }}
            >
              SUMMER CAMP REGISTRATION
            </h3>
            <p className="text-xs tracking-wider text-[#FF006E] font-medium" style={{ letterSpacing: '2px' }}>
              SECURE YOUR CHILD'S SEAT IN LAHORE'S TOP CREATIVE WORKSHOP
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
            {/* Left Column - Children */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                  Child's Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={childName}
                  onChange={e => setChildName(e.target.value)}
                  placeholder="Enter child's full name"
                  className="w-full bg-[#18002d]/80 border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 tracking-wide transition-all shadow-inner"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    value={childAge}
                    onChange={e => setChildAge(e.target.value)}
                    placeholder="e.g. 8"
                    className="w-full bg-[#18002d]/80 border border-purple-500/20 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 tracking-wide transition-all text-center"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                    School Name
                  </label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={e => setSchoolName(e.target.value)}
                    placeholder="LGS / Aitchison / ISL"
                    className="w-full bg-[#18002d]/80 border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 tracking-wide transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Parents */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                  Parent / Guardian Name *
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={e => setParentName(e.target.value)}
                  placeholder="Enter parent's name"
                  className="w-full bg-[#18002d]/80 border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-400 tracking-wide transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={parentPhone}
                    onChange={e => setParentPhone(e.target.value)}
                    placeholder="e.g. 0326 8644458"
                    className="w-full bg-[#18002d]/80 border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-400 tracking-wide transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={parentEmail}
                    onChange={e => setParentEmail(e.target.value)}
                    placeholder="parent@gmail.com"
                    className="w-full bg-[#18002d]/80 border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-400 tracking-wide transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Full-width fields */}
          <div className="space-y-6 text-left">
            {/* Batch Radio Pills */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#00F5FF] mb-2.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                Batch Allocation
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  onClick={() => setBatch('batch1')}
                  className={`cursor-pointer rounded-2xl p-4 border-2 flex items-center justify-between transition-all ${
                    batch === 'batch1' 
                      ? 'border-cyan-400 bg-cyan-950/10 shadow-[0_0_15px_rgba(0,245,255,0.15)]' 
                      : 'border-purple-500/10 bg-[#16002A]/40 hover:border-purple-500/30'
                  }`}
                >
                  <div>
                    <p className="text-white font-bold text-sm" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>BATCH 1</p>
                    <p className="text-xs text-gray-400">Junior Creative Division</p>
                  </div>
                  <span className={`text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full border ${
                    batch === 'batch1' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' : 'bg-gray-800 text-gray-500 border-gray-700'
                  }`} style={{ fontFamily: '"Orbitron", sans-serif' }}>
                    AGES 5–12
                  </span>
                </div>

                <div 
                  onClick={() => setBatch('batch2')}
                  className={`cursor-pointer rounded-2xl p-4 border-2 flex items-center justify-between transition-all ${
                    batch === 'batch2' 
                      ? 'border-pink-400 bg-pink-950/10 shadow-[0_0_15px_rgba(255,0,110,0.15)]' 
                      : 'border-purple-500/10 bg-[#16002A]/40 hover:border-purple-500/30'
                  }`}
                >
                  <div>
                    <p className="text-white font-bold text-sm" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>BATCH 2</p>
                    <p className="text-xs text-gray-400">Senior Creative Division</p>
                  </div>
                  <span className={`text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full border ${
                    batch === 'batch2' ? 'bg-pink-500/20 text-pink-300 border-pink-400/40' : 'bg-gray-800 text-gray-500 border-gray-700'
                  }`} style={{ fontFamily: '"Orbitron", sans-serif' }}>
                    AGES 13–18
                  </span>
                </div>
              </div>
            </div>

            {/* Custom Timeslots */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#39FF14] mb-2.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                Preferred Camp Days (3 Days a Week)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Monday', 'Wednesday', 'Friday'].map((day) => {
                  let activeStyle = '';
                  if (day === 'Monday') {
                    activeStyle = timeslot === 'Monday' ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20 shadow-[0_0_12px_rgba(0,245,255,0.15)]' : 'border-purple-500/10 text-gray-400';
                  } else if (day === 'Wednesday') {
                    activeStyle = timeslot === 'Wednesday' ? 'border-pink-400 text-pink-300 bg-pink-950/20 shadow-[0_0_12px_rgba(255,0,110,0.15)]' : 'border-purple-500/10 text-gray-400';
                  } else {
                    activeStyle = timeslot === 'Friday' ? 'border-green-400 text-green-300 bg-green-950/20 shadow-[0_0_12px_rgba(57,255,20,0.15)]' : 'border-purple-500/10 text-gray-400';
                  }

                  return (
                    <div
                      key={day}
                      onClick={() => setTimeslot(day)}
                      className={`cursor-pointer rounded-xl p-3 border text-center transition-all ${activeStyle}`}
                    >
                      <p className="font-bold text-xs uppercase tracking-widest mb-1" style={{ fontFamily: '"Orbitron", sans-serif' }}>{day}s</p>
                      <p className="text-[10px] opacity-70">Highly Interactive</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Interactive Click Pricing Cards */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#FFD700] mb-2.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                Select Pricing Bracket
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setPlan('early')}
                  className={`relative cursor-pointer rounded-2xl p-4 border-2 transition-all ${
                    plan === 'early' 
                      ? 'border-yellow-400 bg-yellow-950/10 shadow-[0_0_20px_rgba(255,215,0,0.2)]' 
                      : 'border-purple-500/10 bg-[#16002A]/40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-xs tracking-wider text-yellow-400 font-bold uppercase">Early Bird Pack</p>
                    {plan === 'early' && <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 inline-block shadow-[0_0_8px_#FFD700]" />}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1" style={{ fontFamily: '"Black Ops One", monospace' }}>Rs. 39,999/-</h4>
                  <p className="text-xs text-gray-400">FREE Registration includes Glow Kit</p>
                  <p className="text-[9.5px] text-[#39FF14] mt-2 italic font-bold">Valid until 3rd June 2026</p>
                </div>

                <div
                  onClick={() => setPlan('standard')}
                  className={`relative cursor-pointer rounded-2xl p-4 border-2 transition-all ${
                    plan === 'standard' 
                      ? 'border-pink-500 bg-pink-950/10 shadow-[0_0_20px_rgba(255,0,110,0.2)]' 
                      : 'border-purple-500/10 bg-[#16002A]/40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-xs tracking-wider text-pink-400 font-bold uppercase">Standard Pack</p>
                    {plan === 'standard' && <span className="w-3.5 h-3.5 rounded-full bg-pink-500 inline-block shadow-[0_0_8px_#FF006E]" />}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1" style={{ fontFamily: '"Black Ops One", monospace' }}>Rs. 47,999/-</h4>
                  <p className="text-xs text-gray-400">Plus basic Registration Fee of Rs. 4,999/-</p>
                  <p className="text-[9.5px] text-gray-500 mt-2">Paid on camp entry</p>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-purple-400 mb-1.5 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                Medical Notes / Special Creative Requests
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="List allergies, preferred paint brands, helper requests or seating friends together..."
                rows={3}
                className="w-full bg-[#18002d]/80 border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-400 tracking-wide transition-all shadow-inner resize-none"
              />
            </div>

            {/* Submission triggers */}
            <div>
              <button
                ref={submitBtnRef}
                onClick={handleSubmit}
                style={{
                  fontFamily: '"Orbitron", sans-serif',
                  background: `linear-gradient(90deg, ${NEON.pink}, ${NEON.purple})`,
                  color: '#FFFFFF',
                  textShadow: '0 0 8px #FFFFFF',
                  boxShadow: `0 0 15px ${NEON.pink}, 0 0 35px ${NEON.pink}40`,
                  animation: 'glowPulse 3s infinite'
                }}
                className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase cursor-pointer hover:scale-[1.01] active:translate-y-0.5 transition-all text-center"
              >
                REGISTER NOW ✨
              </button>
              <p className="text-[10px] text-center text-gray-500 mt-3 tracking-wider uppercase">
                * Safe SSL Processing · Guaranteed refund till 5 days before camp starts
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
