import React from 'react';
import { PhoenixLogo } from './PhoenixLogo';
import { Phone, Mail, MapPin, Instagram, MessageCircle, Building2, Sparkles } from 'lucide-react';
import { HotelBranch, BranchId } from '../types';
import { BRANCH_LIST } from '../data/hotelData';

interface FooterProps {
  currentBranch: HotelBranch;
  onSelectBranch: (id: BranchId) => void;
  onOpenBranchModal: () => void;
  onOpenGeoGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentBranch,
  onSelectBranch,
  onOpenBranchModal,
  onOpenGeoGuide,
}) => {
  return (
    <footer id="footer" className="bg-[#ede3d8] text-[#2c241d] pt-16 pb-10 border-t border-[#dfd2c2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Branch Quick Switch Bar in Footer */}
        <div className="mb-12 p-4 bg-[#dfd2c2]/70 rounded-xs border border-[#cfc1b0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#8a6e4d]" />
            <span className="text-xs font-bold uppercase tracking-wider font-cinzel text-[#3d3227]">
              Explore Our 3 Ilorin Locations:
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {BRANCH_LIST.map((b) => (
              <button
                key={b.id}
                onClick={() => onSelectBranch(b.id)}
                className={`px-3 py-1.5 rounded-xs text-xs font-medium transition-all cursor-pointer ${
                  currentBranch.id === b.id
                    ? 'bg-[#1b1713] text-[#c5a880] font-bold shadow-xs'
                    : 'bg-[#f4ede4] hover:bg-white text-[#4a3f35]'
                }`}
              >
                {b.shortName}
              </button>
            ))}

            <button
              onClick={onOpenBranchModal}
              className="px-3 py-1.5 bg-[#c5a880] hover:bg-[#b89569] text-black rounded-xs text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Compare</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left">
          {/* Column 1: Address */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h4 className="font-playfair text-xl font-bold text-[#1f1914] mb-1">
              {currentBranch.shortName} Address
            </h4>
            <p className="text-sm text-[#4a3f35] leading-relaxed max-w-xs font-light">
              {currentBranch.address}
            </p>
            <div className="pt-2 flex flex-col items-center md:items-start gap-1">
              <span className="text-xs font-medium text-[#7d674f] tracking-wider uppercase">
                {currentBranch.locationName}
              </span>
              <span className="text-[11px] font-mono text-[#8a7259]">
                📍 {currentBranch.geo.latitude.toFixed(4)}°N, {currentBranch.geo.longitude.toFixed(4)}°E ({currentBranch.geo.geoRegion})
              </span>
              {onOpenGeoGuide && (
                <button
                  onClick={onOpenGeoGuide}
                  className="mt-1 text-xs text-[#8a6e4d] hover:text-[#5a442d] font-semibold underline cursor-pointer"
                >
                  Explore Ilorin Geo Guide & FAQs →
                </button>
              )}
            </div>
          </div>

          {/* Column 2: Logo */}
          <div className="flex flex-col items-center justify-center">
            <PhoenixLogo size="lg" showSubtitle={true} variant="white-bg" />
            <p className="text-[11px] font-cinzel text-[#826a4e] tracking-[0.25em] uppercase mt-2">
              {currentBranch.badge}
            </p>
          </div>

          {/* Column 3: Contact Us */}
          <div className="flex flex-col items-center md:items-end space-y-2.5">
            <h4 className="font-playfair text-xl font-bold text-[#1f1914] mb-1">
              Contact & Reservations
            </h4>

            <div className="flex items-center gap-2 text-sm text-[#3d3329]">
              <Phone className="w-4 h-4 text-[#8a6e4d]" />
              <div className="flex flex-col md:items-end">
                <a
                  href={`tel:${currentBranch.phones[0]}`}
                  className="hover:text-[#9e7d52] font-medium transition-colors"
                >
                  {currentBranch.phones[0]}
                </a>
                {currentBranch.phones[1] && (
                  <a
                    href={`tel:${currentBranch.phones[1]}`}
                    className="hover:text-[#9e7d52] font-medium transition-colors"
                  >
                    {currentBranch.phones[1]}
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#3d3329]">
              <Mail className="w-4 h-4 text-[#8a6e4d]" />
              <a
                href={`mailto:${currentBranch.email}`}
                className="hover:text-[#9e7d52] font-medium transition-colors"
              >
                {currentBranch.email}
              </a>
            </div>

            {/* Social & WhatsApp */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#dfd2c2] hover:bg-[#c5a880] text-[#2c241d] hover:text-black flex items-center justify-center transition-colors shadow-xs"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={currentBranch.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-[#dfd2c2] hover:bg-[#25D366] text-[#2c241d] hover:text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Divider & Copyright */}
        <div className="mt-14 pt-6 border-t border-[#dfd2c2] text-center">
          <p className="text-xs text-[#6e5d4c] font-light tracking-wider">
            Copyright © 2026 - E-Phoenix Hotel Group • {currentBranch.name}
          </p>
        </div>
      </div>
    </footer>
  );
};
