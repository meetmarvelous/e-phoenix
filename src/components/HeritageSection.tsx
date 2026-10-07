import React from 'react';
import { HOTEL_HERITAGE } from '../data/hotelRealData';
import { Award, Compass, HeartHandshake, ShieldCheck } from 'lucide-react';
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
    <section id="heritage" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7FC] border-b border-[#ECE5F3]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#4E1E7A] uppercase block mb-2 font-cinzel">
              OUR HERITAGE • SINCE 1981
            </span>
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
            <div className="bg-white rounded-xs p-8 border border-[#E9E1F0] shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#4E1E7A]/10 rounded-full blur-2xl pointer-events-none" />

              <span className="text-[10px] font-mono tracking-widest text-[#4E1E7A] uppercase block mb-1">
                KWARA STATE HOSPITALITY LANDMARK
              </span>
              <h3 className="font-playfair text-2xl font-bold text-[#1F1929] mb-4">
                The E-Phoenix Guarantee
              </h3>

              <div className="space-y-4 text-xs text-[#3F3949] font-light">
                <div className="flex items-start gap-3 p-3 bg-[#FAF7FC] rounded-xs border border-[#ECE5F3]">
                  <span className="text-lg">⚡</span>
                  <div>
                    <strong className="text-[#1F1929] block font-medium">Guaranteed Standby Power</strong>
                    <span>Dual industrial generators ensure round-the-clock uninterrupted air conditioning and lighting.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#FAF7FC] rounded-xs border border-[#ECE5F3]">
                  <span className="text-lg">🍳</span>
                  <div>
                    <strong className="text-[#1F1929] block font-medium">Fresh Daily Breakfast</strong>
                    <span>Complimentary single breakfast served daily in our restaurants or lounges for all rooms.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#FAF7FC] rounded-xs border border-[#ECE5F3]">
                  <span className="text-lg">🛡️</span>
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
