import React from 'react';
import { HOTEL_HERITAGE } from '../data/hotelRealData';
import { Award, HeartHandshake, ShieldCheck, Zap, Coffee } from 'lucide-react';
import { motion } from 'motion/react';

export const HeritageSection: React.FC = () => {
  const values = [
    {
      icon: <Award className="w-5 h-5 text-[#4E1E7A]" />,
      title: 'Excellence',
      desc: 'Over four decades of dedicated hospitality, maintaining uncompromising standards in comfort, service, and guest well-being.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#4E1E7A]" />,
      title: 'Integrity',
      desc: 'Transparent pricing, guaranteed security, and an enduring reputation trusted by families, corporate executives, and state dignitaries.'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#4E1E7A]" />,
      title: 'Genuine Care',
      desc: 'Our founding promise of "uniquely awesome hospitality" ensures every guest is received with authentic warmth and royal treatment.'
    }
  ];

  return (
    <section id="heritage" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7FC] border-b border-[#ECE5F3]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#C49B55]" />
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#C49B55] uppercase font-cinzel">
                OUR HERITAGE • SINCE 1981
              </span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#1F1929] font-normal leading-tight mb-5">
              Over 4 Decades of Superior Hospitality in Ilorin
            </h2>
            <p className="text-[#3F3949] text-sm sm:text-base font-light leading-relaxed mb-4">
              Proudly originating from the legacy of <strong className="text-[#1F1929] font-medium">Ratem Merchant's Heritage since 1981</strong>, E-Phoenix Hotel has grown to become the hallmark of distinguished lodging and luxury living in Ilorin, Kwara State.
            </p>
            <p className="text-[#5F586D] text-xs sm:text-sm font-light leading-relaxed mb-8">
              Whether you are visiting for high-level corporate retreats, academic convocations, government summits, or relaxing family getaways, our commitment to "uniquely awesome hospitality" ensures that your stay is comfortable, secure, and memorable.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#ECE5F3]">
              {values.map((val) => (
                <div key={val.title}>
                  <div className="p-2 rounded-xs bg-[#F4EDF9] border border-[#E5D7F2] inline-block mb-2">
                    {val.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-[#1F1929] mb-1">
                    {val.title}
                  </h3>
                  <p className="text-xs text-[#5F586D] font-light leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Heritage Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-xs p-6 sm:p-8 border border-[#E9E1F0] shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#4E1E7A]/10 rounded-full blur-2xl pointer-events-none" />

              <span className="text-[10px] font-bold tracking-widest text-[#4E1E7A] uppercase block mb-1 font-cinzel">
                KWARA STATE HOSPITALITY LANDMARK
              </span>
              <h3 className="font-playfair text-2xl font-bold text-[#1F1929] mb-4">
                The E-Phoenix Guarantee
              </h3>

              <div className="space-y-3.5 text-xs text-[#3F3949] font-light">
                <div className="flex items-start gap-3 p-3 bg-[#FAF7FC] rounded-xs border border-[#ECE5F3]">
                  <div className="w-8 h-8 rounded-full bg-[#F4EDF9] border border-[#E5D5F2] flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-[#C49B55]" />
                  </div>
                  <div>
                    <strong className="text-[#1F1929] block font-medium">Guaranteed Standby Power</strong>
                    <span>Dual industrial generators ensure round-the-clock uninterrupted air conditioning and lighting.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#FAF7FC] rounded-xs border border-[#ECE5F3]">
                  <div className="w-8 h-8 rounded-full bg-[#F4EDF9] border border-[#E5D5F2] flex items-center justify-center shrink-0 mt-0.5">
                    <Coffee className="w-4 h-4 text-[#C49B55]" />
                  </div>
                  <div>
                    <strong className="text-[#1F1929] block font-medium">Fresh Daily Breakfast</strong>
                    <span>Complimentary single breakfast served daily in our restaurants or lounges for all rooms.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#FAF7FC] rounded-xs border border-[#ECE5F3]">
                  <div className="w-8 h-8 rounded-full bg-[#F4EDF9] border border-[#E5D5F2] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-[#C49B55]" />
                  </div>
                  <div>
                    <strong className="text-[#1F1929] block font-medium">Verified Direct Booking</strong>
                    <span>Book directly to secure our lowest rates with official receipt & verification.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
