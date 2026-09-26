import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '../types';

interface LightboxModalProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  if (currentIndex === null || currentIndex < 0 || currentIndex >= images.length) {
    return null;
  }

  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, onNavigate, images.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 transition-colors z-30 cursor-pointer"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      <button
        onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-2.5 rounded-full bg-neutral-900/70 hover:bg-neutral-800 transition-colors z-20 cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Next Button */}
      <button
        onClick={() => onNavigate((currentIndex + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-2.5 rounded-full bg-neutral-900/70 hover:bg-neutral-800 transition-colors z-20 cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Main Image Container */}
      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
        <img
          src={currentImage.imageUrl}
          alt={currentImage.title}
          className="max-h-[75vh] w-auto object-contain rounded-xs shadow-2xl"
        />

        {/* Caption */}
        <div className="mt-4 text-center">
          <h3 className="font-playfair text-lg sm:text-xl text-white font-normal">
            {currentImage.title}
          </h3>
          <div className="flex items-center justify-center gap-3 mt-1 text-xs text-neutral-400">
            <span className="uppercase tracking-widest text-[#c5a880] font-cinzel">
              {currentImage.category}
            </span>
            <span>•</span>
            <span>
              {currentIndex + 1} of {images.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
