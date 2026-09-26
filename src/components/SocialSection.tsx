import React from 'react';
import { PhoenixLogo } from './PhoenixLogo';
import { Instagram } from 'lucide-react';
import { HOTEL_CONTACT } from '../data/hotelData';

export const SocialSection: React.FC = () => {
  const socialImages = [
    {
      id: 's1',
      url: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80',
      alt: 'Guest enjoying morning coffee at E-Phoenix Hotel',
    },
    {
      id: 's2',
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      alt: 'Guest exploring E-Phoenix digital concierge on tablet',
    },
    {
      id: 's3',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      alt: 'Luxury stay memories at E-Phoenix Hotel',
    },
    {
      id: 's4',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      alt: 'Sharing dining moments at E-Phoenix Hotel',
    },
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto text-center">
        {/* Instagram Handle Header */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Instagram className="w-5 h-5 text-[#9e7d52]" />
          <a
            href={`https://instagram.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-playfair italic text-lg sm:text-xl text-neutral-800 hover:text-[#9e7d52] transition-colors"
          >
            {HOTEL_CONTACT.instagram}
          </a>
        </div>

        {/* 4 Images with Central Logo Badge */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
          {/* Image 1 */}
          <div className="overflow-hidden rounded-xs aspect-[4/5] shadow-xs group bg-neutral-100">
            <img
              src={socialImages[0].url}
              alt={socialImages[0].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Image 2 */}
          <div className="overflow-hidden rounded-xs aspect-[4/5] shadow-xs group bg-neutral-100">
            <img
              src={socialImages[1].url}
              alt={socialImages[1].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Center Column: Logo Badge */}
          <div className="col-span-2 md:col-span-1 py-6 flex flex-col items-center justify-center">
            <div className="p-4 bg-[#fbf9f6] rounded-full border border-[#e8ded1] shadow-xs">
              <PhoenixLogo size="md" showSubtitle={true} variant="white-bg" />
            </div>
          </div>

          {/* Image 3 */}
          <div className="overflow-hidden rounded-xs aspect-[4/5] shadow-xs group bg-neutral-100">
            <img
              src={socialImages[2].url}
              alt={socialImages[2].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Image 4 */}
          <div className="overflow-hidden rounded-xs aspect-[4/5] shadow-xs group bg-neutral-100">
            <img
              src={socialImages[3].url}
              alt={socialImages[3].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
