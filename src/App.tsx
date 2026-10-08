import React, { useState } from 'react';
import { MinimalNavbar } from './components/MinimalNavbar';
import { MinimalHero } from './components/MinimalHero';
import { KeyPerksSection } from './components/KeyPerksSection';
import { UnifiedRoomsSection } from './components/UnifiedRoomsSection';
import { ThreeLocationsSection } from './components/ThreeLocationsSection';
import { FacilitiesShowcase } from './components/FacilitiesShowcase';
import { HeritageSection } from './components/HeritageSection';
import { MinimalFooter } from './components/MinimalFooter';
import { MobileQuickBar } from './components/MobileQuickBar';
import { BookingModal } from './components/BookingModal';
import { RealRoom } from './data/hotelRealData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomToBook, setSelectedRoomToBook] = useState<RealRoom | null>(null);
  const [branchFilter, setBranchFilter] = useState<string>('all');

  const handleOpenBooking = (room?: RealRoom | null) => {
    setSelectedRoomToBook(room || null);
    setIsBookingOpen(true);
  };

  const handleSelectBranchFilter = (branchId: string) => {
    setBranchFilter(branchId);
    const roomsEl = document.getElementById('rooms');
    if (roomsEl) {
      roomsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#1F1929] selection:bg-[#4E1E7A] selection:text-white pb-14 md:pb-0 font-sans">
      {/* Sleek Minimalist Navigation */}
      <MinimalNavbar
        onOpenBooking={() => handleOpenBooking()}
        onSelectBranchFilter={handleSelectBranchFilter}
      />

      <main>
        {/* Mobile-First Hero with Instant Property & Availability Finder */}
        <MinimalHero
          onSelectBranchFilter={handleSelectBranchFilter}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 6 Essential Hospitality Perks (24/7 Power, Breakfast, Wi-Fi, Security) */}
        <KeyPerksSection />

        {/* Unified Rooms & Suites Showcase with Real Photos & Authentic Rates */}
        <UnifiedRoomsSection
          key={branchFilter}
          initialBranchFilter={branchFilter}
          onSelectRoomToBook={(room) => handleOpenBooking(room)}
        />

        {/* The 3 Signature Properties (Main GRA, Annex 1 Fate, Annex 2 Flower Garden) */}
        <ThreeLocationsSection
          onFilterBranchRooms={(branchId) => handleSelectBranchFilter(branchId)}
        />

        {/* Real Facilities Showcase (Swimming Pool, Restaurant, Event Halls, Rooftop Bar) */}
        <FacilitiesShowcase />

        {/* Our Heritage: Since 1981 - Ratem Merchant's Heritage */}
        <HeritageSection />
      </main>

      {/* Minimal Luxury Footer with Bank Transfer Verification & Exact Addresses */}
      <MinimalFooter />

      {/* Sticky Bottom Action Bar for Mobile Guests (Call, WhatsApp, Reserve) */}
      <MobileQuickBar onOpenBooking={() => handleOpenBooking()} />

      {/* Frictionless Direct Reservation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedRoom={selectedRoomToBook}
      />
    </div>
  );
}
