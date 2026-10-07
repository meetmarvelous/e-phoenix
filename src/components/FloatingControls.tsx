import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { HotelBranch } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingControlsProps {
  currentBranch: HotelBranch;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({ currentBranch }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
        <motion.a
          id="floating-whatsapp-btn"
          href={currentBranch.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with ${currentBranch.shortName} on WhatsApp`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl transition-shadow group"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping opacity-75" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />

          {/* Hover Tooltip (desktop only) */}
          <span className="hidden sm:block absolute left-16 bg-[#1a1714] text-[#e5e5e5] text-xs font-semibold px-3 py-1.5 rounded-sm shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-neutral-700">
            Chat with {currentBranch.shortName} ({currentBranch.phones[0]})
          </span>
        </motion.a>
      </aside>

      {/* Scroll to Top Button on Bottom Right */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="scroll-to-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#c5a880] hover:bg-[#b89569] text-[#1b1713] flex items-center justify-center shadow-2xl cursor-pointer"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
