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

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <div className="pt-20 sm:pt-28" />

        <div className="flex-1 flex flex-col justify-center px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto w-full py-4 sm:py-8">

          {/* Accent tag */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${current}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2.5 mb-3 sm:mb-5"
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
              className="font-playfair text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] sm:leading-[1.07] tracking-tight max-w-3xl mb-3 sm:mb-4"
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
              className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8"
            >
              <p className="text-white/80 text-sm sm:text-lg font-light tracking-wide">
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
            className="flex flex-wrap gap-2.5 sm:gap-3 mb-6 sm:mb-8"
          >
            <button
              onClick={onOpenBooking}
              id="hero-reserve-btn"
              className="group px-6 sm:px-7 py-3.5 sm:py-4 bg-gradient-to-r from-[#4E1E7A] to-[#6B2FA0] hover:from-[#5D2490] hover:to-[#7B3FB0] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-xs transition-all duration-200 shadow-2xl shadow-purple-900/40 hover:shadow-purple-800/50 active:scale-95 cursor-pointer flex items-center gap-2.5 border border-[#8B4FC0]/40"
            >
              <span>RESERVE A SUITE</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C49B55] group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            <a
              href="#rooms"
              id="hero-explore-btn"
              className="px-6 sm:px-7 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:border-white/60 text-xs font-bold tracking-[0.2em] uppercase rounded-xs transition-all duration-200 flex items-center gap-2.5"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>EXPLORE ROOMS</span>
            </a>
          </motion.div>

          {/* Perks strip - 2x2 grid on mobile, flex on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-8 pt-1"
          >
            {PERKS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-[#C49B55]" />
                </div>
                <div>
                  <div className="text-white text-xs font-bold leading-tight">{label}</div>
                  <div className="text-white/60 text-[10px]">{sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* SLIDER CONTROL STRIP (Naturally positioned above reservation bar - zero overlap) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 w-full mb-2.5 sm:mb-3 flex items-center justify-between text-white/70 select-none z-20">
          {/* Slide counter & active caption */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#C49B55] font-bold text-sm sm:text-base font-cinzel tracking-wider">
              {String(current + 1).padStart(2, '0')}
            </span>
            <span className="text-white/30">/</span>
            <span className="text-white/60 font-cinzel">
              {String(SLIDES.length).padStart(2, '0')}
            </span>
            <span className="hidden sm:inline text-white/20 mx-1">•</span>
            <span className="hidden sm:inline text-white/80 text-xs font-sans font-medium tracking-wide">
              {slide.title}
            </span>
          </div>

          {/* Slider dots */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === current
                    ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-[#C49B55]'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/35 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Slide navigation buttons & Heritage note */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-cinzel text-[#C49B55]/80">
              <Star className="w-3 h-3 text-[#C49B55] fill-[#C49B55]" />
              <span>Est. {HOTEL_HERITAGE.since} · Ilorin</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer active:scale-90"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer active:scale-90"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* PREMIUM RESERVATION BAR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-20 w-full"
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C49B55]/60 to-transparent" />
          <div className="bg-[#0E0818]/94 backdrop-blur-xl border-t border-white/10 pb-16 sm:pb-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 pt-3 pb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C49B55]" />
                <span className="text-[#C49B55] text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase font-cinzel">
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
              className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 pt-1.5"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                {/* Location: 2 columns on mobile, 1 col on desktop */}
                <div className="col-span-2 sm:col-span-1 lg:col-span-1 flex flex-col gap-1">
                  <label htmlFor="hero-branch" className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C49B55]/90 font-cinzel flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> LOCATION
                  </label>
                  <select
                    id="hero-branch"
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="bg-white/10 hover:bg-white/14 border border-white/15 focus:border-[#C49B55] text-white text-xs rounded-xs px-3 py-2.5 focus:outline-none transition-colors cursor-pointer font-medium w-full"
                  >
                    <option value="all" className="bg-[#1B0D2A] text-white">All 3 Locations (19 Suites)</option>
                    <option value="main" className="bg-[#1B0D2A] text-white">Main GRA Flagship (6 Rooms)</option>
                    <option value="annex1" className="bg-[#1B0D2A] text-white">Annex 1 - Tanke / Fate (4 Rooms)</option>
                    <option value="annex2" className="bg-[#1B0D2A] text-white">Annex 2 - Flower Garden (9 Rooms)</option>
                  </select>
                </div>

                {/* Check-In: 1 column on mobile, 1 col on desktop */}
                <div className="col-span-1 flex flex-col gap-1">
                  <label htmlFor="hero-checkin" className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C49B55]/90 font-cinzel flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5" /> CHECK-IN
                  </label>
                  <input
                    id="hero-checkin"
                    type="date"
                    value={checkIn}
                    min={today}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="bg-white/10 hover:bg-white/14 border border-white/15 focus:border-[#C49B55] text-white text-xs rounded-xs px-2.5 sm:px-3 py-2.5 focus:outline-none transition-colors cursor-pointer w-full"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>

                {/* Check-Out: 1 column on mobile, 1 col on desktop */}
                <div className="col-span-1 flex flex-col gap-1">
                  <label htmlFor="hero-checkout" className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C49B55]/90 font-cinzel flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5" /> CHECK-OUT
                  </label>
                  <input
                    id="hero-checkout"
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="bg-white/10 hover:bg-white/14 border border-white/15 focus:border-[#C49B55] text-white text-xs rounded-xs px-2.5 sm:px-3 py-2.5 focus:outline-none transition-colors cursor-pointer w-full"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>

                {/* Check Availability button: 2 columns on mobile, 1 col on desktop */}
                <div className="col-span-2 sm:col-span-1 lg:col-span-1 flex items-end">
                  <button
                    type="submit"
                    id="hero-search-btn"
                    className="w-full py-2.5 bg-gradient-to-r from-[#C49B55] to-[#A87F3D] hover:from-[#D4AA65] hover:to-[#B88F4D] text-[#0E0818] text-xs font-bold tracking-[0.18em] uppercase rounded-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-900/30 active:scale-95"
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
    </section>
  );
};
