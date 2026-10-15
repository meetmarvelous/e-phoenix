import React, { useState } from 'react';
import { ALL_ROOMS, RealRoom } from '../data/hotelRealData';
import { ROOM_PHOTOS_MAP, GalleryItem } from '../data/galleryData';
import {
  Coffee,
  Wifi,
  Users,
  Bed,
  MessageCircle,
  ArrowRight,
  Check,
  Sparkles,
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Eye,
  Images,
  LayoutGrid,
  Crown,
  Building2,
  Palmtree,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
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
  const [inspectingRoom, setInspectingRoom] = useState<{
    room: RealRoom;
    photos: GalleryItem[];
    activeIdx: number;
  } | null>(null);

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
      shortLabel: 'Main GRA',
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
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-5 h-px bg-[#C49B55]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#87601A] uppercase font-cinzel">
              02 • THE ACCOMMODATIONS
            </span>
            <span className="w-5 h-px bg-[#C49B55]" />
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#1B112B] font-bold mb-3.5">
            Suites & Luxury Living
          </h2>
          <p className="text-[#514563] text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Browse our 19 suites with authentic room photos across all three Ilorin properties. 
            Quickly preview multiple angles right from each card or open the fast photo viewer to make your decision with complete confidence.
          </p>
        </div>

        {/* Modern Luxury Filter Control System */}
        {/* Modern Luxury Filter Control System (Zero Scroll on Mobile) */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-14">
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
                        layoutId="activeRoomBranchPill"
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

          {/* Secondary Rate / Budget Selector Chips (Zero Scroll on Mobile) */}
          <div className="mt-3 sm:mt-3.5">
            <div className="flex sm:hidden items-center justify-center gap-1.5 mb-2 text-[10px] font-bold tracking-[0.16em] uppercase text-[#7A6D8E] font-cinzel">
              <SlidersHorizontal className="w-3 h-3 text-[#C49B55]" />
              <span>Filter by Nightly Rate</span>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-1.5 sm:gap-2 text-xs">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#7A6D8E] font-cinzel mr-1">
                <SlidersHorizontal className="w-3 h-3 text-[#C49B55]" />
                <span>Rate Filter:</span>
              </span>

              {[
                { id: 'all', label: 'All Rates', shortLabel: 'All Rates' },
                { id: 'budget', label: 'Under ₦40,000', shortLabel: 'Under ₦40,000' },
                { id: 'executive', label: '₦40,000 – ₦70,000', shortLabel: '₦40k – ₦70k' },
                { id: 'luxury', label: 'Executive Suites (₦85,000+)', shortLabel: '₦85,000+ (VIP)' },
              ].map((pf) => {
                const isSelected = priceFilter === pf.id;
                return (
                  <button
                    key={pf.id}
                    onClick={() => setPriceFilter(pf.id as any)}
                    className={`px-2 sm:px-3 py-1.5 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-medium tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center ${
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

        {/* Room Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredRooms.map((room) => (
              <RoomCardItem
                key={room.id}
                room={room}
                onSelectRoomToBook={onSelectRoomToBook}
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
        <div className="mt-14 sm:mt-18 p-6 sm:p-8 bg-[#FAF8FD] rounded-xs border border-[#ECE5F3] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#4E1E7A]/10 border border-[#4E1E7A]/20 flex items-center justify-center shrink-0">
              <Images className="w-6 h-6 text-[#4E1E7A]" />
            </div>
            <div>
              <h4 className="font-playfair text-lg font-bold text-[#1F1929]">
                Want to view our Poolside, Restaurant & Diplomatic Lobby?
              </h4>
              <p className="text-xs text-[#5F586D] mt-0.5 font-light">
                Explore our full 80+ photo gallery and 60-second video tour in authentic full resolution.
              </p>
            </div>
          </div>
          <a
            href="#gallery"
            className="px-5 py-2.5 bg-white hover:bg-[#FAF7FC] text-[#4E1E7A] border border-[#E4D5F2] hover:border-[#4E1E7A] text-xs font-bold tracking-wider uppercase rounded-xs transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <span>VIEW FULL GALLERY</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C49B55]" />
          </a>
        </div>
      </div>

      {/* FAST ROOM PHOTO VIEWER MODAL (ZERO DELAY DECISION MAKING) */}
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

            {/* Left/Right navigation in viewer */}
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

              {/* Main Photo Display (object-contain so portrait & landscape are NEVER cut off) */}
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
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Instant Decision CTA Button */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    const roomToBook = inspectingRoom.room;
                    setInspectingRoom(null);
                    onSelectRoomToBook(roomToBook);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#4E1E7A] to-[#381259] hover:from-[#5D2490] hover:to-[#4A1874] text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xs transition-all shadow-xl active:scale-95 cursor-pointer border border-[#C49B55]/50 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#C49B55]" />
                  <span>RESERVE THIS SUITE ({formatPrice(inspectingRoom.room.price)})</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// INDIVIDUAL ROOM CARD WITH FAST LOCAL PHOTO SWITCHING
interface RoomCardItemProps {
  room: RealRoom;
  onSelectRoomToBook: (room: RealRoom) => void;
  onInspectRoom: (room: RealRoom, photos: GalleryItem[], startIdx: number) => void;
  getBranchBadgeColor: (branch: string) => string;
  formatPrice: (p: number) => string;
}

const RoomCardItem: React.FC<RoomCardItemProps> = ({
  room,
  onSelectRoomToBook,
  onInspectRoom,
  getBranchBadgeColor,
  formatPrice,
}) => {
  // The original photo MUST always be the first picture (index 0)
  const originalPhoto: GalleryItem = {
    id: `${room.id}_original`,
    title: room.name,
    category: 'rooms',
    categoryLabel: 'Suites & Rooms',
    roomId: room.id,
    roomName: room.name,
    src: room.image,
    width: 1200,
    height: 800,
    orientation: 'landscape',
    aspectRatio: 1.5,
    caption: 'E-Phoenix Hotel, Ilorin',
  };

  const additionalPhotos = (ROOM_PHOTOS_MAP[room.id] || []).filter(
    (p) => p.src !== room.image
  );

  // Original photo first, then additional gallery photos after
  const displayPhotos: GalleryItem[] = [originalPhoto, ...additionalPhotos];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const currentPhoto = displayPhotos[activePhotoIdx] || displayPhotos[0];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % displayPhotos.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx(
      (prev) => (prev - 1 + displayPhotos.length) % displayPhotos.length
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xs overflow-hidden border border-[#E8DEF2] hover:border-[#4E1E7A]/60 shadow-xs hover:shadow-2xl hover:shadow-purple-950/10 transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        {/* Real Room Photo with Rapid Image Switcher */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF7FC] select-none">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title || room.name}
            className="w-full h-full object-cover transition-transform duration-500"
            loading="lazy"
          />

          {/* Quick Photo Navigation Arrows (Right on the Card) */}
          {displayPhotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-md"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-md"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Location Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border backdrop-blur-md ${getBranchBadgeColor(
                room.branch
              )}`}
            >
              {room.branchName}
            </span>
          </div>

          {/* Top Right: Multi-Photo Count Badge (Click to open quick viewer) */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {displayPhotos.length > 1 && (
              <button
                type="button"
                onClick={() => onInspectRoom(room, displayPhotos, activePhotoIdx)}
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white/95 border border-white/20 hover:bg-[#4E1E7A] hover:border-[#C49B55] transition-all inline-flex items-center gap-1 cursor-pointer shadow-sm"
                title="View All Photos of This Room"
              >
                <Camera className="w-3 h-3 text-[#C49B55]" />
                <span>{displayPhotos.length} Photos</span>
              </button>
            )}

            {room.popular && displayPhotos.length <= 1 && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#1B112B]/90 backdrop-blur-md text-[#EBD7A9] border border-[#C49B55]/60 font-cinzel shadow-sm inline-flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#C49B55]" />
                <span>FEATURED</span>
              </span>
            )}
          </div>

          {/* Bottom Photo Dots Indicator */}
          {displayPhotos.length > 1 && (
            <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5 z-10">
              {displayPhotos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIdx(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                    activePhotoIdx === i
                      ? 'bg-[#C49B55] w-3.5'
                      : 'bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
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
              <span className="text-[10px] text-[#7A7188] block font-light">
                / night
              </span>
            </div>
          </div>

          {/* Reassurance Label */}
          <div className="mb-3.5 pb-2.5 border-b border-[#F2EBF7] flex items-center justify-between text-[11px] text-[#6E6280]">
            <span className="text-[#87601A] font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#87601A]" />
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

        <div className="flex items-center justify-between pt-1">
          {displayPhotos.length > 1 ? (
            <button
              type="button"
              onClick={() => onInspectRoom(room, displayPhotos, activePhotoIdx)}
              className="text-[11px] text-[#4E1E7A] hover:text-[#381259] font-semibold tracking-wide inline-flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3 h-3 text-[#C49B55]" />
              <span>Inspect All {displayPhotos.length} Photos</span>
            </button>
          ) : (
            <span />
          )}

          <a
            href={`https://wa.me/2347065023672?text=${encodeURIComponent(
              `Hello E-Phoenix Hotel Concierge, I would like to inquire about reserving the ${room.name} (${room.branchName}) at ${formatPrice(room.price)}/night.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#5F586D] hover:text-[#4E1E7A] font-medium tracking-wide inline-flex items-center gap-1 hover:underline transition-colors"
            title="Concierge Inquiry"
          >
            <MessageCircle className="w-3 h-3 text-[#C49B55]" />
            <span>Inquire</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};
