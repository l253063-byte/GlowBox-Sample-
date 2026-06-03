/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { NEON, galleryItems } from '../data';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2, Share2, Heart } from 'lucide-react';

export function GallerySection() {
  const [filter, setFilter] = useState('all');
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [visibleItems, setVisibleItems] = useState(6);
  const imageRef = useRef(null);

  const filteredItems = galleryItems.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const displayedItems = filteredItems.slice(0, visibleItems);

  useEffect(() => {
    if (activeItemIndex === null) {
      setZoomLevel(1);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveItemIndex(null);
        setZoomLevel(1);
      } else if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel(prev => Math.min(prev + 0.25, 3));
      } else if (e.key === '-' || e.key === '_') {
        setZoomLevel(prev => Math.max(prev - 0.25, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, filteredItems]);

  const goNext = () => {
    if (activeItemIndex === null) return;
    setZoomLevel(1);
    const nextIdx = (activeItemIndex + 1) % filteredItems.length;
    setActiveItemIndex(nextIdx);
  };

  const goPrev = () => {
    if (activeItemIndex === null) return;
    setZoomLevel(1);
    const prevIdx = (activeItemIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItemIndex(prevIdx);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 1));
  const handleResetZoom = () => setZoomLevel(1);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: filteredItems[activeItemIndex].title,
          text: `Check out this amazing creation from Glowbox Studios!`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  const tabs = [
    { value: 'all', label: 'ALL', count: galleryItems.length },
    { value: 'sessions', label: 'SESSIONS', count: galleryItems.filter(i => i.category === 'sessions').length },
    { value: 'events', label: 'EVENTS', count: galleryItems.filter(i => i.category === 'events').length },
    { value: 'services', label: 'SERVICES', count: galleryItems.filter(i => i.category === 'services').length },
    { value: 'camps', label: 'CAMPS', count: galleryItems.filter(i => i.category === 'camps').length },
  ];

  return (
    <div className="w-full relative py-16 px-4 md:px-8 max-w-7xl mx-auto select-none" id="gallery">
      {/* SECTION LABELS */}
      <div className="text-center mb-10">
        <span 
          style={{
            fontFamily: '"Orbitron", sans-serif',
            letterSpacing: '0.3em',
            color: NEON.pink,
            fontSize: '12px',
          }}
          className="font-bold uppercase block mb-2"
        >
          THE GLOWBOX GALLERY
        </span>
        <h2 
          style={{
            fontFamily: '"Black Ops One", monospace',
            color: '#FFFFFF',
            lineHeight: 1.1,
          }}
          className="text-4xl md:text-6xl text-center uppercase tracking-normal"
        >
          CAPTURED IN <span style={{ color: NEON.pink, textShadow: `0 0 10px ${NEON.pink}` }}>NEON</span>
        </h2>
      </div>

      <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
        {tabs.map((tab) => {
          const isActive = filter === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => {
                setFilter(tab.value);
                setActiveItemIndex(null);
                setVisibleItems(6);
              }}
              style={{
                fontFamily: '"Orbitron", sans-serif',
                letterSpacing: '2px',
                color: isActive ? NEON.cyan : NEON.textMuted,
                borderBottom: isActive ? `2.5px solid ${NEON.cyan}` : '2.5px solid transparent',
                textShadow: isActive ? `0 0 6px ${NEON.cyan}` : 'none',
                background: isActive ? 'rgba(0, 245, 255, 0.1)' : 'rgba(22, 0, 42, 0.3)',
              }}
              className="px-4 py-2 font-bold text-xs tracking-wider uppercase transition-all duration-350 rounded-lg border border-transparent hover:border-cyan-400/40 cursor-pointer relative"
            >
              {tab.label}
              <span 
                style={{ 
                  background: isActive ? NEON.cyan : 'rgba(255,255,255,0.2)',
                  color: isActive ? '#000' : '#fff'
                }}
                className="ml-2 px-1.5 py-0.5 rounded-full text-[9px]"
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 [column-fill:_balance] box-border">
        {displayedItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => {
              setActiveItemIndex(index);
              setIsLiked(false);
            }}
            className="relative break-inside-avoid-column bg-[#16002A] rounded-2xl overflow-hidden cursor-pointer border border-[#16002A] transition-all duration-500 hover:scale-[1.02] group hover:border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            style={{
              boxShadow: `0 0 8px ${item.color}00`,
              animation: `fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 0.1}s`,
              opacity: 0,
            }}
          >
            <ImagePlaceholder
              id={item.id}
              height={parseInt(item.heightClass.replace('h-[', '').replace('px]', '')) || 280}
              label={item.title}
              borderColor={item.color}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0010] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute inset-0 bg-[#0A0010]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-4 text-center">
              <div 
                style={{
                  border: `1.5px solid ${item.color}`,
                  background: 'rgba(22, 0, 42, 0.9)',
                  color: item.color,
                  boxShadow: `0 0 15px ${item.color}66`
                }}
                className="p-3 rounded-full mb-3 transform group-hover:scale-110 transition-transform"
              >
                <ZoomIn size={20} />
              </div>
              
              <h4 
                style={{ fontFamily: '"Orbitron", sans-serif' }}
                className="text-white font-bold text-sm tracking-wide mb-2 select-none"
              >
                {item.title}
              </h4>
              
              <div className="flex items-center gap-2">
                <span 
                  style={{ 
                    borderColor: `${item.color}77`, 
                    color: item.color,
                    fontSize: '9px',
                    fontFamily: '"Space Grotesk", sans-serif'
                  }}
                  className="border px-2 py-0.5 rounded-full uppercase tracking-widest font-black"
                >
                  {item.category}
                </span>
              </div>
            </div>

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className="p-2 rounded-full bg-[#16002A]/80 backdrop-blur-sm border border-white/20 hover:border-pink-500 transition-all"
              >
                <Heart 
                  size={16} 
                  className={isLiked ? "text-pink-500 fill-pink-500" : "text-white"} 
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleItems < filteredItems.length && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisibleItems(prev => Math.min(prev + 6, filteredItems.length))}
            style={{
              fontFamily: '"Orbitron", sans-serif',
              background: 'transparent',
              borderColor: NEON.cyan,
              color: NEON.cyan,
              textShadow: `0 0 8px ${NEON.cyan}66`
            }}
            className="px-8 py-3 rounded-full border text-xs font-black tracking-widest uppercase hover:bg-cyan-950/30 transition-all cursor-pointer"
          >
            LOAD MORE ({filteredItems.length - visibleItems} remaining)
          </button>
        </div>
      )}

      {activeItemIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 0, 16, 0.98)',
            zIndex: 100000,
            backdropFilter: 'blur(16px)',
          }}
          className="select-none"
          onClick={() => setActiveItemIndex(null)}
        >
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between text-white z-10" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4">
              <div style={{ fontFamily: '"Orbitron", sans-serif' }} className="flex flex-col">
                <span className="text-[10px] uppercase text-gray-400 tracking-widest">GLOWBOX CAPTURES</span>
                <span className="text-sm font-black tracking-widest text-[#00F5FF]">
                  {filteredItems[activeItemIndex].title.toUpperCase()}
                </span>
              </div>
              <span 
                style={{ 
                  borderColor: `${filteredItems[activeItemIndex].color}66`,
                  color: filteredItems[activeItemIndex].color
                }}
                className="border px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
              >
                {filteredItems[activeItemIndex].category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span style={{ fontFamily: '"Space Grotesk", sans-serif' }} className="text-xs text-gray-500 tracking-widest font-bold">
                {activeItemIndex + 1} / {filteredItems.length}
              </span>
              <button
                onClick={() => setActiveItemIndex(null)}
                className="w-10 h-10 rounded-full border border-purple-500/30 bg-[#16002A] text-purple-400 hover:text-white hover:border-purple-400 flex items-center justify-center transition-all cursor-pointer"
                style={{ boxShadow: `0 0 15px rgba(191,0,255,0.2)` }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div 
            className="absolute top-20 bottom-20 left-0 right-0 flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              style={{
                borderColor: NEON.pink,
                boxShadow: `0 0 15px ${NEON.pink}66`,
                background: `${NEON.bgCard}dd`
              }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full border text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
            >
              <ChevronLeft size={24} />
            </button>

            <div 
              ref={imageRef}
              className="relative max-w-[90vw] max-h-[70vh] flex items-center justify-center transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <ImagePlaceholder
                id={filteredItems[activeItemIndex].id}
                label={filteredItems[activeItemIndex].title}
                borderColor={filteredItems[activeItemIndex].color}
                style={{
                  maxHeight: '70vh',
                  maxWidth: '90vw',
                  boxShadow: `0 0 60px ${filteredItems[activeItemIndex].color}44`,
                  borderRadius: '16px',
                }}
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              style={{
                borderColor: NEON.pink,
                boxShadow: `0 0 15px ${NEON.pink}66`,
                background: `${NEON.bgCard}dd`
              }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full border text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between z-10" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-2.5 rounded-full bg-[#16002A] border border-white/20 text-white hover:border-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ZoomOut size={18} />
              </button>
              <button
                onClick={handleResetZoom}
                disabled={zoomLevel === 1}
                className="px-3 py-2 rounded-full bg-[#16002A] border border-white/20 text-white text-xs font-bold hover:border-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                style={{ fontFamily: '"Orbitron", sans-serif' }}
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-2.5 rounded-full bg-[#16002A] border border-white/20 text-white hover:border-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ZoomIn size={18} />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2.5 rounded-full bg-[#16002A] border border-white/20 text-white hover:border-cyan-400 transition-all cursor-pointer"
              >
                <Maximize2 size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2.5 rounded-full bg-[#16002A] border border-white/20 text-white hover:border-pink-500 transition-all cursor-pointer"
              >
                <Heart size={18} className={isLiked ? "text-pink-500 fill-pink-500" : ""} />
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-[#16002A] border border-white/20 text-white hover:border-cyan-400 transition-all cursor-pointer"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
            {filteredItems.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveItemIndex(idx);
                  setZoomLevel(1);
                }}
                style={{
                  background: idx === activeItemIndex ? NEON.pink : 'rgba(255,255,255,0.2)',
                  width: idx === activeItemIndex ? '24px' : '8px',
                }}
                className="h-2 rounded-full transition-all cursor-pointer hover:scale-125"
              />
            ))}
          </div>

          <div className="absolute bottom-6 text-center text-[10px] text-gray-500 uppercase tracking-[0.25em] w-full">
            [use +/- to zoom, arrows to navigate, ESC to close]
          </div>
        </div>
      )}
    </div>
  );
}
