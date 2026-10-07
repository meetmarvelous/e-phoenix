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
import { CheckCircle2, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
      {/* Branch Switch Toast Notification */}
      <AnimatePresence>
        {branchSwitchToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 sm:max-w-md bg-[#191511]/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-xl border border-[#c5a880]/60 shadow-2xl shadow-black/80 flex items-start gap-3"
            role="status"
            aria-live="polite"
          >
            <div className="w-8 h-8 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#c5a880]">
              <CheckCircle2 className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-[#c5a880] uppercase font-cinzel mb-0.5">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>LOCATION UPDATED</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug break-words">
                {branchSwitchToast}
              </p>
            </div>

            <button
              onClick={() => setBranchSwitchToast(null)}
              className="text-neutral-400 hover:text-white p-1 rounded-sm hover:bg-white/10 transition-colors cursor-pointer shrink-0 mt-0.5"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
