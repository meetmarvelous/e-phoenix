import React, { useState, useEffect } from 'react';
import { PhoenixLogo } from './PhoenixLogo';
import { Menu, X, Phone, CalendarCheck, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { HotelBranch, BranchId } from '../types';
import { BRANCH_LIST } from '../data/hotelData';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT US', href: '#about' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'ROOM RATES', href: '#rates' },
    { name: 'DINING MENU', action: onOpenMenu },
    { name: 'GEO & FAQS', href: '#geo-and-faqs' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#111111]/95 backdrop-blur-md shadow-xl py-2.5 border-b border-neutral-800/80'
          : 'bg-gradient-to-b from-black/85 via-black/50 to-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Current Branch Pill */}
        <div className="flex items-center gap-3">
          <a href="#home" id="nav-brand-logo" className="flex items-center gap-3 group">
            <PhoenixLogo size="sm" showSubtitle={true} variant="gold" />
          </a>

          {/* Branch Switcher Pill (Desktop) */}
          <div className="relative hidden md:block">
            <button
              id="branch-switcher-desktop-btn"
              onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#201b16] hover:bg-[#2c251f] border border-[#c5a880]/40 text-[#c5a880] text-xs font-semibold tracking-wider transition-colors cursor-pointer shadow-xs"
              title="Click to switch between Main, Annex 1, and Annex 2"
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate max-w-[170px]">{currentBranch.shortName}</span>
              <ChevronDown className="w-3.5 h-3.5 shrink-0 ml-0.5 opacity-70" />
            </button>

            {/* Dropdown Menu */}
            {branchDropdownOpen && (
              <div
                id="branch-dropdown-menu"
                className="absolute left-0 mt-2 w-72 bg-[#1b1713] border border-[#3e3428] rounded-sm shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-2 py-1.5 text-[10px] font-bold tracking-widest text-neutral-400 uppercase border-b border-neutral-800 flex items-center justify-between">
                  <span>3 ILORIN BRANCHES</span>
                  <button
                    onClick={() => {
                      setBranchDropdownOpen(false);
                      onOpenBranchModal();
                    }}
                    className="text-[#c5a880] hover:underline text-[10px]"
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
                      className={`w-full text-left p-2.5 rounded-xs transition-colors flex items-start justify-between ${
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
                    className="w-full py-1.5 bg-[#2b241c] hover:bg-[#382f25] text-[#c5a880] text-[11px] font-semibold text-center rounded-xs transition-colors cursor-pointer"
                  >
                    ✨ View Branch Comparison Guide
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            link.action ? (
              <button
                key={link.name}
                id={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={link.action}
                className="text-xs font-semibold tracking-[0.2em] text-neutral-300 hover:text-[#c5a880] transition-colors cursor-pointer py-1"
              >
                {link.name}
              </button>
            ) : (
              <a
                key={link.name}
                id={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                className="text-xs font-semibold tracking-[0.2em] text-neutral-300 hover:text-[#c5a880] transition-colors py-1"
              >
                {link.name}
              </a>
            )
          ))}
        </nav>

        {/* Desktop Right CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-choose-location-btn"
            onClick={onOpenBranchModal}
            className="px-3.5 py-2 bg-neutral-900/80 hover:bg-neutral-800 text-[#c5a880] border border-[#c5a880]/30 text-xs font-bold tracking-wider uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Switch Location</span>
          </button>

          <button
            id="nav-reservation-btn"
            onClick={onOpenReservation}
            className="px-5 py-2.5 bg-[#c5a880] hover:bg-[#b59567] text-[#1a1714] text-xs font-bold tracking-[0.22em] uppercase rounded-xs transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            RESERVATION
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="mobile-branch-pill-btn"
            onClick={onOpenBranchModal}
            className="px-2 py-1 bg-[#241e18] border border-[#c5a880]/50 text-[#c5a880] text-[10px] font-bold rounded-xs flex items-center gap-1"
          >
            <MapPin className="w-3 h-3" />
            <span className="truncate max-w-[80px]">{currentBranch.shortName}</span>
          </button>

          <button
            id="mobile-quick-reserve-btn"
            onClick={onOpenReservation}
            className="px-2.5 py-1 bg-[#c5a880] text-black text-[10px] font-bold tracking-wider uppercase rounded-xs"
          >
            BOOK
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-neutral-300 hover:text-[#c5a880] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="sm:hidden bg-[#161616] border-b border-neutral-800 px-6 py-6 shadow-2xl animate-in slide-in-from-top duration-200"
        >
          {/* Branch Selector Box in Drawer */}
          <div className="mb-5 p-3 bg-[#201b16] rounded-xs border border-[#3e3428]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                Active Branch
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBranchModal();
                }}
                className="text-[#c5a880] text-[11px] font-semibold underline"
              >
                Compare All
              </button>
            </div>

            <div className="space-y-1.5">
              {BRANCH_LIST.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    onSelectBranch(b.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xs text-xs font-medium flex items-center justify-between ${
                    currentBranch.id === b.id
                      ? 'bg-[#c5a880] text-black font-bold'
                      : 'bg-[#15120f] text-neutral-300'
                  }`}
                >
                  <span>{b.shortName}</span>
                  <span className="text-[10px] opacity-80">{b.path}</span>
                </button>
              ))}
            </div>
          </div>

          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              link.action ? (
                <button
                  key={link.name}
                  onClick={() => {
                    link.action!();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-semibold tracking-[0.18em] text-neutral-200 hover:text-[#c5a880] py-1.5 border-b border-neutral-800/50"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left text-sm font-semibold tracking-[0.18em] text-neutral-200 hover:text-[#c5a880] py-1.5 border-b border-neutral-800/50"
                >
                  {link.name}
                </a>
              )
            ))}

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                id="mobile-drawer-reservation-btn"
                onClick={() => {
                  onOpenReservation();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-[#c5a880] text-black text-xs font-bold tracking-[0.25em] uppercase rounded-xs flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                MAKE A RESERVATION
              </button>

              <a
                id="mobile-drawer-call-btn"
                href={`tel:${currentBranch.phones[0]}`}
                className="w-full py-2.5 border border-[#c5a880]/40 text-[#c5a880] text-xs font-semibold tracking-wider text-center rounded-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                CALL: {currentBranch.phones[0]}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
