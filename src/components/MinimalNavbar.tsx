import React, { useState, useEffect, useRef } from 'react';
import { PhoenixLogo } from './PhoenixLogo';
import { Menu, X, Phone, Calendar, MessageCircle, MapPin, ChevronDown, ArrowRight } from 'lucide-react';
import { HOTEL_HERITAGE, REAL_BRANCHES } from '../data/hotelRealData';
import { motion, AnimatePresence } from 'motion/react';

interface MinimalNavbarProps {
  onOpenBooking: () => void;
  onSelectBranchFilter?: (branchId: string) => void;
}

export const MinimalNavbar: React.FC<MinimalNavbarProps> = ({
  onOpenBooking,
  onSelectBranchFilter,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // Section scroll spy
      const sections = ['hero', 'rooms', 'locations', 'facilities', 'heritage', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnterLocations = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setLocationsDropdownOpen(true);
  };

  const handleMouseLeaveLocations = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setLocationsDropdownOpen(false);
    }, 180);
  };

  const handleBranchClick = (branchId: string) => {
    setLocationsDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectBranchFilter) {
      onSelectBranchFilter(branchId);
    } else {
      document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Rooms & Suites', href: '#rooms', id: 'rooms', hasDropdown: false },
    { name: 'Our 3 Locations', href: '#locations', id: 'locations', hasDropdown: true },
    { name: 'Facilities & Pool', href: '#facilities', id: 'facilities', hasDropdown: false },
    { name: 'Heritage', href: '#heritage', id: 'heritage', hasDropdown: false },
    { name: 'Contact & Bank', href: '#contact', id: 'contact', hasDropdown: false },
  ];

  return (
    <header
      id="main-nav"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-3.5 bg-white/95 backdrop-blur-md border-b border-[#ECE5F3] shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Real Crest (Purple variant always) */}
        <a href="#hero" className="flex items-center gap-3 group">
          <PhoenixLogo
            size="sm"
            showSubtitle={true}
            variant="purple"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            if (link.hasDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={handleMouseEnterLocations}
                  onMouseLeave={handleMouseLeaveLocations}
                >
                  <a
                    href={link.href}
                    className={`text-xs font-semibold tracking-[0.16em] uppercase transition-colors flex items-center gap-1 py-1 ${
                      isActive
                        ? 'text-[#4E1E7A] font-bold'
                        : 'text-[#3D3150] hover:text-[#4E1E7A]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`w-3 h-3 text-[#C49B55] transition-transform duration-200 ${
                        locationsDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </a>

                  {/* Mega Popover for the 3 Locations */}
                  <AnimatePresence>
                    {locationsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-80 z-50"
                      >
                        <div className="bg-white rounded-xs border border-[#E8DEF2] shadow-2xl p-3.5 backdrop-blur-xl">
                          <div className="px-2 pb-2 mb-1.5 border-b border-[#F2EBF7] flex items-center justify-between">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C49B55] font-cinzel">
                              OUR 3 PROPERTIES IN ILORIN
                            </span>
                          </div>

                          <div className="space-y-1">
                            {REAL_BRANCHES.map((branch) => (
                              <button
                                key={branch.id}
                                onClick={() => handleBranchClick(branch.id)}
                                className="w-full text-left p-2.5 rounded-xs hover:bg-[#F8F3FC] transition-colors group cursor-pointer flex items-center justify-between"
                              >
                                <div>
                                  <div className="text-xs font-bold text-[#1B112B] group-hover:text-[#4E1E7A] transition-colors flex items-center gap-1.5">
                                    <MapPin className="w-3 h-3 text-[#C49B55]" />
                                    <span>{branch.name}</span>
                                  </div>
                                  <div className="text-[10px] text-[#6E6280] font-light mt-0.5 pl-4.5">
                                    {branch.id === 'main'
                                      ? 'GRA Diplomatic Zone • 6 Suites'
                                      : branch.id === 'annex1'
                                      ? 'Tanke / Fate • Sky Lounge • 4 Suites'
                                      : 'Flower Garden • Poolside Resort • 9 Suites'}
                                  </div>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-[#C49B55] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                              </button>
                            ))}
                          </div>

                          <div className="pt-2 mt-1.5 border-t border-[#F2EBF7]">
                            <a
                              href="#locations"
                              onClick={() => setLocationsDropdownOpen(false)}
                              className="text-[10px] font-bold tracking-wider uppercase text-[#4E1E7A] hover:text-[#381259] flex items-center justify-center gap-1.5 py-1"
                            >
                              <span>Explore All Properties & Maps</span>
                              <ArrowRight className="w-3 h-3 text-[#C49B55]" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs font-semibold tracking-[0.16em] uppercase transition-colors relative py-1 flex flex-col items-center group ${
                  isActive
                    ? 'text-[#4E1E7A] font-bold'
                    : 'text-[#3D3150] hover:text-[#4E1E7A]'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C49B55] mt-1" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Right Actions (Streamlined & Non-Crowded) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Instant Concierge Button */}
          <a
            href={HOTEL_HERITAGE.primaryWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium tracking-wide transition-all py-1.5 px-3 rounded-full border cursor-pointer text-[#4E1E7A] hover:text-[#381259] bg-[#F4EDF9] border-[#E5D5F2] hover:bg-[#EBDFFA]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#C49B55]" />
            <span>Concierge Desk</span>
          </a>

          {/* Front Desk Telephone (Shown on xl screens >=1280px to avoid crowding 1024-1279px) */}
          <a
            href={`tel:${HOTEL_HERITAGE.primaryPhone}`}
            className="hidden xl:flex items-center gap-1.5 text-xs font-semibold transition-colors tracking-wide py-1.5 px-2.5 text-[#2D223F] hover:text-[#4E1E7A]"
          >
            <Phone className="w-3.5 h-3.5 text-[#C49B55]" />
            <span>{HOTEL_HERITAGE.primaryPhone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')}</span>
          </a>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-gradient-to-r from-[#4E1E7A] to-[#381259] hover:from-[#5D2490] hover:to-[#4A1874] text-white text-xs font-bold tracking-[0.18em] uppercase rounded-xs transition-all duration-200 shadow-md hover:shadow-purple-900/30 active:scale-95 cursor-pointer border border-[#C49B55]/40"
          >
            BOOK A STAY
          </button>
        </div>

        {/* Mobile & Tablet Right Controls */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
          <a
            href={`tel:${HOTEL_HERITAGE.primaryPhone}`}
            className="p-2 rounded-full transition-colors text-[#4E1E7A] hover:bg-purple-50"
            aria-label="Call front desk"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenBooking}
            className="px-3.5 py-1.5 bg-gradient-to-r from-[#4E1E7A] to-[#381259] text-white text-[11px] font-bold tracking-wider uppercase rounded-xs active:scale-95 transition-transform shadow-xs"
          >
            BOOK
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 transition-colors text-[#3D3150] hover:text-[#4E1E7A]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b border-[#e9dfef] px-6 py-6 shadow-xl overflow-hidden"
          >
            {/* Quick Contact & Heritage Note */}
            <div className="mb-4 pb-4 border-b border-[#f1e8f8] text-xs text-[#6e6280] flex items-center justify-between">
              <span>Established 1981 • Ilorin, Kwara</span>
              <a href={`tel:${HOTEL_HERITAGE.primaryPhone}`} className="text-[#4e1e7a] font-semibold">
                {HOTEL_HERITAGE.primaryPhone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')}
              </a>
            </div>

            <nav className="flex flex-col space-y-3.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wider text-[#2d223f] hover:text-[#4e1e7a] transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <span className="text-[10px] text-[#C49B55] font-cinzel font-bold">3 Branches</span>
                  )}
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-5 border-t border-[#f1e8f8] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-gradient-to-r from-[#4E1E7A] to-[#381259] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK A ROOM</span>
              </button>

              <a
                href={HOTEL_HERITAGE.primaryWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#F4EDF9] text-[#4E1E7A] border border-[#E5D5F2] text-xs font-semibold tracking-wider text-center rounded-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#4E1E7A]" />
                <span>CHAT WITH CONCIERGE</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
