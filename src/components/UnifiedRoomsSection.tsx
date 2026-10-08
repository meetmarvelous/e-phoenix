import React, { useState } from 'react';
import { ALL_ROOMS, RealRoom } from '../data/hotelRealData';
import { Coffee, Wifi, Users, Bed, MessageCircle, ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UnifiedRoomsSectionProps {
  initialBranchFilter?: string;
  onSelectRoomToBook: (room: RealRoom) => void;
}

export const UnifiedRoomsSection: React.FC<UnifiedRoomsSectionProps> = ({
  initialBranchFilter = 'all',
  onSelectRoomToBook,
}) => {
  const [activeBranch, setActiveBranch] = useState<string>(initialBranchFilter);
  const [priceFilter, setPriceFilter] = useState<'all' | 'budget' | 'executive' | 'luxury'>('all');

  const branches = [
    { key: 'all', label: 'All Accommodations', count: ALL_ROOMS.length },
    { key: 'main', label: 'Main GRA Flagship', count: ALL_ROOMS.filter(r => r.branch === 'main').length },
    { key: 'annex1', label: 'Annex 1 (Tanke / Fate)', count: ALL_ROOMS.filter(r => r.branch === 'annex1').length },
    { key: 'annex2', label: 'Annex 2 (Flower Garden GRA)', count: ALL_ROOMS.filter(r => r.branch === 'annex2').length },
  ];

  const filteredRooms = ALL_ROOMS.filter((room) => {
    const branchMatches = activeBranch === 'all' || room.branch === activeBranch;
    let priceMatches = true;
    if (priceFilter === 'budget') priceMatches = room.price <= 40000;
    if (priceFilter === 'executive') priceMatches = room.price > 40000 && room.price <= 70000;
    if (priceFilter === 'luxury') priceMatches = room.price > 70000;
    return branchMatches && priceMatches;
  });

  const formatPrice = (p: number) => `₦${p.toLocaleString('en-NG')}`;

  const getBranchBadgeColor = (branch: string) => {
    switch (branch) {
      case 'main':
        return 'bg-white/95 text-[#4E1E7A] border-[#DCC7EE] shadow-xs';
      case 'annex1':
        return 'bg-white/95 text-[#3D1E6D] border-[#D8C7ED] shadow-xs';
      case 'annex2':
        return 'bg-[#FAF6EF] text-[#856729] border-[#E8D8B6] shadow-xs';
      default:
        return 'bg-white/95 text-[#4E1E7A] border-[#DCC7EE] shadow-xs';
    }
  };

  return (
    <section id="rooms" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#ECE5F3]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-5 h-px bg-[#C49B55]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#C49B55] uppercase font-cinzel">
              02 • THE ACCOMMODATIONS
            </span>
            <span className="w-5 h-px bg-[#C49B55]" />
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#1B112B] font-bold mb-3.5">
            Suites & Luxury Living
          </h2>
          <p className="text-[#514563] text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            All 19 rooms across our three Ilorin properties include daily complimentary gourmet breakfast, 
            guaranteed 24/7 standby industrial generator power, and personalized concierge care.
          </p>
        </div>

        {/* Branch Filter Tabs (Zero Page Reloads) */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-5">
          {branches.map((b) => (
            <button
              key={b.key}
              onClick={() => setActiveBranch(b.key)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeBranch === b.key
                  ? 'bg-gradient-to-r from-[#4E1E7A] to-[#381259] text-white shadow-md shadow-purple-950/20 font-bold border border-[#C49B55]/30'
                  : 'bg-[#FAF7FC] text-[#3D3150] hover:text-[#4E1E7A] hover:bg-[#F3EBF9] border border-[#E5DAEE]'
              }`}
            >
              <span>{b.label}</span>
              <span className={`ml-1 text-[11px] font-medium ${activeBranch === b.key ? 'text-[#EBD7A9]' : 'text-[#716584]'}`}>
                ({b.count})
              </span>
            </button>
          ))}
        </div>

        {/* Secondary Price Filter */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-10 sm:mb-14 text-xs">
          <span className="text-[#7A7188] mr-1 text-[11px] font-semibold tracking-wider uppercase font-cinzel">
            Filter Rate:
          </span>
          {[
            { id: 'all', label: 'All Rates' },
            { id: 'budget', label: 'Under ₦40,000' },
            { id: 'executive', label: '₦40,000 – ₦70,000' },
            { id: 'luxury', label: 'Executive Suites (₦85,000+)' },
          ].map((pf) => (
            <button
              key={pf.id}
              onClick={() => setPriceFilter(pf.id as any)}
              className={`px-3 py-1 text-[11px] tracking-wide transition-colors cursor-pointer ${
                priceFilter === pf.id
                  ? 'text-[#4E1E7A] border-b-2 border-[#4E1E7A] font-bold'
                  : 'text-[#6B6275] hover:text-[#1B112B]'
              }`}
            >
              {pf.label}
            </button>
          ))}
        </div>

        {/* Room Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredRooms.map((room) => (
              <motion.div
                key={room.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xs overflow-hidden border border-[#E8DEF2] hover:border-[#4E1E7A]/60 shadow-xs hover:shadow-2xl hover:shadow-purple-950/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Real Room Photo */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF7FC]">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Location Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border backdrop-blur-md ${getBranchBadgeColor(room.branch)}`}>
                        {room.branchName}
                      </span>
                    </div>

                    {room.popular && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#1B112B]/90 backdrop-blur-md text-[#EBD7A9] border border-[#C49B55]/60 font-cinzel shadow-sm inline-flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-[#C49B55]" />
                          <span>FEATURED</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <h3 className="font-playfair text-xl font-bold text-[#1B112B] group-hover:text-[#4E1E7A] transition-colors tracking-tight">
                        {room.name}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="text-xl font-bold text-[#4E1E7A] font-playfair tracking-tight">
                          {formatPrice(room.price)}
                        </span>
                        <span className="text-[10px] text-[#7A7188] block font-light">/ night</span>
                      </div>
                    </div>

                    {/* Reassurance Label */}
                    <div className="mb-3.5 pb-2.5 border-b border-[#F2EBF7] flex items-center justify-between text-[11px] text-[#6E6280]">
                      <span className="text-[#C49B55] font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-[#C49B55]" />
                        <span>Breakfast Included</span>
                      </span>
                      <span>24/7 Power Guaranteed</span>
                    </div>

                    {/* Specs strip */}
                    <div className="flex items-center gap-3 text-xs text-[#514563] pb-3 mb-3 border-b border-[#F2EBF7]">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-[#4E1E7A]" />
                        {room.bedType}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#4E1E7A]" />
                        Up to {room.maxGuests} Guests
                      </span>
                    </div>

                    {/* Features checklist */}
                    <ul className="space-y-1.5 text-xs text-[#3D324E]">
                      {room.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-[#4E1E7A] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="p-5 sm:p-6 pt-0 space-y-2">
                  <button
                    onClick={() => onSelectRoomToBook(room)}
                    className="w-full py-3 bg-gradient-to-r from-[#4E1E7A] to-[#381259] hover:from-[#3D1463] hover:to-[#2B0A48] text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-md shadow-purple-950/10 border border-[#642B9B]/30"
                  >
                    <span>RESERVE THIS SUITE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C49B55]" />
                  </button>

                  <div className="text-center">
                    <a
                      href={`https://wa.me/2347065023672?text=${encodeURIComponent(
                        `Hello E-Phoenix Hotel Concierge, I would like to inquire about reserving the ${room.name} (${room.branchName}) at ${formatPrice(room.price)}/night.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#4E1E7A] hover:text-[#381259] font-medium tracking-wide inline-flex items-center gap-1 hover:underline pt-1 transition-colors"
                      title="Concierge Inquiry"
                    >
                      <MessageCircle className="w-3 h-3 text-[#C49B55]" />
                      <span>Concierge Desk Inquiry</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
