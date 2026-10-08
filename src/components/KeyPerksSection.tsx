import React from 'react';
import { Zap, Coffee, Wifi, ShieldCheck, MapPin, Waves } from 'lucide-react';
import { motion } from 'motion/react';

export const KeyPerksSection: React.FC = () => {
  const perks = [
    {
      num: '01',
      icon: <Zap className="w-5 h-5 text-[#4E1E7A]" />,
      title: '24/7 Guaranteed Power',
      desc: 'Uninterrupted electricity powered by dual heavy-duty standby industrial generators.'
    },
    {
      num: '02',
      icon: <Coffee className="w-5 h-5 text-[#4E1E7A]" />,
      title: 'Complimentary Hot Breakfast',
      desc: 'Fresh, delicious continental and traditional breakfast prepared daily for every in-house guest.'
    },
    {
      num: '03',
      icon: <MapPin className="w-5 h-5 text-[#4E1E7A]" />,
      title: '3 Strategic Ilorin Hubs',
      desc: 'Distinct destinations in diplomatic GRA, Tanke Fate, and Flower Garden for ultimate convenience.'
    },
    {
      num: '04',
      icon: <Waves className="w-5 h-5 text-[#4E1E7A]" />,
      title: 'Pool & Rooftop Lounges',
      desc: 'Crystal outdoor swimming pool at Annex 2 and panoramic skyline sunset rooftop bar at Annex 1.'
    },
    {
      num: '05',
      icon: <Wifi className="w-5 h-5 text-[#4E1E7A]" />,
      title: 'High-Speed Broadband',
      desc: 'High-speed Wi-Fi seamlessly accessible in all guest suites, dining spaces, and executive lounges.'
    },
    {
      num: '06',
      icon: <ShieldCheck className="w-5 h-5 text-[#4E1E7A]" />,
      title: '24/7 Security & Private Parking',
      desc: 'Uniformed security personnel, CCTV coverage, and gated, secure guest parking at all properties.'
    }
  ];

  return (
    <section className="bg-[#FAF8FD] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-[#ECE5F3]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-5 h-px bg-[#C49B55]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#C49B55] uppercase font-cinzel">
              01 • THE E-PHOENIX ADVANTAGE
            </span>
            <span className="w-5 h-px bg-[#C49B55]" />
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl text-[#1B112B] font-bold">
            Every Essential Luxury, Standard
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {perks.map((perk, index) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="p-6 rounded-xs bg-white border border-[#E8DEF2] hover:border-[#4E1E7A]/50 shadow-xs hover:shadow-xl hover:shadow-purple-950/8 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xs bg-[#F4EDF9] shrink-0 border border-[#E5D5F2] group-hover:bg-[#EADBFA] transition-colors">
                  {perk.icon}
                </div>
                <span className="font-cinzel text-xs font-bold text-[#C49B55] opacity-75">
                  {perk.num}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1B112B] tracking-tight mb-1.5 font-playfair">
                  {perk.title}
                </h3>
                <p className="text-xs text-[#514563] font-light leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
