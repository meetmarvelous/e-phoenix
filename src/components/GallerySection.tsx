import React from 'react';
import {
  GALLERY_ITEMS,
  VIDEO_TOUR_ITEM,
  GalleryItem,
} from '../data/galleryData';
import {
  Play,
  ArrowRight,
  Sparkles,
  Camera,
  Film,
  Images,
  Bed,
  Waves,
  Utensils,
  Building,
  Trees,
} from 'lucide-react';
import { motion } from 'motion/react';

interface GallerySectionProps {
  onOpenFullGallery: (initialCategory?: string) => void;
}

interface CategoryShowcase {
  key: 'rooms' | 'pool' | 'dining' | 'reception' | 'outdoor' | 'video';
  title: string;
  tag: string;
  kicker: string;
  photoCount: number;
  featuredImage: string;
  description: string;
  icon: React.ElementType;
  isVideo?: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onOpenFullGallery,
}) => {
  // Curate EXACTLY ONE representative photo for each category
  const categories: CategoryShowcase[] = [
    {
      key: 'rooms',
      title: 'Suites & Accommodations',
      tag: 'Suites',
      kicker: 'Presidential & Executive',
      photoCount: GALLERY_ITEMS.filter((i) => i.category === 'rooms').length,
      featuredImage: '/gallery/rooms/presidential/rooms_presidential_01.jpg',
      description: 'Master suites, executive living rooms, and private en-suite bathrooms across our 3 Ilorin branches.',
      icon: Bed,
    },
    {
      key: 'pool',
      title: 'Poolside & Cocktail Bar',
      tag: 'Pool & Bar',
      kicker: 'Flower Garden GRA Oasis',
      photoCount: GALLERY_ITEMS.filter((i) => i.category === 'pool').length,
      featuredImage: '/gallery/poolside/poolside_01.jpg',
      description: 'Crystal-clear outdoor swimming pool, sunbathing loungers, and evening cocktail cabana.',
      icon: Waves,
    },
    {
      key: 'dining',
      title: 'Dining & Cuisine',
      tag: 'Restaurant',
      kicker: 'Fresh Gourmet & Buffets',
      photoCount: GALLERY_ITEMS.filter((i) => i.category === 'dining').length,
      featuredImage: '/gallery/restaurant/restaurant_01.jpg',
      description: 'Complimentary hot daily breakfast, executive dining hall, and authentic culinary delicacies.',
      icon: Utensils,
    },
    {
      key: 'reception',
      title: 'Grand Diplomatic Lobby',
      tag: 'Lobby',
      kicker: '24/7 Diplomatic Reception',
      photoCount: GALLERY_ITEMS.filter((i) => i.category === 'reception').length,
      featuredImage: '/gallery/reception/reception_01.jpg',
      description: 'Distinguished reception foyer, private guest lounges, and attentive round-the-clock service.',
      icon: Building,
    },
    {
      key: 'outdoor',
      title: 'Grounds & Architecture',
      tag: 'Grounds',
      kicker: 'Secure Diplomatic Setting',
      photoCount: GALLERY_ITEMS.filter((i) => i.category === 'outdoor').length,
      featuredImage: '/gallery/outdoor/outdoor_01.jpg',
      description: 'Gated private perimeter, manicured landscaped walkways, and spacious on-site guest parking.',
      icon: Trees,
    },
    {
      key: 'video',
      title: 'Virtual Video Tour',
      tag: 'Story Tour',
      kicker: '60-Second Walkthrough',
      photoCount: 1,
      featuredImage: '/gallery/outdoor/outdoor_01.jpg',
      description: 'Watch our official portrait Instagram video walkthrough touring the suites, pool, and dining.',
      icon: Film,
      isVideo: true,
    },
  ];

  return (
    <section
      id="gallery"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8FD] border-b border-[#ECE5F3]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-px bg-[#C49B55]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#87601A] uppercase font-cinzel">
              04 • THE VISUAL COLLECTION
            </span>
            <span className="w-5 h-px bg-[#C49B55]" />
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#1B112B] font-bold mb-3.5">
            Explore the Hotel Gallery
          </h2>
          <p className="text-[#514563] text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Select any category below to open the complete photo archive, or enter the full 80+ collection to view our suites, resort pool, and dining in high resolution.
          </p>
        </div>

        {/* 6 Category Cards Grid: Exactly ONE picture per category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {categories.map((cat, index) => {
            const Icon = cat.icon;

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => onOpenFullGallery(cat.key)}
                className="bg-white rounded-xs overflow-hidden border border-[#E9E1F0] hover:border-[#4E1E7A]/60 shadow-xs hover:shadow-2xl hover:shadow-purple-950/10 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Single Featured Photo Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF7FC]">
                    {cat.isVideo ? (
                      <div className="relative w-full h-full bg-[#160B24] overflow-hidden">
                        <video
                          src="/video/ephoenixhotel.mp4"
                          poster={cat.featuredImage}
                          muted
                          loop
                          playsInline
                          autoPlay
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

                        {/* Video Play Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-13 h-13 rounded-full bg-[#4E1E7A]/85 backdrop-blur-md border border-[#C49B55]/60 flex items-center justify-center group-hover:scale-110 transition-all shadow-xl">
                            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <img
                          src={cat.featuredImage}
                          alt={cat.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                      </>
                    )}

                    {/* Top Floating Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/95 text-[10px] font-bold uppercase tracking-wider border border-white/20">
                        <Icon className="w-3 h-3 text-[#C49B55]" />
                        <span>{cat.tag}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1B112B]/85 backdrop-blur-md text-[#EBD7A9] text-[10.5px] font-semibold tracking-wider border border-[#C49B55]/40 font-mono shadow-md">
                        {cat.isVideo ? (
                          <>
                            <Play className="w-2.5 h-2.5 fill-[#C49B55] text-[#C49B55]" />
                            <span className="font-cinzel text-[10px]">VIDEO</span>
                          </>
                        ) : (
                          <>
                            <Camera className="w-3 h-3 text-[#C49B55]" />
                            <span>{cat.photoCount} Photos</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C49B55] font-cinzel block mb-0.5">
                        {cat.kicker}
                      </span>
                      <h3 className="font-playfair text-lg sm:text-xl font-bold leading-tight drop-shadow-sm">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Description */}
                  <div className="p-4 sm:p-5">
                    <p className="text-xs text-[#5F586D] leading-relaxed font-light">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="p-4 sm:p-5 pt-0 border-t border-[#F2EBF7] mt-auto">
                  <div className="pt-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#4E1E7A] group-hover:text-[#381259] transition-colors">
                    <span className="flex items-center gap-1.5">
                      <span>{cat.isVideo ? 'Watch Video Tour' : `View ${cat.photoCount} Photos`}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C49B55] group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[10.5px] text-[#8E82A0] font-normal normal-case">
                      Explore →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Big Call to Open Full Gallery Archive */}
        <div className="mt-14 sm:mt-18 text-center">
          <div className="p-6 sm:p-10 bg-white rounded-xs border border-[#E4D5F2] shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#87601A] font-cinzel block mb-1">
                COMPLETE 80+ PHOTO ARCHIVE
              </span>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#1B112B]">
                Looking for the Complete Hotel Collection?
              </h3>
              <p className="text-xs text-[#5F586D] mt-1 font-light max-w-lg">
                Enter our dedicated gallery view to filter through all 80+ high-resolution photos of bedrooms, bathrooms, and exterior grounds.
              </p>
            </div>

            <button
              onClick={() => onOpenFullGallery('all')}
              className="px-6 py-3.5 bg-gradient-to-r from-[#4E1E7A] to-[#381259] hover:from-[#5D2490] hover:to-[#4A1874] text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xs transition-all shadow-md active:scale-95 cursor-pointer border border-[#C49B55]/40 flex items-center gap-2 shrink-0"
            >
              <Images className="w-4 h-4 text-[#C49B55]" />
              <span>OPEN FULL GALLERY (80+)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
