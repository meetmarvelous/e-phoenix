import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { HOTEL_HERITAGE } from '../data/hotelRealData';

interface MobileQuickBarProps {
  onOpenBooking: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenBooking }) => {
  return (
    <aside
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ECE5F3] px-4 py-2.5 shadow-2xl flex items-center justify-between gap-2"
    >
      {/* Call button */}
      <a
        href={`tel:${HOTEL_HERITAGE.primaryPhone}`}
        className="flex-1 py-2 bg-[#FAF7FC] hover:bg-[#F3EBF9] text-[#2D223F] border border-[#E5D5F2] rounded-xs text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
      >
        <Phone className="w-3.5 h-3.5 text-[#C49B55]" />
        <span>Call</span>
      </a>

      {/* Concierge Desk button */}
      <a
        href={HOTEL_HERITAGE.primaryWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2 bg-[#F4EDF9] hover:bg-[#EBDDF9] text-[#4E1E7A] border border-[#E5D5F2] rounded-xs text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
      >
        <MessageCircle className="w-3.5 h-3.5 text-[#C49B55]" />
        <span>Concierge</span>
      </a>

      {/* Reserve button */}
      <button
        onClick={onOpenBooking}
        className="flex-2 py-2 bg-gradient-to-r from-[#4E1E7A] to-[#381259] text-white rounded-xs text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer border border-[#642B9B]/30"
      >
        <Calendar className="w-3.5 h-3.5 text-[#C49B55]" />
        <span>Reserve Room</span>
      </button>
    </aside>
  );
};
