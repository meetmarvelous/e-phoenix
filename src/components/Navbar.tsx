import React, { useState, useEffect, useRef } from 'react';
import { PhoenixLogo } from './PhoenixLogo';
import { Menu, X, Phone, CalendarCheck, MapPin, ChevronDown, Sparkles, Compass } from 'lucide-react';
import { HotelBranch, BranchId } from '../types';
import { BRANCH_LIST } from '../data/hotelData';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentBranch: HotelBranch;
  onSelectBranch: (branchId: BranchId) => void;
  onOpenBranchModal: () => void;
  onOpenReservation: () => void;
  onOpenMenu: () => void;
  onOpenGeoGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentBranch,
  onSelectBranch,
  onOpenBranchModal,
  onOpenReservation,
  onOpenMenu,
  onOpenGeoGuide,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setBranchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT US', href: '#about' },
    { name: 'ROOM RATES', href: '#rates' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'DINING MENU', action: onOpenMenu },
    { name: 'GEO & FAQS', href: '#geo-and-faqs' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#111111]/95 backdrop-blur-md shadow-xl py-2.5 border-b border-neutral-800/80'
          : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* LEFT: Brand Logo */}
        <div className="shrink-0 flex items-center">
          <a href="#home" id="nav-brand-logo" className="flex items-center gap-2 group">
            <PhoenixLogo size="sm" showSubtitle={true} variant="gold" />
          </a>
        </div>

        {/* CENTER: Desktop Navigation Links (>= 1024px) */}
        <nav
          className="hidden lg:flex items-center justify-center space-x-5 xl:space-x-7 2xl:space-x-8 flex-1"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            link.action ? (
              <button
                key={link.name}
                id={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={link.action}
                className="text-xs font-semibold tracking-[0.18em] xl:tracking-[0.22em] text-neutral-300 hover:text-[#c5a880] transition-colors cursor-pointer py-1 whitespace-nowrap relative group"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c5a880] transition-all duration-200 group-hover:w-full" />
              </button>
            ) : (
              <a
                key={link.name}
                id={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                className="text-xs font-semibold tracking-[0.18em] xl:tracking-[0.22em] text-neutral-300 hover:text-[#c5a880] transition-colors py-1 whitespace-nowrap relative group"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c5a880] transition-all duration-200 group-hover:w-full" />
              </a>
            )
          ))}
        </nav>

        {/* RIGHT: Desktop Actions (Branch Selector Dropdown + Reservation CTA) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Active Branch Switcher Pill */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="branch-switcher-desktop-btn"
              onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1f1914] hover:bg-[#2c241c] border border-[#c5a880]/50 hover:border-[#c5a880] text-[#c5a880] text-xs font-semibold tracking-wider transition-all cursor-pointer shadow-sm"
              title="Click to switch between Main, Annex 1, and Annex 2"
              aria-expanded={branchDropdownOpen}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#c5a880]" />
              <span className="truncate max-w-[150px]">{currentBranch.shortName}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 shrink-0 opacity-70 transition-transform duration-200 ${
                  branchDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu with Framer Motion */}
            <AnimatePresence>
              {branchDropdownOpen && (
                <motion.div
                  id="branch-dropdown-menu"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-72 bg-[#1b1713] border border-[#3e3428] rounded-xs shadow-2xl p-2 z-50"
                >
                  <div className="px-2 py-1.5 text-[10px] font-bold tracking-widest text-neutral-400 uppercase border-b border-neutral-800 flex items-center justify-between">
                    <span>3 ILORIN PROPERTIES</span>
                    <button
                      onClick={() => {
                        setBranchDropdownOpen(false);
                        onOpenBranchModal();
                      }}
                      className="text-[#c5a880] hover:underline text-[10px] cursor-pointer"
                    >
                      Compare All
                    </button>
                  </div>

                  <div className="py-1 space-y-1">
                    {BRANCH_LIST.map((branch) => (
                      <button
                        key={branch.id}
                        onClick={() => {
                          onSelectBranch(branch.id);
                          setBranchDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xs transition-colors flex items-start justify-between cursor-pointer ${
                          currentBranch.id === branch.id
                            ? 'bg-[#2b241c] text-white border-l-2 border-[#c5a880]'
                            : 'text-neutral-300 hover:bg-[#241e18] hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold font-serif">{branch.name}</div>
                          <div className="text-[11px] text-[#c5a880]">{branch.badge}</div>
                          <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{branch.path}</div>
                        </div>
                        {currentBranch.id === branch.id && (
                          <span className="text-[10px] bg-[#c5a880] text-black font-bold px-1.5 py-0.5 rounded-xs mt-0.5">
                            ACTIVE
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-neutral-800 px-1">
                    <button
                      onClick={() => {
                        setBranchDropdownOpen(false);
                        onOpenBranchModal();
                      }}
                      className="w-full py-1.5 bg-[#2b241c] hover:bg-[#382f25] text-[#c5a880] text-[11px] font-semibold rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>View Branch Comparison Guide</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Primary Reservation CTA Button */}
          <button
            id="nav-reservation-btn"
            onClick={onOpenReservation}
            className="px-5 py-2.5 bg-[#c5a880] hover:bg-[#b59567] text-[#1a1714] text-xs font-bold tracking-[0.22em] uppercase rounded-xs transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
          >
            RESERVATION
          </button>
        </div>

        {/* MOBILE & TABLET CONTROLS (< 1024px) */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
          {/* Tablet-only branch switcher pill (hidden on small mobile screens to keep it uncluttered) */}
          <div className="hidden sm:block relative" ref={dropdownRef}>
            <button
              id="branch-switcher-tablet-btn"
              onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1f1914] border border-[#c5a880]/50 text-[#c5a880] text-xs font-semibold cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-[#c5a880]" />
              <span className="truncate max-w-[120px]">{currentBranch.shortName}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>
          </div>

          {/* Quick Book CTA Button */}
          <button
            id="mobile-quick-reserve-btn"
            onClick={onOpenReservation}
            className="px-3 sm:px-4 py-1.5 bg-[#c5a880] hover:bg-[#b59567] text-black text-xs font-bold tracking-wider uppercase rounded-xs cursor-pointer shadow-sm active:scale-95 transition-all"
          >
            BOOK
          </button>

          {/* Hamburger Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 text-neutral-300 hover:text-[#c5a880] bg-neutral-900/70 border border-neutral-700/60 rounded-xs transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE & TABLET DRAWER (< 1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#14120f]/98 backdrop-blur-xl border-b border-[#3b3228] px-5 sm:px-8 py-5 shadow-2xl overflow-hidden"
          >
            {/* Branch Selector Box inside Drawer */}
            <div className="mb-4 p-3 bg-[#1e1914] rounded-xs border border-[#3e3428]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest text-[#c5a880] uppercase font-cinzel">
                  Active Property
                </span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBranchModal();
                  }}
                  className="text-neutral-300 hover:text-[#c5a880] text-[11px] font-semibold underline cursor-pointer"
                >
                  All 3 Locations
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                {BRANCH_LIST.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      onSelectBranch(b.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left px-2.5 py-2 rounded-xs text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      currentBranch.id === b.id
                        ? 'bg-[#c5a880] text-black font-bold shadow-sm'
                        : 'bg-[#15120f] text-neutral-300 hover:bg-[#251e18]'
                    }`}
                  >
                    <span className="truncate">{b.shortName}</span>
                    <span className="text-[10px] opacity-75 font-mono ml-1">{b.path}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col divide-y divide-neutral-800/60" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                link.action ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      link.action!();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-xs sm:text-sm font-semibold tracking-[0.16em] text-neutral-200 hover:text-[#c5a880] py-2.5 transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-left text-xs sm:text-sm font-semibold tracking-[0.16em] text-neutral-200 hover:text-[#c5a880] py-2.5 transition-colors"
                  >
                    {link.name}
                  </a>
                )
              ))}

              {onOpenGeoGuide && (
                <button
                  onClick={() => {
                    onOpenGeoGuide();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs sm:text-sm font-semibold tracking-[0.16em] text-[#c5a880] hover:text-white py-2.5 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>ILORIN GEO GUIDE</span>
                </button>
              )}
            </nav>

            {/* Action Buttons in Drawer */}
            <div className="pt-4 mt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                id="mobile-drawer-reservation-btn"
                onClick={() => {
                  onOpenReservation();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-3 bg-[#c5a880] hover:bg-[#b89569] text-black text-xs font-bold tracking-[0.22em] uppercase rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>MAKE A RESERVATION</span>
              </button>

              <a
                id="mobile-drawer-call-btn"
                href={`tel:${currentBranch.phones[0]}`}
                className="py-2.5 px-4 border border-[#c5a880]/50 hover:bg-[#251e18] text-[#c5a880] text-xs font-semibold tracking-wider text-center rounded-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>CALL: {currentBranch.phones[0]}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
