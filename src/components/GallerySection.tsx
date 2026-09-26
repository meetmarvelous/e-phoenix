import React, { useState } from 'react';
import { VideoTour, GalleryImage, HotelBranch } from '../types';
import { Play, Volume2, Maximize2, MapPin } from 'lucide-react';

interface GallerySectionProps {
  currentBranch: HotelBranch;
  onOpenVideo: (video: VideoTour) => void;
  onOpenImage: (image: GalleryImage, index: number) => void;
  onOpenBranchModal: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  currentBranch,
  onOpenVideo,
  onOpenImage,
  onOpenBranchModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'rooms' | 'restaurant' | 'facilities'>('all');

  const filteredImages = activeCategory === 'all'
    ? currentBranch.galleryImages
    : currentBranch.galleryImages.filter((img) => img.category === activeCategory);

  const categories = [
    { key: 'all', label: 'ALL' },
    { key: 'rooms', label: 'ROOMS' },
    { key: 'restaurant', label: 'RESTAURANT' },
    { key: 'facilities', label: 'FACILITIES' },
  ] as const;

  return (
    <section id="gallery" className="bg-white text-neutral-900 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title with Branch Context */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#9e7d52]" />
            <span>Media Showcase for: <strong>{currentBranch.shortName}</strong></span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl font-normal text-neutral-900 tracking-wider">
            GALLERY
          </h2>
          <div className="w-12 h-0.5 bg-[#c5a880] mx-auto mt-4" />
        </div>

        {/* VIDEOS SUBSECTION */}
        {currentBranch.videoTours.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-8">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#937146] uppercase font-cinzel">
                ROOM & FACILITY VIDEOS
              </span>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {currentBranch.videoTours.map((video) => (
                <div key={video.id} className="flex flex-col items-center">
                  <div
                    id={`video-card-${video.id}`}
                    onClick={() => onOpenVideo(video)}
                    className="w-full bg-[#181818] aspect-[16/10] rounded-xs relative group overflow-hidden cursor-pointer shadow-lg border border-neutral-800"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                    />

                    {/* Center Golden Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#c5a880] bg-[#1a1714]/80 flex items-center justify-center text-[#c5a880] group-hover:scale-110 group-hover:bg-[#c5a880] group-hover:text-black transition-all duration-300 shadow-xl">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Player Bottom Bar */}
                    <div className="absolute bottom-0 inset-x-0 bg-black/80 px-3 py-1.5 flex items-center justify-between text-[11px] text-neutral-300 font-mono">
                      <span>0:00 / {video.duration}</span>
                      <Volume2 className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                  </div>

                  {/* Video Title Below */}
                  <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-neutral-800 mt-3 text-center">
                    {video.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* IMAGES SUBSECTION */}
        <div>
          <div className="text-center mb-6">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#937146] uppercase font-cinzel">
              IMAGES
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                id={`filter-gallery-${cat.key}`}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] transition-all uppercase cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#c5a880] text-[#1b1713] shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filteredImages.map((img, idx) => (
              <div
                key={img.id}
                id={`gallery-image-${img.id}`}
                onClick={() => onOpenImage(img, idx)}
                className="group relative overflow-hidden rounded-xs shadow-sm bg-neutral-100 aspect-[4/3] cursor-pointer"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium tracking-wider truncate drop-shadow-md">
                      {img.title}
                    </span>
                    <Maximize2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
