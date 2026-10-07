import React, { useState } from 'react';
import { Star, Calendar, Minus, Plus, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { HotelBranch } from '../types';
import { motion } from 'motion/react';

interface HeroSectionProps {
  currentBranch: HotelBranch;
  onOpenBranchModal: () => void;
  onDiscoverRooms: () => void;
  onCheckAvailability: (bookingParams: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentBranch,
  onOpenBranchModal,
  onDiscoverRooms,
  onCheckAvailability,
}) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(formatDate(today));
  const [checkOut, setCheckOut] = useState<string>(formatDate(tomorrow));
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);

  const handleAvailabilitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      checkIn,
      checkOut,
      adults,
      children,
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] sm:min-h-screen bg-[#111111] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Dynamic Background Image with subtle blend */}
      <div className="absolute inset-0 pointer-events-none opacity-20 transition-all duration-700">
        <img
          src={currentBranch.image}
          alt={currentBranch.name}
          className="w-full h-full object-cover filter blur-[2px]"
        />
      </div>

      {/* Background Star Constellation Pattern */}
      <div className="absolute inset-0 bg-pattern-stars opacity-30 pointer-events-none" />

      {/* Atmospheric dark radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,32,24,0.55)_0%,rgba(17,17,17,0.98)_85%)] pointer-events-none" />

      {/* Center Arch Line Motif from the screenshot */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-4">
        {/* Branch Switcher Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <button
            id="hero-branch-indicator-btn"
            onClick={onOpenBranchModal}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#241e17]/90 border border-[#c5a880]/60 text-neutral-200 text-xs hover:border-[#c5a880] hover:bg-[#2e261d] transition-all cursor-pointer shadow-lg group"
          >
            <MapPin className="w-3.5 h-3.5 text-[#c5a880] group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-white">{currentBranch.name}</span>
            <span className="text-[#c5a880] font-semibold text-[11px] underline ml-1">
              Switch Branch ({currentBranch.path})
            </span>
          </button>
        </motion.div>

        {/* Curved Gold Arch Header Frame */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative pt-6 sm:pt-10 px-6 sm:px-14 pb-4 w-full flex flex-col items-center"
        >
          {/* SVG Arched Accent line */}
          <div className="absolute top-0 inset-x-0 mx-auto w-[280px] sm:w-[480px] md:w-[600px] h-28 pointer-events-none opacity-80">
            <svg viewBox="0 0 600 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                d="M10 120C10 50 140 10 300 10C460 10 590 50 590 120"
                stroke="#c5a880"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M50 120C50 65 160 25 300 25C440 25 550 65 550 120"
                stroke="#c5a880"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* 5 Gold Stars */}
          <div className="flex items-center justify-center gap-1.5 mb-3 text-[#d4af37]" aria-label="5 Star Luxury Rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#c5a880] text-[#c5a880]" />
            ))}
          </div>

          {/* Branch Distinction Badge */}
          <div className="mb-2">
            <span className="text-xs sm:text-sm font-cinzel font-bold text-[#c5a880] tracking-[0.25em] uppercase">
              {currentBranch.badge}
            </span>
          </div>

          {/* Main Title */}
          <h1
            id="hero-title"
            className="font-playfair text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-wide leading-tight mb-3"
          >
            {currentBranch.name}
          </h1>

          {/* Subtitle Tailored to Branch */}
          <p
            id="hero-subtitle"
            className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-6 tracking-wide"
          >
            {currentBranch.experienceDescription} Situated in the heart of {currentBranch.locationName}, our hotel is your gateway to an unforgettable experience.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            <button
              id="hero-discover-rooms-btn"
              onClick={onDiscoverRooms}
              className="px-7 py-3 bg-[#c5a880] hover:bg-[#b89569] text-[#1b1713] text-xs sm:text-sm font-bold tracking-[0.22em] uppercase rounded-xs transition-all duration-200 shadow-lg active:scale-95 cursor-pointer"
            >
              DISCOVER ROOMS
            </button>

            <button
              id="hero-explore-other-branches-btn"
              onClick={onOpenBranchModal}
              className="px-6 py-3 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 border border-[#c5a880]/40 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Explore All 3 Branches</span>
            </button>
          </div>
        </motion.div>

        {/* Floating White Booking Bar Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28 }}
          id="booking-bar-card"
          className="w-full max-w-4xl bg-white text-neutral-800 rounded-sm shadow-2xl p-4 sm:p-5 border border-neutral-200 mt-1"
        >
          <div className="text-left mb-2 flex items-center justify-between text-xs text-neutral-500 pb-2 border-b border-neutral-100">
            <span>Booking for: <strong className="text-neutral-900">{currentBranch.shortName}</strong> ({currentBranch.locationName})</span>
            <button
              type="button"
              onClick={onOpenBranchModal}
              className="text-[#937146] font-semibold hover:underline"
            >
              Change branch
            </button>
          </div>

          <form onSubmit={handleAvailabilitySubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            {/* Check In */}
            <div className="flex flex-col text-left">
              <label htmlFor="check-in-input" className="text-[11px] font-bold tracking-wider text-neutral-500 uppercase mb-1.5">
                CHECK IN
              </label>
              <div className="relative">
                <input
                  id="check-in-input"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xs px-3 py-2 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880]"
                  required
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex flex-col text-left">
              <label htmlFor="check-out-input" className="text-[11px] font-bold tracking-wider text-neutral-500 uppercase mb-1.5">
                CHECK OUT
              </label>
              <div className="relative">
                <input
                  id="check-out-input"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xs px-3 py-2 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880]"
                  required
                />
              </div>
            </div>

            {/* Adults Counter */}
            <div className="flex flex-col text-left">
              <label className="text-[11px] font-bold tracking-wider text-neutral-500 uppercase mb-1.5">
                ADULTS
              </label>
              <div className="flex items-center justify-between bg-neutral-50 border border-neutral-300 rounded-xs px-2.5 py-1.5">
                <button
                  type="button"
                  id="decrement-adults-btn"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="text-neutral-500 hover:text-black p-1 hover:bg-neutral-200 rounded cursor-pointer transition-colors"
                  aria-label="Decrease adults"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800 px-2">
                  {adults}
                </span>
                <button
                  type="button"
                  id="increment-adults-btn"
                  onClick={() => setAdults(Math.min(10, adults + 1))}
                  className="text-neutral-500 hover:text-black p-1 hover:bg-neutral-200 rounded cursor-pointer transition-colors"
                  aria-label="Increase adults"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Children Counter */}
            <div className="flex flex-col text-left">
              <label className="text-[11px] font-bold tracking-wider text-neutral-500 uppercase mb-1.5">
                CHILDREN
              </label>
              <div className="flex items-center justify-between bg-neutral-50 border border-neutral-300 rounded-xs px-2.5 py-1.5">
                <button
                  type="button"
                  id="decrement-children-btn"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className="text-neutral-500 hover:text-black p-1 hover:bg-neutral-200 rounded cursor-pointer transition-colors"
                  aria-label="Decrease children"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800 px-2">
                  {children}
                </span>
                <button
                  type="button"
                  id="increment-children-btn"
                  onClick={() => setChildren(Math.min(8, children + 1))}
                  className="text-neutral-500 hover:text-black p-1 hover:bg-neutral-200 rounded cursor-pointer transition-colors"
                  aria-label="Increase children"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Check Availability CTA */}
            <div>
              <button
                type="submit"
                id="check-availability-submit-btn"
                className="w-full py-2.5 bg-[#1a1714] hover:bg-[#2c2722] text-white text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase rounded-xs transition-colors duration-150 h-[38px] flex items-center justify-center cursor-pointer shadow-sm"
              >
                CHECK AVAILABILITY
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
