import React from 'react';
import { PhoenixLogo } from './PhoenixLogo';
import { MapPin, Navigation, Phone, Sparkles } from 'lucide-react';
import { HotelBranch } from '../types';
import { motion } from 'motion/react';

interface FacilitiesSectionProps {
  currentBranch: HotelBranch;
  onOpenBranchModal: () => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
  currentBranch,
  onOpenBranchModal,
}) => {
  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentBranch.address)}`, '_blank');
  };

  return (
    <section id="facilities" className="bg-[#fcfaf7] py-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl text-neutral-900 font-normal tracking-wide">
            Our Facilities & Location
          </h2>
          <p className="text-xs sm:text-sm text-[#8f7147] tracking-[0.2em] uppercase font-cinzel mt-2">
            {currentBranch.name}
          </p>
          <div className="w-12 h-0.5 bg-[#c5a880] mx-auto mt-3" />
        </motion.div>

        {/* Two Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Card: White Card with Logo & Branch Tag */}
          <motion.div
            id="facilities-logo-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-md p-8 sm:p-12 shadow-lg border border-neutral-200/80 flex flex-col items-center justify-center min-h-[260px] text-center"
          >
            <PhoenixLogo size="xl" showSubtitle={true} variant="white-bg" />
            <div className="mt-4 inline-block px-3 py-1 bg-[#f5ede0] text-[#866843] rounded-full text-xs font-bold font-cinzel uppercase tracking-wider">
              {currentBranch.badge}
            </div>
            <p className="text-xs text-neutral-500 tracking-wider mt-3 max-w-xs font-light">
              {currentBranch.experienceDescription}
            </p>
          </motion.div>

          {/* Right Card: Dark Card with Location Pin & Exact Branch Address */}
          <motion.div
            id="facilities-location-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#141414] text-white rounded-md p-8 sm:p-12 shadow-xl border border-neutral-800 flex flex-col items-center justify-center min-h-[260px] text-center relative group"
          >
            {/* Gold Map Pin */}
            <div className="w-12 h-12 rounded-full bg-[#2a241f] border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>

            {/* Branch Address */}
            <h3 className="font-playfair text-2xl sm:text-3xl text-neutral-100 font-normal leading-relaxed max-w-sm mb-1">
              {currentBranch.locationName}
            </h3>

            <p className="text-xs text-neutral-400 font-light max-w-xs mb-5">
              {currentBranch.address}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                id="get-directions-btn"
                onClick={openGoogleMaps}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#c5a880] hover:bg-[#b89569] text-black text-xs font-bold tracking-wider uppercase rounded-xs transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </button>

              <a
                id="facilities-call-btn"
                href={`tel:${currentBranch.phones[0]}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#c5a880]/50 hover:border-[#c5a880] text-[#c5a880] text-xs font-medium tracking-wider uppercase rounded-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{currentBranch.phones[0]}</span>
              </a>

              <button
                onClick={onOpenBranchModal}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#2a241e] hover:bg-[#362e26] text-neutral-300 text-xs font-medium rounded-xs border border-neutral-700 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-[#c5a880]" />
                <span>Other Branches</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
