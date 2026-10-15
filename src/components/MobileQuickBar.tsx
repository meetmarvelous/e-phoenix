import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { HOTEL_HERITAGE } from '../data/hotelRealData';

interface MobileQuickBarProps {
  onOpenBooking: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenBooking }) => {
  return (
    <aside
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-3 inset-x-3 max-w-md mx-auto z-40 pointer-events-none"
    >
      <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-[#E8DEF2] shadow-[0_12px_36px_rgba(45,18,78,0.22)] rounded-2xl p-1.5 flex items-center gap-1.5">
        {/* Direct Call button */}
        <a
          href={`tel:${HOTEL_HERITAGE.primaryPhone}`}
          className="flex-1 py-2 px-2 bg-[#FAF7FC] hover:bg-[#F3EBF9] text-[#2D223F] border border-[#EADBFA] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
          aria-label="Call Front Desk"
        >
          <div className="w-5 h-5 rounded-full bg-[#C49B55]/15 flex items-center justify-center shrink-0">
            <Phone className="w-3 h-3 text-[#C49B55]" />
          </div>
          <span>Call</span>
        </a>

        {/* 24/7 Live Concierge Desk (WhatsApp) */}
        <a
          href={HOTEL_HERITAGE.primaryWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1.2 py-2 px-2.5 bg-gradient-to-r from-[#25D366]/10 via-[#FAF4FF] to-[#4E1E7A]/10 hover:from-[#25D366]/15 hover:to-[#4E1E7A]/15 text-[#2A1840] border border-[#C49B55]/35 rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xs"
          aria-label="Chat with 24/7 Front Desk Concierge on WhatsApp"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
          </span>
          <svg
            className="w-4 h-4 text-[#25D366] shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.17C10.57 20.17 9.12 19.77 7.85 19.02L7.54 18.84L4.42 19.66L5.25 16.61L5.05 16.3C4.23 14.99 3.79 13.47 3.79 11.91C3.79 7.37 7.5 3.66 12.05 3.66C14.25 3.66 16.32 4.52 17.88 6.08C19.44 7.64 20.3 9.71 20.3 11.92C20.29 16.46 16.59 20.17 12.05 20.17ZM16.57 14.33C16.32 14.2 15.1 13.6 14.88 13.52C14.65 13.43 14.48 13.39 14.32 13.64C14.15 13.88 13.67 14.45 13.52 14.62C13.38 14.78 13.23 14.8 12.98 14.68C12.73 14.55 11.93 14.29 10.98 13.44C10.24 12.78 9.74 11.97 9.6 11.72C9.45 11.47 9.58 11.34 9.71 11.21C9.82 11.1 9.96 10.92 10.08 10.77C10.21 10.63 10.25 10.53 10.33 10.36C10.41 10.2 10.37 10.05 10.31 9.93C10.25 9.8 9.76 8.6 9.56 8.1C9.36 7.62 9.16 7.68 9.01 7.68C8.87 7.67 8.71 7.67 8.54 7.67C8.38 7.67 8.11 7.73 7.89 7.98C7.66 8.22 7.03 8.81 7.03 10.03C7.03 11.24 7.91 12.41 8.04 12.57C8.16 12.74 9.78 15.24 12.27 16.31C12.86 16.57 13.32 16.72 13.68 16.84C14.28 17.03 14.82 17 15.26 16.94C15.75 16.87 16.76 16.33 16.97 15.74C17.18 15.15 17.18 14.65 17.11 14.53C17.05 14.41 16.82 14.45 16.57 14.33Z" />
          </svg>
          <div className="flex flex-col text-left leading-none">
            <span className="text-[9px] uppercase tracking-wider text-[#C49B55] font-bold">24/7</span>
            <span className="text-xs font-bold text-[#4E1E7A]">Concierge</span>
          </div>
        </a>

        {/* Primary Reserve Room Action */}
        <button
          onClick={onOpenBooking}
          className="flex-1.4 py-2.5 px-3 bg-gradient-to-r from-[#4E1E7A] via-[#5C2391] to-[#381259] text-white rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(78,30,122,0.35)] active:scale-95 transition-all cursor-pointer border border-[#C49B55]/40"
          aria-label="Reserve a Room"
        >
          <Calendar className="w-3.5 h-3.5 text-[#C49B55] shrink-0" />
          <span className="truncate">Reserve Room</span>
        </button>
      </div>
    </aside>
  );
};
