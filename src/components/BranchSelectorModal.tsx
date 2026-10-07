import React, { useState } from 'react';
import { X, MapPin, CheckCircle, Sparkles, Building2, Briefcase, Trees, ArrowRight, Compass, ShieldCheck, Crown } from 'lucide-react';
import { BRANCH_LIST } from '../data/hotelData';
import { BranchId, HotelBranch } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface BranchSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBranchId: BranchId;
  onSelectBranch: (branchId: BranchId) => void;
}

export const BranchSelectorModal: React.FC<BranchSelectorModalProps> = ({
  isOpen,
  onClose,
  currentBranchId,
  onSelectBranch,
}) => {
  if (!isOpen) return null;

  const [filterPreference, setFilterPreference] = useState<'all' | 'grand' | 'business' | 'leisure'>('all');

  const getBranchIcon = (id: BranchId) => {
    switch (id) {
      case 'main':
        return <Building2 className="w-5 h-5 text-[#c5a880]" />;
      case 'annex1':
        return <Briefcase className="w-5 h-5 text-[#c5a880]" />;
      case 'annex2':
        return <Trees className="w-5 h-5 text-[#c5a880]" />;
    }
  };

  const getLowestDiscountPrice = (branch: HotelBranch) => {
    const discounted = branch.roomRates
      .filter((r) => !r.isFacility && r.discountRate)
      .map((r) => r.discountRate as number);
    if (discounted.length > 0) {
      return Math.min(...discounted);
    }
    const standard = branch.roomRates
      .filter((r) => !r.isFacility)
      .map((r) => r.rate);
    return Math.min(...standard);
  };

  const filteredBranches = BRANCH_LIST.filter((branch) => {
    if (filterPreference === 'all') return true;
    if (filterPreference === 'grand') return branch.id === 'main';
    if (filterPreference === 'business') return branch.id === 'annex1';
    if (filterPreference === 'leisure') return branch.id === 'annex2';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="branch-selector-modal"
        className="bg-[#161412] text-neutral-100 rounded-sm w-full max-w-6xl max-h-[94vh] overflow-y-auto border border-[#3f3529] shadow-2xl relative flex flex-col"
      >
        {/* Close Button */}
        <button
          id="close-branch-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 transition-colors z-20 cursor-pointer"
          aria-label="Close location selector"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#251f19] to-[#161412] border-b border-[#352c22] text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 text-[#c5a880] text-[11px] font-bold tracking-[0.25em] uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Select Your Preferred E-Phoenix Experience</span>
          </div>

          <h2 className="font-playfair text-2xl sm:text-4xl text-white font-normal max-w-2xl mx-auto">
            Choose Between Our 3 Ilorin Locations
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto mt-2 font-light leading-relaxed">
            Each E-Phoenix branch offers a distinctive ambiance tailored to your stay—from our grand flagship in GRA with 1,000-seat banqueting, to our quiet business executive suites in Fate, and our tropical garden resort with poolside grills.
          </p>

          {/* Quick Decision Filter Chips */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-5">
            <button
              onClick={() => setFilterPreference('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                filterPreference === 'all'
                  ? 'bg-[#c5a880] text-black shadow-xs font-bold'
                  : 'bg-[#25201b] text-neutral-400 hover:text-white'
              }`}
            >
              All 3 Locations
            </button>
            <button
              onClick={() => setFilterPreference('grand')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer inline-flex items-center ${
                filterPreference === 'grand'
                  ? 'bg-[#c5a880] text-black shadow-xs font-bold'
                  : 'bg-[#25201b] text-neutral-400 hover:text-white'
              }`}
            >
              <Crown className="w-3.5 h-3.5 mr-1.5 shrink-0 text-current" />
              <span>Flagship & Grand Events (Main)</span>
            </button>
            <button
              onClick={() => setFilterPreference('business')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer inline-flex items-center ${
                filterPreference === 'business'
                  ? 'bg-[#c5a880] text-black shadow-xs font-bold'
                  : 'bg-[#25201b] text-neutral-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 mr-1.5 shrink-0 text-current" />
              <span>Corporate & Tech (Annex 1)</span>
            </button>
            <button
              onClick={() => setFilterPreference('leisure')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer inline-flex items-center ${
                filterPreference === 'leisure'
                  ? 'bg-[#c5a880] text-black shadow-xs font-bold'
                  : 'bg-[#25201b] text-neutral-400 hover:text-white'
              }`}
            >
              <Trees className="w-3.5 h-3.5 mr-1.5 shrink-0 text-current" />
              <span>Garden & Poolside Chill (Annex 2)</span>
            </button>
          </div>
        </div>

        {/* 3 Location Cards Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => {
            const isCurrent = currentBranchId === branch.id;
            const minRate = getLowestDiscountPrice(branch);

            return (
              <div
                key={branch.id}
                id={`branch-card-${branch.id}`}
                className={`rounded-sm flex flex-col justify-between border transition-all duration-300 relative overflow-hidden group ${
                  isCurrent
                    ? 'bg-[#221c17] border-[#c5a880] ring-1 ring-[#c5a880]/80 shadow-xl'
                    : 'bg-[#1b1713] border-[#382f25] hover:border-[#8c7457]'
                }`}
              >
                {/* Active Selection Badge */}
                {isCurrent && (
                  <div className="absolute top-3 right-3 z-10 bg-[#c5a880] text-black text-[10px] font-bold px-2.5 py-0.5 rounded-xs flex items-center gap-1 shadow-md">
                    <CheckCircle className="w-3 h-3" />
                    <span>CURRENT VIEW</span>
                  </div>
                )}

                <div>
                  {/* Photo Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={branch.image}
                      alt={branch.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1b1713] via-transparent to-black/30" />

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold bg-black/80 text-[#e6d0b3] px-2 py-0.5 rounded-xs backdrop-blur-xs border border-neutral-700">
                        {branch.badge}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-1">
                      {getBranchIcon(branch.id)}
                      <span className="text-xs font-cinzel font-bold text-[#c5a880] tracking-wider uppercase">
                        {branch.shortName}
                      </span>
                    </div>

                    <h3 className="font-playfair text-xl font-normal text-white mb-2 leading-tight">
                      {branch.name}
                    </h3>

                    <div className="flex items-start gap-1.5 text-xs text-neutral-400 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                      <span>{branch.locationName}</span>
                    </div>

                    {/* Unique Experience Narrative */}
                    <div className="bg-[#15120f] border border-[#2e261d] p-3 rounded-xs mb-4">
                      <span className="text-[10px] font-bold tracking-widest text-[#c5a880] uppercase block mb-1 font-cinzel">
                        UNIQUE EXPERIENCE
                      </span>
                      <p className="text-xs text-neutral-300 leading-relaxed font-light">
                        {branch.experienceDescription}
                      </p>
                    </div>

                    {/* Vibe & Ideal For */}
                    <div className="space-y-2 mb-4">
                      <div className="text-xs">
                        <span className="text-neutral-400 font-medium">Ambiance: </span>
                        <span className="text-[#e2c7a4] font-medium">{branch.vibe}</span>
                      </div>

                      <div>
                        <span className="text-[11px] text-neutral-400 block mb-1.5">Best Suited For:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {branch.idealFor.map((item, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-[#29221b] text-neutral-300 px-2 py-0.5 rounded-xs border border-[#3e342a]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions & Price */}
                <div className="p-5 pt-0 mt-2">
                  <div className="pt-3 border-t border-[#312920] flex items-center justify-between mb-3">
                    <span className="text-xs text-neutral-400">Starting from</span>
                    <div className="text-right">
                      <span className="font-mono text-base font-bold text-white">
                        ₦{minRate.toLocaleString('en-NG')}
                      </span>
                      <span className="text-[10px] text-[#c5a880] block">/ night (-10% direct)</span>
                    </div>
                  </div>

                  <button
                    id={`select-branch-btn-${branch.id}`}
                    onClick={() => {
                      onSelectBranch(branch.id);
                      onClose();
                    }}
                    className={`w-full py-3 text-xs font-bold tracking-[0.2em] uppercase rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      isCurrent
                        ? 'bg-[#3b3227] hover:bg-[#483d2f] text-[#e0cfba] border border-[#c5a880]/40'
                        : 'bg-[#c5a880] hover:bg-[#b89569] text-[#1b1713] active:scale-98'
                    }`}
                  >
                    <span>{isCurrent ? 'Continue Browsing This Branch' : `Switch to ${branch.shortName}`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="mt-2 text-center">
                    <span className="text-[10px] text-neutral-500 font-mono">
                      URL: {branch.path}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Guarantee Footer */}
        <div className="bg-[#12100e] border-t border-[#2d251d] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 text-center sm:text-left">
          <div className="flex items-center gap-2 text-[#c5a880]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>All 3 branches maintain consistent 5-star E-Phoenix hospitality, security, and dining excellence.</span>
          </div>
          <span className="text-neutral-500 font-mono text-[11px]">
            Direct reservations via 07065023672 | 07071721368
          </span>
        </div>
      </div>
    </div>
  );
};
