import React, { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Zap,
  Coffee,
  Waves,
  Star,
  Shield,
  Play,
} from 'lucide-react';
import { HOTEL_HERITAGE } from '../data/hotelRealData';
import { motion, AnimatePresence } from 'motion/react';

interface MinimalHeroProps {
  onSelectBranchFilter: (branchId: string) => void;
  onOpenBooking: () => void;
}

const SLIDES = [
  {
    src: '/images/hero-3.jpg',
    title: 'Grand Lobby Experience',
    location: 'Main GRA Flagship, Ilorin',
    caption: 'Where every arrival feels like a celebration',
    accent: 'GRA FLAGSHIP',
  },
  {
    src: '/images/hero-1.jpg',
    title: 'Luxury Lounge',
    location: 'E-Phoenix Hotel, Ilorin',
    caption: 'Refined comfort in every corner',
    accent: 'SIGNATURE LOUNGE',
  },
  {
    src: '/images/hero-2.jpg',
    title: 'Crystal Swimming Pool',
    location: 'Annex 2, Flower Garden',
    caption: 'Unwind in our outdoor pool retreat',
    accent: 'LEISURE',
  },
];

const PERKS = [
  { icon: Zap, label: '24/7 Power', sub: 'Standby Generators' },
  { icon: Coffee, label: 'Free Breakfast', sub: 'Served Daily' },
  { icon: Waves, label: 'Pool & Rooftop', sub: 'Leisure Spaces' },
  { icon: Shield, label: 'Safe & Secure', sub: '24/7 Security' },
];

export const MinimalHero: React.FC<MinimalHeroProps> = ({
  onSelectBranchFilter,
  onOpenBooking,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [current, setCurrent] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = () => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, paused]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectBranchFilter(selectedBranch);
    document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' });
  };

  const slide = SLIDES[current];

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* FULL-SCREEN BACKGROUND SLIDER */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.src}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* VERTICAL DOTS - desktop */}
      <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 sm:flex flex-col gap-2 hidden">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === current ? 'w-2 h-8 bg-[#C49B55]' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* HORIZONTAL DOTS - mobile */}
      <div className="absolute bottom-[220px] left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:hidden">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === current ? 'w-6 h-2 bg-[#C49B55]' : 'w-2 h-2 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <div className="pt-24 sm:pt-28" />

        <div className="flex-1 flex flex-col justify-center px-5 sm:px-10 lg:px-20 max-w-7xl mx-auto w-full py-8">

          {/* Accent tag */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${current}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2.5 mb-5"
            >
              <span className="h-px w-8 bg-[#C49B55]" />
              <span className="text-[#C49B55] text-[10px] font-bold tracking-[0.3em] uppercase font-cinzel">
                {slide.accent}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Main headline */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`h1-${current}`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, delay: 0.07 }}
              className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.07] tracking-tight max-w-3xl mb-4"
            >
              {slide.title}
            </motion.h1>
          </AnimatePresence>

          {/* Caption + location */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cap-${current}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="flex flex-col sm:flex-row sm:items-center gap-2 mb-8"
            >
              <p className="text-white/75 text-base sm:text-lg font-light tracking-wide">
                {slide.caption}
              </p>
              <span className="hidden sm:inline text-white/30 mx-2">•</span>
              <span className="flex items-center gap-1 text-[#C49B55] text-xs font-semibold tracking-wider uppercase">
                <MapPin className="w-3.5 h-3.5" />
                {slide.location}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <button
              onClick={onOpenBooking}
              id="hero-reserve-btn"
              className="group px-7 py-4 bg-gradient-to-r from-[#4E1E7A] to-[#6B2FA0] hover:from-[#5D2490] hover:to-[#7B3FB0] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-xs transition-all duration-200 shadow-2xl shadow-purple-900/40 hover:shadow-purple-800/50 active:scale-95 cursor-pointer flex items-center gap-2.5 border border-[#8B4FC0]/40"
            >
              <span>RESERVE A SUITE</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C49B55] group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            <a
              href="#rooms"
              id="hero-explore-btn"
              className="px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:border-white/60 text-xs font-bold tracking-[0.2em] uppercase rounded-xs transition-all duration-200 flex items-center gap-2.5"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>EXPLORE ROOMS</span>
            </a>
          </motion.div>

          {/* Perks strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap gap-4 sm:gap-8"
          >
            {PERKS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-[#C49B55]" />
                </div>
                <div>
                  <div className="text-white text-xs font-bold leading-tight">{label}</div>
                  <div className="text-white/50 text-[10px]">{sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* PREMIUM RESERVATION BAR */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative z-20 w-full"
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C49B55]/60 to-transparent" />
          <div className="bg-[#0E0818]/92 backdrop-blur-xl border-t border-white/8">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 pt-3.5 pb-1 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C49B55]" />
                <span className="text-[#C49B55] text-[10px] font-bold tracking-[0.28em] uppercase font-cinzel">
                  DIRECT RESERVATION & RATE CHECK
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-white/40">
                <Star className="w-3 h-3 text-[#C49B55] fill-[#C49B55]" />
                <span>Best Rates Guaranteed · No Booking Fees · Instant Confirmation</span>
              </div>
            </div>
            <form
              onSubmit={handleSearch}
              className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 pb-5 pt-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="hero-branch" className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#C49B55]/80 font-cinzel flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> LOCATION
                  </label>
                  <select
                    id="hero-branch"
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="bg-white/8 hover:bg-white/12 border border-white/15 focus:border-[#C49B55]/70 text-white/90 text-xs rounded-xs px-3.5 py-2.5 focus:outline-none transition-colors cursor-pointer font-medium"
                  >
                    <option value="all" className="bg-[#1B0D2A] text-white">All 3 Locations (19 Suites)</option>
                    <option value="main" className="bg-[#1B0D2A] text-white">Main GRA Flagship (6 Rooms)</option>
                    <option value="annex1" className="bg-[#1B0D2A] text-white">Annex 1 - Tanke / Fate (4 Rooms)</option>
                    <option value="annex2" className="bg-[#1B0D2A] text-white">Annex 2 - Flower Garden (9 Rooms)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="hero-checkin" className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#C49B55]/80 font-cinzel flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5" /> CHECK-IN
                  </label>
                  <input
                    id="hero-checkin"
                    type="date"
                    value={checkIn}
                    min={today}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="bg-white/8 hover:bg-white/12 border border-white/15 focus:border-[#C49B55]/70 text-white/90 text-xs rounded-xs px-3.5 py-2.5 focus:outline-none transition-colors cursor-pointer font-mono"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="hero-checkout" className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#C49B55]/80 font-cinzel flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5" /> CHECK-OUT
                  </label>
                  <input
                    id="hero-checkout"
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="bg-white/8 hover:bg-white/12 border border-white/15 focus:border-[#C49B55]/70 text-white/90 text-xs rounded-xs px-3.5 py-2.5 focus:outline-none transition-colors cursor-pointer font-mono"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    id="hero-search-btn"
                    className="w-full py-2.5 bg-gradient-to-r from-[#C49B55] to-[#A87F3D] hover:from-[#D4AA65] hover:to-[#B88F4D] text-[#0E0818] text-xs font-bold tracking-[0.2em] uppercase rounded-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-900/30 active:scale-95"
                  >
                    <span>CHECK AVAILABILITY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* NAV ARROWS */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/25 hover:bg-black/50 backdrop-blur-sm border border-white/20 items-center justify-center text-white transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 hidden sm:flex"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-14 sm:right-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/25 hover:bg-black/50 backdrop-blur-sm border border-white/20 items-center justify-center text-white transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 hidden sm:flex"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* SLIDE COUNTER */}
      <div className="absolute bottom-[200px] sm:bottom-[185px] left-5 sm:left-10 lg:left-20 z-20 flex items-center gap-2 text-white/40 text-[10px] font-mono select-none">
        <span className="text-white font-bold text-sm">{String(current + 1).padStart(2, '0')}</span>
        <span>/</span>
        <span>{String(SLIDES.length).padStart(2, '0')}</span>
      </div>

      {/* HERITAGE BADGE */}
      <div className="absolute bottom-[200px] sm:bottom-[185px] right-16 sm:right-20 z-20 hidden sm:flex items-center gap-1.5">
        <Star className="w-3 h-3 text-[#C49B55] fill-[#C49B55]" />
        <span className="text-[10px] tracking-widest uppercase font-cinzel text-[#C49B55]/70">
          Est. {HOTEL_HERITAGE.since} · Ilorin, Nigeria
        </span>
      </div>
    </section>
  );
};
