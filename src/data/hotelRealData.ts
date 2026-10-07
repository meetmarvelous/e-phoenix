// Real, authentic data extracted from the official discontinued E-Phoenix Hotel website
export interface RealRoom {
  id: string;
  name: string;
  price: number;
  image: string;
  branch: 'main' | 'annex1' | 'annex2';
  branchName: string;
  features: string[];
  maxGuests: number;
  bedType: string;
  popular?: boolean;
}

export interface RealFacility {
  name: string;
  desc: string;
  image: string;
  branch: 'main' | 'annex1' | 'annex2';
  branchName: string;
}

export interface RealBranch {
  id: 'main' | 'annex1' | 'annex2';
  name: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  image: string;
  description: string;
  highlights: string[];
}

export const HOTEL_HERITAGE = {
  name: "E-Phoenix Hotel",
  slogan: "Uniquely Awesome Hospitality",
  since: 1981,
  yearsOfExcellence: "Over 4 Decades",
  heritageNote: "Proudly originating from the legacy of Ratem Merchant's Heritage since 1981, E-Phoenix Hotel has grown to become the hallmark of distinguished lodging and luxury living in Ilorin.",
  phones: ["07065023672", "07071721368", "07077014444"],
  primaryPhone: "07065023672",
  primaryWhatsapp: "https://wa.me/2347065023672?text=Hello%20E-Phoenix%20Hotel,%20I%20would%20like%20to%20make%20a%20reservation",
  emails: ["info@ephoenixhotel.ng", "emmyojo7@gmail.com"],
  bankDetails: {
    accountName: "Ever Phoenix Guest House",
    accountNumber: "0122342460",
    bankName: "Wema Bank",
  },
  amenitiesIncluded: [
    { title: "24/7 Power Supply", desc: "Guaranteed uninterrupted electricity with dedicated heavy-duty standby power generators." },
    { title: "Complimentary Breakfast", desc: "Fresh hot breakfast served daily for in-house guests." },
    { title: "High-Speed Wi-Fi", desc: "Fast broadband connection across all rooms, dining lounges, and suites." },
    { title: "Smart TV & Satellite", desc: "Premium entertainment with crystal-clear satellite & sports channels." },
    { title: "24/7 Professional Security", desc: "Trained security personnel, CCTV coverage, and secure guest parking." },
    { title: "Room Service & Concierge", desc: "Attentive front desk and room service ready around the clock." },
  ]
};

export const REAL_BRANCHES: RealBranch[] = [
  {
    id: 'main',
    name: 'Main GRA Flagship',
    tagline: 'Flagship Grand Hospitality & Conferences',
    address: '45 Aderemi Adeleye Street, Adjacent Federal Secretariat, Opposite Federal High Court, GRA, Ilorin, Kwara State',
    phone: '07065023672',
    whatsapp: 'https://wa.me/2347065023672?text=Hello%20E-Phoenix%20Hotel%20Main%20GRA%20Branch,%20I%20would%20like%20to%20inquire%20about%20booking',
    image: '/images/branches/main.jpg',
    description: 'Our flagship property located in the serene and prestigious Government Reserved Area (GRA). Home to grand suites, two conference and banquet halls, and 24-hour restaurant dining.',
    highlights: ['Two Event & Conference Halls', '24-Hour Continental Restaurant', 'Serene Diplomatic Zone', 'Diamond & Legacy Suites']
  },
  {
    id: 'annex1',
    name: 'Annex 1 (Tanke / Fate)',
    tagline: 'Boutique Comfort & Rooftop Lounge',
    address: 'Umar Audi Road, Opposite Unilorin Senior Staff Quarters, Beside Premium Trust Bank, Tanke Junction Area, Ilorin, Kwara State',
    phone: '07071721368',
    whatsapp: 'https://wa.me/2347071721368?text=Hello%20E-Phoenix%20Hotel%20Annex%201,%20I%20would%20like%20to%20inquire%20about%20booking',
    image: '/images/branches/annex1.jpg',
    description: 'A contemporary boutique annex situated right by Tanke and Fate, featuring elegant corporate accommodations, private meeting space, and an exclusive rooftop sky lounge.',
    highlights: ['Panoramic Rooftop Bar & Lounge', 'Executive Mini Conference Hall', 'Near University & Banking Hub', 'Director & Chairman Suites']
  },
  {
    id: 'annex2',
    name: 'Annex 2 (Flower Garden GRA)',
    tagline: 'Resort Oasis, Poolside Bar & Leisure',
    address: '13 Reservation Road, Flower Garden, GRA, Ilorin, Kwara State',
    phone: '07077014444',
    whatsapp: 'https://wa.me/2347077014444?text=Hello%20E-Phoenix%20Hotel%20Annex%202,%20I%20would%20like%20to%20inquire%20about%20booking',
    image: '/images/branches/annex2.jpg',
    description: 'Our premiere resort destination featuring a large crystal-clear outdoor swimming pool, vibrant poolside grill bar, multi-cuisine restaurant, and luxury suites overlooking landscaped gardens.',
    highlights: ['Crystal Clear Swimming Pool & Loungers', 'Lively Poolside Cocktail Bar & Grill', 'Presidential & Senatorial Suites', 'Full Guest Laundry & Dry Cleaning']
  }
];

export const ALL_ROOMS: RealRoom[] = [
  // MAIN GRA
  {
    id: 'diamond',
    name: 'Diamond Suites',
    price: 60000,
    image: '/images/rooms/diamond.jpg',
    branch: 'main',
    branchName: 'Main GRA Flagship',
    features: ['King Size Bed', 'Separate Sitting Area', 'Smart TV', 'Complimentary Breakfast', 'High-Speed Wi-Fi'],
    maxGuests: 2,
    bedType: 'King Size Bed',
    popular: true
  },
  {
    id: 'legacy',
    name: 'Legacy Room',
    price: 40000,
    image: '/images/rooms/legacy.jpg',
    branch: 'main',
    branchName: 'Main GRA Flagship',
    features: ['Queen Bed', 'En-suite Bathroom', 'Work Desk', 'Breakfast Included', 'Wi-Fi'],
    maxGuests: 2,
    bedType: 'Queen Bed'
  },
  {
    id: 'platinum',
    name: 'Platinum Room',
    price: 40000,
    image: '/images/rooms/platinum.jpg',
    branch: 'main',
    branchName: 'Main GRA Flagship',
    features: ['Executive Comfort', 'Air Conditioning', 'Satellite TV', 'Complimentary Breakfast'],
    maxGuests: 2,
    bedType: 'Queen Bed'
  },
  {
    id: 'wole',
    name: 'Wole Olanipekun Suite',
    price: 35000,
    image: '/images/rooms/wole.jpg',
    branch: 'main',
    branchName: 'Main GRA Flagship',
    features: ['Heritage Room', 'Spacious Wardrobe', 'Mini Fridge', 'Free Breakfast', 'Wi-Fi'],
    maxGuests: 2,
    bedType: 'Double Bed'
  },
  {
    id: 'classic',
    name: 'Classic Room',
    price: 25000,
    image: '/images/rooms/classic.jpg',
    branch: 'main',
    branchName: 'Main GRA Flagship',
    features: ['Comfortable Double Bed', 'En-suite Shower', 'AC', 'Breakfast Included'],
    maxGuests: 2,
    bedType: 'Double Bed'
  },
  {
    id: 'stdbl',
    name: 'Standard Double',
    price: 22000,
    image: '/images/rooms/stdbl.jpg',
    branch: 'main',
    branchName: 'Main GRA Flagship',
    features: ['Cozy Double Bed', 'Air Conditioning', 'Satellite TV', 'Daily Housekeeping'],
    maxGuests: 2,
    bedType: 'Double Bed'
  },

  // ANNEX 1
  {
    id: 'chm',
    name: 'Chairman Suite',
    price: 70000,
    image: '/images/rooms/chm.jpg',
    branch: 'annex1',
    branchName: 'Annex 1 (Tanke / Fate)',
    features: ['Luxury Executive Living', 'Private Lounge', 'King Bed', 'Complimentary Breakfast', 'VIP Amenities'],
    maxGuests: 2,
    bedType: 'King Size Bed',
    popular: true
  },
  {
    id: 'dir',
    name: 'Director Suite',
    price: 65000,
    image: '/images/rooms/dir.jpg',
    branch: 'annex1',
    branchName: 'Annex 1 (Tanke / Fate)',
    features: ['Executive Suite', 'Spacious Seating', 'Smart TV', 'Free Breakfast', 'Fast Wi-Fi'],
    maxGuests: 2,
    bedType: 'King Bed'
  },
  {
    id: 'sup',
    name: 'Superior Luxury',
    price: 45000,
    image: '/images/rooms/sup.jpg',
    branch: 'annex1',
    branchName: 'Annex 1 (Tanke / Fate)',
    features: ['Modern Luxury Interior', 'Air Conditioning', 'En-suite Bath', 'Free Breakfast'],
    maxGuests: 2,
    bedType: 'Queen Bed'
  },
  {
    id: 'lux',
    name: 'Luxury Room',
    price: 40000,
    image: '/images/rooms/lux.jpg',
    branch: 'annex1',
    branchName: 'Annex 1 (Tanke / Fate)',
    features: ['Contemporary Comfort', 'Work Desk', 'Satellite Channels', 'Breakfast Included'],
    maxGuests: 2,
    bedType: 'Queen Bed'
  },

  // ANNEX 2
  {
    id: 'pres2',
    name: 'Presidential Suite',
    price: 250000,
    image: '/images/rooms/pres2.jpg',
    branch: 'annex2',
    branchName: 'Annex 2 (Flower Garden GRA)',
    features: ['Ultimate Luxury Penthouse', 'Master Bedroom & Living Room', 'Dining Area', 'Pool Access', 'Complimentary Breakfast'],
    maxGuests: 4,
    bedType: 'King Size Bed',
    popular: true
  },
  {
    id: 'sen2',
    name: 'Senatorial Suite',
    price: 155000,
    image: '/images/rooms/sen2.jpg',
    branch: 'annex2',
    branchName: 'Annex 2 (Flower Garden GRA)',
    features: ['Grand Senatorial Luxury', 'Private Sitting Lounge', 'King Bed', 'Pool Access', 'Free Breakfast'],
    maxGuests: 2,
    bedType: 'King Size Bed'
  },
  {
    id: 'whc2',
    name: 'White House City View',
    price: 105000,
    image: '/images/rooms/whc2.jpg',
    branch: 'annex2',
    branchName: 'Annex 2 (Flower Garden GRA)',
    features: ['Panoramic City View', 'Luxury Balcony', 'King Bed', 'Free Breakfast', 'Wi-Fi'],
    maxGuests: 2,
    bedType: 'King Bed'
  },
  {
    id: 'pol2',
    name: 'Pool View Suite',
    price: 85000,
    image: '/images/rooms/pol2.jpg',
    branch: 'annex2',
    branchName: 'Annex 2 (Flower Garden GRA)',
    features: ['Direct Pool Vista', 'Balcony / Terrace', 'King Bed', 'Complimentary Breakfast'],
    maxGuests: 2,
    bedType: 'King Bed',
    popular: true
  },
  {
    id: 'cty2',
    name: 'City View Room',
    price: 65000,
    image: '/images/rooms/cty2.jpg',
    branch: 'annex2',
    branchName: 'Annex 2 (Flower Garden GRA)',
    features: ['Scenic City Overlook', 'Queen Bed', 'Work Area', 'Free Breakfast'],
    maxGuests: 2,
    bedType: 'Queen Bed'
  },
  {
    id: 'sdx2',
    name: 'Super Deluxe',
    price: 60000,
    image: '/images/rooms/sdx2.jpg',
    branch: 'annex2',
    branchName: 'Annex 2 (Flower Garden GRA)',
    features: ['Deluxe Comfort', 'Smart TV', 'Air Conditioning', 'Free Breakfast'],
    maxGuests: 2,
    bedType: 'Queen Bed'
  },
  {
    id: 'dlx2',
    name: 'Deluxe Room',
    price: 50000,
    image: '/images/rooms/dlx2.jpg',
    branch: 'annex2',
    branchName: 'Annex 2 (Flower Garden GRA)',
    features: ['Spacious Layout', 'En-suite Bathroom', 'Wi-Fi', 'Breakfast Included'],
    maxGuests: 2,
    bedType: 'Queen Bed'
  },
  {
    id: 'cls2',
    name: 'Classic Room (Annex 2)',
    price: 45000,
    image: '/images/rooms/cls2.jpg',
    branch: 'annex2',
    branchName: 'Annex 2 (Flower Garden GRA)',
    features: ['Classic Comfort', 'Air Conditioning', 'Satellite TV', 'Free Breakfast'],
    maxGuests: 2,
    bedType: 'Double Bed'
  },
  {
    id: 'sta2',
    name: 'Standard Room (Annex 2)',
    price: 35000,
    image: '/images/rooms/sta2.jpg',
    branch: 'annex2',
    branchName: 'Annex 2 (Flower Garden GRA)',
    features: ['Comfortable Bed', 'Private Bathroom', 'Air Conditioning', 'Free Breakfast'],
    maxGuests: 2,
    bedType: 'Double Bed'
  }
];

export const ALL_FACILITIES: RealFacility[] = [
  {
    name: 'Crystal Swimming Pool',
    desc: 'Large outdoor crystal clear swimming pool with children swimming area, comfortable sun loungers, and poolside cocktail service at Annex 2 Flower Garden.',
    image: '/images/facilities/annex2-swimming-pool.jpg',
    branch: 'annex2',
    branchName: 'Annex 2 (Flower Garden GRA)'
  },
  {
    name: 'Continental & Local Restaurant',
    desc: '24-hour restaurant serving authentic Nigerian specialties and Continental cuisine with daily complimentary breakfast for in-house guests.',
    image: '/images/facilities/main-restaurant.jpg',
    branch: 'main',
    branchName: 'Main GRA Flagship'
  },
  {
    name: 'Grand Conference & Events Hall',
    desc: 'Spacious, fully air-conditioned banquet hall equipped with modern audio-visual systems, ideal for conferences, wedding receptions, and corporate summits.',
    image: '/images/facilities/main-events-hall-1.jpg',
    branch: 'main',
    branchName: 'Main GRA Flagship'
  },
  {
    name: 'Rooftop Sky Bar & Lounge',
    desc: 'Chic rooftop bar and relaxation hall offering panoramic views of Ilorin, exotic cocktails, and an intimate setting for evening soirees at Annex 1.',
    image: '/images/facilities/annex1-annex-1-roof-bar-mini-hall.jpg',
    branch: 'annex1',
    branchName: 'Annex 1 (Tanke / Fate)'
  },
  {
    name: 'Poolside Grill & Bar',
    desc: 'Unwind with refreshing drinks, tropical cocktails, and delicious barbecue grill right beside the pool at Annex 2.',
    image: '/images/facilities/annex2-pool-bar.jpg',
    branch: 'annex2',
    branchName: 'Annex 2 (Flower Garden GRA)'
  },
  {
    name: 'Executive Reception & Concierge',
    desc: '24/7 front desk with courteous, professional staff providing seamless check-in, concierge assistance, and guest luggage care.',
    image: '/images/facilities/main-reception.jpg',
    branch: 'main',
    branchName: 'Main GRA Flagship'
  },
  {
    name: 'Guest Laundry & Dry Cleaning',
    desc: 'Professional in-house laundry and dry cleaning services ensuring prompt, pristine garment care throughout your stay.',
    image: '/images/facilities/annex2-laundry-services.jpg',
    branch: 'annex2',
    branchName: 'Annex 2 (Flower Garden GRA)'
  },
  {
    name: 'Annex 2 Events & Banquet Hall',
    desc: 'Modern multi-purpose hall equipped for seminars, corporate meetings, birthday celebrations, and family banquets.',
    image: '/images/facilities/annex2-events-hall.jpg',
    branch: 'annex2',
    branchName: 'Annex 2 (Flower Garden GRA)'
  }
];
