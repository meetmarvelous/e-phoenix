import React, { useState } from 'react';
import { X, MapPin, Navigation, Compass, Plane, Building, Clock, HelpCircle, ChevronDown, ChevronUp, ExternalLink, Globe } from 'lucide-react';
import { BRANCH_LIST, HOTEL_FAQS } from '../data/hotelData';
import { HotelBranch, BranchId } from '../types';

interface LocalGeoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBranch: HotelBranch;
  onSelectBranch: (id: BranchId) => void;
}

export const LocalGeoGuideModal: React.FC<LocalGeoGuideModalProps> = ({
  isOpen,
  onClose,
  currentBranch,
  onSelectBranch,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'geo' | 'landmarks' | 'faqs'>('geo');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="local-geo-guide-modal"
        className="bg-[#171411] text-neutral-100 rounded-sm w-full max-w-4xl max-h-[92vh] overflow-y-auto border border-[#44382c] shadow-2xl relative flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 transition-colors z-20 cursor-pointer"
          aria-label="Close guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#241e17] to-[#171411] border-b border-[#382d22]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 text-[#c5a880] text-[11px] font-bold tracking-[0.25em] uppercase mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Ilorin Geo-Guide & Location Intelligence</span>
          </div>

          <h2 className="font-playfair text-2xl sm:text-3xl text-white font-normal">
            Local Area Guide, Coordinates & FAQs
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light leading-relaxed max-w-2xl">
            Detailed geolocation coordinates, landmark distances, airport connectivity, and essential traveler answers for all E-Phoenix Hotel properties in Ilorin, Kwara State.
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 border-b border-neutral-800/80 pb-1">
            <button
              onClick={() => setActiveTab('geo')}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'geo'
                  ? 'bg-[#c5a880] text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Geo Coordinates & Maps</span>
            </button>

            <button
              onClick={() => setActiveTab('landmarks')}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'landmarks'
                  ? 'bg-[#c5a880] text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Proximity & Landmarks</span>
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'faqs'
                  ? 'bg-[#c5a880] text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Traveler FAQs</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {activeTab === 'geo' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {BRANCH_LIST.map((branch) => {
                  const isCurrent = branch.id === currentBranch.id;

                  return (
                    <div
                      key={branch.id}
                      className={`p-4 rounded-xs border flex flex-col justify-between transition-colors ${
                        isCurrent
                          ? 'bg-[#231d17] border-[#c5a880] ring-1 ring-[#c5a880]'
                          : 'bg-[#1b1713] border-neutral-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#c5a880] font-cinzel">
                            {branch.shortName}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] bg-[#c5a880] text-black px-1.5 py-0.5 rounded-xs font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>

                        <h4 className="font-playfair text-base font-bold text-white mb-1">
                          {branch.locationName}
                        </h4>

                        <p className="text-xs text-neutral-400 mb-3 font-light">
                          {branch.address}
                        </p>

                        {/* Precise Geo Coordinates Data */}
                        <div className="bg-[#12100d] p-2.5 rounded-xs border border-neutral-800 text-[11px] font-mono space-y-1 mb-3">
                          <div className="flex justify-between text-neutral-400">
                            <span>Latitude:</span>
                            <span className="text-white">{branch.geo.latitude.toFixed(4)}° N</span>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Longitude:</span>
                            <span className="text-white">{branch.geo.longitude.toFixed(4)}° E</span>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Geo Region:</span>
                            <span className="text-[#c5a880]">{branch.geo.geoRegion}</span>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Postal Code:</span>
                            <span className="text-white">{branch.geo.postalCode}</span>
                          </div>
                        </div>

                        <div className="text-xs text-neutral-300 flex items-center gap-1.5 mb-3">
                          <Plane className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                          <span>Airport ETA: {branch.geo.distanceToAirport}</span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-neutral-800">
                        <button
                          onClick={() => {
                            window.open(
                              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                branch.geo.googlePlaceQuery
                              )}`,
                              '_blank'
                            );
                          }}
                          className="w-full py-2 bg-[#2d251d] hover:bg-[#3d3227] text-neutral-200 hover:text-white text-xs font-semibold rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Navigation className="w-3 h-3 text-[#c5a880]" />
                          <span>Google Maps Directions</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                        </button>

                        {!isCurrent && (
                          <button
                            onClick={() => {
                              onSelectBranch(branch.id);
                              onClose();
                            }}
                            className="w-full py-1.5 text-xs text-[#c5a880] hover:underline text-center"
                          >
                            Switch Site View to this Branch →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Geo SEO Summary Box */}
              <div className="p-4 bg-[#1e1914] rounded-xs border border-[#3f3325] text-xs text-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>
                    Indexed with ICBM, GeoCoordinates & Schema.org LocalBusiness microformats for search engine rich results.
                  </span>
                </div>
                <span className="text-neutral-400 font-mono text-[11px] shrink-0">
                  Ilorin, Kwara State, Nigeria
                </span>
              </div>
            </div>
          )}

          {activeTab === 'landmarks' && (
            <div className="space-y-5">
              <p className="text-xs text-neutral-400">
                E-Phoenix Hotel properties are strategically situated across central high-security corridors in Ilorin, offering rapid access to key Kwara State governmental, commercial, and transport hubs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BRANCH_LIST.map((branch) => (
                  <div key={branch.id} className="bg-[#1b1713] p-4 rounded-xs border border-neutral-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="w-4 h-4 text-[#c5a880]" />
                      <h4 className="font-playfair text-base text-white font-bold">
                        {branch.shortName} Landmarks
                      </h4>
                    </div>

                    <p className="text-xs text-neutral-400 mb-3">
                      Neighborhood: <strong className="text-neutral-200">{branch.geo.neighborhood}</strong>
                    </p>

                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {branch.geo.landmarks.map((landmark, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                          <span>{landmark}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                      <span>Airport Proximity:</span>
                      <span className="text-[#c5a880] font-semibold">{branch.geo.distanceToAirport}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-3">
              {HOTEL_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#1b1713] border border-neutral-800 rounded-xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-[#c5a880] shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0 ml-2" />
                    )}
                  </button>

                  {openFaqIndex === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs text-neutral-400 font-light leading-relaxed border-t border-neutral-800/60 bg-[#15120f]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#12100d] border-t border-[#31271d] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
            <span>All locations: Ilorin, Kwara State, Nigeria (Timezone: GMT+1 WAT)</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#2d251d] hover:bg-[#3d3227] text-white text-xs rounded-xs"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
