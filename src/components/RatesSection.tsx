import React from 'react';
import { RoomRate, HotelBranch } from '../types';
import { Coffee, Wifi, Clock, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface RatesSectionProps {
  currentBranch: HotelBranch;
  onSelectRoomForBooking: (room: RoomRate) => void;
  onOpenBranchModal: () => void;
}

export const RatesSection: React.FC<RatesSectionProps> = ({
  currentBranch,
  onSelectRoomForBooking,
  onOpenBranchModal,
}) => {
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-NG');
  };

  return (
    <section id="rates" className="bg-[#443f3b] text-neutral-100 py-20 px-4 sm:px-6 lg:px-8 border-t border-[#544e49] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading with Branch Context */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c2724] border border-[#c5a880]/40 text-[#c5a880] text-xs font-semibold tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Rates for: {currentBranch.name}</span>
            <button
              onClick={onOpenBranchModal}
              className="text-white hover:underline text-[11px] ml-1 flex items-center gap-1 cursor-pointer"
            >
              <span>[Change Branch]</span>
            </button>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl text-neutral-100 font-normal tracking-wide">
            Our Rates with 10% discount are:
          </h2>
          <p className="text-xs sm:text-sm text-[#d6c4b0] tracking-[0.2em] uppercase mt-2 font-cinzel">
            Guaranteed Best Direct Booking Rates • {currentBranch.shortName}
          </p>
        </motion.div>

        {/* Pricing Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#37322e] rounded-xs shadow-2xl overflow-hidden border border-[#524b45] mb-12"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2c2825] text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#c5a880] uppercase border-b border-[#4d4640]">
                  <th scope="col" className="py-4 px-4 sm:px-8">
                    ROOM / SPACE TYPE
                  </th>
                  <th scope="col" className="py-4 px-4 sm:px-6 text-center">
                    RATE (₦)
                  </th>
                  <th scope="col" className="py-4 px-4 sm:px-6 text-center">
                    DISCOUNT (₦)
                  </th>
                  <th scope="col" className="py-4 px-4 sm:px-6 text-right">
                    RESERVE
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#453f3a] text-xs sm:text-sm">
                {currentBranch.roomRates.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#433d37] transition-colors duration-150 group"
                  >
                    <td className="py-3.5 px-4 sm:px-8 text-neutral-200 font-medium">
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.discountRate && (
                          <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider bg-[#c5a880]/20 text-[#c5a880] px-1.5 py-0.5 rounded-xs font-semibold">
                            -10%
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-center text-neutral-300 font-mono">
                      {formatCurrency(item.rate)}
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-center font-mono font-bold text-white">
                      {item.discountRate ? (
                        <span className="text-[#e2c7a4]">
                          {formatCurrency(item.discountRate)}
                        </span>
                      ) : (
                        <span className="text-neutral-500 font-normal">-</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <button
                        id={`book-row-btn-${item.id}`}
                        onClick={() => onSelectRoomForBooking(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#c5a880] hover:bg-[#b89569] text-[#1b1713] text-[11px] font-bold tracking-wider uppercase rounded-xs transition-colors cursor-pointer shadow-xs active:scale-95"
                      >
                        <span>BOOK</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Branch Switching Banner under rates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-10 p-4 rounded-xs bg-[#2e2925] border border-[#484039] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
        >
          <div>
            <span className="text-xs font-bold text-[#c5a880] uppercase tracking-wider block font-cinzel">
              Comparing other E-Phoenix branches?
            </span>
            <p className="text-xs text-neutral-300">
              Each branch has distinct suites and features. Explore rates across all 3 properties in Ilorin.
            </p>
          </div>
          <button
            onClick={onOpenBranchModal}
            className="px-4 py-2 bg-[#423a33] hover:bg-[#50463d] text-white text-xs font-semibold rounded-xs border border-[#c5a880]/30 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Compare Branch Rates</span>
          </button>
        </motion.div>

        {/* Inclusions & Terms Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-[#fcfaf7] text-neutral-800 rounded-sm p-6 sm:p-10 shadow-lg border border-[#e3d8cc] text-center max-w-3xl mx-auto"
        >
          {/* Top Inclusions */}
          <div className="mb-6">
            <h3 className="text-sm sm:text-base font-bold tracking-[0.25em] text-[#937146] uppercase font-cinzel mb-2">
              THE RATES INCLUDE:
            </h3>
            <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-medium text-neutral-700">
              <span className="inline-flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-[#937146]" />
                Single Breakfast
              </span>
              <span className="text-neutral-300">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Wifi className="w-4 h-4 text-[#937146]" />
                Free High-Speed Wi-Fi
              </span>
            </div>
          </div>

          <div className="w-16 h-px bg-[#d5c2ac] mx-auto mb-6" />

          {/* Terms and Conditions */}
          <div>
            <h4 className="font-playfair text-lg sm:text-xl font-bold text-[#2a241f] mb-3">
              Terms and Conditions
            </h4>

            <p className="text-xs sm:text-sm text-neutral-600 mb-1 leading-relaxed">
              All rates are inclusive of breakfast for 1 guest, except Suites for 2 guests.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#937146] italic mb-4">
              Both served in the restaurant or dining lounge
            </p>

            {/* Check In / Out badges */}
            <div className="inline-flex items-center justify-center gap-3 bg-[#f3ece2] px-4 py-2 rounded-xs text-xs font-semibold text-[#3d3328] mb-4">
              <Clock className="w-3.5 h-3.5 text-[#937146]" />
              <span>Check In: 14:00pm</span>
              <span className="text-[#a48e78]">•</span>
              <span>Check Out: 12:00noon</span>
            </div>

            <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed max-w-xl mx-auto">
              Late Check-out attracts 50% surcharge up to 6:00pm and full payment after 6:00pm.
              Room will be charged for 1 night for NO SHOW (Guaranteed Reservation).
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
