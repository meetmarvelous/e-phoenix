import React, { useState } from 'react';
import { ALL_FACILITIES, RealFacility } from '../data/hotelRealData';
import { Sparkles, MapPin, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';

export const FacilitiesShowcase: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<RealFacility | null>(null);

  return (
    <section id="facilities" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#ECE5F3]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#4E1E7A] uppercase block mb-1">
            WORLD-CLASS AMENITIES & LEISURE
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#1F1929] font-normal mb-3">
            Hotel Facilities & Dining
          </h2>
          <p className="text-[#5F586D] text-sm font-light leading-relaxed">
            From our sparkling outdoor swimming pool and open-air rooftop bar to grand banqueting halls and around-the-clock dining.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALL_FACILITIES.map((facility, index) => (
            <motion.div
              key={facility.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedFacility(facility)}
              className="bg-white rounded-xs overflow-hidden border border-[#E9E1F0] hover:border-[#4E1E7A]/40 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden bg-[#F5EFFB]">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />
                  
                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-black/60 text-white">
                    <Maximize2 className="w-3.5 h-3.5 text-[#E9D5FF]" />
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3">
                    <span className="text-[10px] font-medium tracking-wider uppercase text-[#F3E8FF]">
                      {facility.branchName}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-playfair text-base font-bold text-[#1F1929] mb-1.5 group-hover:text-[#4E1E7A] transition-colors">
                    {facility.name}
                  </h3>
                  <p className="text-xs text-[#5F586D] font-light leading-relaxed line-clamp-3">
                    {facility.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Facility details */}
      {selectedFacility && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setSelectedFacility(null)}
        >
          <div
            className="bg-white border border-[#E9E1F0] rounded-xs max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-[#F5EFFB]">
              <img
                src={selectedFacility.image}
                alt={selectedFacility.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#4E1E7A] block mb-1">
                {selectedFacility.branchName}
              </span>
              <h3 className="font-playfair text-xl font-bold text-[#1F1929] mb-2">
                {selectedFacility.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#5F586D] font-light leading-relaxed mb-5">
                {selectedFacility.desc}
              </p>
              <button
                onClick={() => setSelectedFacility(null)}
                className="w-full py-2.5 bg-[#F5EFFB] hover:bg-[#EBDDF9] text-[#4E1E7A] text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer border border-[#E4D5F2]"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
