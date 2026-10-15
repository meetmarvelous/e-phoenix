import React, { useState, useEffect, useRef } from 'react';
import {
  GALLERY_ITEMS,
  VIDEO_TOUR_ITEM,
  GalleryItem,
} from '../data/galleryData';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Calendar,
  Eye,
  Film,
} from 'lucide-react';
import { MinimalNavbar } from './MinimalNavbar';
import { MinimalFooter } from './MinimalFooter';
import { motion, AnimatePresence } from 'motion/react';

interface FullGalleryPageProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  onOpenBookingForRoom?: (roomId: string) => void;
  onOpenBooking?: () => void;
  onSelectBranchFilter?: (branchId: string) => void;
}

export const FullGalleryPage: React.FC<FullGalleryPageProps> = ({
  isOpen,
  onClose,
  initialCategory = 'all',
  onOpenBookingForRoom,
  onOpenBooking,
  onSelectBranchFilter,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialCategory);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync initial category when opened
  useEffect(() => {
    if (isOpen && initialCategory) {
      setActiveTab(initialCategory);
    }
  }, [isOpen, initialCategory]);

  // Lock body scroll when full gallery is open
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

  // Combine items with the video tour
  const allDisplayItems: GalleryItem[] = [
    GALLERY_ITEMS[0],
    VIDEO_TOUR_ITEM,
    ...GALLERY_ITEMS.slice(1),
  ];

  const filteredItems =
    activeTab === 'all'
      ? allDisplayItems
      : activeTab === 'video'
      ? [VIDEO_TOUR_ITEM]
      : allDisplayItems.filter((item) => item.category === activeTab);

  const tabs = [
    { key: 'all', label: 'All Collection', count: allDisplayItems.length },
    { key: 'rooms', label: 'Suites & Rooms', count: GALLERY_ITEMS.filter((i) => i.category === 'rooms').length },
    { key: 'pool', label: 'Poolside & Bar', count: GALLERY_ITEMS.filter((i) => i.category === 'pool').length },
    { key: 'dining', label: 'Dining & Cuisine', count: GALLERY_ITEMS.filter((i) => i.category === 'dining').length },
    { key: 'reception', label: 'Lobby & Reception', count: GALLERY_ITEMS.filter((i) => i.category === 'reception').length },
    { key: 'outdoor', label: 'Grounds & Facade', count: GALLERY_ITEMS.filter((i) => i.category === 'outdoor').length },
    { key: 'video', label: 'Virtual Video Tour', count: 1, isVideo: true },
  ] as const;

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8FD] overflow-y-auto flex flex-col">
      {/* Pinned Minimal Navbar (Identical to Main Page) */}
      <MinimalNavbar
        isGalleryPage={true}
        onCloseGallery={onClose}
        onOpenBooking={() => {
          if (onOpenBooking) {
            onOpenBooking();
          } else if (onOpenBookingForRoom) {
            onOpenBookingForRoom('');
          }
        }}
        onSelectBranchFilter={onSelectBranchFilter}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-px bg-[#C49B55]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#87601A] uppercase font-cinzel">
              THE COMPLETE ARCHIVE • EST. 1981
            </span>
            <span className="w-5 h-px bg-[#C49B55]" />
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#1B112B] font-bold mb-2.5">
            Full Photo & Video Gallery
          </h1>
          <p className="text-[#514563] text-sm font-light leading-relaxed">
            Every photo presented in authentic native aspect ratio. Filter by category to explore our suites, resort pool, dining, and grounds.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8 sm:mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setLightboxIndex(null);
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#4E1E7A] to-[#381259] text-white shadow-md shadow-purple-950/20 font-bold border border-[#C49B55]/40'
                    : 'bg-white text-[#3D3150] hover:text-[#4E1E7A] hover:bg-[#F4EDF9] border border-[#E5DAEE]'
                }`}
              >
                {tab.isVideo && <Film className="w-3.5 h-3.5 text-[#C49B55]" />}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] ml-0.5 ${
                    isActive ? 'text-[#EBD7A9]' : 'text-[#7A7188]'
                  }`}
                >
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Natural Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
          {filteredItems.map((item, idx) => {
            const isPortrait = item.orientation === 'portrait';

            // VIDEO CARD
            if (item.isVideo) {
              return (
                <div
                  key={item.id}
                  className="break-inside-avoid relative rounded-xs overflow-hidden border-2 border-[#C49B55]/60 bg-[#160B24] text-white shadow-xl group cursor-pointer"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                    <video
                      src={item.src}
                      poster={item.poster}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4E1E7A]/90 backdrop-blur-md text-[#EBD7A9] text-[10px] font-bold uppercase tracking-wider border border-[#C49B55]/50 font-cinzel">
                        <Sparkles className="w-3 h-3 text-[#C49B55]" />
                        <span>VIDEO TOUR</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 text-[10px] font-mono">
                        9:16 STORY
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#4E1E7A] transition-all duration-300 shadow-2xl">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="font-playfair text-base font-bold text-white mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-white/70 line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            // STANDARD PHOTO CARD
            return (
              <div
                key={item.id}
                className="break-inside-avoid relative rounded-xs overflow-hidden border border-[#E9E1F0] bg-white shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => setLightboxIndex(idx)}
              >
                <div className="relative w-full overflow-hidden bg-[#FAF7FC]">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5" />

                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-2 py-0.5 rounded-full bg-[#1B112B]/85 backdrop-blur-md text-[#EBD7A9] text-[9.5px] font-bold uppercase tracking-wider border border-[#C49B55]/50 font-cinzel">
                      {item.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 text-[9px] font-mono">
                      {isPortrait ? 'Portrait 2:3' : 'Landscape 3:2'}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                    <h4 className="font-playfair text-sm font-bold leading-tight mb-1">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-white/80">
                      <span>Click to view full photo</span>
                      <Maximize2 className="w-3.5 h-3.5 text-[#C49B55]" />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white border-t border-[#F2EBF7] flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-semibold text-[#1F1929] group-hover:text-[#4E1E7A] transition-colors line-clamp-1">
                      {item.title}
                    </h5>
                    <span className="text-[10px] text-[#7A7188] capitalize">
                      {item.roomName || item.categoryLabel}
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#FAF7FC] border border-[#E9E1F0] flex items-center justify-center shrink-0 group-hover:bg-[#4E1E7A] group-hover:text-white transition-colors">
                    <Eye className="w-3 h-3 text-[#7A7188] group-hover:text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Luxury Footer */}
      <MinimalFooter />

      {/* FULLSCREEN LIGHTBOX VIEWER */}
      <AnimatePresence>
        {currentItem && lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close viewer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
                );
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[92vh] max-w-[92vw] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {currentItem.isVideo ? (
                <div className="relative aspect-[9/16] h-[78vh] max-h-[750px] rounded-xs overflow-hidden border-2 border-[#C49B55]/60 bg-black shadow-2xl">
                  <video
                    ref={videoRef}
                    src={currentItem.src}
                    playsInline
                    autoPlay
                    loop
                    muted={isMuted}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-20">
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          if (videoRef.current.paused) {
                            videoRef.current.play();
                            setIsVideoPlaying(true);
                          } else {
                            videoRef.current.pause();
                            setIsVideoPlaying(false);
                          }
                        }
                      }}
                      className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors cursor-pointer"
                    >
                      {isVideoPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-amber-300" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative max-h-[80vh] flex items-center justify-center">
                  <img
                    src={currentItem.src}
                    alt={currentItem.title}
                    className="max-h-[78vh] max-w-[90vw] object-contain rounded-xs shadow-2xl"
                  />
                </div>
              )}

              <div className="mt-3.5 text-center text-white max-w-xl">
                <div className="flex items-center justify-center gap-2 mb-1 text-xs">
                  <span className="font-mono text-[#C49B55]">
                    {String(lightboxIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
                  </span>
                  <span>•</span>
                  <span className="uppercase tracking-wider text-[11px] text-white/70 font-cinzel">
                    {currentItem.categoryLabel}
                  </span>
                </div>

                <h3 className="font-playfair text-lg sm:text-xl font-bold">
                  {currentItem.title}
                </h3>
                <p className="text-xs text-white/75 mt-0.5 font-light">
                  {currentItem.caption}
                </p>

                {currentItem.roomId && onOpenBookingForRoom && (
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        setLightboxIndex(null);
                        onClose();
                        onOpenBookingForRoom(currentItem.roomId!);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-[#4E1E7A] to-[#381259] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-transform active:scale-95 border border-[#C49B55]/50 inline-flex items-center gap-1.5 shadow-lg cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#C49B55]" />
                      <span>Reserve {currentItem.roomName}</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
