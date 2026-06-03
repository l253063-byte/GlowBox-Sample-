/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  ChevronUp,
  Calendar, 
  Users, 
  CheckCircle, 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  Sparkles, 
  Award,
  ArrowRight,
  Send,
  Zap,
  Star,
  Quote,
  MessageCircle
} from 'lucide-react';

import { 
  NEON, 
  mainServices, 
  sideActivities, 
  galleryStripItems, 
  clientBadges, 
  staticReviews, 
  reviewsCarousel, 
  campReasons, 
  campDays 
} from './data';

import { ImagePlaceholder } from './components/ImagePlaceholder';
import { GlowCube } from './components/GlowCube';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { CampRegistrationForm } from './components/CampRegistrationForm';
import { EventModal } from './components/EventModal';
import { GallerySection } from './components/GallerySection';

// --- CUSTOM PERSISTENT HOOKS ---

function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function useCounter(target, vis) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!vis) return;
    let start = 0;
    const step = target / 40; // 40 steps
    const t = setInterval(() => {
      start += step;
      if (start >= target) { 
        setVal(target); 
        clearInterval(t); 
      } else {
        setVal(Math.floor(start));
      }
    }, 25);
    return () => clearInterval(t);
  }, [vis, target]);
  return val;
}

// --- BASIC UI PARTS ---

function SectionLabel({ text, color = NEON.pink }) {
  return (
    <span 
      style={{
        fontFamily: '"Orbitron", sans-serif',
        letterSpacing: '0.3em',
        color,
        fontSize: '11px',
        textShadow: `0 0 6px ${color}77`,
      }}
      className="font-bold uppercase block mb-3"
    >
      {text}
    </span>
  );
}

function NeonDivider({ color = NEON.pink }) {
  return (
    <div 
      className="h-[2px] w-full my-6 opacity-30"
      style={{
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`
      }}
    />
  );
}

export default function GlowboxApp() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);

  // Monitor header triggers
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(Math.min(scrollPercent, 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = () => {
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      alert("Please enter a valid email address!");
      return;
    }
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  if (!loaded) {
    return <LoadingScreen onDone={() => setLoaded(true)} />;
  }

  return (
    <div 
      style={{ 
        fontFamily: "'Space Grotesk', sans-serif", 
        background: '#0B0011', 
        overflowX: 'hidden', 
        cursor: 'none',
        scrollBehavior: 'smooth'
      }}
      className="min-h-screen text-gray-200"
    >
      {/* Scroll Progress Indicator */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${NEON.pink}, ${NEON.cyan}, ${NEON.green})`,
          width: `${scrollProgress}%`,
          zIndex: 100001,
          transition: 'width 0.1s ease-out'
        }}
      />

      {/* Absolute Dual Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* --- FEATURE 1: NAVBAR --- */}
      <nav
        style={{
          backgroundColor: scrolled ? 'rgba(11, 0, 18, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? `1.5px solid rgba(191, 0, 255, 0.15)` : '1.5px solid transparent',
          zIndex: 9999,
          transition: 'all 0.3s ease'
        }}
        className="fixed top-0 left-0 right-0 py-3.5 px-4 md:px-8 select-none"
      >
        {/* Scrolling Ticker */}
        <div 
          className="absolute bottom-0 left-0 right-0 overflow-hidden h-[1px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${NEON.pink}, transparent)`,
            opacity: 0.3
          }}
        >
          <div 
            className="whitespace-nowrap"
            style={{
              animation: 'scrollLeft 20s linear infinite',
              color: NEON.pink,
              fontSize: '8px',
              fontFamily: '"Orbitron", sans-serif',
              letterSpacing: '4px'
            }}
          >
            GLOWBOX STUDIOS • NEON PAINTING EXPERIENCE • LAHORE, PAKISTAN • BOOK YOUR SESSION TODAY • GLOWBOX STUDIOS • NEON PAINTING EXPERIENCE • LAHORE, PAKISTAN • BOOK YOUR SESSION TODAY •
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo Left */}
          <a href="#home" className="flex items-center gap-2.5">
            <GlowCube size={38} color={NEON.cyan} />
            <span 
              style={{
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: '900',
                letterSpacing: '2px',
                color: '#FFFFFF',
                textShadow: `0 0 8px ${NEON.cyan}`
              }}
              className="text-sm md:text-base tracking-widest hidden xs:inline-block"
            >
              GLOWBOX
            </span>
          </a>

          {/* Links Middle (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold tracking-widest">
            {[
              { label: 'ABOUT', href: '#about' },
              { label: 'SERVICES', href: '#services' },
              { label: 'EVENTS', href: '#events' },
              { label: 'SUMMER CAMP', href: '#camp' },
              { label: 'PRICING', href: '#pricing' },
              { label: 'REVIEWS', href: '#reviews' },
              { label: 'FAQ', href: '#faq' },
              { label: 'CONTACT', href: '#contact-form' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 text-gray-400 font-bold hover:text-white transition-all group"
                style={{ fontFamily: '"Orbitron", sans-serif' }}
              >
                {link.label}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF006E] transition-all group-hover:w-full"
                  style={{ boxShadow: `0 0 8px ${NEON.pink}` }}
                />
              </a>
            ))}
          </div>

          {/* CTA & Mobile Hamburger Right */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setEventModalOpen(true)}
              style={{
                fontFamily: '"Orbitron", sans-serif',
                borderColor: NEON.pink,
                boxShadow: `0 0 8px ${NEON.pink}`,
                background: 'rgba(255,0,110,0.06)', 
                padding: `10px `
              }}
              className="px-4.5 py-2 text-[10px] md:text-xs font-black tracking-widest uppercase rounded-full border text-white transition-all hover:bg-[#FF006E] active:scale-95 cursor-pointer"
            >
              BOOK NOW
            </button>

            {/* Menu Open Burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-purple-400 hover:text-white transition-all cursor-pointer"
            >
              {menuOpen ? <X size={22} className="text-white" /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Fullscreen Mobile Stack Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                backgroundColor: 'rgba(10, 0, 16, 0.98)',
                backdropFilter: 'blur(20px)',
                zIndex: 999
              }}
              className="fixed inset-x-0 top-[65px] h-screen py-12 px-6 flex flex-col items-center justify-start gap-6 border-b border-purple-500/10"
            >
              {[
                { label: 'ABOUT STUDIO', href: '#about', color: NEON.cyan },
                { label: 'OUR SERVICES', href: '#services', color: NEON.green },
                { label: 'GLOW EVENTS', href: '#events', color: NEON.pink },
                { label: 'SUMMER CAMP 2026', href: '#camp', color: NEON.yellow },
                { label: 'PRICING', href: '#pricing', color: NEON.pink },
                { label: 'VISITOR REVIEWS', href: '#reviews', color: NEON.purple },
                { label: 'FAQ', href: '#faq', color: NEON.cyan },
                { label: 'CONTACT US', href: '#contact-form', color: NEON.green },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ 
                    fontFamily: '"Orbitron", sans-serif',
                    color: link.color,
                    textShadow: `0 0 4px ${link.color}50`
                  }}
                  className="text-lg font-black tracking-widest uppercase hover:scale-105 transition-all py-1.5"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="w-2/3 h-[1px] bg-purple-500/20 my-4" />
              <p className="text-[10px] text-gray-500 tracking-wider">LAHORE, PAKISTAN · BY APPOINTMENT</p>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- FEATURE 2: HERO SECTION --- */}
      <section 
        id="home"
        className="relative w-full min-h-screen py-20 md:py-32 flex items-center justify-center overflow-hidden"
      >
        
        {/* Ambient Overlay Layer (Image Placeholder 1/37) */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-screen scale-110">
          <ImagePlaceholder 
            id="hero_bg" 
            label="Blacklight Canvas Studio Full Background" 
            style={{ width: '100%', height: '100%', borderRadius: 0, border: 'none', boxShadow: 'none' }}
          />
        </div>

        {/* Splatter overlay ambient panel (Image Placeholder 2/37) */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] z-0 opacity-20 pointer-events-none mix-blend-lighten hidden md:block">
          <ImagePlaceholder 
            id="hero_ambient" 
            label="Paint Spray Close-up" 
            style={{ width: '100%', height: '100%', borderRadius: 0, border: 'none', boxShadow: 'none' }}
          />
        </div>

        {/* Sweep Scanline Overlay */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 245, 255, 0.08) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
            backgroundSize: '100% 4px, 6px 100%',
            opacity: 0.1,
            pointerEvents: 'none'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 text-center z-10 select-none">
          {/* Label top */}
          <div className="mb-4 inline-block tracking-widest text-[#00F5FF]">
            <span 
              className="text-xs font-black uppercase tracking-widest"
              style={{ fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.4em' }}
            >
              STUDIO PROFILE · SUMMER CAMP 2026
            </span>
          </div>

          {/* Big Split Headline */}
          <div className="space-y-0.5 mb-6 md:mb-8 leading-none">
            <h1 
              style={{ fontFamily: '"Black Ops One", monospace' }}
              className="text-6xl sm:text-7xl md:text-9xl text-white font-black uppercase tracking-tight"
            >
              GLOW
            </h1>
            <h1 
              style={{ 
                fontFamily: '"Black Ops One", monospace',
                color: NEON.yellow,
                textShadow: `0 0 15px ${NEON.yellow}, 0 0 35px ${NEON.yellow}33`
              }}
              className="text-6xl sm:text-7xl md:text-9xl font-black uppercase tracking-tight"
            >
              BOX
            </h1>
            <h1 
              style={{ 
                fontFamily: '"Black Ops One", monospace',
                color: NEON.cyan,
                textShadow: `0 0 15px ${NEON.cyan}, 0 0 35px ${NEON.cyan}33`
              }}
              className="text-6xl sm:text-7xl md:text-9xl font-black uppercase tracking-tight"
            >
              STUDIOS
            </h1>
          </div>

          {/* Glowing Animated Ribbon */}
          <div 
            style={{
              height: '3px',
              width: '160px',
              margin: '0 auto 28px auto',
              background: `linear-gradient(90deg, ${NEON.pink}, ${NEON.cyan}, ${NEON.yellow})`,
              boxShadow: `0 0 10px ${NEON.cyan}`,
              borderRadius: '2px'
            }}
          />

          {/* Description */}
          <p className="text-gray-300 text-sm md:text-lg max-w-xl mx-auto font-sans leading-relaxed tracking-wide mb-3">
            Pakistan's first neon-themed art studio — an immersive, blacklight workspace engineered for therapeutic painting play.
          </p>

          {/* Large Yellow Signature Quote */}
          <p 
            style={{ 
              fontFamily: '"Orbitron", sans-serif',
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
              color: '#ffffff',
              letterSpacing: '0.1em',
              textShadow: `0 0 8px ${NEON.cyan}99`
            }}
            className="mb-8 font-black uppercase"
          >
            Something you've never experienced.
          </p>

          {/* Buttons CTA Grid */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#services"
              style={{
                background: NEON.pink,
                boxShadow: `0 0 12px ${NEON.pink}, 0 0 30px ${NEON.pink}33`,
                fontFamily: '"Orbitron", sans-serif'
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs tracking-widest text-white uppercase hover:scale-105 active:scale-95 transition-all text-center"
            >
              EXPLORE THE STUDIO
            </a>
            
            <a
              href="#camp"
              style={{
                borderColor: NEON.cyan,
                boxShadow: `0 0 10px ${NEON.cyan}33`,
                fontFamily: '"Orbitron", sans-serif'
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border bg-cyan-950/20 font-bold text-xs tracking-widest text-[#00F5FF] uppercase hover:scale-105 hover:bg-cyan-950/40 active:scale-95 transition-all text-center"
            >
              SUMMER CAMP 2026
            </a>
          </div>
        </div>

      </section>

      {/* --- FEATURE 3: ABOUT SECTION --- */}
      <section 
        id="about"
        className="relative w-full py-32 md:py-48 bg-[#0F0018]"
      >

        <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center z-10">
          
          {/* Left Block Details */}
          <div className="lg:col-span-7 text-left space-y-6">
            <SectionLabel text="ABOUT US" color={NEON.cyan} />
            
            <h2 
              style={{ fontFamily: '"Black Ops One", monospace' }}
              className="text-3xl md:text-5xl text-white font-extrabold uppercase leading-tight"
            >
              MORE THAN JUST A <span style={{ color: NEON.pink, textShadow: `0 0 10px ${NEON.pink}` }}>PAINT PARTY</span>
            </h2>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans">
              Escape, Create & Glow. Glowbox Studios is Lahore's premier hassle-free, therapeutic art experience. We dim the standard fixtures, boot up the high-intensity overhead blacklights, pump custom playlists, and let you paint with fluid neon acrylics.
            </p>

            <p className="text-gray-300 text-sm leading-relaxed">
              Every curated <span className="text-white font-bold text-shadow-sm border-b border-white/50 pb-0.5">90 to 120-minute</span> private session includes everything you need: custom easel kits, neon-safe premium materials, canvases, protective neon aprons, protective glasses, and complementary <span style={{ color: NEON.yellow, textShadow: `0 0 5px ${NEON.yellow}` }} className="font-bold">Glowy Mocktail Drinks</span> representing the ultimate Lahore sensory escape.
            </p>

            {/* Activities Dual Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {/* Main Activity Card */}
              <div 
                style={{
                  borderLeft: `4px solid ${NEON.cyan}`,
                  background: 'rgba(22, 0, 42, 0.6)',
                }}
                className="p-4 rounded-r-xl border border-l-0 border-purple-500/10"
              >
                <div className="flex items-center gap-2 mb-2 text-[#00F5FF]">
                  <Sparkles size={16} />
                  <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-xs font-bold uppercase tracking-wider">MAIN ACTIVITIES (PICK 1)</p>
                </div>
                <p className="text-xs text-gray-400 font-sans">
                  Canvas painting, stylish tote bags, t-shirts, warm hoodies, or thick acrylic pouring.
                </p>
              </div>

              {/* Side Activity Card */}
              <div 
                style={{
                  borderLeft: `4px solid ${NEON.pink}`,
                  background: 'rgba(22, 0, 42, 0.6)',
                }}
                className="p-4 rounded-r-xl border border-l-0 border-purple-500/10"
              >
                <div className="flex items-center gap-2 mb-2 text-[#FF006E]">
                  <Zap size={16} />
                  <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-xs font-bold uppercase tracking-wider">SIDE ACTIVITIES (ALL INC)</p>
                </div>
                <p className="text-xs text-gray-400 font-sans">
                  Chaotic Splatter wall fling, custom handprint murals, and glowing welcome drinks.
                </p>
              </div>
            </div>
          </div>

          {/* Right Block Media Box (Image Placeholder 3/37) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative p-2 rounded-2xl bg-[#1b0231] border border-pink-500/20 shadow-2xl w-full max-w-[420px]">
              <ImagePlaceholder 
                id="about_studio" 
                label="Glowbox Studio Interior Workspace Setup" 
                borderColor={NEON.pink}
                height={420}
              />
              
            </div>
          </div>

        </div>
      </section>

      {/* --- FEATURE 5: THE SERVICES PORTFOLIO --- */}
      <section 
        id="services"
        className="relative w-full py-32 md:py-48 bg-[#0F0018]"
      >

        <div className="relative max-w-7xl mx-auto px-4 z-10 select-none text-center">
          <SectionLabel text="SERVICES WE PROVIDE" color={NEON.green} />
          
          <h2 
            style={{ fontFamily: '"Black Ops One", monospace' }}
            className="text-3xl md:text-6xl text-white uppercase mb-24 leading-tight"
          >
            MAKE IT, KEEP IT, <span style={{ color: NEON.pink, textShadow: `0 0 10px ${NEON.pink}` }}>GLOW</span>
          </h2>

          {/* 5a. Main Activities Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center mb-36 text-left">
            
            {/* Left 4 service cards */}
            <div className="lg:col-span-7 space-y-6">
              <h3 
                style={{ fontFamily: '"Orbitron", sans-serif' }}
                className="text-lg font-bold text-white mb-6 tracking-widest text-[#00F5FF]"
              >
                MAIN SESSIONS (PICK ONE ELEMENT)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mainServices.map((svc) => (
                  <div
                    key={svc.title}
                    style={{
                      background: NEON.bgCard,
                      borderLeft: `4px solid ${svc.color}`,
                      boxShadow: `0 0 0px ${svc.color}00`
                    }}
                    className="p-8 rounded-r-2xl border border-purple-500/10 hover:border-purple-500/50 hover:translate-x-2 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 20px ${svc.color}33`}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 0px ${svc.color}00`}
                  >
                    <h4 
                      style={{ color: svc.color, fontFamily: '"Orbitron", sans-serif' }}
                      className="font-black text-sm tracking-widest mb-2 group-hover:scale-105 transition-transform"
                    >
                      {svc.title.toUpperCase()}
                    </h4>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed group-hover:text-gray-300 transition-colors">{svc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Media Case (Image Placeholder 6/37) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative p-2 rounded-2xl bg-[#1b0231] border border-[#FFD700] shadow-2xl w-full">
                <ImagePlaceholder 
                  id="service_showcase" 
                  label="Curated Acrylic Fluorescents & Equipment" 
                  borderColor={NEON.yellow}
                  height={320}
                />
                <p className="text-gray-400 text-xs mt-3 text-center font-sans">
                  "You get to keep every creation you make at Glowbox Studios."
                </p>
              </div>
            </div>

          </div>

          {/* 5b. Side Activities (Included for all visitors) */}
          <div className="text-left mb-24">
            <h3 
              style={{ fontFamily: '"Orbitron", sans-serif' }}
              className="text-xl font-bold text-white mb-12 tracking-widest text-center"
            >
              THE <span style={{ color: NEON.pink, textShadow: `0 0 10px ${NEON.pink}` }}>SIDE ACTIVITIES</span> / INCLUDED FOR ALL
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Left Column Activity Details */}
              <div className="lg:col-span-5 space-y-6">
                {sideActivities.map((act) => (
                  <div 
                    key={act.title}
                    style={{
                      background: 'rgba(22, 0, 42, 0.5)',
                      borderLeft: `4px solid ${act.color}`
                    }}
                    className="p-8 rounded-r-xl border border-purple-500/10"
                  >
                    <h4 
                      style={{ color: act.color, fontFamily: '"Orbitron", sans-serif' }}
                      className="text-sm font-bold tracking-widest mb-1"
                    >
                      {act.title.toUpperCase()}
                    </h4>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed">{act.desc}</p>
                  </div>
                ))}
              </div>

              {/* Right Column Multiple Image Panel (Placeholders 7, 8, 9/37) */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Splatter Large block */}
                <div className="md:col-span-7">
                  <ImagePlaceholder 
                    id="side_splatter" 
                    label="Active Paint Throw Splatter Wall Room" 
                    borderColor={NEON.pink}
                    height={380}
                  />
                </div>
                {/* Handprint and mocktails stacked right */}
                <div className="md:col-span-5 space-y-4">
                  <ImagePlaceholder 
                    id="side_handprint" 
                    label="Blacklight Hands Printing Mural Wall" 
                    borderColor={NEON.cyan}
                    height={182}
                  />
                  <ImagePlaceholder 
                    id="side_drinks" 
                    label="Neon Luminescent Welcome Drinks" 
                    borderColor={NEON.green}
                    height={182}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* 5c. Services Horizontal Auto-Scroll Strip (Placeholders 10 to 17/37) */}
          <div className="mt-20">
            <SectionLabel text="SEE IT FOR YOURSELF" color={NEON.cyan} />
            
            {/* Inline sliding container wrapper */}
            <div className="w-full overflow-hidden py-6 group">
              <div 
                className="flex"
                style={{
                  animation: 'scrollLeft 40s linear infinite',
                  width: 'max-content'
                }}
                onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
              >
                {[...Array(2)].map((_, blockIdx) => (
                  <div key={blockIdx} className="flex gap-6 pr-6">
                    {[...galleryStripItems, ...galleryStripItems].map((strip, index) => (
                      <div 
                        key={`${strip.id}-${index}`}
                        className="min-w-[245px] w-[245px] bg-[#16002A] rounded-2xl overflow-hidden border border-[#16002A] hover:border-white hover:scale-[1.06] transition-all duration-300 shadow-xl flex-shrink-0 cursor-pointer group/card"
                        style={{
                          boxShadow: `0 0 0px ${strip.color}00`,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 25px ${strip.color}44`}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 0px ${strip.color}00`}
                      >
                        <div className="h-[230px] relative overflow-hidden">
                          <ImagePlaceholder 
                            id={strip.id} 
                            label={strip.title} 
                            borderColor={strip.color}
                            height={230}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#16002A] via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-4 text-center relative z-10">
                          <p 
                            style={{ fontFamily: '"Orbitron", sans-serif', color: strip.color }} 
                            className="text-[10px] font-black tracking-widest group-hover/card:scale-110 transition-transform"
                          >
                            {strip.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom highlight label */}
            <p className="text-gray-400 text-sm mt-8 text-center font-sans select-none">
              You get to <span style={{ color: NEON.green, textShadow: `0 0 6px ${NEON.green}` }} className="font-bold">keep every creation</span> you make at Glowbox Studios.
            </p>
          </div>

        </div>
      </section>

      {/* --- FEATURE 6: STATS BAR WITH AUTO-COCOUNTERS on SCROLL REVEAL --- */}
      <section className="bg-[#050009] border-y-2 border-[#FF006E]/30 py-16 md:py-24 relative select-none">
        {/* Intersection trigger row wrapper */}
        <div className="max-w-7xl mx-auto px-4">
          <InnerStatsRow />
        </div>
      </section>

      {/* --- FEATURE 7: EVENTS (PRIVATE & CORPORATE TEAMS) --- */}
      <section 
        id="events"
        className="relative w-full py-32 md:py-48 bg-[#0A0010]"
      >

        <div className="relative max-w-7xl mx-auto px-4 z-10 select-none text-center">
          <SectionLabel text="EVENTS" color={NEON.pink} />
          
          <h2 
            style={{ fontFamily: '"Black Ops One", monospace' }}
            className="text-3xl md:text-5xl text-white uppercase mb-6 leading-tight"
          >
            EVERY OCCASION, <span style={{ color: NEON.green, textShadow: `0 0 10px ${NEON.green}` }}>UNFORGETTABLE</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-20 font-sans">
            We host dynamic private birthdays, exclusive student outings, kitty events, and corporate client team building workshops tailored completely under state blacklights.
          </p>

          {/* Client Badges Section */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <span style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-xs text-gray-500 font-bold tracking-widest mr-2 uppercase">TRUSTED BY:</span>
            {clientBadges.map((badge) => (
              <span
                key={badge.name}
                style={{
                  border: `1px solid ${badge.color}40`,
                  color: badge.color,
                  fontFamily: '"Orbitron", sans-serif'
                }}
                className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-[#16002A]/40"
              >
                {badge.name}
              </span>
            ))}
          </div>

          {/* Multiple Grid Layout columns (Placeholders 18 to 21/37) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left mb-20">
            
            {/* Left - Private Parties */}
            <div className="flex flex-col">
              <div className="mb-6">
                <span className="text-xs font-bold text-[#FF006E] tracking-widest" style={{ fontFamily: '"Orbitron", sans-serif' }}>PRIVATE PARTIES</span>
                <p className="text-xs text-gray-400 font-sans mt-2 leading-relaxed">Full studio venue reserve. We manage snacks, decorations, stencils, and host.</p>
              </div>
              <div className="flex-1">
                <ImagePlaceholder 
                  id="event_party" 
                  label="Private Room Birthday Decorations" 
                  borderColor={NEON.pink}
                  height={440}
                />
              </div>
            </div>

            {/* Right - Corporate Events */}
            <div className="flex flex-col">
              <div className="mb-6">
                <span className="text-xs font-bold text-[#00F5FF] tracking-widest" style={{ fontFamily: '"Orbitron", sans-serif' }}>CORPORATE EVENTS</span>
                <p className="text-xs text-gray-400 font-sans mt-2 leading-relaxed">Break digital fatigue, build team cohesion, and paint custom corporate slogans glowing in Lahore's underground.</p>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImagePlaceholder 
                  id="event_birthday" 
                  label="Neon Canvas Happy Birthday Custom Art" 
                  borderColor={NEON.pink}
                  height={210}
                />
                <ImagePlaceholder 
                  id="event_corporate_01" 
                  label="Corporate Team Splattering Activity" 
                  borderColor={NEON.cyan}
                  height={210}
                />
                <ImagePlaceholder 
                  id="event_corporate_02" 
                  label="Studio Room Filled With Corporate Attendees" 
                  borderColor={NEON.green}
                  height={210}
                />
              </div>
            </div>
          </div>

          {/* Horizontal corporate details (Placeholders 22, 23/37) */}
          <div className="w-full overflow-hidden mb-16">
            <div 
              className="flex"
              style={{
                animation: 'scrollLeft 30s linear infinite',
                width: 'max-content'
              }}
            >
              {[...Array(2)].map((_, blockIdx) => (
                <div key={blockIdx} className="flex gap-6 pr-6">
                  {[...Array(4)].fill().map((_, i) => (
                    <div key={i} className="flex gap-6">
                      <ImagePlaceholder 
                        id="event_corp_wide_01" 
                        label="Interactive Corporate Session Setup" 
                        borderColor={NEON.cyan}
                        height={220}
                      />
                      <ImagePlaceholder 
                        id="event_corp_wide_02" 
                        label="Exhibition Showcase Of Team Slogans" 
                        borderColor={NEON.green}
                        height={220}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Trigger button opening modal overlay */}
          <div className="mt-12">
            <button
              onClick={() => setEventModalOpen(true)}
              style={{
                background: `linear-gradient(90deg, ${NEON.pink}, ${NEON.purple})`,
                boxShadow: `0 0 15px ${NEON.pink}`,
                fontFamily: '"Orbitron", sans-serif'
              }}
              className="px-10 py-4 rounded-xl text-xs font-black tracking-widest text-white uppercase hover:scale-[1.02] active:translate-y-0.5 transition-all text-center cursor-pointer"
            >
              PLAN YOUR EVENT / REQUEST INQUIRY ✨
            </button>
          </div>

        </div>

        {/* Floating Modal Overlay */}
        {eventModalOpen && (
          <EventModal onClose={() => setEventModalOpen(false)} />
        )}
      </section>

      {/* --- FEATURE 8: REVIEWS OVERLAID ON IMAGES & HORIZONTAL SCROLLERS --- */}
      <section 
        id="reviews"
        className="relative w-full py-32 md:py-48 bg-[#0F0018]"
      >

        <div className="relative max-w-7xl mx-auto px-4 z-10 select-none text-center">
          <SectionLabel text="REVIEWS" color={NEON.pink} />
          
          <h2 
            style={{ fontFamily: '"Black Ops One", monospace' }}
            className="text-3xl md:text-5xl text-white uppercase mb-24 leading-tight"
          >
            DON'T JUST TAKE <span style={{ color: NEON.pink, textShadow: `0 0 10px ${NEON.pink}` }}>OUR WORD</span>
          </h2>

          {/* Custom overlays over image boxes (Placeholders 24, 25/37) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-left mb-32">
            {/* Review Block 1 */}
            <div 
              style={{ background: NEON.bgCard, borderTop: `2px solid ${NEON.pink}`, boxShadow: `0 0 20px ${NEON.pink}15` }}
              className="relative rounded-2xl p-8 flex flex-col justify-between border border-purple-500/10 min-h-[300px]"
            >
              <Quote size={28} className="text-[#FF006E] opacity-70 mb-4" />
              <p className="text-gray-100 font-sans text-sm md:text-base leading-relaxed mb-8 select-none flex-grow">
                "Thank you so much ✨ We had really fun there, the ambiance, services everything was so good, we will definitely gonna visit here again 💙"
              </p>
              <div className="flex justify-between items-center mt-auto">
                <p className="text-xs font-black text-white" style={{ fontFamily: '"Orbitron", sans-serif' }}>— FATIMA & FRIENDS</p>
                <div className="flex gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={NEON.yellow} className="border-none" />)}
                </div>
              </div>
            </div>

            {/* Review Block 2 */}
            <div 
              style={{ background: NEON.bgCard, borderTop: `2px solid ${NEON.cyan}`, boxShadow: `0 0 20px ${NEON.cyan}15` }}
              className="relative rounded-2xl p-8 flex flex-col justify-between border border-purple-500/10 min-h-[300px]"
            >
              <Quote size={28} className="text-[#00F5FF] opacity-70 mb-4" />
              <p className="text-gray-100 font-sans text-sm md:text-base leading-relaxed mb-8 select-none flex-grow">
                "It was a surreal experience, no kidding. I'm glad there's something like this in Lahore. Hats off to Moiz and his team for being excellent hosts. Felt at home instantly. Will definitely visit sometime soon again, IA."
              </p>
              <div className="flex justify-between items-center mt-auto">
                <p className="text-xs font-black text-white" style={{ fontFamily: '"Orbitron", sans-serif' }}>— HAMZA S.</p>
                <div className="flex gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={NEON.yellow} className="border-none" />)}
                </div>
              </div>
            </div>
          </div>

          {/* Auto-scrolling Review Carousel */}
          <div className="space-y-8 overflow-hidden">
            
            {/* Slider 1 - Left to Right */}
            <div 
              className="w-full flex py-2"
              style={{
                animation: 'scrollLeft 40s linear infinite',
                width: 'max-content'
              }}
            >
              {[...Array(2)].map((_, blockIdx) => (
                <div key={`slider1-${blockIdx}`} className="flex gap-6 pr-6">
                  {[...reviewsCarousel, ...reviewsCarousel].map((rev, index) => (
                    <div
                      key={`rev1-${rev.name}-${index}`}
                      style={{
                        background: NEON.bgCard,
                        animation: 'rgbBorder 6s linear infinite'
                      }}
                      className="min-w-[280px] w-[280px] p-5 rounded-2xl border-2 text-left flex-shrink-0"
                    >
                      <div className="flex justify-between items-center mb-2.5">
                        <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-xs font-black text-white">{rev.name}</p>
                        <div className="flex text-yellow-400">
                          {[...Array(rev.stars)].map((_, i) => <Star key={i} size={10} fill={NEON.yellow} />)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-300 font-sans leading-relaxed">"{rev.review}"</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Slider 2 - Right to Left */}
            <div 
              className="w-full flex py-2"
              style={{
                animation: 'scrollRight 45s linear infinite',
                width: 'max-content'
              }}
            >
              {[...Array(2)].map((_, blockIdx) => (
                <div key={`slider2-${blockIdx}`} className="flex gap-6 pr-6">
                  {[...reviewsCarousel.slice().reverse(), ...reviewsCarousel.slice().reverse()].map((rev, index) => (
                    <div
                      key={`rev2-${rev.name}-${index}`}
                      style={{
                        background: NEON.bgCard,
                        animation: 'rgbBorder 6s linear infinite'
                      }}
                      className="min-w-[280px] w-[280px] p-5 rounded-2xl border-2 text-left flex-shrink-0"
                    >
                      <div className="flex justify-between items-center mb-2.5">
                        <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-xs font-black text-white">{rev.name}</p>
                        <div className="flex text-yellow-400">
                          {[...Array(rev.stars)].map((_, i) => <Star key={i} size={10} fill={NEON.yellow} />)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-300 font-sans leading-relaxed">"{rev.review}"</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

          </div>

          <style>{`
            @keyframes scrollLeft {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.33%); }
            }
            @keyframes scrollRight {
              0% { transform: translateX(-33.33%); }
              100% { transform: translateX(0); }
            }
          `}</style>

        </div>
      </section>

      {/* --- FEATURE 9: THE SUMMER CAMP ENROLLMENT PAGE --- */}
      <section 
        id="camp"
        className="relative w-full py-32 md:py-48 bg-[#0A0010]"
      >

        {/* Ambient overlay vector background (Image Placeholder 26/37) */}
        <div className="absolute inset-0 z-0 opacity-[0.08] select-none pointer-events-none mix-blend-screen scale-105">
          <ImagePlaceholder id="camp_hero_bg" label="Atmospheric Kids Blacklight Painting" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 z-10 select-none">
          
          <div className="text-center mb-24">
            <SectionLabel text="SUMMER CAMP DETAILS" color={NEON.green} />
            <h2 
              style={{ fontFamily: '"Black Ops One", monospace' }}
              className="text-3xl md:text-6xl text-white uppercase leading-tight"
            >
              12 DAYS OF <span style={{ color: NEON.green, textShadow: `0 0 10px ${NEON.green}` }}>CREATIVE FUN</span>
            </h2>
          </div>

          {/* 9a. Curriculum Bridge (IQ and EQ Analysis) */}
          <div className="mb-32 text-left">
            <h3 
              style={{ fontFamily: '"Orbitron", sans-serif' }}
              className="text-lg md:text-xl font-bold text-white mb-6 tracking-widest uppercase text-center md:text-left"
            >
              FUN ART, MEET <span style={{ color: NEON.green, textShadow: `0 0 10px ${NEON.green}` }}>BRAIN DEVELOPMENT</span>
            </h3>
            
            <p className="text-gray-300 text-sm max-w-4xl mb-16 font-sans leading-relaxed">
              We bridge the gap between fun art and brain development — boosting Intelligence Quotient (IQ) for a scientific edge, and elevating Emotional Quotient (EQ) to help raise a balanced, confident child.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* IQ Card + Circular image (Image Placeholder 27/37) */}
              <div 
                style={{
                  borderLeft: `4px solid ${NEON.cyan}`,
                  background: 'rgba(22, 0, 42, 0.65)'
                }}
                className="p-10 rounded-r-2xl border border-l-0 border-purple-500/10 flex flex-col sm:flex-row justify-between gap-8 items-start"
              >
                <div className="flex-1 space-y-3">
                  <h4 style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-sm font-black text-cyan-400 tracking-wider">INTELLIGENCE COEFFICIENT (IQ)</h4>
                  <ul className="space-y-2 text-xs text-gray-300 font-sans">
                    <li>🟢 <span className="text-white font-bold">Spatial Intelligence</span> — Enhances geometric layouts, perspective matching, space utilization under dark environments.</li>
                    <li>🟢 <span className="text-white font-bold">Neural Connectivity</span> — Dual-handed motor coordinate exercises ignite synapse formation across cortex boundaries.</li>
                    <li>🟢 <span className="text-white font-bold">Focus Muscle Extension</span> — Deep visual tracking cycles raise patience indexes and focus duration scores.</li>
                  </ul>
                </div>
                
                <div className="w-32 h-32 flex-shrink-0 mx-auto sm:mx-0">
                  <ImagePlaceholder 
                    id="camp_kids_01" 
                    label="Child Art Focus" 
                    borderColor={NEON.cyan}
                    style={{ borderRadius: '50%', width: '128px', height: '128px' }}
                  />
                </div>
              </div>

              {/* EQ Card + Circular image (Image Placeholder 28/37) */}
              <div 
                style={{
                  borderLeft: `4px solid ${NEON.pink}`,
                  background: 'rgba(22, 0, 42, 0.65)'
                }}
                className="p-6 rounded-r-2xl border border-l-0 border-purple-500/10 flex flex-col sm:flex-row justify-between gap-6 items-start"
              >
                <div className="flex-1 space-y-3">
                  <h4 style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-sm font-black text-pink-400 tracking-wider">EMOTIONAL COEFFICIENT (EQ)</h4>
                  <ul className="space-y-2 text-xs text-gray-300 font-sans">
                    <li>🔴 <span className="text-white font-bold">Emotional Literacy</span> — Learn to turn heavy moods, stress, and abstract thoughts into glowing custom stories.</li>
                    <li>🔴 <span className="text-white font-bold">The Ghalti Resilience Factor</span> — Reframe accidental splatters as beautiful custom designs, overcoming perfectionist anxieties.</li>
                    <li>🔴 <span className="text-white font-bold">Confidence Boost</span> — Peer review shows and supportive final gallery auctions secure public speaking self-esteem.</li>
                  </ul>
                </div>
                
                <div className="w-32 h-32 flex-shrink-0 mx-auto sm:mx-0">
                  <ImagePlaceholder 
                    id="camp_kids_02" 
                    label="Youth Canvas Laugh" 
                    borderColor={NEON.pink}
                    style={{ borderRadius: '50%', width: '128px', height: '128px' }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* 9b. Why Choose Glowbox Section */}
          <div className="mb-20">
            <h3 
              style={{ fontFamily: '"Orbitron", sans-serif' }}
              className="text-lg md:text-xl font-bold text-white mb-10 tracking-widest text-center"
            >
              THREE REASONS <span style={{ color: NEON.yellow, textShadow: `0 0 10px ${NEON.yellow}99` }}>IT MATTERS</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {campReasons.map((reason) => (
                <div
                  key={reason.num}
                  style={{
                    background: NEON.bgCard,
                    borderLeft: `3px solid ${reason.color}`
                  }}
                  className="p-6 rounded-r-2xl border border-purple-500/10 space-y-3"
                >
                  <div 
                    style={{ background: reason.color, color: '#000000', boxShadow: `0 0 10px ${reason.color}` }}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                  >
                    {reason.num}
                  </div>
                  <h4 style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-white font-bold text-xs tracking-wider">
                    {reason.title.toUpperCase()}
                  </h4>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 9c. 12-Day Camp Schedule Grid */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-purple-400 font-bold" style={{ fontFamily: '"Orbitron", sans-serif' }}>PROGRAM FLOW</span>
              <h3 
                style={{ fontFamily: '"Black Ops One", monospace' }}
                className="text-2xl md:text-4xl text-white uppercase mt-1"
              >
                12-DAY COMPREHENSIVE CURRICULUM
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-left">
              {campDays.map((cd) => (
                <div 
                  key={cd.day}
                  style={{
                    background: 'rgba(22, 0, 42, 0.4)'
                  }}
                  className="p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/40 hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span 
                      style={{ background: cd.color, color: '#000000', boxShadow: `0 0 8px ${cd.color}` }}
                      className="text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full"
                    >
                      DAY {cd.day}
                    </span>
                  </div>
                  
                  <h4 
                    style={{ fontFamily: '"Orbitron", sans-serif', color: cd.color }} 
                    className="font-bold text-xs mb-1 tracking-wide"
                  >
                    {cd.title}
                  </h4>
                  
                  <p className="text-[11px] text-gray-400 font-sans">{cd.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 9d. Timeslots Schedules (3 columns) */}
          <div className="mb-20 select-none">
            <h3 
              style={{ fontFamily: '"Orbitron", sans-serif' }}
              className="text-lg md:text-xl font-bold text-white mb-10 tracking-widest text-center"
            >
              PICK YOUR <span style={{ color: NEON.yellow, textShadow: `0 0 10px ${NEON.yellow}99` }}>TIMESLOT</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              
              {/* Monday column */}
              <div className="bg-[#120021] rounded-2xl overflow-hidden border border-purple-500/10 font-sans">
                <div style={{ background: NEON.cyan, color: '#000000' }} className="py-2.5 px-4 text-center">
                  <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="font-black text-xs tracking-widest">MONDAYS</p>
                </div>
                <div className="p-4 space-y-3 text-center text-xs text-gray-300">
                  <p className="py-1 border-b border-purple-500/5"><span className="text-white font-bold">Slot 1:</span> 11:00 AM – 12:30 PM</p>
                  <p className="py-1 border-b border-purple-500/5"><span className="text-white font-bold">Slot 2:</span> 4:00 PM – 5:30 PM</p>
                  <p className="py-1"><span className="text-white font-bold">Slot 3:</span> 6:15 PM – 7:45 PM</p>
                </div>
              </div>

              {/* Wednesday column */}
              <div className="bg-[#120021] rounded-2xl overflow-hidden border border-purple-500/10 font-sans">
                <div style={{ background: NEON.pink, color: '#FFFFFF' }} className="py-2.5 px-4 text-center">
                  <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="font-black text-xs tracking-widest">WEDNESDAYS</p>
                </div>
                <div className="p-4 space-y-3 text-center text-xs text-gray-300">
                  <p className="py-1 border-b border-purple-500/5"><span className="text-white font-bold">Slot 1:</span> 11:00 AM – 12:30 PM</p>
                  <p className="py-1 border-b border-purple-500/5"><span className="text-white font-bold">Slot 2:</span> 4:00 PM – 5:30 PM</p>
                  <p className="py-1"><span className="text-white font-bold">Slot 3:</span> 6:15 PM – 7:45 PM</p>
                </div>
              </div>

              {/* Friday column */}
              <div className="bg-[#120021] rounded-2xl overflow-hidden border border-purple-500/10 font-sans">
                <div style={{ background: NEON.green, color: '#000000' }} className="py-2.5 px-4 text-center">
                  <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="font-black text-xs tracking-widest">FRIDAYS</p>
                </div>
                <div className="p-4 space-y-3 text-center text-xs text-gray-300">
                  <p className="py-1 border-b border-purple-500/5"><span className="text-white font-bold">Slot 1:</span> 10:30 AM – 12:00 PM</p>
                  <p className="py-1 border-b border-purple-500/5"><span className="text-white font-bold">Slot 2:</span> 4:00 PM – 5:30 PM</p>
                  <p className="py-1"><span className="text-white font-bold">Slot 3:</span> 6:15 PM – 7:45 PM</p>
                </div>
              </div>

            </div>
          </div>

          {/* 9g. Enrollment Centerpiece Dashboard */}
          <div className="max-w-4xl mx-auto">
            <CampRegistrationForm />
          </div>

        </div>
      </section>

      {/* --- FEATURE 10: THE COMPREHENSIVE FLTR GALLERIES LIST (PLACEHOLDERS 26 TO 37) --- */}
      <section className="relative w-full bg-[#0F0018] border-t border-purple-950/20">
        <GallerySection />
      </section>

      {/* --- FEATURE 11: FAQ SECTION --- */}
      <section 
        id="faq"
        className="relative w-full py-32 md:py-48 bg-[#0F0018]"
      >
        <div className="relative max-w-4xl mx-auto px-4 z-10 select-none text-center">
          <SectionLabel text="FAQ" color={NEON.cyan} />
          
          <h2 
            style={{ fontFamily: '"Black Ops One", monospace' }}
            className="text-3xl md:text-5xl text-white uppercase mb-16 leading-tight"
          >
            COMMON <span style={{ color: NEON.pink, textShadow: `0 0 10px ${NEON.pink}` }}>QUESTIONS</span>
          </h2>

          <div className="space-y-4 text-left">
            {[
              {
                q: "Do I need prior painting experience?",
                a: "Absolutely not! Glowbox is designed for everyone - from complete beginners to experienced artists. Our instructors guide you through every step."
              },
              {
                q: "What should I wear?",
                a: "Wear comfortable clothes you don't mind getting a little paint on. We provide protective neon aprons, but accidents can happen!"
              },
              {
                q: "How long is a typical session?",
                a: "Our standard sessions are 90-120 minutes, giving you plenty of time to create your masterpiece while enjoying the neon atmosphere."
              },
              {
                q: "Can I take my artwork home?",
                a: "Yes! You keep everything you create. Your canvas, tote bag, or t-shirt is yours to take home and display proudly."
              },
              {
                q: "Is it suitable for kids?",
                a: "Yes! We offer special sessions for children aged 5-12, and our summer camp is specifically designed for young artists."
              },
              {
                q: "Do you provide private events?",
                a: "Absolutely! We host private birthday parties, corporate team building, bachelorette parties, and any special celebration you have in mind."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                style={{ background: NEON.bgCard }}
                className="rounded-2xl border border-purple-500/10 hover:border-purple-500/30 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left cursor-pointer"
                >
                  <h3 
                    style={{ fontFamily: '"Orbitron", sans-serif', color: NEON.cyan }}
                    className="text-sm font-black tracking-wider"
                  >
                    {faq.q}
                  </h3>
                  <span style={{ color: NEON.pink }} className="text-lg font-black">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-xs text-gray-300 font-sans leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURE 12: COMPREHENSIVE PRICING --- */}
      <section 
        id="pricing"
        className="relative w-full py-32 md:py-48 bg-[#0A0010]"
      >
        <div className="relative max-w-6xl mx-auto px-4 z-10 select-none text-center">
          <SectionLabel text="PRICING" color={NEON.yellow} />
          
          <h2 
            style={{ fontFamily: '"Black Ops One", monospace' }}
            className="text-3xl md:text-5xl text-white uppercase mb-6 leading-tight"
          >
            ALL <span style={{ color: NEON.yellow, textShadow: `0 0 10px ${NEON.yellow}99` }}>PRICING</span>
          </h2>
          <p className="text-gray-400 text-sm mb-16 max-w-2xl mx-auto">Choose the perfect package for your creative journey</p>

          {/* Regular Session Pricing */}
          <h3 
            style={{ fontFamily: '"Orbitron", sans-serif' }}
            className="text-lg md:text-xl font-bold text-white mb-8 tracking-widest"
          >
            REGULAR <span style={{ color: NEON.cyan }}>SESSIONS</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                name: "SOLO",
                price: "Rs. 4,999",
                desc: "Perfect for individuals",
                features: ["90-minute session", "1 canvas painting", "All materials included", "Neon welcome drink", "Take home your art"]
              },
              {
                name: "DUO",
                price: "Rs. 8,999",
                desc: "Bring a friend or partner",
                features: ["90-minute session", "2 canvas paintings", "All materials included", "2 neon welcome drinks", "Take home your art"]
              },
              {
                name: "GROUP",
                price: "Rs. 14,999",
                desc: "Perfect for 4-6 people",
                features: ["2-hour session", "4-6 canvas paintings", "All materials included", "Group photo session", "Take home your art"]
              }
            ].map((pkg, index) => (
              <div 
                key={`session-${index}`}
                style={{ 
                  border: `2px solid ${index === 1 ? NEON.pink : 'rgba(191, 0, 255, 0.2)'}`,
                  background: NEON.bgCard,
                  boxShadow: index === 1 ? `0 0 20px ${NEON.pink}33` : 'none'
                }}
                className="p-8 rounded-2xl text-left hover:scale-105 transition-transform relative"
              >
                {index === 1 && (
                  <span 
                    style={{ background: NEON.pink }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full"
                  >
                    POPULAR
                  </span>
                )}
                <h3 
                  style={{ fontFamily: '"Black Ops One", monospace', color: index === 1 ? NEON.pink : NEON.cyan }}
                  className="text-2xl font-black mb-1"
                >
                  {pkg.name}
                </h3>
                <p className="text-xs text-gray-400 mb-4">{pkg.desc}</p>
                <p 
                  style={{ fontFamily: '"Black Ops One", monospace' }}
                  className="text-3xl font-black text-white mb-6"
                >
                  {pkg.price}
                </p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
                      <span style={{ color: NEON.green }}>✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setEventModalOpen(true)}
                  style={{ 
                    background: index === 1 ? NEON.pink : 'transparent',
                    borderColor: NEON.pink,
                    fontFamily: '"Orbitron", sans-serif'
                  }}
                  className="w-full py-3 rounded-xl text-xs font-black tracking-widest text-white border hover:bg-[#FF006E] transition-all cursor-pointer"
                >
                  BOOK NOW
                </button>
              </div>
            ))}
          </div>

          {/* Summer Camp Pricing */}
          <h3 
            style={{ fontFamily: '"Orbitron", sans-serif' }}
            className="text-lg md:text-xl font-bold text-white mb-8 tracking-widest"
          >
            SUMMER <span style={{ color: NEON.green }}>CAMP 2026</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            {/* Early Bird */}
            <div 
              style={{ border: `2.5px solid ${NEON.yellow}`, background: '#130022', boxShadow: `0 0 20px ${NEON.yellow}33` }} 
              className="p-8 rounded-2xl flex flex-col justify-between text-left"
            >
              <div>
                <span className="text-xs font-black tracking-widest text-[#FFD700]" style={{ fontFamily: '"Orbitron", sans-serif' }}>EARLY BIRD SEAT</span>
                <p className="text-3xl font-black text-white mt-1 border-b border-purple-500/20 pb-2" style={{ fontFamily: '"Black Ops One", monospace' }}>Rs. 39,999/-</p>
              </div>
              <div className="my-4 space-y-2 text-xs font-sans text-gray-300 flex-1">
                <p>✔ <span className="text-white">FREE</span> Official Camp Registration</p>
                <p>✔ Includes 12 Complete Paint Kits</p>
                <p>✔ Comprehensive Exhibition Pass</p>
                <p>✔ 12-Day Creative Curriculum</p>
              </div>
              <p className="text-[10px] text-green-400 font-bold">Applies if registered before 3rd June 2026!</p>
              <button
                onClick={() => setEventModalOpen(true)}
                style={{ 
                  background: NEON.yellow,
                  color: '#000000',
                  fontFamily: '"Orbitron", sans-serif'
                }}
                className="w-full py-3 rounded-xl text-xs font-black tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer mt-4"
              >
                BOOK EARLY BIRD
              </button>
            </div>

            {/* Standard */}
            <div 
              style={{ border: `2.5px solid ${NEON.pink}`, background: '#130022', boxShadow: `0 0 20px ${NEON.pink}33` }} 
              className="p-8 rounded-2xl flex flex-col justify-between relative text-left"
            >
              <span className="absolute -top-3 right-4 bg-[#FF006E] text-white text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded-full select-none" style={{ fontFamily: '"Orbitron", sans-serif' }}>BEST VALUE</span>
              <div>
                <span className="text-xs font-black tracking-widest text-[#FF006E]" style={{ fontFamily: '"Orbitron", sans-serif' }}>STANDARD SEAT</span>
                <p className="text-3xl font-black text-white mt-1 border-b border-purple-500/20 pb-2" style={{ fontFamily: '"Black Ops One", monospace' }}>Rs. 47,999/-</p>
              </div>
              <div className="my-4 space-y-2 text-xs font-sans text-gray-300 flex-1">
                <p>✔ Base 12-Day Lab Passes</p>
                <p>✔ Standard Acrylic Portions</p>
                <p>✔ Excludes general Registration Fee (Rs. 4,999/- extra)</p>
                <p>✔ 12-Day Creative Curriculum</p>
              </div>
              <p className="text-[10px] text-gray-500 font-medium">Standard registration rate.</p>
              <button
                onClick={() => setEventModalOpen(true)}
                style={{ 
                  background: NEON.pink,
                  fontFamily: '"Orbitron", sans-serif'
                }}
                className="w-full py-3 rounded-xl text-xs font-black tracking-widest text-white hover:scale-105 active:scale-95 transition-all cursor-pointer mt-4"
              >
                BOOK STANDARD
              </button>
            </div>
          </div>

          <p style={{ fontFamily: '"Space Grotesk", sans-serif' }} className="text-xs text-[#39FF14] text-center mt-8 tracking-wide select-none font-bold">
            Early-bird pricing applies till 3rd June 2026 if summer camp starts 15th June 2026.
          </p>
        </div>
      </section>

      {/* --- FEATURE 13: CONTACT FORM --- */}
      <section 
        id="contact-form"
        className="relative w-full py-32 md:py-48 bg-[#0F0018]"
      >
        <div className="relative max-w-4xl mx-auto px-4 z-10 select-none">
          <div className="text-center mb-16">
            <SectionLabel text="CONTACT US" color={NEON.green} />
            
            <h2 
              style={{ fontFamily: '"Black Ops One", monospace' }}
              className="text-3xl md:text-5xl text-white uppercase mb-6 leading-tight"
            >
              GET IN <span style={{ color: NEON.green, textShadow: `0 0 10px ${NEON.green}` }}>TOUCH</span>
            </h2>
            <p className="text-gray-300 text-sm max-w-xl mx-auto">
              Have questions? Want to book a session? Send us a message and we'll get back to you within 24 hours.
            </p>
          </div>

          <div 
            style={{ background: NEON.bgCard }}
            className="p-8 md:p-12 rounded-2xl border border-purple-500/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label 
                  style={{ fontFamily: '"Orbitron", sans-serif' }}
                  className="text-xs font-black tracking-widest text-gray-400 mb-2 block"
                >
                  YOUR NAME
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-[#150024] text-white text-sm px-4 py-3 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500 font-sans"
                />
              </div>
              <div>
                <label 
                  style={{ fontFamily: '"Orbitron", sans-serif' }}
                  className="text-xs font-black tracking-widest text-gray-400 mb-2 block"
                >
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#150024] text-white text-sm px-4 py-3 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500 font-sans"
                />
              </div>
            </div>
            <div className="mb-8">
              <label 
                style={{ fontFamily: '"Orbitron", sans-serif' }}
                className="text-xs font-black tracking-widest text-gray-400 mb-2 block"
              >
                SUBJECT
              </label>
              <input
                type="text"
                placeholder="What's this about?"
                className="w-full bg-[#150024] text-white text-sm px-4 py-3 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>
            <div className="mb-8">
              <label 
                style={{ fontFamily: '"Orbitron", sans-serif' }}
                className="text-xs font-black tracking-widest text-gray-400 mb-2 block"
              >
                MESSAGE
              </label>
              <textarea
                rows="5"
                placeholder="Tell us more..."
                className="w-full bg-[#150024] text-white text-sm px-4 py-3 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500 font-sans resize-none"
              />
            </div>
            <button
              style={{ 
                background: NEON.green,
                boxShadow: `0 0 12px ${NEON.green}`,
                fontFamily: '"Orbitron", sans-serif'
              }}
              className="w-full py-4 rounded-xl text-xs font-black tracking-widest text-white uppercase hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              SEND MESSAGE
            </button>
          </div>
        </div>
      </section>

      {/* --- FEATURE 14: LOCATION & HOURS --- */}
      <section 
        id="location"
        className="relative w-full py-32 md:py-48 bg-[#0A0010]"
      >
        <div className="relative max-w-6xl mx-auto px-4 z-10 select-none">
          <div className="text-center mb-16">
            <SectionLabel text="VISIT US" color={NEON.purple} />
            
            <h2 
              style={{ fontFamily: '"Black Ops One", monospace' }}
              className="text-3xl md:text-5xl text-white uppercase mb-6 leading-tight"
            >
              FIND <span style={{ color: NEON.purple, textShadow: `0 0 10px ${NEON.purple}` }}>GLOWBOX</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div 
                style={{ background: NEON.bgCard }}
                className="p-6 rounded-2xl border border-purple-500/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={24} className="text-purple-400" />
                  <h3 
                    style={{ fontFamily: '"Orbitron", sans-serif' }}
                    className="text-sm font-black tracking-widest text-white"
                  >
                    LOCATION
                  </h3>
                </div>
                <p className="text-gray-300 text-sm font-sans leading-relaxed">
                  Glowbox Studios<br />
                  DHA Phase 6, Lahore<br />
                  Pakistan
                </p>
              </div>

              <div 
                style={{ background: NEON.bgCard }}
                className="p-6 rounded-2xl border border-purple-500/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={24} className="text-cyan-400" />
                  <h3 
                    style={{ fontFamily: '"Orbitron", sans-serif' }}
                    className="text-sm font-black tracking-widest text-white"
                  >
                    OPENING HOURS
                  </h3>
                </div>
                <div className="space-y-2 text-gray-300 text-sm font-sans">
                  <p><span className="text-white font-bold">Monday - Friday:</span> 11:00 AM - 9:00 PM</p>
                  <p><span className="text-white font-bold">Saturday:</span> 10:00 AM - 10:00 PM</p>
                  <p><span className="text-white font-bold">Sunday:</span> 12:00 PM - 8:00 PM</p>
                  <p className="text-xs text-gray-400 mt-2 italic">* By appointment only for private events</p>
                </div>
              </div>

              <div 
                style={{ background: NEON.bgCard }}
                className="p-6 rounded-2xl border border-purple-500/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Phone size={24} className="text-pink-400" />
                  <h3 
                    style={{ fontFamily: '"Orbitron", sans-serif' }}
                    className="text-sm font-black tracking-widest text-white"
                  >
                    CONTACT
                  </h3>
                </div>
                <div className="space-y-2 text-gray-300 text-sm font-sans">
                  <p className="flex items-center gap-2">
                    <span className="text-white font-bold">Phone:</span>
                    <a href="tel:03268644458" style={{ color: NEON.pink }}>0326 8644458</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-white font-bold">Email:</span>
                    <span style={{ color: NEON.cyan }}>hello@glowboxstudios.com</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div 
                style={{ background: NEON.bgCard }}
                className="p-2 rounded-2xl border border-purple-500/10"
              >
                <iframe 
                  width="100%" 
                  height="400" 
                  style={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' 
                  }}
                  src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Glowbox%20Studios,%20DHA%20Phase%206,%20Lahore&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
                  title="Glowbox Studios Location"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 13: THE GLOBAL FOOTER --- */}
      <footer 
        style={{ background: '#050009', borderTop: `2px solid ${NEON.pink}` }}
        className="relative py-12 md:py-16 px-4 md:px-8 select-none border-t"
      >
        {/* Animated neon running sweep path over top border */}
        <div 
          style={{
            position: 'absolute',
            top: '-2px',
            left: 0,
            right: 0,
            height: '2.5px',
            background: `linear-gradient(90deg, ${NEON.pink}, ${NEON.cyan}, ${NEON.green}, ${NEON.yellow}, ${NEON.pink})`,
            backgroundSize: '200% 100%',
            animation: 'shimmerBar 4s linear infinite'
          }}
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          
          {/* Col 1 Brand Slogan */}
          <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <GlowCube size={38} color={NEON.cyan} />
              <span style={{ fontFamily: '"Orbitron", sans-serif' }} className="font-black text-sm tracking-widest text-white">GLOWBOX STUDIOS</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
              Pakistan's first neon-themed blacklight art studio in Lahore. An immersive, therapeutic night out where you paint in the light.
            </p>
            <div className="flex gap-4 justify-center md:justify-start w-full">
              <Instagram className="text-gray-400 hover:text-[#FF006E] transition-colors cursor-pointer" size={18} />
              <Facebook className="text-gray-400 hover:text-[#00F5FF] transition-colors cursor-pointer" size={18} />
            </div>
          </div>

          {/* Col 2 Quick Directory Navigation */}
          <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
            <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-xs font-extrabold text-white tracking-widest uppercase">QUICK LINKS</p>
            <ul style={{ fontFamily: '"Orbitron", sans-serif' }} className="space-y-2 text-[11px] font-black tracking-widest text-[#FFF]">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">ABOUT US</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">OUR SERVICES</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white transition-colors">PRIVATE EVENTS</a></li>
              <li><a href="#camp" className="text-gray-400 hover:text-white transition-colors">SUMMER CAMP 2026</a></li>
              <li><a href="#reviews" className="text-gray-400 hover:text-white transition-colors">VISITOR REVIEWS</a></li>
            </ul>
          </div>

          {/* Col 3 Contact info */}
          <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start text-xs font-sans">
            <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-xs font-extrabold text-white tracking-widest uppercase">CONTACT US</p>
            <div className="space-y-3 text-gray-300 flex flex-col items-center md:items-start">
              <p className="flex items-center justify-center md:justify-start gap-2"><MapPin size={14} className="text-purple-400" /> 📍 Lahore, Pakistan</p>
              <p className="flex items-center justify-center md:justify-start gap-2 font-black leading-none">
                <Phone size={14} className="text-[#FF006E]" /> 
                <a href="tel:03268644458" style={{ color: NEON.pink, textShadow: `0 0 5px ${NEON.pink}` }}>0326 8644458</a>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2"><Mail size={14} className="text-[#00F5FF]" /> hello@glowboxstudios.com</p>
              <p className="flex items-center justify-center md:justify-start gap-2"><Clock size={14} className="text-[#39FF14]" /> By Appointment / Booking Only</p>
            </div>
          </div>

          {/* Col 4 Subscriptions */}
          <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start font-sans text-xs">
            <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-xs font-extrabold text-white tracking-widest uppercase">NEWSLETTER</p>
            <p className="text-gray-400">Stay in the glow — get updates on upcoming events and camps.</p>
            
            {newsletterSuccess ? (
              <div 
                style={{ borderColor: NEON.green }}
                className="p-3 bg-green-950/20 rounded-xl border flex items-center justify-center md:justify-start gap-2 text-green-400 text-xs shadow-[0_0_10px_rgba(57,255,20,0.1)] w-full"
              >
                <CheckCircle size={14} />
                <span>You're glowing! Email registered ✨</span>
              </div>
            ) : (
              <div className="flex justify-center md:justify-start gap-2 w-full">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="bg-[#150024] text-white text-xs px-3.5 py-2.5 rounded-xl border border-cyan-400/20 focus:outline-none focus:border-cyan-400 flex-1 min-w-0 font-sans shadow-inner max-w-xs"
                />
                <button
                  onClick={handleNewsletterSubmit}
                  style={{ background: NEON.pink, boxShadow: `0 0 8px ${NEON.pink}` }}
                  className="p-2.5 rounded-xl flex items-center justify-center text-white active:scale-95 transition-transform cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Global Footer baseline indicator */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-purple-500/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 tracking-wider">
          <div className="flex items-center gap-2 mb-3 md:mb-0 select-none">
            <span style={{ background: NEON.green, boxShadow: `0 0 6px ${NEON.green}` }} className="w-2 h-2 rounded-full inline-block animate-pulse" />
            <p>GLOWBOX STUDIOS · PAKISTAN'S FIRST NEON ART STUDIO</p>
          </div>
          <p>© 2026 GLOWBOX LAHORE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923268644458"
        target="_blank"
        rel="noreferrer"
        style={{
          background: '#25D366',
          boxShadow: '0 0 20px rgba(37, 211, 102, 0.4)',
          zIndex: 100000
        }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          background: NEON.pink,
          boxShadow: `0 0 15px ${NEON.pink}`,
          zIndex: 100000,
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? 'auto' : 'none'
        }}
        className="fixed bottom-6 left-6 w-12 h-12 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
        title="Back to Top"
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}

// --- SPECIAL SUB COMPONENT: STATS ROW DETECTING SCROLLREVEAL ---

function InnerStatsRow() {
  const [rowRef, isVisible] = useScrollReveal(0.1);
  
  // Custom count counters matching slide stats
  const studentsCount = useCounter(500, isVisible);
  const campsCount = useCounter(12, isVisible);
  const servicesCount = useCounter(3, isVisible);
  const happyPercent = useCounter(98, isVisible);

  return (
    <div 
      ref={rowRef}
      className="flex flex-col md:flex-row w-full items-center justify-between text-center divide-y md:divide-y-0 md:divide-x divide-purple-500/30 select-none"
    >
      <div className="space-y-1 py-6 md:py-0 w-full">
        <h4 
          style={{ fontFamily: '"Black Ops One", monospace', color: NEON.yellow, textShadow: `0 0 8px ${NEON.yellow}77` }}
          className="text-3xl md:text-5xl font-black"
        >
          {studentsCount}+
        </h4>
        <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-[10px] md:text-xs text-purple-400 font-bold tracking-widest uppercase">GRADUATED KIDS</p>
      </div>

      <div className="space-y-1 py-6 md:py-0 w-full">
        <h4 
          style={{ fontFamily: '"Black Ops One", monospace', color: NEON.cyan, textShadow: `0 0 8px ${NEON.cyan}77` }}
          className="text-3xl md:text-5xl font-black"
        >
          {campsCount}+
        </h4>
        <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-[10px] md:text-xs text-cyan-400 font-bold tracking-widest uppercase">CO-CREATIVE CAMPS</p>
      </div>

      <div className="space-y-1 py-6 md:py-0 w-full">
        <h4 
          style={{ fontFamily: '"Black Ops One", monospace', color: NEON.pink, textShadow: `0 0 8px ${NEON.pink}77` }}
          className="text-3xl md:text-5xl font-black"
        >
          {servicesCount}
        </h4>
        <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-[10px] md:text-xs text-pink-400 font-bold tracking-widest uppercase">MAIN ART SERVICES</p>
      </div>

      <div className="space-y-1 py-6 md:py-0 w-full">
        <h4 
          style={{ fontFamily: '"Black Ops One", monospace', color: NEON.green, textShadow: `0 0 8px ${NEON.green}77` }}
          className="text-3xl md:text-5xl font-black"
        >
          {happyPercent}%
        </h4>
        <p style={{ fontFamily: '"Orbitron", sans-serif' }} className="text-[10px] md:text-xs text-[#39FF14] font-bold tracking-widest uppercase">HAPPY CLIENTS</p>
      </div>
    </div>
  );
}
