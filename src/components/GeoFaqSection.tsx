import React, { useState } from 'react';
import { HotelBranch, BranchId } from '../types';
import { BRANCH_LIST, HOTEL_FAQS } from '../data/hotelData';
import { MapPin, Navigation, Compass, Plane, Building, ChevronDown, ChevronUp, Globe, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GeoFaqSectionProps {
  currentBranch: HotelBranch;
  onSelectBranch: (id: BranchId) => void;
  onOpenGeoGuide: () => void;
}

export const GeoFaqSection: React.FC<GeoFaqSectionProps> = ({
  currentBranch,
  onSelectBranch,
  onOpenGeoGuide,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="geo-and-faqs" className="bg-[#15120f] py-20 px-4 sm:px-6 lg:px-8 border-t border-[#31271d] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#c5a880] text-xs font-bold tracking-[0.25em] uppercase mb-4 font-cinzel">
            <Globe className="w-3.5 h-3.5" />
            <span>GEO-LOCATION & GUEST INTELLIGENCE</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl text-white font-normal mb-3">
            Prime Ilorin Locations & Traveler FAQs
          </h2>

          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            Strategically positioned across Ilorin's most prestigious districts. Seamless access to Ilorin International Airport, Kwara State Government House, and premier commercial hubs.
          </p>
        </motion.div>

        {/* 3 Branch Geo Cards Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {BRANCH_LIST.map((branch, index) => {
            const isCurrent = branch.id === currentBranch.id;

            return (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-sm p-6 flex flex-col justify-between transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#221c16] border-2 border-[#c5a880] shadow-xl relative'
                    : 'bg-[#1b1713] border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-3 right-4 bg-[#c5a880] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Currently Viewing
                  </span>
                )}

                <div>
                  <div className="flex items-center gap-2 text-[#c5a880] text-xs font-cinzel tracking-wider uppercase mb-2">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{branch.shortName}</span>
                  </div>

                  <h3 className="font-playfair text-xl font-bold text-white mb-2">
                    {branch.locationName}
                  </h3>

                  <p className="text-xs text-neutral-400 font-light mb-4 leading-relaxed">
                    {branch.address}
                  </p>

                  {/* Coordinates & Proximity Micro-Table */}
                  <div className="bg-[#110f0d] p-3 rounded-xs border border-neutral-800 text-[11px] font-mono space-y-1.5 mb-4">
                    <div className="flex justify-between text-neutral-400">
                      <span>Coordinates:</span>
                      <span className="text-white">
                        {branch.geo.latitude.toFixed(4)}°N, {branch.geo.longitude.toFixed(4)}°E
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Region Code:</span>
                      <span className="text-[#c5a880]">{branch.geo.geoRegion}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Airport Drive:</span>
                      <span className="text-white font-sans">{branch.geo.distanceToAirport}</span>
                    </div>
                  </div>

                  {/* Key Landmarks */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
                      Proximity Landmarks:
                    </span>
                    <ul className="text-xs text-neutral-300 space-y-1">
                      {branch.geo.landmarks.slice(0, 3).map((l, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#c5a880]" />
                          <span className="truncate">{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 space-y-2">
                  <button
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          branch.geo.googlePlaceQuery
                        )}`,
                        '_blank'
                      );
                    }}
                    className="w-full py-2 bg-[#2d251d] hover:bg-[#3d3227] text-white text-xs font-semibold rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>View on Google Maps</span>
                  </button>

                  {!isCurrent && (
                    <button
                      onClick={() => onSelectBranch(branch.id)}
                      className="w-full py-1.5 text-xs text-[#c5a880] hover:underline text-center cursor-pointer"
                    >
                      Switch view to this branch →
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#1b1713] rounded-sm p-6 sm:p-10 border border-[#3b3024]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
            <div>
              <div className="text-xs font-cinzel text-[#c5a880] uppercase tracking-widest mb-1">
                KNOWLEDGE BASE & GUIDELINES
              </div>
              <h3 className="font-playfair text-2xl text-white font-normal">
                Frequently Asked Questions
              </h3>
            </div>

            <button
              onClick={onOpenGeoGuide}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#2a2219] hover:bg-[#382d21] border border-[#c5a880]/40 text-[#c5a880] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Open Detailed Geo Guide</span>
            </button>
          </div>

          <div className="space-y-4">
            {HOTEL_FAQS.map((faq, index) => (
              <div
                key={index}
                className="border border-neutral-800/80 rounded-xs overflow-hidden bg-[#15120f] transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-sm sm:text-base font-semibold text-neutral-200 hover:text-white cursor-pointer"
                >
                  <span className="font-playfair">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-4 h-4 text-[#c5a880] shrink-0 ml-3" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0 ml-3" />
                  )}
                </button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed border-t border-neutral-800/50 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
