import React, { useState, useEffect } from 'react';
import { ALL_ROOMS, RealRoom } from '../data/hotelRealData';
import { GalleryItem } from '../data/galleryData';
import { MinimalNavbar } from './MinimalNavbar';
import { RoomCardItem, formatPrice, getBranchBadgeColor } from './UnifiedRoomsSection';
import {
  Crown,
  Building2,
  Palmtree,
  LayoutGrid,
  SlidersHorizontal,
  RotateCcw,
  Images,
  ArrowRight,
  ArrowUpDown,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FullRoomsPageProps {
  isOpen: boolean;
  onClose: () => void;
  initialBranch?: string;
  onSelectRoomToBook: (room: RealRoom) => void;
  onOpenBooking: () => void;
  onSelectBranchFilter?: (branchId: string) => void;
  onOpenFullGallery?: () => void;
}

export const FullRoomsPage: React.FC<FullRoomsPageProps> = ({
  isOpen,
  onClose,
  initialBranch = 'all',
  onSelectRoomToBook,
  onOpenBooking,
  onSelectBranchFilter,
  onOpenFullGallery,
}) => {
  const [activeBranch, setActiveBranch] = useState<string>(initialBranch);
  const [priceFilter, setPriceFilter] = useState<'all' | 'budget' | 'executive' | 'luxury'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');
  const [inspectingRoom, setInspectingRoom] = useState<{
    room: RealRoom;
    photos: GalleryItem[];
    activeIdx: number;
  } | null>(null);

  // Sync initial branch when opened
  useEffect(() => {
    if (isOpen && initialBranch) {
      setActiveBranch(initialBranch);
    }
  }, [isOpen, initialBranch]);

  // Lock body scroll when standalone rooms page is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const branches = [
    {
      key: 'all',
      label: 'All Accommodations',
      shortLabel: 'All Suites',
      count: ALL_ROOMS.length,
      icon: LayoutGrid,
    },
    {
      key: 'main',
      label: 'Main GRA Flagship',
      shortLabel: 'Main Flagship',
      count: ALL_ROOMS.filter((r) => r.branch === 'main').length,
      icon: Crown,
    },
    {
      key: 'annex1',
      label: 'Annex 1 (Tanke / Fate)',
      shortLabel: 'Annex 1 • Fate',
      count: ALL_ROOMS.filter((r) => r.branch === 'annex1').length,
      icon: Building2,
    },
    {
      key: 'annex2',
      label: 'Annex 2 (Flower Garden)',
      shortLabel: 'Annex 2 • Garden',
      count: ALL_ROOMS.filter((r) => r.branch === 'annex2').length,
      icon: Palmtree,
    },
  ];

  const filteredRooms = ALL_ROOMS.filter((room) => {
    const branchMatches = activeBranch === 'all' || room.branch === activeBranch;
    let priceMatches = true;
    if (priceFilter === 'budget') priceMatches = room.price <= 40000;
    if (priceFilter === 'executive') priceMatches = room.price > 40000 && room.price <= 70000;
    if (priceFilter === 'luxury') priceMatches = room.price > 70000;
    return branchMatches && priceMatches;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8FD] overflow-y-auto flex flex-col">
      {/* Pinned Minimal Navbar (Identical to Main Page) */}
      <MinimalNavbar
        isRoomsPage={true}
        onCloseRooms={onClose}
        onOpenBooking={onOpenBooking}
        onSelectBranchFilter={onSelectBranchFilter}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-px bg-[#C49B55]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#87601A] uppercase font-cinzel">
              THE COMPLETE CATALOG • EST. 1981
            </span>
            <span className="w-5 h-px bg-[#C49B55]" />
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#1B112B] font-bold mb-2.5">
            All Suites & Accommodations
          </h1>
          <p className="text-[#514563] text-sm sm:text-base font-light leading-relaxed">
            Browse all 19 rooms and suites with authentic photography and guaranteed direct rates.
            Every stay includes 24/7 power, complimentary breakfast, and dedicated 24-hour concierge.
          </p>
        </div>

        {/* Modern Luxury Filter Control System (Zero Scroll on Mobile) */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          {/* Property Branch Segmented Control */}
          <div className="p-1 sm:p-1.5 rounded-2xl sm:rounded-full bg-[#FAF5FD] border border-[#E9DFF2] shadow-xs">
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-1 sm:gap-2 p-0.5">
              {branches.map((b) => {
                const IconComponent = b.icon;
                const isActive = activeBranch === b.key;
                return (
                  <button
                    key={b.key}
                    onClick={() => setActiveBranch(b.key)}
                    className={`relative px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-between sm:justify-center gap-1.5 sm:gap-2 group ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-[#4A3D5D] hover:text-[#4E1E7A] hover:bg-white/70'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFullRoomsBranchPill"
                        className="absolute inset-0 bg-gradient-to-r from-[#4E1E7A] to-[#381259] rounded-xl sm:rounded-full shadow-md shadow-purple-950/25 border border-[#C49B55]/40"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5 truncate">
                      <IconComponent
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isActive ? 'text-[#EBD7A9]' : 'text-[#7D6B94] group-hover:text-[#4E1E7A]'
                        }`}
                      />
                      <span className="hidden sm:inline">{b.label}</span>
                      <span className="inline sm:hidden">{b.shortLabel}</span>
                    </span>
                    <span
                      className={`relative z-10 text-[10.5px] px-1.5 py-0.5 rounded-full font-mono shrink-0 transition-colors ${
                        isActive
                          ? 'bg-white/20 text-[#F5E8C8]'
                          : 'bg-[#EDE4F5] text-[#695B7D] group-hover:bg-[#E2D2EE]'
                      }`}
                    >
                      {b.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Rate & Sort Selector */}
          <div className="mt-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            {/* Rate Chips (2x2 on mobile, row on desktop) */}
            <div className="w-full sm:w-auto">
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-1.5 sm:gap-2">
                {[
                  { id: 'all', label: 'All Rates', shortLabel: 'All Rates' },
                  { id: 'budget', label: 'Under ₦40,000', shortLabel: 'Under ₦40k' },
                  { id: 'executive', label: '₦40,000 – ₦70,000', shortLabel: '₦40k – ₦70k' },
                  { id: 'luxury', label: 'Executive Suites (₦85k+)', shortLabel: '₦85k+ (VIP)' },
                ].map((pf) => {
                  const isSelected = priceFilter === pf.id;
                  return (
                    <button
                      key={pf.id}
                      onClick={() => setPriceFilter(pf.id as any)}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-medium tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-white text-[#4E1E7A] font-bold shadow-xs border-2 border-[#C49B55] ring-2 ring-[#4E1E7A]/5'
                          : 'bg-[#FAF7FC] text-[#625575] hover:text-[#1B112B] hover:bg-white border border-[#E7DAEF]'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#C49B55] shrink-0" />}
                      <span className="hidden sm:inline">{pf.label}</span>
                      <span className="inline sm:hidden">{pf.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort Dropdown / Selector */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <span className="text-[11px] text-[#7A6D8E] flex items-center gap-1 font-medium">
                <ArrowUpDown className="w-3 h-3 text-[#C49B55]" />
                <span>Sort:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#E5DAEE] text-[#4E1E7A] text-xs rounded-full px-3 py-1 font-semibold focus:outline-none focus:ring-1 focus:ring-[#4E1E7A] cursor-pointer"
              >
                <option value="recommended">Featured / Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Counter & Quick Reset */}
          {(activeBranch !== 'all' || priceFilter !== 'all') && (
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[#716484]">
              <span>
                Showing <strong className="text-[#1B112B]">{filteredRooms.length}</strong> of{' '}
                {ALL_ROOMS.length} suites
              </span>
              <span>•</span>
              <button
                onClick={() => {
                  setActiveBranch('all');
                  setPriceFilter('all');
                }}
                className="text-[#4E1E7A] hover:text-[#381259] font-bold underline inline-flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-2.5 h-2.5 text-[#C49B55]" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Full Room Cards Grid (All Matching Rooms) */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredRooms.map((room) => (
              <RoomCardItem
                key={room.id}
                room={room}
                onSelectRoomToBook={(r) => {
                  onClose();
                  onSelectRoomToBook(r);
                }}
                onInspectRoom={(r, photos, idx) =>
                  setInspectingRoom({ room: r, photos, activeIdx: idx })
                }
                getBranchBadgeColor={getBranchBadgeColor}
                formatPrice={formatPrice}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Gallery Section */}
        {onOpenFullGallery && (
          <div className="mt-14 sm:mt-18 p-6 sm:p-8 bg-white rounded-xs border border-[#ECE5F3] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#4E1E7A]/10 border border-[#4E1E7A]/20 flex items-center justify-center shrink-0">
                <Images className="w-6 h-6 text-[#4E1E7A]" />
              </div>
              <div>
                <h4 className="font-playfair text-lg font-bold text-[#1F1929]">
                  Looking for Poolside, Restaurant & Exterior Views?
                </h4>
                <p className="text-xs text-[#5F586D] mt-0.5 font-light">
                  Explore our dedicated photo and video archive with 80+ high-resolution images.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenFullGallery();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-[#4E1E7A] to-[#381259] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-transform active:scale-95 shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>OPEN PHOTO GALLERY</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C49B55]" />
            </button>
          </div>
        )}
      </main>

      {/* FAST ROOM PHOTO VIEWER MODAL */}
      <AnimatePresence>
        {inspectingRoom && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6"
            onClick={() => setInspectingRoom(null)}
          >
            <button
              onClick={() => setInspectingRoom(null)}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close photo viewer"
            >
              <X className="w-6 h-6" />
            </button>

            {inspectingRoom.photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectingRoom((prev) =>
                      prev
                        ? {
                            ...prev,
                            activeIdx:
                              (prev.activeIdx - 1 + prev.photos.length) %
                              prev.photos.length,
                          }
                        : null
                    );
                  }}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer backdrop-blur-sm"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectingRoom((prev) =>
                      prev
                        ? {
                            ...prev,
                            activeIdx: (prev.activeIdx + 1) % prev.photos.length,
                          }
                        : null
                    );
                  }}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer backdrop-blur-sm"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header inside modal */}
              <div className="w-full text-white mb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49B55] font-cinzel">
                    {inspectingRoom.room.branchName}
                  </span>
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold">
                    {inspectingRoom.room.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-playfair text-xl font-bold text-[#C49B55]">
                    {formatPrice(inspectingRoom.room.price)}
                  </span>
                  <span className="text-[10px] text-white/60 block">per night</span>
                </div>
              </div>

              {/* Main Photo Display */}
              <div className="relative w-full h-[55vh] sm:h-[65vh] flex items-center justify-center bg-black/60 rounded-xs overflow-hidden border border-white/10">
                <img
                  src={inspectingRoom.photos[inspectingRoom.activeIdx]?.src}
                  alt={inspectingRoom.photos[inspectingRoom.activeIdx]?.title || inspectingRoom.room.name}
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute bottom-2.5 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-xs text-[11px] text-white/90">
                  {inspectingRoom.photos[inspectingRoom.activeIdx]?.title || inspectingRoom.room.name}
                </div>
              </div>

              {/* Thumbnails Strip */}
              {inspectingRoom.photos.length > 1 && (
                <div className="flex items-center gap-2 mt-3.5 overflow-x-auto max-w-full pb-1">
                  {inspectingRoom.photos.map((photo, i) => (
                    <button
                      key={photo.id || i}
                      onClick={() =>
                        setInspectingRoom((prev) =>
                          prev ? { ...prev, activeIdx: i } : null
                        )
                      }
                      className={`relative w-14 h-11 sm:w-16 sm:h-12 rounded-xs overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        inspectingRoom.activeIdx === i
                          ? 'border-[#C49B55] scale-105 shadow-md'
                          : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.title || `Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Action Button inside modal */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => {
                    const roomToBook = inspectingRoom.room;
                    setInspectingRoom(null);
                    onClose();
                    onSelectRoomToBook(roomToBook);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#4E1E7A] to-[#381259] hover:from-[#5D2490] hover:to-[#4A1874] text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xs transition-all shadow-lg border border-[#C49B55]/50 flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#C49B55]" />
                  <span>RESERVE THIS SUITE ({formatPrice(inspectingRoom.room.price)})</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
