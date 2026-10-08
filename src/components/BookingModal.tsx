import React, { useState, useEffect } from 'react';
import { ALL_ROOMS, REAL_BRANCHES, HOTEL_HERITAGE, RealRoom } from '../data/hotelRealData';
import { X, Calendar, Users, MessageCircle, Phone, Copy, Check, ShieldCheck, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom?: RealRoom | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedRoom = null,
}) => {
  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [branch, setBranch] = useState<'main' | 'annex1' | 'annex2'>(
    selectedRoom ? selectedRoom.branch : 'main'
  );

  const availableRooms = ALL_ROOMS.filter((r) => r.branch === branch);

  const [roomId, setRoomId] = useState<string>(
    selectedRoom ? selectedRoom.id : availableRooms[0]?.id || ''
  );

  const [checkIn, setCheckIn] = useState<string>(today);
  const [checkOut, setCheckOut] = useState<string>(tomorrow);
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [copiedBank, setCopiedBank] = useState<boolean>(false);

  // When branch changes, ensure chosen room belongs to this branch
  useEffect(() => {
    const roomsForBranch = ALL_ROOMS.filter((r) => r.branch === branch);
    if (!roomsForBranch.some((r) => r.id === roomId)) {
      setRoomId(roomsForBranch[0]?.id || '');
    }
  }, [branch]);

  // When initial room passed in
  useEffect(() => {
    if (selectedRoom) {
      setBranch(selectedRoom.branch);
      setRoomId(selectedRoom.id);
    }
  }, [selectedRoom]);

  const currentRoom = ALL_ROOMS.find((r) => r.id === roomId) || availableRooms[0];
  const currentBranchObj = REAL_BRANCHES.find((b) => b.id === branch) || REAL_BRANCHES[0];

  // Calculate nights
  const calculateNights = () => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
    return isNaN(diff) ? 1 : diff;
  };

  const nights = calculateNights();
  const totalPrice = currentRoom ? currentRoom.price * nights : 0;
  const formatPrice = (p: number) => `₦${p.toLocaleString('en-NG')}`;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(HOTEL_HERITAGE.bankDetails.accountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 3000);
  };

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*E-PHOENIX HOTEL RESERVATION INQUIRY*
------------------------------------
• Property: ${currentBranchObj.name}
• Address: ${currentBranchObj.address}
• Room: ${currentRoom?.name}
• Rate: ${formatPrice(currentRoom?.price || 0)} / night
• Check-in: ${checkIn}
• Check-out: ${checkOut} (${nights} night${nights > 1 ? 's' : ''})
• Total Estimate: ${formatPrice(totalPrice)}
• Guest Name: ${guestName || 'Guest'}
• Phone: ${guestPhone || 'N/A'}
• Guests: ${guestsCount}
------------------------------------
Please confirm room availability and payment instructions.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/2347065023672?text=${encoded}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="relative bg-white text-[#1F1929] w-full max-w-xl rounded-xs border border-[#E9E1F0] shadow-2xl my-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#ECE5F3] bg-[#FAF7FC]">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#4E1E7A] block font-cinzel">
              DIRECT RESERVATION
            </span>
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#1F1929]">
              Book Your E-Phoenix Stay
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-[#1F1929] hover:bg-neutral-100 rounded-xs transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleWhatsAppBooking} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Branch Picker */}
          <div>
            <label className="text-[11px] font-bold tracking-wider text-[#4E1E7A] uppercase block mb-1.5">
              1. SELECT PROPERTY LOCATION
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {REAL_BRANCHES.map((b) => (
                <button
                  type="button"
                  key={b.id}
                  onClick={() => setBranch(b.id)}
                  className={`p-3 rounded-xs text-xs font-medium text-left transition-colors border cursor-pointer flex sm:flex-col justify-between sm:justify-start items-center sm:items-start ${
                    branch === b.id
                      ? 'bg-[#4E1E7A] text-white border-[#4E1E7A] font-bold shadow-xs'
                      : 'bg-[#FAF7FC] text-[#3F3949] border-[#E5D7F2] hover:bg-[#F3EBF9]'
                  }`}
                >
                  <div className="font-semibold">{b.name}</div>
                  <div className="text-[10px] opacity-80 mt-0.5 sm:mt-1">
                    {b.id === 'main' ? 'GRA Diplomatic' : b.id === 'annex1' ? 'Tanke / Fate' : 'Flower Garden'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Room Picker */}
          <div>
            <label className="text-[11px] font-bold tracking-wider text-[#4E1E7A] uppercase block mb-1.5">
              2. SELECT ROOM / SUITE
            </label>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full bg-white border border-[#DDD4E7] text-[#1F1929] text-xs sm:text-sm rounded-xs px-3 py-2.5 focus:outline-none focus:border-[#4E1E7A] focus:ring-1 focus:ring-[#4E1E7A] cursor-pointer"
            >
              {availableRooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — {formatPrice(r.price)} / night
                </option>
              ))}
            </select>
          </div>

          {/* Dates & Guests Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold tracking-wider text-[#4E1E7A] uppercase block mb-1">
                CHECK-IN
              </label>
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                className="w-full bg-white border border-[#DDD4E7] text-[#1F1929] text-xs rounded-xs px-3 py-2 focus:outline-none focus:border-[#4E1E7A] focus:ring-1 focus:ring-[#4E1E7A]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold tracking-wider text-[#4E1E7A] uppercase block mb-1">
                CHECK-OUT
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className="w-full bg-white border border-[#DDD4E7] text-[#1F1929] text-xs rounded-xs px-3 py-2 focus:outline-none focus:border-[#4E1E7A] focus:ring-1 focus:ring-[#4E1E7A]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold tracking-wider text-[#4E1E7A] uppercase block mb-1">
                GUESTS
              </label>
              <select
                value={guestsCount}
                onChange={(Number) => setGuestsCount(Number.target.value as any)}
                className="w-full bg-white border border-[#DDD4E7] text-[#1F1929] text-xs rounded-xs px-3 py-2 focus:outline-none focus:border-[#4E1E7A] focus:ring-1 focus:ring-[#4E1E7A]"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4+ Guests</option>
              </select>
            </div>
          </div>

          {/* Guest Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold tracking-wider text-[#4E1E7A] uppercase block mb-1">
                YOUR FULL NAME
              </label>
              <input
                type="text"
                placeholder="e.g. Alhaji Babatunde"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                className="w-full bg-white border border-[#DDD4E7] text-[#1F1929] text-xs rounded-xs px-3 py-2 focus:outline-none focus:border-[#4E1E7A] focus:ring-1 focus:ring-[#4E1E7A]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold tracking-wider text-[#4E1E7A] uppercase block mb-1">
                PHONE NUMBER
              </label>
              <input
                type="tel"
                placeholder="e.g. 08012345678"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                required
                className="w-full bg-white border border-[#DDD4E7] text-[#1F1929] text-xs rounded-xs px-3 py-2 focus:outline-none focus:border-[#4E1E7A] focus:ring-1 focus:ring-[#4E1E7A]"
              />
            </div>
          </div>

          {/* Price Summary Box */}
          <div className="p-4 bg-[#FAF7FC] rounded-xs border border-[#ECE5F3] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#3F3949] block font-light">
                {nights} Night{nights > 1 ? 's' : ''} • {currentRoom?.name}
              </span>
              <span className="text-[11px] text-[#4E1E7A] font-medium">Includes Daily Complimentary Breakfast</span>
            </div>
            <div className="text-right">
              <span className="font-playfair text-xl sm:text-2xl font-bold text-[#4E1E7A]">
                {formatPrice(totalPrice)}
              </span>
              <span className="text-[10px] text-[#7A7188] block">Total Rate</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#4E1E7A] to-[#381259] hover:from-[#3D1463] hover:to-[#2B0A48] text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-950/20 active:scale-95 border border-[#642B9B]/40"
            >
              <MessageCircle className="w-4 h-4 text-[#C49B55]" />
              <span>CONFIRM DIRECT RESERVATION</span>
            </button>

            <a
              href={`tel:${currentBranchObj.phone}`}
              className="w-full py-2.5 bg-[#FAF7FC] hover:bg-[#F3EBF9] text-[#4E1E7A] border border-[#E4D5F2] text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#C49B55]" />
              <span>CALL FRONT DESK: {currentBranchObj.phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')}</span>
            </a>
          </div>

          {/* Official Bank Transfer Verification */}
          <div className="p-3.5 bg-[#FAF7FC] rounded-xs border border-[#ECE5F3] text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase text-[#4E1E7A] tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>OFFICIAL HOTEL BANK TRANSFER DETAILS</span>
              </span>
              <button
                type="button"
                onClick={handleCopyAccount}
                className="text-[11px] text-[#4E1E7A] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                {copiedBank ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedBank ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="text-xs text-[#3F3949] space-y-0.5">
              <div>Bank: <strong>{HOTEL_HERITAGE.bankDetails.bankName}</strong></div>
              <div>Account Name: <strong>{HOTEL_HERITAGE.bankDetails.accountName}</strong></div>
              <div>Account No: <strong className="text-[#4E1E7A] text-sm font-bold tracking-wider">{HOTEL_HERITAGE.bankDetails.accountNumber}</strong></div>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
