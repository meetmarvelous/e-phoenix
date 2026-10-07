import React, { useState, useEffect } from 'react';
import { PhoenixLogo } from './PhoenixLogo';
import { Menu, X, Phone, Calendar, MessageCircle, MapPin } from 'lucide-react';
import { HOTEL_HERITAGE } from '../data/hotelRealData';
import { motion, AnimatePresence } from 'motion/react';

interface MinimalNavbarProps {
  onOpenBooking: () => void;
}

export const MinimalNavbar: React.FC<MinimalNavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Rooms & Suites', href: '#rooms' },
    { name: 'Our 3 Locations', href: '#locations' },
    { name: 'Facilities & Pool', href: '#facilities' },
    { name: 'Heritage', href: '#heritage' },
    { name: 'Contact & Bank', href: '#contact' },
  ];

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#e9dfef] py-2.5 sm:py-3 shadow-xs'
          : 'bg-white/80 backdrop-blur-sm border-b border-[#f0e8f7] py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Real Crest */}
        <a href="#hero" className="flex items-center gap-3 group">
          <PhoenixLogo size="sm" showSubtitle={true} variant="purple" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold tracking-[0.16em] text-[#3d3150] hover:text-[#4e1e7a] uppercase transition-colors relative py-1 group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4e1e7a] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-3.5">
          <a
            href={HOTEL_HERITAGE.primaryWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#4E1E7A] hover:text-[#381259] font-medium tracking-wide transition-colors py-1.5 px-3 rounded-full bg-[#F4EDF9] border border-[#E5D5F2] hover:bg-[#EBDFFA]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#4E1E7A]" />
            <span>Concierge Desk</span>
          </a>

          <a
            href={`tel:${HOTEL_HERITAGE.primaryPhone}`}
            className="flex items-center gap-1.5 text-xs text-[#2D223F] hover:text-[#4E1E7A] font-semibold transition-colors tracking-wider font-mono py-1.5 px-2.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#C49B55]" />
            <span>{HOTEL_HERITAGE.primaryPhone}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-gradient-to-r from-[#4E1E7A] to-[#381259] hover:from-[#3D1463] hover:to-[#2B0A48] text-white text-xs font-bold tracking-[0.18em] uppercase rounded-xs transition-all duration-200 shadow-md hover:shadow-purple-900/20 active:scale-95 cursor-pointer border border-[#642B9B]/30"
          >
            BOOK A STAY
          </button>
        </div>

        {/* Mobile & Tablet Right Controls */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
          <a
            href={`tel:${HOTEL_HERITAGE.primaryPhone}`}
            className="p-2 text-[#4e1e7a] hover:bg-purple-50 rounded-full transition-colors"
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
            className="p-2 text-[#3d3150] hover:text-[#4e1e7a] transition-colors"
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
              <span className="text-[#4e1e7a] font-mono font-bold">07065023672</span>
            </div>

            <nav className="flex flex-col space-y-3.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wider text-[#2d223f] hover:text-[#4e1e7a] transition-colors py-1"
                >
                  {link.name}
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
