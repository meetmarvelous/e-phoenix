import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { HotelBranch } from '../types';

interface FloatingControlsProps {
  currentBranch: HotelBranch;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({ currentBranch }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* WhatsApp Button on Bottom Left */}
      <aside aria-label="Customer Support">
        <a
          id="floating-whatsapp-btn"
          href={currentBranch.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with ${currentBranch.shortName} on WhatsApp`}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 group"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping opacity-75" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />

          {/* Hover Tooltip */}
          <span className="absolute left-16 bg-[#1a1714] text-[#e5e5e5] text-xs font-semibold px-3 py-1.5 rounded-sm shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-neutral-700">
            Chat with {currentBranch.shortName} ({currentBranch.phones[0]})
          </span>
        </a>
      </aside>

      {/* Scroll to Top Button on Bottom Right */}
      {showScrollTop && (
        <button
          id="scroll-to-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#c5a880] hover:bg-[#b89569] text-[#1b1713] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer animate-in fade-in"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </>
  );
};
