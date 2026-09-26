import React, { useState } from 'react';
import { X, Utensils, Star, Phone, MessageSquare, MapPin } from 'lucide-react';
import { HotelBranch, MenuItem } from '../types';

interface RestaurantMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBranch: HotelBranch;
}

export const RestaurantMenuModal: React.FC<RestaurantMenuModalProps> = ({
  isOpen,
  onClose,
  currentBranch,
}) => {
  if (!isOpen) return null;

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Local Specialties',
    'Continental',
    'Grills & Bites',
    'Beverages & Cocktails',
  ];

  const filteredItems = activeCategory === 'All'
    ? currentBranch.menuHighlights
    : currentBranch.menuHighlights.filter((item) => item.category === activeCategory);

  const formatPrice = (p: number) => `₦${p.toLocaleString('en-NG')}`;

  const handleOrderDining = (item?: MenuItem) => {
    const text = item
      ? `Hello E-Phoenix Hotel Restaurant (${currentBranch.name}),%0A%0AI would like to order: ${item.name} (${formatPrice(item.price)}).`
      : `Hello E-Phoenix Hotel Dining (${currentBranch.name}),%0A%0AI would like to reserve a table or order room dining at ${currentBranch.locationName}.`;
    window.open(`https://wa.me/${currentBranch.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="restaurant-menu-modal"
        className="bg-[#191613] text-neutral-100 rounded-sm w-full max-w-4xl max-h-[92vh] overflow-y-auto border border-[#44382c] shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900/60 hover:bg-neutral-800 transition-colors z-10 cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner */}
        <div className="relative py-10 px-6 sm:px-10 text-center bg-gradient-to-b from-[#251e18] to-[#191613] border-b border-[#3d3226]">
          <div className="flex items-center justify-center gap-2 text-[#c5a880] mb-2">
            <Utensils className="w-4 h-4" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase font-cinzel">
              CULINARY DINING & IN-ROOM SERVICE
            </span>
          </div>

          <h2 className="font-playfair text-2xl sm:text-4xl text-white font-normal">
            {currentBranch.shortName} Dining Menu
          </h2>

          <div className="flex items-center justify-center gap-1.5 text-xs text-[#d8c3ad] mt-2">
            <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Serving guests at {currentBranch.locationName}</span>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
            <button
              onClick={() => handleOrderDining()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#c5a880] hover:bg-[#b89569] text-black text-xs font-bold tracking-wider uppercase rounded-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Table Reservation / In-Room Dining</span>
            </button>
            <a
              href={`tel:${currentBranch.phones[0]}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#c5a880]/50 text-[#c5a880] text-xs font-medium tracking-wider uppercase rounded-xs hover:border-[#c5a880] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Kitchen ({currentBranch.phones[0]})</span>
            </a>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="px-6 py-3.5 border-b border-neutral-800 bg-[#161311] sticky top-0 z-10 flex items-center justify-center flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all uppercase cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#c5a880] text-[#1b1713] shadow-xs'
                  : 'bg-[#221e1a] text-neutral-400 hover:text-white hover:bg-[#2b2520]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#211d19] border border-[#3b3228] p-5 rounded-xs hover:border-[#c5a880]/60 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-playfair text-base sm:text-lg font-bold text-white group-hover:text-[#c5a880] transition-colors">
                      {item.name}
                    </h4>
                    <span className="font-mono text-sm sm:text-base font-bold text-[#c5a880] shrink-0">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 font-light leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 text-[11px]">
                  <span className="text-neutral-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                  {item.isChefSpecial && (
                    <span className="inline-flex items-center gap-1 text-[#c5a880] font-semibold bg-[#c5a880]/10 px-2 py-0.5 rounded-xs">
                      <Star className="w-3 h-3 fill-current" />
                      Chef's Choice
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Dining Note */}
          <div className="mt-8 p-4 bg-[#231d17] border border-[#483929] rounded-xs text-center text-xs text-neutral-400">
            <p>
              Breakfast served 07:00am - 10:30am. All-day kitchen open until 11:00pm. In-room dining service available 24 hours for resident guests of {currentBranch.name}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
