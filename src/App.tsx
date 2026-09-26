import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { RatesSection } from './components/RatesSection';
import { GallerySection } from './components/GallerySection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { GeoFaqSection } from './components/GeoFaqSection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { RestaurantMenuModal } from './components/RestaurantMenuModal';
import { VideoModal } from './components/VideoModal';
import { LightboxModal } from './components/LightboxModal';
import { FloatingControls } from './components/FloatingControls';
import { BranchSelectorModal } from './components/BranchSelectorModal';
import { LocalGeoGuideModal } from './components/LocalGeoGuideModal';
import { RoomRate, VideoTour, GalleryImage, BranchId } from './types';
import { HOTEL_BRANCHES, getBranchById, getBranchByPath, DEFAULT_BRANCH_ID } from './data/hotelData';
import { updateDocumentSeoAndGeo } from './utils/seo';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Determine branch based on initial URL path
  const getInitialBranchId = (): BranchId => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
      if (path === '/annex1') return 'annex1';
      if (path === '/annex2') return 'annex2';
    }
    return DEFAULT_BRANCH_ID;
  };

  const [currentBranchId, setCurrentBranchId] = useState<BranchId>(getInitialBranchId);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isGeoGuideOpen, setIsGeoGuideOpen] = useState(false);
  const [branchSwitchToast, setBranchSwitchToast] = useState<string | null>(null);

  // Reservation & other modals state
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomRate | null>(null);
  const [bookingParams, setBookingParams] = useState<{
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }>({
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    adults: 1,
    children: 0,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoTour | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const currentBranch = getBranchById(currentBranchId);

  // Synchronize document SEO metadata, GEO meta tags, Canonical links, and Schema.org JSON-LD
  useEffect(() => {
    updateDocumentSeoAndGeo(currentBranch);
  }, [currentBranch]);

  // Listen to browser navigation (back / forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const newBranch = getBranchByPath(window.location.pathname);
      setCurrentBranchId(newBranch.id);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectBranch = (branchId: BranchId) => {
    if (branchId === currentBranchId) return;

    setCurrentBranchId(branchId);
    const targetBranch = HOTEL_BRANCHES[branchId];

    // Push new path to browser history without full reload
    if (window.location.pathname !== targetBranch.path) {
      window.history.pushState(null, '', targetBranch.path);
    }

    // Show temporary toast notification
    setBranchSwitchToast(`Switched to ${targetBranch.name}. Rates, geo & gallery updated.`);
    setTimeout(() => {
      setBranchSwitchToast(null);
    }, 4500);

    // Scroll to top gently so user sees new hero context
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReservation = (room?: RoomRate) => {
    if (room) {
      setSelectedRoom(room);
    } else {
      setSelectedRoom(null);
    }
    setIsReservationOpen(true);
  };

  const handleCheckAvailability = (params: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }) => {
    setBookingParams(params);
    setSelectedRoom(null);
    setIsReservationOpen(true);
  };

  const handleSelectRoomForBooking = (room: RoomRate) => {
    setSelectedRoom(room);
    setIsReservationOpen(true);
  };

  const handleDiscoverRooms = () => {
    const ratesEl = document.getElementById('rates');
    if (ratesEl) {
      ratesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookFromVideo = (roomType: string) => {
    const matched = currentBranch.roomRates.find(
      (r) => r.name.toLowerCase() === roomType.toLowerCase()
    );
    handleSelectRoomForBooking(matched || currentBranch.roomRates[0]);
  };

  const handleOpenImage = (_image: GalleryImage, index: number) => {
    setLightboxIndex(index);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#e5e5e5] selection:bg-[#c5a880] selection:text-black">
      {/* Branch Switch Toast Banner */}
      {branchSwitchToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#251f18] text-white px-5 py-3 rounded-full border border-[#c5a880] shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-200 max-w-lg text-center">
          <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{branchSwitchToast}</span>
          <button
            onClick={() => setBranchSwitchToast(null)}
            className="text-neutral-400 hover:text-white p-0.5 ml-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Fixed Luxury Navigation with Branch Switcher Dropdown */}
      <Navbar
        currentBranch={currentBranch}
        onSelectBranch={handleSelectBranch}
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        onOpenReservation={() => handleOpenReservation()}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenGeoGuide={() => setIsGeoGuideOpen(true)}
      />

      <main>
        {/* Hero Section with Arched Header, Star Vignette, Branch Info & Availability Bar */}
        <HeroSection
          currentBranch={currentBranch}
          onOpenBranchModal={() => setIsBranchModalOpen(true)}
          onDiscoverRooms={handleDiscoverRooms}
          onCheckAvailability={handleCheckAvailability}
        />

        {/* Welcome Section with Arched Images & 6 Amenity Cards for this Branch */}
        <AboutSection currentBranch={currentBranch} />

        {/* Room Rates Table with 10% Discount & Inclusions for this Branch */}
        <RatesSection
          currentBranch={currentBranch}
          onSelectRoomForBooking={handleSelectRoomForBooking}
          onOpenBranchModal={() => setIsBranchModalOpen(true)}
        />

        {/* Video Tours & Image Gallery tailored for this Branch */}
        <GallerySection
          currentBranch={currentBranch}
          onOpenVideo={(video) => setActiveVideo(video)}
          onOpenImage={handleOpenImage}
          onOpenBranchModal={() => setIsBranchModalOpen(true)}
        />

        {/* Facilities & Exact Branch Location Cards */}
        <FacilitiesSection
          currentBranch={currentBranch}
          onOpenBranchModal={() => setIsBranchModalOpen(true)}
        />

        {/* On-Page Geolocation Matrix, Landmark Proximity & Traveler FAQs for Search Engine Indexing */}
        <GeoFaqSection
          currentBranch={currentBranch}
          onSelectBranch={handleSelectBranch}
          onOpenGeoGuide={() => setIsGeoGuideOpen(true)}
        />

        {/* Social / Instagram Lifestyle Showcase */}
        <SocialSection />
      </main>

      {/* Footer with Contact Details, Coordinates & 3 Branch Switch Links */}
      <Footer
        currentBranch={currentBranch}
        onSelectBranch={handleSelectBranch}
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        onOpenGeoGuide={() => setIsGeoGuideOpen(true)}
      />

      {/* Interactive 3-Branch Selector Modal */}
      <BranchSelectorModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        currentBranchId={currentBranchId}
        onSelectBranch={handleSelectBranch}
      />

      {/* Local Area Geo Guide & Intelligence Modal */}
      <LocalGeoGuideModal
        isOpen={isGeoGuideOpen}
        onClose={() => setIsGeoGuideOpen(false)}
        currentBranch={currentBranch}
        onSelectBranch={handleSelectBranch}
      />

      {/* Reservation Booking Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        currentBranch={currentBranch}
        onSelectBranch={handleSelectBranch}
        initialRoom={selectedRoom}
        initialParams={bookingParams}
      />

      {/* Restaurant Culinary Menu Modal */}
      <RestaurantMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentBranch={currentBranch}
      />

      {/* Video Player Modal */}
      <VideoModal
        video={activeVideo}
        roomRates={currentBranch.roomRates}
        onClose={() => setActiveVideo(null)}
        onBookRoom={handleBookFromVideo}
      />

      {/* Full-Screen Photo Lightbox */}
      <LightboxModal
        images={currentBranch.galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />

      {/* Floating WhatsApp and Scroll to Top Buttons */}
      <FloatingControls currentBranch={currentBranch} />
    </div>
  );
}
