import React from 'react';
import { REAL_BRANCHES, RealBranch } from '../data/hotelRealData';
import { MapPin, Phone, MessageCircle, Navigation, ExternalLink, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ThreeLocationsSectionProps {
  onFilterBranchRooms: (branchId: string) => void;
}

export const ThreeLocationsSection: React.FC<ThreeLocationsSectionProps> = ({
  onFilterBranchRooms,
}) => {
  return (
    <section id="locations" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7FC] border-b border-[#ECE5F3]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#4E1E7A] uppercase block mb-1">
            THREE STRATEGIC HUBS IN ILORIN
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#1F1929] font-normal mb-3">
            Our 3 Signature Properties
          </h2>
          <p className="text-[#5F586D] text-sm font-light leading-relaxed">
            Choose the setting that perfectly fits your journey—whether diplomatic conferences in GRA, boutique rooftop relaxation in Fate, or poolside leisure at Flower Garden.
          </p>
        </div>

        {/* 3 Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {REAL_BRANCHES.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xs overflow-hidden border border-[#E9E1F0] hover:border-[#4E1E7A]/40 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Real Property Photo */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F5EFFB]">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#F3E8FF] block font-cinzel">
                      {branch.tagline}
                    </span>
                    <h3 className="font-playfair text-xl font-bold text-white">
                      {branch.name}
                    </h3>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6">
                  {/* Real Address */}
                  <div className="flex items-start gap-2.5 mb-4 text-xs text-[#3F3949]">
                    <MapPin className="w-4 h-4 text-[#4E1E7A] shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-light">
                      {branch.address}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#5F586D] leading-relaxed font-light mb-5 pb-4 border-b border-[#ECE5F3]">
                    {branch.description}
                  </p>

                  {/* Highlights List */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7188] block mb-2">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#3F3949]">
                      {branch.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#4E1E7A] shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-[#ECE5F3] mt-auto">
                <div className="flex items-center justify-between text-xs text-[#3F3949] py-3 mb-3">
                  <span className="text-[#7A7188]">Direct Line:</span>
                  <a href={`tel:${branch.phone}`} className="text-[#4E1E7A] font-semibold tracking-wide hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#C49B55]" />
                    <span>{branch.phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')}</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onFilterBranchRooms(branch.id)}
                    className="flex-1 py-2.5 bg-gradient-to-r from-[#4E1E7A] to-[#381259] hover:from-[#3D1463] hover:to-[#2B0A48] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-all cursor-pointer text-center shadow-xs"
                  >
                    View Suites
                  </button>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white hover:bg-[#FAF7FC] text-[#4E1E7A] border border-[#E4D5F2] rounded-xs transition-colors cursor-pointer shadow-xs"
                    title="View on Google Maps"
                    aria-label={`Get directions to ${branch.name}`}
                  >
                    <Navigation className="w-4 h-4 text-[#C49B55]" />
                  </a>

                  <a
                    href={branch.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#F5EFFB] hover:bg-[#EBDDF9] text-[#4E1E7A] border border-[#E4D5F2] rounded-xs transition-colors cursor-pointer"
                    title="Chat with Concierge for this property"
                    aria-label={`Concierge chat for ${branch.name}`}
                  >
                    <MessageCircle className="w-4 h-4 text-[#4E1E7A]" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
