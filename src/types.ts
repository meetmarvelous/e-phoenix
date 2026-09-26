export type BranchId = 'main' | 'annex1' | 'annex2';

export interface RoomRate {
  id: string;
  name: string;
  rate: number;
  discountRate: number | null;
  capacity?: string;
  description?: string;
  image?: string;
  isFacility?: boolean;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface VideoTour {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  roomType: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'rooms' | 'restaurant' | 'facilities';
  imageUrl: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Local Specialties' | 'Continental' | 'Grills & Bites' | 'Beverages & Cocktails';
  price: number;
  description: string;
  isChefSpecial?: boolean;
}

export interface BookingDetails {
  branchId: BranchId;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomTypeId: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface BranchGeoInfo {
  latitude: number;
  longitude: number;
  postalCode: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  geoRegion: string;
  neighborhood: string;
  landmarks: string[];
  distanceToAirport: string;
  googlePlaceQuery: string;
}

export interface BranchSeoInfo {
  title: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  ratingValue: number;
  reviewCount: number;
  priceRange: string;
}

export interface HotelBranch {
  id: BranchId;
  path: string;
  name: string;
  shortName: string;
  badge: string;
  tagline: string;
  experienceDescription: string;
  vibe: string;
  idealFor: string[];
  locationName: string;
  address: string;
  phones: string[];
  phoneFormatted: string;
  email: string;
  whatsapp: string;
  whatsappLink: string;
  image: string;
  welcomeHeading: string;
  welcomeDescription: string;
  leftArchImage: string;
  rightArchImage: string;
  roomRates: RoomRate[];
  amenities: Amenity[];
  videoTours: VideoTour[];
  galleryImages: GalleryImage[];
  menuHighlights: MenuItem[];
  geo: BranchGeoInfo;
  seo: BranchSeoInfo;
}

