import React from 'react';
import { Star, Utensils, Waves, Building2, Sparkles, Users, Shirt, Wifi, Coffee } from 'lucide-react';
import { HotelBranch } from '../types';
import { motion } from 'motion/react';

interface AboutSectionProps {
  currentBranch: HotelBranch;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentBranch }) => {
  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#9e7d52]" />;
      case 'Waves':
        return <Waves className="w-5 h-5 text-[#9e7d52]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#9e7d52]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#9e7d52]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#9e7d52]" />;
      case 'Shirt':
        return <Shirt className="w-5 h-5 text-[#9e7d52]" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-[#9e7d52]" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-[#9e7d52]" />;
      default:
        return <Building2 className="w-5 h-5 text-[#9e7d52]" />;
    }
  };

  return (
    <section id="about" className="bg-[#fbf9f6] text-[#222222] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Centered Header with Flanking Arched Photos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Arched Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block lg:col-span-3"
          >
            <div className="relative overflow-hidden rounded-t-[140px] rounded-b-2xl shadow-xl aspect-[3/4] border-4 border-white bg-neutral-200">
              <img
                src={currentBranch.leftArchImage}
                alt={`${currentBranch.shortName} Interior`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Central Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 text-center px-2 sm:px-6"
          >
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#9e7d52] uppercase block mb-3 font-cinzel">
              WELCOME TO {currentBranch.name.toUpperCase()}
            </span>

            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-[#1e1a17] leading-snug font-normal mb-5">
              {currentBranch.welcomeHeading}
            </h2>

            {/* 5 Gold Stars */}
            <div className="flex items-center justify-center gap-1.5 text-[#c5a880] mb-4" aria-label="5 Stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#c5a880] text-[#c5a880]" />
              ))}
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed font-light">
              {currentBranch.welcomeDescription}
            </p>

            {/* Mobile Arched Images Row */}
            <div className="grid grid-cols-2 gap-4 mt-8 lg:hidden">
              <div className="overflow-hidden rounded-t-[90px] rounded-b-xl shadow-md aspect-[3/4] border-2 border-white">
                <img
                  src={currentBranch.leftArchImage}
                  alt={currentBranch.shortName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-t-[90px] rounded-b-xl shadow-md aspect-[3/4] border-2 border-white">
                <img
                  src={currentBranch.rightArchImage}
                  alt={currentBranch.shortName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Arched Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block lg:col-span-3"
          >
            <div className="relative overflow-hidden rounded-t-[140px] rounded-b-2xl shadow-xl aspect-[3/4] border-4 border-white bg-neutral-200">
              <img
                src={currentBranch.rightArchImage}
                alt={`${currentBranch.shortName} Lounge`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* 6 Amenity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBranch.amenities.map((amenity, index) => (
            <motion.div
              key={amenity.id}
              id={`amenity-card-${amenity.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white border border-[#ece6de] rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 group"
            >
              <div className="p-3 bg-[#f5efe6] rounded-xs shrink-0 group-hover:bg-[#eadecc] transition-colors">
                {getAmenityIcon(amenity.iconName)}
              </div>
              <div>
                <h3 className="font-playfair text-base sm:text-lg font-bold text-[#1f1b17] mb-1.5">
                  {amenity.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
