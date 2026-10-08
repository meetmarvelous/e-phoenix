import React from 'react';
import { PhoenixLogo } from './PhoenixLogo';
import { HOTEL_HERITAGE, REAL_BRANCHES } from '../data/hotelRealData';
import { MapPin, Phone, MessageCircle, Mail, ShieldCheck } from 'lucide-react';

export const MinimalFooter: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#FAF7FC] text-[#3F3949] pt-16 pb-12 border-t border-[#ECE5F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Col 1: Brand & Heritage */}
          <div>
            <PhoenixLogo size="md" showSubtitle={true} variant="purple" className="items-start text-left mb-4" />
            <p className="text-xs text-[#5F586D] font-light leading-relaxed mb-4">
              {HOTEL_HERITAGE.heritageNote}
            </p>
            <div className="text-xs text-[#4E1E7A] font-cinzel font-bold tracking-wider">
              Established 1981 • Kwara State, Nigeria
            </div>
          </div>

          {/* Col 2: The 3 Locations */}
          <div className="space-y-4">
            <h4 className="font-playfair text-base font-bold text-[#1F1929] tracking-wide border-b border-[#ECE5F3] pb-2">
              Our 3 Locations
            </h4>
            {REAL_BRANCHES.map((b) => (
              <div key={b.id} className="text-xs">
                <div className="font-semibold text-[#4E1E7A] flex items-center gap-1.5 mb-0.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{b.name}</span>
                </div>
                <p className="text-[#5F586D] font-light leading-snug pl-5">
                  {b.address}
                </p>
                <div className="pl-5 mt-1 text-[11px] text-[#3F3949]">
                  Tel: <a href={`tel:${b.phone}`} className="hover:underline text-[#4E1E7A] font-semibold">{b.phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')}</a>
                </div>
              </div>
            ))}
          </div>

          {/* Col 3: Direct Inquiries & Contact */}
          <div>
            <h4 className="font-playfair text-base font-bold text-[#1F1929] tracking-wide border-b border-[#ECE5F3] pb-2 mb-4">
              24/7 Guest Care
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#7A7188] block uppercase tracking-wider text-[10px]">Headquarters Phone:</span>
                <a href={`tel:${HOTEL_HERITAGE.primaryPhone}`} className="text-[#4E1E7A] hover:underline text-sm font-bold tracking-wide">
                  {HOTEL_HERITAGE.primaryPhone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')}
                </a>
              </div>

              <div>
                <span className="text-[#7A7188] block uppercase tracking-wider text-[10px]">Instant Concierge Line:</span>
                <a
                  href={HOTEL_HERITAGE.primaryWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4E1E7A] hover:underline flex items-center gap-1 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#C49B55]" />
                  <span>24/7 Concierge Desk</span>
                </a>
              </div>

              <div>
                <span className="text-[#7A7188] block uppercase tracking-wider text-[10px]">Reservations Email:</span>
                <a href={`mailto:${HOTEL_HERITAGE.emails[0]}`} className="text-[#3F3949] hover:text-[#4E1E7A] font-medium">
                  {HOTEL_HERITAGE.emails[0]}
                </a>
              </div>

              <div>
                <span className="text-[#7A7188] block uppercase tracking-wider text-[10px]">Alternate Phone:</span>
                <span className="text-[#3F3949] tracking-wide">0707 172 1368 · 0707 701 4444</span>
              </div>
            </div>
          </div>

          {/* Col 4: Verified Bank Details for Direct Transfers */}
          <div>
            <h4 className="font-playfair text-base font-bold text-[#1F1929] tracking-wide border-b border-[#ECE5F3] pb-2 mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4E1E7A]" />
              <span>Verified Hotel Account</span>
            </h4>
            <p className="text-xs text-[#5F586D] font-light mb-3">
              Official account details for manual direct transfers and confirmed booking receipts:
            </p>
            <div className="p-3.5 bg-white rounded-xs border border-[#E4D7F0] text-xs font-mono space-y-1 shadow-xs">
              <div className="text-[#5F586D]">Bank: <strong className="text-[#1F1929] font-sans">{HOTEL_HERITAGE.bankDetails.bankName}</strong></div>
              <div className="text-[#5F586D]">Account: <strong className="text-[#1F1929]">{HOTEL_HERITAGE.bankDetails.accountName}</strong></div>
              <div className="text-[#4E1E7A] text-sm font-bold pt-1 border-t border-[#ECE5F3]">
                {HOTEL_HERITAGE.bankDetails.accountNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#ECE5F3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A7188] text-center sm:text-left">
          <p>
            © 2026 E-Phoenix Hotel Group. All rights reserved. Uniquely Awesome Hospitality since 1981.
          </p>
          <p className="text-[11px] tracking-wider text-[#7A7188] font-medium">
            GRA Ilorin • Tanke Fate • Flower Garden
          </p>
        </div>
      </div>
    </footer>
  );
};
