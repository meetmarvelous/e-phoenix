import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, Mail, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { BRANCH_LIST } from '../data/hotelData';
import { RoomRate, HotelBranch, BranchId } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBranch: HotelBranch;
  onSelectBranch: (branchId: BranchId) => void;
  initialRoom?: RoomRate | null;
  initialParams?: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  };
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  currentBranch,
  onSelectBranch,
  initialRoom,
  initialParams,
}) => {
  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialRoom ? initialRoom.id : currentBranch.roomRates[0]?.id || ''
  );
  const [checkIn, setCheckIn] = useState<string>(initialParams?.checkIn || todayStr);
  const [checkOut, setCheckOut] = useState<string>(initialParams?.checkOut || tomorrowStr);
  const [adults, setAdults] = useState<number>(initialParams?.adults || 1);
  const [children, setChildren] = useState<number>(initialParams?.children || 0);

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [reservationRef, setReservationRef] = useState<string>('');

  // Synchronize room selection if branch changes or initialRoom changes
  useEffect(() => {
    if (initialRoom && currentBranch.roomRates.some((r) => r.id === initialRoom.id)) {
      setSelectedRoomId(initialRoom.id);
    } else if (!currentBranch.roomRates.some((r) => r.id === selectedRoomId)) {
      setSelectedRoomId(currentBranch.roomRates[0]?.id || '');
    }
  }, [currentBranch, initialRoom]);

  const selectedRoom = currentBranch.roomRates.find((r) => r.id === selectedRoomId) || currentBranch.roomRates[0];

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const effectiveNightlyRate = selectedRoom?.discountRate || selectedRoom?.rate || 0;
  const totalPrice = effectiveNightlyRate * nights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `EPH-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservationRef(refCode);
    setIsSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    const message = `Hello E-Phoenix Hotel (%2A${encodeURIComponent(currentBranch.name)}%2A),%0A%0AI would like to confirm my reservation:${
      reservationRef ? `%0A• Reservation Ref: ${reservationRef}` : ''
    }%0A• Branch: ${currentBranch.name}%0A• Location: ${currentBranch.locationName}%0A• Room: ${selectedRoom?.name}%0A• Check-in: ${checkIn}%0A• Check-out: ${checkOut} (${nights} night${nights > 1 ? 's' : ''})%0A• Guests: ${adults} Adult(s), ${children} Child(ren)%0A• Total Rate: ₦${totalPrice.toLocaleString('en-NG')}%0A• Guest Name: ${fullName}%0A• Phone: ${phone}%0A• Email: ${email}${
      specialRequests ? `%0A• Requests: ${specialRequests}` : ''
    }%0A%0APlease confirm availability and payment details. Thank you!`;

    window.open(`https://wa.me/${currentBranch.whatsapp}?text=${message}`, '_blank');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="reservation-modal-container"
        className="bg-[#1a1714] text-neutral-100 rounded-sm w-full max-w-2xl max-h-[92vh] overflow-y-auto border border-[#44382c] shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900/60 hover:bg-neutral-800 transition-colors z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#241f1a] px-6 sm:px-8 py-5 border-b border-[#3b3228]">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#c5a880] uppercase block font-cinzel">
            OFFICIAL RESERVATION • {currentBranch.shortName.toUpperCase()}
          </span>
          <h3 className="font-playfair text-xl sm:text-2xl font-normal text-white">
            {currentBranch.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>{currentBranch.locationName}</span>
          </div>
        </div>

        {/* Branch Selector Tabs inside Modal */}
        <div className="bg-[#15120f] px-6 py-2.5 border-b border-[#332a21] flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] text-neutral-400 uppercase tracking-wider shrink-0 mr-1">
            Change Branch:
          </span>
          {BRANCH_LIST.map((b) => (
            <button
              type="button"
              key={b.id}
              onClick={() => onSelectBranch(b.id)}
              className={`px-3 py-1 text-xs rounded-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                currentBranch.id === b.id
                  ? 'bg-[#c5a880] text-black shadow-xs font-bold'
                  : 'bg-[#25201a] text-neutral-400 hover:text-white'
              }`}
            >
              {b.shortName}
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Room Selection for this Branch */}
              <div>
                <label className="block text-xs font-semibold tracking-wider text-neutral-300 uppercase mb-2">
                  Select Room / Facility Type ({currentBranch.shortName})
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {currentBranch.roomRates.map((room) => (
                    <button
                      type="button"
                      key={room.id}
                      onClick={() => setSelectedRoomId(room.id)}
                      className={`text-left p-3 rounded-xs border transition-all cursor-pointer flex flex-col justify-between ${
                        selectedRoomId === room.id
                          ? 'bg-[#2b241c] border-[#c5a880] text-white shadow-sm ring-1 ring-[#c5a880]'
                          : 'bg-[#1e1b18] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs sm:text-sm">{room.name}</span>
                        {room.discountRate && (
                          <span className="text-[10px] bg-[#c5a880]/20 text-[#c5a880] px-1 rounded-xs font-bold">
                            -10%
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-xs sm:text-sm font-bold text-[#c5a880]">
                          ₦{(room.discountRate || room.rate).toLocaleString('en-NG')}
                        </span>
                        {room.discountRate && (
                          <span className="text-[11px] line-through text-neutral-500">
                            ₦{room.rate.toLocaleString('en-NG')}
                          </span>
                        )}
                        <span className="text-[10px] text-neutral-400">/ night</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates & Guest Counts */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#221d18] p-4 rounded-xs border border-neutral-800">
                <div className="flex flex-col">
                  <label className="text-[11px] font-semibold text-neutral-400 uppercase mb-1">
                    Check In
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className="bg-[#181512] border border-neutral-700 rounded-xs px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[11px] font-semibold text-neutral-400 uppercase mb-1">
                    Check Out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="bg-[#181512] border border-neutral-700 rounded-xs px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[11px] font-semibold text-neutral-400 uppercase mb-1">
                    Adults
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="bg-[#181512] border border-neutral-700 rounded-xs px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} Adult{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-[11px] font-semibold text-neutral-400 uppercase mb-1">
                    Children
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="bg-[#181512] border border-neutral-700 rounded-xs px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  >
                    {[0, 1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} Child{num !== 1 ? 'ren' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">
                  Guest Contact Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full bg-[#1e1b18] border border-neutral-700 rounded-xs px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number (e.g. 080...) *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-[#1e1b18] border border-neutral-700 rounded-xs px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#1e1b18] border border-neutral-700 rounded-xs px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Special Requests (Airport pick-up, late check-in, dietary preferences, etc.)"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#1e1b18] border border-neutral-700 rounded-xs px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-[#241f19] border border-[#483d31] p-4 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-neutral-400 block">
                    Duration: {nights} night{nights > 1 ? 's' : ''} • {selectedRoom?.name}
                  </span>
                  <span className="text-xs text-[#c5a880]">
                    Includes Single Breakfast & Free Wi-Fi • {currentBranch.shortName}
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-neutral-400 block uppercase tracking-wider">
                    Total Estimated Cost
                  </span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                    ₦{totalPrice.toLocaleString('en-NG')}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-reservation-btn"
                className="w-full py-3.5 bg-[#c5a880] hover:bg-[#b89569] text-[#1b1713] text-xs font-bold tracking-[0.25em] uppercase rounded-xs transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CONFIRM RESERVATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Confirmation View */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#c5a880]/20 text-[#c5a880] border border-[#c5a880] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold tracking-[0.25em] text-[#c5a880] uppercase font-cinzel">
                  RESERVATION PROCESSED
                </span>
                <h4 className="font-playfair text-2xl font-normal text-white mt-1">
                  Thank you, {fullName}!
                </h4>
                <p className="text-xs text-neutral-400 mt-2 max-w-md mx-auto">
                  Your reservation reference is{' '}
                  <span className="text-[#c5a880] font-mono font-bold tracking-wider">{reservationRef}</span>.
                  The front desk team for <strong>{currentBranch.name}</strong> has received your request.
                </p>
              </div>

              {/* Summary Voucher Card */}
              <div className="bg-[#241f1a] border border-[#3b3228] p-5 rounded-xs text-left text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Branch:</span>
                  <span className="text-white font-medium">{currentBranch.name}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Location:</span>
                  <span className="text-white font-medium">{currentBranch.locationName}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Room:</span>
                  <span className="text-[#c5a880] font-semibold">{selectedRoom?.name}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Dates:</span>
                  <span className="text-white">{checkIn} to {checkOut} ({nights} nights)</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Total:</span>
                  <span className="text-white font-mono font-bold">₦{totalPrice.toLocaleString('en-NG')}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-400">Front Desk:</span>
                  <span className="text-[#c5a880]">{currentBranch.phoneFormatted}</span>
                </div>
              </div>

              {/* Instant WhatsApp Send CTA */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send to {currentBranch.shortName} via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 bg-[#383027] hover:bg-[#483d31] text-neutral-200 text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
