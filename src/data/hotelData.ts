import { RoomRate, Amenity, VideoTour, GalleryImage, MenuItem, HotelBranch, BranchId } from '../types';

export const HOTEL_BRANCHES: Record<BranchId, HotelBranch> = {
  main: {
    id: "main",
    path: "/",
    name: "E-Phoenix Hotel - Main GRA Flagship",
    shortName: "Main GRA Branch",
    badge: "Flagship Luxury & Grand Events",
    tagline: "Grandeur, Prestige & 5-Star Hospitality in GRA",
    experienceDescription: "The premier flagship destination in Kwara State. Featuring 50 luxury en-suite rooms and suites, 1,000-seat grand event hall, Olympic pool, and diplomatic conferencing.",
    vibe: "Regal, Grand, Luxurious",
    idealFor: ["VIP & Diplomatic Visits", "Weddings & Grand Galas", "Full-scale Luxury Retreat", "State & Corporate Summits"],
    locationName: "GRA Ilorin, Kwara State",
    address: "GRA Ilorin, Kwara State, Nigeria.",
    phones: ["07065023672", "07071721368"],
    phoneFormatted: "07065023672 | 07071721368",
    email: "ephoenixhotel@gmail.com",
    whatsapp: "2347065023672",
    whatsappLink: "https://wa.me/2347065023672?text=Hello%20E-Phoenix%20Hotel%20(Main%20GRA%20Branch),%20I%20would%20like%20to%20make%20an%20inquiry%20or%20reservation.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    welcomeHeading: "E-Phoenix Hotel (Main Branch) is made up of 50 rooms en-suite which includes 2 connecting rooms and 7 luxury suites and a full range of other rooms.",
    welcomeDescription: "Experience unparalleled grandeur at our primary flagship property in GRA Ilorin. Designed for both high-profile state functions and discerning personal retreats.",
    leftArchImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    rightArchImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    geo: {
      latitude: 8.4799,
      longitude: 4.5418,
      postalCode: "240242",
      streetAddress: "GRA Ilorin, Kwara State, Nigeria.",
      addressLocality: "Ilorin",
      addressRegion: "Kwara State",
      addressCountry: "NG",
      geoRegion: "NG-KW",
      neighborhood: "GRA (Government Reserved Area)",
      landmarks: [
        "Kwara State Government House",
        "Metropolitan Square Ilorin",
        "Ilorin Golf Club",
        "Kwara State Stadium Complex",
        "Ilorin International Airport (ILR)"
      ],
      distanceToAirport: "15 minutes (9.8 km) via Airport Road",
      googlePlaceQuery: "E-Phoenix Hotel GRA Ilorin Kwara State"
    },
    seo: {
      title: "E-Phoenix Hotel | 5-Star Luxury & Grand Events - GRA Ilorin, Kwara State",
      metaDescription: "Experience 5-star luxury at E-Phoenix Hotel Main GRA Ilorin. 50 en-suite luxury suites, 1,000-seat banquet hall, Olympic pool, and 10% direct discount.",
      keywords: [
        "E-Phoenix Hotel Ilorin",
        "luxury hotel GRA Ilorin",
        "hotel in Kwara State",
        "event hall Ilorin",
        "conference center Ilorin",
        "presidential suite Ilorin",
        "hotels near Kwara Government House",
        "best hotels in Ilorin Nigeria"
      ],
      ogImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      ratingValue: 5.0,
      reviewCount: 142,
      priceRange: "₦90,100 - ₦350,000"
    },
    roomRates: [
      {
        id: "phoenix-classic",
        name: "Phoenix Classic",
        rate: 106000,
        discountRate: 90100,
        capacity: "2 Guests",
        description: "Elegant en-suite room appointed with plush bedding, marble bath, work desk, and ambient lighting.",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "phoenix-deluxe",
        name: "Phoenix Deluxe",
        rate: 112000,
        discountRate: 95200,
        capacity: "2 Guests",
        description: "Spacious layout with contemporary furnishings, high-speed Wi-Fi, 55-inch smart TV, and premium bath amenities.",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "phoenix-executive",
        name: "Phoenix Executive",
        rate: 118000,
        discountRate: 100300,
        capacity: "2 Guests",
        description: "Designed for business leaders and discerning travelers featuring ergonomic workspace and skyline views.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "phoenix-executive-suite",
        name: "Phoenix Executive Suite",
        rate: 147500,
        discountRate: 125375,
        capacity: "2 - 3 Guests",
        description: "Expansive suite featuring separate lounge parlor, minibar, guest washroom, and complimentary 2-guest breakfast.",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "phoenix-balcony-suite",
        name: "Phoenix Balcony Suite",
        rate: 165000,
        discountRate: 140250,
        capacity: "2 - 3 Guests",
        description: "Private panoramic balcony overlooking landscaped courtyard and pool, deep soaking tub, and luxury service.",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "presidential-suite",
        name: "Presidential Suite",
        rate: 350000,
        discountRate: null,
        capacity: "Up to 4 Guests",
        description: "The pinnacle of luxury in Kwara State. Butler service, private dining salon, jacuzzi bath, and master bedroom.",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "conference-room",
        name: "Conference Room",
        rate: 300000,
        discountRate: null,
        capacity: "50 - 120 Guests",
        description: "State-of-the-art multimedia conference venue with projector, high-fidelity audio system, and climate control.",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80",
        isFacility: true
      },
      {
        id: "pool-area",
        name: "Pool Area (Space)",
        rate: 150000,
        discountRate: null,
        capacity: "Open Air Event",
        description: "Exquisite poolside terrace venue ideal for private cocktail mixers, birthday soirées, and romantic evenings.",
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80",
        isFacility: true
      },
      {
        id: "meeting-room",
        name: "Meeting Room",
        rate: 100000,
        discountRate: null,
        capacity: "12 - 20 Guests",
        description: "Executive boardroom with conference telephone, video conferencing monitor, and executive leather seating.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
        isFacility: true
      },
      {
        id: "event-hall",
        name: "Event Hall",
        rate: 1000000,
        discountRate: null,
        capacity: "350+ Guests",
        description: "Grand banquet hall for lavish weddings, corporate AGMs, and gala banquets with dedicated stage and dressing rooms.",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80",
        isFacility: true
      }
    ],
    amenities: [
      {
        id: "restaurant",
        title: "Fine Dining Restaurant",
        description: "Enjoy fine dining with a gourmet selection of local Kwara delicacies and international dishes.",
        iconName: "Utensils"
      },
      {
        id: "pool",
        title: "Olympic Swimming Pool",
        description: "Relax and unwind at our serene and spacious Olympic swimming pool with poolside cabanas.",
        iconName: "Waves"
      },
      {
        id: "facilities",
        title: "5-Star Quality Facilities",
        description: "Experience top-notch amenities designed for maximum comfort, prestige, and pleasure.",
        iconName: "Building2"
      },
      {
        id: "spa",
        title: "Spa & Thermal Massage",
        description: "Rejuvenate with therapeutic treatments in our luxurious wellness spa sanctuary.",
        iconName: "Sparkles"
      },
      {
        id: "meeting",
        title: "Executive Meeting Rooms",
        description: "Host productive corporate summits in our fully equipped multimedia conference suites.",
        iconName: "Users"
      },
      {
        id: "laundry",
        title: "Express Laundry & Valet",
        description: "Effortless cleaning and pressing services for all your business and formal wear.",
        iconName: "Shirt"
      }
    ],
    videoTours: [
      {
        id: "v-classic",
        title: "PHOENIX CLASSIC",
        duration: "0:32",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hotel-room-with-a-double-bed-and-night-stands-42416-large.mp4",
        thumbnail: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        roomType: "Phoenix Classic"
      },
      {
        id: "v-deluxe",
        title: "PHOENIX DELUXE",
        duration: "0:32",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hotel-room-with-a-king-size-bed-and-curtains-42417-large.mp4",
        thumbnail: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        roomType: "Phoenix Deluxe"
      },
      {
        id: "v-executive",
        title: "PHOENIX EXECUTIVE",
        duration: "0:31",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-view-of-a-hotel-room-with-a-large-bed-and-flat-screen-tv-42418-large.mp4",
        thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        roomType: "Phoenix Executive"
      },
      {
        id: "v-exec-suite",
        title: "PHOENIX EXECUTIVE SUITE",
        duration: "0:17",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-luxury-suite-in-a-hotel-with-an-ocean-view-42421-large.mp4",
        thumbnail: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
        roomType: "Phoenix Executive Suite"
      },
      {
        id: "v-balcony-suite",
        title: "PHOENIX BALCONY SUITE",
        duration: "0:31",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-hotel-room-interior-42419-large.mp4",
        thumbnail: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        roomType: "Phoenix Balcony Suite"
      }
    ],
    galleryImages: [
      {
        id: "g1",
        title: "Phoenix Master Bedroom Suite",
        category: "rooms",
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g2",
        title: "Grand Reception & Concierge",
        category: "facilities",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g3",
        title: "Private Dining Salon",
        category: "restaurant",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g4",
        title: "Courtyard Cafe & Bistro",
        category: "restaurant",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g5",
        title: "Seafood Platter & White Wine",
        category: "restaurant",
        imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g6",
        title: "Signature Nigerian Delicacy Bowl",
        category: "restaurant",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g7",
        title: "Velvet Amber Bar & Lounge",
        category: "restaurant",
        imageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g8",
        title: "Synergy Business Center",
        category: "facilities",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g9",
        title: "E-Phoenix Illuminated Night Exterior",
        category: "facilities",
        imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g10",
        title: "Gourmet Banquet Soirée",
        category: "restaurant",
        imageUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g11",
        title: "Illuminated Pool & Night Oasis",
        category: "facilities",
        imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g12",
        title: "Panoramic Skyline Lounge",
        category: "facilities",
        imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g13",
        title: "Garden Terrace Evening Dining",
        category: "restaurant",
        imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g14",
        title: "Atrium Lobby & Sunlit Galleria",
        category: "facilities",
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g15",
        title: "Balcony Suite Living Room",
        category: "rooms",
        imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80"
      }
    ],
    menuHighlights: [
      {
        id: "m1",
        name: "Kwara Pounded Yam with Rich Egusi & Assorted Goat Meat",
        category: "Local Specialties",
        price: 9500,
        description: "Fluffy pounded yam served with rich melon seed soup, dried catfish, stockfish, and tender goat meat cuts.",
        isChefSpecial: true
      },
      {
        id: "m2",
        name: "E-Phoenix Signature Seafood Jollof Supreme",
        category: "Local Specialties",
        price: 12000,
        description: "Smoky firewood-style long grain party jollof rice crowned with king prawns, calamari, and sweet plantains.",
        isChefSpecial: true
      },
      {
        id: "m3",
        name: "Spicy Goat Meat Asun in Scotch Bonnet Reduction",
        category: "Local Specialties",
        price: 7500,
        description: "Flame-roasted diced chevon spiced with caramelized onions and aromatic Kwara red peppers."
      },
      {
        id: "m4",
        name: "Fresh Catfish Pepper Soup with Scent Leaves",
        category: "Local Specialties",
        price: 8500,
        description: "Live-caught catfish simmered in a nourishing broth of native herbs, calabash nutmeg, and Uda pods."
      },
      {
        id: "m5",
        name: "Grilled Prime Ribeye Steak with Herb Butter",
        category: "Continental",
        price: 18500,
        description: "300g seasoned beef ribeye, charred asparagus, truffle potato puree, and red wine demi-glace.",
        isChefSpecial: true
      },
      {
        id: "m6",
        name: "Pan-Seared Atlantic Salmon Fillet",
        category: "Continental",
        price: 17000,
        description: "Crispy skin salmon with lemon-caper beurre blanc, saffron rice, and glazed baby carrots."
      },
      {
        id: "m7",
        name: "Creamy Chicken Alfredo Penne",
        category: "Continental",
        price: 11000,
        description: "Tender grilled chicken strips in rich Parmesan garlic cream sauce with fresh basil."
      },
      {
        id: "m8",
        name: "Phoenix BBQ Chicken Wings & Yam Fries",
        category: "Grills & Bites",
        price: 6500,
        description: "Glazed in our house honey-chili sauce, served with crispy fried white yam batons and pepper dip."
      },
      {
        id: "m9",
        name: "Gourmet Suya Platter",
        category: "Grills & Bites",
        price: 8000,
        description: "Thinly sliced tender sirloin dusted with authentic yaji spice, shaved red onions, and fresh lime."
      },
      {
        id: "m10",
        name: "E-Phoenix Sunset Cocktail",
        category: "Beverages & Cocktails",
        price: 4500,
        description: "Gold rum, passion fruit puree, hibiscus syrup (Zobo infusion), and sparkling lime.",
        isChefSpecial: true
      },
      {
        id: "m11",
        name: "Fresh Chapman with Angostura Bitters",
        category: "Beverages & Cocktails",
        price: 3500,
        description: "The classic Nigerian thirst-quencher with sliced cucumber, orange wedges, and aromatic bitters."
      },
      {
        id: "m12",
        name: "Fresh Pressed Ilorin Sweet Orange Juice",
        category: "Beverages & Cocktails",
        price: 2500,
        description: "100% natural cold pressed local citrus with crushed mint."
      }
    ]
  },

  annex1: {
    id: "annex1",
    path: "/annex1",
    name: "E-Phoenix Hotel - Annex 1 (Executive Boutique)",
    shortName: "Annex 1 - Executive",
    badge: "Executive Suites & Business Tech",
    tagline: "Privacy, Seamless Tech & Quiet Productivity",
    experienceDescription: "Tailored for business executives, consultants, and discerning professionals seeking an ultra-quiet sanctuary. Features soundproof smart rooms, fiber-optic workstations, private boardroom lounge, intimate rooftop plunge pool, and bespoke executive concierge.",
    vibe: "Modern Minimalist, Productive, Ultra-Quiet",
    idealFor: ["Corporate Executives & Founders", "Quiet Remote Work", "Private Board Meetings", "Extended Business Stays"],
    locationName: "Fate / Prime GRA Annex, Ilorin, Kwara State",
    address: "Fate / Prime GRA Annex, Ilorin, Kwara State, Nigeria.",
    phones: ["07065023672", "07071721368"],
    phoneFormatted: "07065023672 | 07071721368",
    email: "ephoenixhotel@gmail.com",
    whatsapp: "2347065023672",
    whatsappLink: "https://wa.me/2347065023672?text=Hello%20E-Phoenix%20Hotel%20(Annex%201%20Executive),%20I%20would%20like%20to%20make%20an%20inquiry%20or%20reservation.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    welcomeHeading: "E-Phoenix Hotel Annex 1 features 32 bespoke boutique suites engineered for high-focus executives, consultants, and quiet discerning stays.",
    welcomeDescription: "Nestled in prime Ilorin away from heavy banquet traffic, Annex 1 delivers distraction-free comfort, high-speed fiber connectivity, private boardrooms, and 24/7 personal business concierge.",
    leftArchImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    rightArchImage: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    geo: {
      latitude: 8.4872,
      longitude: 4.5583,
      postalCode: "240242",
      streetAddress: "Fate / Prime GRA Annex, Ilorin, Kwara State, Nigeria.",
      addressLocality: "Ilorin",
      addressRegion: "Kwara State",
      addressCountry: "NG",
      geoRegion: "NG-KW",
      neighborhood: "Fate / GRA Annex",
      landmarks: [
        "Fate Roundabout Ilorin",
        "Kwara Mall (Shoprite Ilorin)",
        "University of Ilorin Road",
        "Ilorin Innovation Hub",
        "Kwara State Library"
      ],
      distanceToAirport: "18 minutes (11.2 km) via Fate Road",
      googlePlaceQuery: "E-Phoenix Hotel Annex 1 Fate Ilorin"
    },
    seo: {
      title: "E-Phoenix Hotel Annex 1 | Executive Boutique Suites & Tech Hub - Ilorin",
      metaDescription: "Book executive boutique suites at E-Phoenix Hotel Annex 1 in Fate Ilorin. Soundproof smart rooms, fiber Wi-Fi 6, private boardroom, rooftop pool, and 10% direct discount.",
      keywords: [
        "E-Phoenix Hotel Annex 1",
        "executive hotel Ilorin",
        "boutique hotel Fate Ilorin",
        "business hotel Kwara State",
        "smart hotel rooms Ilorin",
        "co-working hotel Ilorin",
        "boardroom rental Ilorin",
        "Fate GRA hotel Ilorin"
      ],
      ogImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      ratingValue: 4.9,
      reviewCount: 89,
      priceRange: "₦80,750 - ₦185,000"
    },
    roomRates: [
      {
        id: "annex-smart-studio",
        name: "Annex Smart Studio",
        rate: 95000,
        discountRate: 80750,
        capacity: "1 - 2 Guests",
        description: "Acoustically insulated room with motorized ergonomic work station, fiber Wi-Fi 6, rainfall shower, and smart controls.",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "annex-business-suite",
        name: "Executive Business Suite",
        rate: 125000,
        discountRate: 106250,
        capacity: "2 Guests",
        description: "Spacious boutique suite with integrated living area, 4K video conferencing display, Nespresso station, and city balcony.",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "annex-ambassador-suite",
        name: "Tech Ambassador Suite",
        rate: 155000,
        discountRate: 131750,
        capacity: "2 - 3 Guests",
        description: "Premium business suite with private meeting alcove, deep soaking bathtub, biometric safe, and complimentary laundry service.",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "annex-penthouse-studio",
        name: "Penthouse Studio Suite",
        rate: 185000,
        discountRate: 157250,
        capacity: "Up to 3 Guests",
        description: "Top-floor sanctuary with panoramic glass walls, private terrace, designer pantry, and dedicated private butler.",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "annex-smart-boardroom",
        name: "Smart Boardroom (15 Pax)",
        rate: 90000,
        discountRate: null,
        capacity: "Up to 15 Guests",
        description: "Intimate executive conference room with 75-inch touchscreen monitor, wireless presentation dock, and video-call audio bar.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
        isFacility: true
      },
      {
        id: "annex-work-pods",
        name: "Private Executive Work Pod",
        rate: 35000,
        discountRate: null,
        capacity: "1 - 3 Persons",
        description: "Soundproof private micro-office with dedicated fiber line, espresso machine, and unlimited printing access.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
        isFacility: true
      }
    ],
    amenities: [
      {
        id: "fiber",
        title: "Dedicated Fiber-Optic Wi-Fi",
        description: "Ultra-fast synchronous 200Mbps connectivity guaranteed throughout all rooms and suites.",
        iconName: "Wifi"
      },
      {
        id: "boardroom",
        title: "Smart Executive Boardrooms",
        description: "Equipped with 4K teleconferencing and high-fidelity noise cancelling audio.",
        iconName: "Users"
      },
      {
        id: "rooftop-pool",
        title: "Rooftop Plunge Pool",
        description: "Intimate and private sun terrace pool exclusively for Annex 1 resident guests.",
        iconName: "Waves"
      },
      {
        id: "espresso",
        title: "24/7 Barista & Executive Lounge",
        description: "Freshly brewed artisan coffee, pastries, light meals, and quiet work spaces anytime.",
        iconName: "Coffee"
      },
      {
        id: "concierge",
        title: "Business Valet & Airport Shuttle",
        description: "Seamless Ilorin Airport pick-up and drop-off in our luxury executive sedans.",
        iconName: "Building2"
      },
      {
        id: "laundry",
        title: "Express Pressing & Laundry",
        description: "Same-day 2-hour dry cleaning turnaround for important board meetings and presentations.",
        iconName: "Shirt"
      }
    ],
    videoTours: [
      {
        id: "v-annex-smart",
        title: "ANNEX SMART STUDIO",
        duration: "0:25",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hotel-room-with-a-double-bed-and-night-stands-42416-large.mp4",
        thumbnail: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        roomType: "Annex Smart Studio"
      },
      {
        id: "v-annex-business",
        title: "EXECUTIVE BUSINESS SUITE",
        duration: "0:28",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hotel-room-with-a-king-size-bed-and-curtains-42417-large.mp4",
        thumbnail: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        roomType: "Executive Business Suite"
      },
      {
        id: "v-annex-ambassador",
        title: "TECH AMBASSADOR SUITE",
        duration: "0:30",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-hotel-room-interior-42419-large.mp4",
        thumbnail: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
        roomType: "Tech Ambassador Suite"
      }
    ],
    galleryImages: [
      {
        id: "g-a1-1",
        title: "Annex 1 Minimalist Master Bedroom",
        category: "rooms",
        imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g-a1-2",
        title: "Smart Executive Boardroom",
        category: "facilities",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g-a1-3",
        title: "Artisan Espresso Lounge",
        category: "restaurant",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g-a1-4",
        title: "Intimate Rooftop Terrace & Plunge Pool",
        category: "facilities",
        imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g-a1-5",
        title: "Soundproof Executive Work Pod",
        category: "facilities",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g-a1-6",
        title: "Ambassador Suite Lounge Area",
        category: "rooms",
        imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80"
      }
    ],
    menuHighlights: [
      {
        id: "m-a1-1",
        name: "Chef's Power Breakfast Bowl & Cold Brew",
        category: "Continental",
        price: 7500,
        description: "Poached free-range eggs, avocado mash, organic greens, sourdough toast, and 18-hour cold brew.",
        isChefSpecial: true
      },
      {
        id: "m-a1-2",
        name: "Executive Pan-Roasted Herb Chicken Breast",
        category: "Continental",
        price: 11500,
        description: "Rosemary roasted chicken served with wild saffron quinoa and lemon-thyme jus.",
        isChefSpecial: true
      },
      {
        id: "m-a1-3",
        name: "Ilorin Gourmet Beef Suya Sliders",
        category: "Grills & Bites",
        price: 6500,
        description: "Mini brioche buns filled with tender spiced beef steak, caramelized red onions, and sweet chili glaze."
      },
      {
        id: "m-a1-4",
        name: "Cold Pressed Green Detox Juice",
        category: "Beverages & Cocktails",
        price: 3000,
        description: "Fresh cucumber, green apple, ginger, and wild Kwara mint."
      }
    ]
  },

  annex2: {
    id: "annex2",
    path: "/annex2",
    name: "E-Phoenix Hotel - Annex 2 (Garden & Leisure Resort)",
    shortName: "Annex 2 - Garden Resort",
    badge: "Nature, Poolside Grill & Family Retreat",
    tagline: "Serenity, Greenery & Leisure Living",
    experienceDescription: "A verdant tropical sanctuary with open-air courtyard gardens, poolside barbecue lounge, lagoon-style leisure pool, weekend live acoustic vibes, and family connecting chalets. Ideal for weekend staycations, anniversaries, and family vacations.",
    vibe: "Tropical, Rejuvenating, Warm",
    idealFor: ["Weekend Escapes & Staycations", "Family Vacations", "Poolside Grill & Soirées", "Romantic Getaways"],
    locationName: "Golf Course Rd / GRA Extension, Ilorin, Kwara State",
    address: "Golf Course Rd / GRA Extension, Ilorin, Kwara State, Nigeria.",
    phones: ["07065023672", "07071721368"],
    phoneFormatted: "07065023672 | 07071721368",
    email: "ephoenixhotel@gmail.com",
    whatsapp: "2347065023672",
    whatsappLink: "https://wa.me/2347065023672?text=Hello%20E-Phoenix%20Hotel%20(Annex%202%20Garden%20Resort),%20I%20would%20like%20to%20make%20an%20inquiry%20or%20reservation.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80",
    welcomeHeading: "E-Phoenix Hotel Annex 2 is an oasis of calm with 38 garden rooms, chalets, and family villas surrounded by lush tropical greenery.",
    welcomeDescription: "Escape the city tempo into a landscape of swaying palm trees, open-air charcoal grills, soothing acoustic music, and sun-drenched lagoon pools crafted for genuine relaxation.",
    leftArchImage: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
    rightArchImage: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    geo: {
      latitude: 8.4685,
      longitude: 4.5321,
      postalCode: "240242",
      streetAddress: "Golf Course Rd / GRA Extension, Ilorin, Kwara State, Nigeria.",
      addressLocality: "Ilorin",
      addressRegion: "Kwara State",
      addressCountry: "NG",
      geoRegion: "NG-KW",
      neighborhood: "Golf Course Rd / GRA Extension",
      landmarks: [
        "Ilorin Golf Club",
        "Kwara State Banquet Hall",
        "Sobi Specialist Hospital",
        "Asa Dam Lake",
        "Ilorin Polo Club"
      ],
      distanceToAirport: "12 minutes (7.5 km) via Golf Course Rd",
      googlePlaceQuery: "E-Phoenix Hotel Annex 2 Golf Course Road Ilorin"
    },
    seo: {
      title: "E-Phoenix Hotel Annex 2 | Garden & Leisure Resort - Ilorin",
      metaDescription: "Escape to E-Phoenix Hotel Annex 2 Garden Resort in Ilorin. Lush courtyard gardens, poolside barbecue lounge, lagoon pool, family chalets, and 10% direct discount.",
      keywords: [
        "E-Phoenix Hotel Annex 2",
        "garden resort Ilorin",
        "leisure hotel Kwara State",
        "hotel with pool Ilorin",
        "family vacation hotel Ilorin",
        "outdoor event garden Ilorin",
        "poolside grill Ilorin",
        "weekend getaway Kwara"
      ],
      ogImage: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
      ratingValue: 4.9,
      reviewCount: 97,
      priceRange: "₦83,300 - ₦220,000"
    },
    roomRates: [
      {
        id: "garden-deluxe",
        name: "Garden Deluxe Room",
        rate: 98000,
        discountRate: 83300,
        capacity: "2 Guests",
        description: "Charming ground-floor room opening directly onto our manicured flower gardens, with private patio and teak chairs.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "poolside-terrace",
        name: "Poolside Terrace Room",
        rate: 120000,
        discountRate: 102000,
        capacity: "2 Guests",
        description: "Direct step-out access to the lagoon pool deck, canopy bed, sun lounger privileges, and evening poolside cocktail.",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "garden-chalet-suite",
        name: "Garden Chalet Suite",
        rate: 145000,
        discountRate: 123250,
        capacity: "2 - 3 Guests",
        description: "Independent luxury garden bungalow with cathedral wooden ceilings, private hammock porch, and freestanding clawfoot tub.",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "royal-family-villa",
        name: "Royal Family Villa Suite",
        rate: 220000,
        discountRate: 187000,
        capacity: "Up to 5 Guests",
        description: "Two interconnecting ensuite bedrooms with expansive living lounge, dining deck, private barbecue patio, and children's games nook.",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "poolside-bbq-pavilion",
        name: "Poolside BBQ Pavilion",
        rate: 120000,
        discountRate: null,
        capacity: "30 - 60 Guests",
        description: "Covered open-air thatch cabana with integrated charcoal grill stations, festive lighting, and dedicated grill master.",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80",
        isFacility: true
      },
      {
        id: "tropical-lawn-events",
        name: "Tropical Lawn Event Space",
        rate: 450000,
        discountRate: null,
        capacity: "200+ Guests",
        description: "Picturesque garden lawn ideal for romantic outdoor wedding receptions, anniversary banquets, and evening celebrations.",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80",
        isFacility: true
      }
    ],
    amenities: [
      {
        id: "lagoon-pool",
        title: "Lagoon Leisure Swimming Pool",
        description: "Gentle shallow beach entry, water fountain, and surrounding shaded sun loungers.",
        iconName: "Waves"
      },
      {
        id: "bbq-grill",
        title: "Open-Air Grill & Smoker",
        description: "Evening live grills with barbecue chicken, roasted fish, seasoned asun, and chilled palm wine.",
        iconName: "Utensils"
      },
      {
        id: "herbal-spa",
        title: "Herbal Wellness Spa & Sauna",
        description: "Natural organic botanical oils, hot stone massages, and outdoor cedar soaking tubs.",
        iconName: "Sparkles"
      },
      {
        id: "family",
        title: "Family Connecting Suites",
        description: "Spacious adjoining accommodations with child-safe amenities and garden play areas.",
        iconName: "Users"
      },
      {
        id: "acoustic",
        title: "Live Acoustic Weekend Sessions",
        description: "Relaxed unplugged live music on Friday and Saturday evenings under the stars.",
        iconName: "Building2"
      },
      {
        id: "laundry",
        title: "Resort Laundry & Garment Care",
        description: "Fast wash, fold, and pressing so your family vacation remains completely hassle-free.",
        iconName: "Shirt"
      }
    ],
    videoTours: [
      {
        id: "v-annex2-garden",
        title: "GARDEN DELUXE ROOM",
        duration: "0:30",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hotel-room-with-a-double-bed-and-night-stands-42416-large.mp4",
        thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        roomType: "Garden Deluxe Room"
      },
      {
        id: "v-annex2-chalet",
        title: "GARDEN CHALET SUITE",
        duration: "0:33",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hotel-room-with-a-king-size-bed-and-curtains-42417-large.mp4",
        thumbnail: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        roomType: "Garden Chalet Suite"
      },
      {
        id: "v-annex2-villa",
        title: "ROYAL FAMILY VILLA",
        duration: "0:35",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-luxury-suite-in-a-hotel-with-an-ocean-view-42421-large.mp4",
        thumbnail: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
        roomType: "Royal Family Villa Suite"
      }
    ],
    galleryImages: [
      {
        id: "g-a2-1",
        title: "Tropical Lagoon Pool at Twilight",
        category: "facilities",
        imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g-a2-2",
        title: "Garden Chalet Sunlit Bedroom",
        category: "rooms",
        imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g-a2-3",
        title: "Open-Air Grill & Garden Dining",
        category: "restaurant",
        imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g-a2-4",
        title: "Manicured Lawn & Coconut Palms",
        category: "facilities",
        imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g-a2-5",
        title: "Poolside Cocktails & Cabanas",
        category: "restaurant",
        imageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: "g-a2-6",
        title: "Royal Family Villa Living Area",
        category: "rooms",
        imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80"
      }
    ],
    menuHighlights: [
      {
        id: "m-a2-1",
        name: "Charcoal Grilled Whole Croaker Fish with Fried Plantain",
        category: "Grills & Bites",
        price: 13500,
        description: "Freshly marinated whole croaker fish flame-grilled over natural charcoal, served with roasted sweet plantains, spicy yaji dip, and coleslaw.",
        isChefSpecial: true
      },
      {
        id: "m-a2-2",
        name: "Garden Smoked BBQ Pork Ribs & Sweet Yam Fries",
        category: "Grills & Bites",
        price: 14000,
        description: "Slow-smoked for 6 hours in our garden smoker, glazed in sticky barbecue marinade.",
        isChefSpecial: true
      },
      {
        id: "m-a2-3",
        name: "Village Pot Goat Meat Asun Bowl",
        category: "Local Specialties",
        price: 8500,
        description: "Tender roasted chevon tossed with green peppers and aromatic local spices."
      },
      {
        id: "m-a2-4",
        name: "Tropical Coconut Mojito with Wild Lime",
        category: "Beverages & Cocktails",
        price: 4500,
        description: "Fresh coconut cream, white rum, crushed mint leaves, lime juice, and soda water.",
        isChefSpecial: true
      }
    ]
  }
};

export const BRANCH_LIST: HotelBranch[] = [
  HOTEL_BRANCHES.main,
  HOTEL_BRANCHES.annex1,
  HOTEL_BRANCHES.annex2,
];

export const DEFAULT_BRANCH_ID: BranchId = 'main';

export function getBranchById(id: BranchId): HotelBranch {
  return HOTEL_BRANCHES[id] || HOTEL_BRANCHES.main;
}

export function getBranchByPath(pathname: string): HotelBranch {
  const cleanPath = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  if (cleanPath === '/annex1') return HOTEL_BRANCHES.annex1;
  if (cleanPath === '/annex2') return HOTEL_BRANCHES.annex2;
  return HOTEL_BRANCHES.main;
}

// Global General Hotel FAQs for rich schema and guest guidance
export const HOTEL_FAQS = [
  {
    question: "How do I get the 10% direct booking discount at E-Phoenix Hotel?",
    answer: "Every direct reservation made through our official website or direct WhatsApp line receives an instant 10% discount off standard rates, along with complimentary single breakfast and high-speed Wi-Fi."
  },
  {
    question: "What are the check-in and check-out times at E-Phoenix Hotel?",
    answer: "Check-in time is from 14:00 (2:00 PM) and check-out time is until 12:00 noon. Late check-out can be arranged with the front desk based on availability."
  },
  {
    question: "Where are the 3 E-Phoenix Hotel branches located in Ilorin?",
    answer: "E-Phoenix Hotel operates three premier locations in Ilorin, Kwara State: Main Flagship Branch in GRA Ilorin (with 50 rooms, 7 suites, and a 1,000-seat event hall); Annex 1 in Fate / Prime GRA Annex (exclusive business suites & tech co-working); and Annex 2 on Golf Course Road (lush garden resort with lagoon pool and outdoor grills)."
  },
  {
    question: "Is airport pickup available from Ilorin International Airport (ILR)?",
    answer: "Yes, all E-Phoenix Hotel branches provide executive airport chauffeur pick-up and drop-off to and from Ilorin International Airport (approximately 12 to 18 minutes drive). Please specify airport transfer during booking."
  },
  {
    question: "Does E-Phoenix Hotel host large weddings and international conferences?",
    answer: "Yes! Our Main Flagship GRA branch features a 1,000-capacity Grand Event Hall, multimedia conference suites, banquet catering, high-level diplomatic security, and ample parking."
  }
];

// Backwards-compatible exports for default main branch
export const HOTEL_CONTACT = {
  name: HOTEL_BRANCHES.main.name,
  tagline: HOTEL_BRANCHES.main.tagline,
  location: HOTEL_BRANCHES.main.locationName,
  address: HOTEL_BRANCHES.main.address,
  phones: HOTEL_BRANCHES.main.phones,
  phoneFormatted: HOTEL_BRANCHES.main.phoneFormatted,
  email: HOTEL_BRANCHES.main.email,
  instagram: "@ephoenixhotel_ilorin",
  whatsapp: HOTEL_BRANCHES.main.whatsapp,
  whatsappLink: HOTEL_BRANCHES.main.whatsappLink,
  checkInTime: "14:00pm",
  checkOutTime: "12:00noon",
};

export const ROOM_RATES = HOTEL_BRANCHES.main.roomRates;
export const AMENITIES = HOTEL_BRANCHES.main.amenities;
export const VIDEO_TOURS = HOTEL_BRANCHES.main.videoTours;
export const GALLERY_IMAGES = HOTEL_BRANCHES.main.galleryImages;
export const MENU_ITEMS = HOTEL_BRANCHES.main.menuHighlights;
