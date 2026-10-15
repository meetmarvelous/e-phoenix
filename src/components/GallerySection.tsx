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
  Camera,
  Film,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GallerySectionProps {
  onOpenBookingForRoom?: (roomId: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onOpenBookingForRoom,
}) => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'rooms' | 'pool' | 'dining' | 'reception' | 'outdoor' | 'video'
  >('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Combine items with the video tour at a prominent index
  const allDisplayItems: GalleryItem[] = [
    GALLERY_ITEMS[0], // Presidential suite landscape
    VIDEO_TOUR_ITEM, // Portrait video story card
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

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8FD] border-b border-[#ECE5F3]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-px bg-[#C49B55]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#87601A] uppercase font-cinzel">
              04 • THE E-PHOENIX ARCHIVE
            </span>
            <span className="w-5 h-px bg-[#C49B55]" />
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#1B112B] font-bold mb-3.5">
            Visual Journey & Gallery
          </h2>
          <p className="text-[#514563] text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Explore authentic moments across our three Ilorin properties. Both portrait architectural details 
            and sweeping landscape suites are captured in pristine native ratios without cropping.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mb-10 sm:mb-14">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as any);
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

        {/* Natural Masonry Layout (Accommodates both Portrait & Landscape without cutting off parts) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
          {filteredItems.map((item, idx) => {
            const isPortrait = item.orientation === 'portrait';

            // SPECIAL RENDER: Portrait Video Card
            if (item.isVideo) {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
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

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4E1E7A]/90 backdrop-blur-md text-[#EBD7A9] text-[10px] font-bold uppercase tracking-wider border border-[#C49B55]/50 font-cinzel">
                        <Sparkles className="w-3 h-3 text-[#C49B55]" />
                        <span>VIDEO TOUR</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 text-[10px] font-mono">
                        9:16 STORY
                      </span>
                    </div>

                    {/* Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#4E1E7A] transition-all duration-300 shadow-2xl">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="font-playfair text-base font-bold text-white mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-white/70 line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            }

            // STANDARD IMAGE CARD (NATURAL RATIO MASONRY)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (idx % 4) * 0.05 }}
                className="break-inside-avoid relative rounded-xs overflow-hidden border border-[#E9E1F0] bg-white shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Natural Image Tag: No fixed height container so portraits are tall and landscapes are wide */}
                <div className="relative w-full overflow-hidden bg-[#FAF7FC]">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-2 py-0.5 rounded-full bg-[#1B112B]/85 backdrop-blur-md text-[#EBD7A9] text-[9.5px] font-bold uppercase tracking-wider border border-[#C49B55]/50 font-cinzel">
                      {item.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 text-[9px] font-mono">
                      {isPortrait ? 'Portrait 2:3' : 'Landscape 3:2'}
                    </span>
                  </div>

                  {/* Bottom Hover Title */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                    <h4 className="font-playfair text-sm font-bold leading-tight mb-1">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-white/80">
                      <span>Click to expand view</span>
                      <Maximize2 className="w-3.5 h-3.5 text-[#C49B55]" />
                    </div>
                  </div>
                </div>

                {/* Clean Sub-bar for Mobile / Default Scanability */}
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
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action Banner inside Gallery */}
        <div className="mt-14 p-6 sm:p-8 bg-white rounded-xs border border-[#E5D7F2] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#87601A] font-cinzel block mb-1">
              AUTHENTIC HOSPITALITY
            </span>
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#1B112B]">
              Ready to Experience E-Phoenix in Person?
            </h3>
            <p className="text-xs text-[#5F586D] mt-1 font-light max-w-xl">
              All suites across our 3 locations include complimentary daily hot breakfast and guaranteed 24/7 standby power.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#rooms"
              className="px-5 py-3 bg-gradient-to-r from-[#4E1E7A] to-[#381259] hover:from-[#5D2490] hover:to-[#4A1874] text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xs transition-all shadow-md active:scale-95 cursor-pointer border border-[#C49B55]/40"
            >
              EXPLORE ROOM RATES
            </a>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX VIEWER (Accommodates both Portrait & Landscape without cutting off parts) */}
      <AnimatePresence>
        {currentItem && lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
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

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[92vh] max-w-[92vw] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {currentItem.isVideo ? (
                /* PORTRAIT VIDEO PLAYER (9:16 INSTAGRAM REEL SIZING - NO LETTERBOX STRETCH) */
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
                  {/* Video Controls overlay */}
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
                /* IMAGE DISPLAY: max-h-[82vh] and object-contain so NO parts are cut off! */
                <div className="relative max-h-[80vh] flex items-center justify-center">
                  <img
                    src={currentItem.src}
                    alt={currentItem.title}
                    className="max-h-[78vh] max-w-[90vw] object-contain rounded-xs shadow-2xl"
                  />
                </div>
              )}

              {/* Bottom Meta & Actions */}
              <div className="mt-3.5 text-center text-white max-w-xl">
                <div className="flex items-center justify-center gap-2 mb-1 text-xs">
                  <span className="font-mono text-[#C49B55]">
                    {String(lightboxIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
                  </span>
                  <span>•</span>
                  <span className="uppercase tracking-wider text-[11px] text-white/70 font-cinzel">
                    {currentItem.categoryLabel}
                  </span>
                  <span>•</span>
                  <span className="text-[10px] text-white/50">
                    {currentItem.orientation === 'portrait' ? 'Vertical Detail' : 'Panoramic View'}
                  </span>
                </div>

                <h3 className="font-playfair text-lg sm:text-xl font-bold">
                  {currentItem.title}
                </h3>
                <p className="text-xs text-white/75 mt-0.5 font-light">
                  {currentItem.caption}
                </p>

                {/* Direct CTA if photo belongs to a room */}
                {currentItem.roomId && onOpenBookingForRoom && (
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        setLightboxIndex(null);
                        onOpenBookingForRoom(currentItem.roomId!);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-[#4E1E7A] to-[#381259] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-transform active:scale-95 border border-[#C49B55]/50 inline-flex items-center gap-1.5 shadow-lg"
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
    </section>
  );
};
