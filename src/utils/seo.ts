import { HotelBranch } from '../types';
import { BRANCH_LIST, HOTEL_FAQS } from '../data/hotelData';

/**
 * Updates all standard HTML head metadata, canonical tags, OpenGraph, Twitter cards,
 * and regional GEO tags dynamically based on active hotel branch.
 */
export function updateDocumentSeoAndGeo(branch: HotelBranch): void {
  if (typeof document === 'undefined') return;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ephoenixhotel.ng';
  const canonicalUrl = `${origin}${branch.path === '/' ? '' : branch.path}`;

  // 1. Title
  document.title = branch.seo.title;

  // 2. Helper to set or create meta tag
  const setMeta = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard SEO tags
  setMeta('name', 'description', branch.seo.metaDescription);
  setMeta('name', 'keywords', branch.seo.keywords.join(', '));
  setMeta('name', 'author', 'E-Phoenix Hotel Group');
  setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMeta('name', 'theme-color', '#121212');

  // GEO & Regional Meta Tags (Crucial for Local Search & Geolocation algorithms)
  setMeta('name', 'geo.region', branch.geo.geoRegion);
  setMeta('name', 'geo.placename', `${branch.locationName}, Nigeria`);
  setMeta('name', 'geo.position', `${branch.geo.latitude};${branch.geo.longitude}`);
  setMeta('name', 'ICBM', `${branch.geo.latitude}, ${branch.geo.longitude}`);

  // OpenGraph Tags
  setMeta('property', 'og:title', branch.seo.title);
  setMeta('property', 'og:description', branch.seo.metaDescription);
  setMeta('property', 'og:image', branch.seo.ogImage);
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');
  setMeta('property', 'og:image:alt', `${branch.name} - Luxury Experience`);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:type', 'hotel');
  setMeta('property', 'og:site_name', 'E-Phoenix Hotel Group');
  setMeta('property', 'og:locale', 'en_NG');

  // Twitter / X Card Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', branch.seo.title);
  setMeta('name', 'twitter:description', branch.seo.metaDescription);
  setMeta('name', 'twitter:image', branch.seo.ogImage);
  setMeta('name', 'twitter:site', '@ephoenixhotel_ilorin');
  setMeta('name', 'twitter:creator', '@ephoenixhotel_ilorin');

  // Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // 3. Inject Rich Schema.org JSON-LD
  injectSchemaJsonLd(branch, canonicalUrl);
}

/**
 * Builds and injects structured Schema.org JSON-LD data for Hotel, Organization,
 * BreadcrumbList, and FAQPage.
 */
export function injectSchemaJsonLd(branch: HotelBranch, canonicalUrl: string): void {
  if (typeof document === 'undefined') return;

  const scriptId = 'ephoenix-structured-schema';
  let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Hotel / LodgingBusiness Entity for the branch
      {
        '@type': 'Hotel',
        '@id': `${canonicalUrl}#hotel`,
        name: branch.name,
        alternateName: branch.shortName,
        description: branch.experienceDescription,
        url: canonicalUrl,
        image: [branch.image, branch.leftArchImage, branch.rightArchImage],
        telephone: branch.phones[0],
        email: branch.email,
        priceRange: branch.seo.priceRange,
        starRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: branch.seo.ratingValue.toString(),
          reviewCount: branch.seo.reviewCount.toString(),
          bestRating: '5',
          worstRating: '1',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: branch.geo.streetAddress,
          addressLocality: branch.geo.addressLocality,
          addressRegion: branch.geo.addressRegion,
          postalCode: branch.geo.postalCode,
          addressCountry: branch.geo.addressCountry,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: branch.geo.latitude,
          longitude: branch.geo.longitude,
        },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.geo.googlePlaceQuery)}`,
        checkinTime: '14:00',
        checkoutTime: '12:00',
        petsAllowed: false,
        paymentAccepted: 'Cash, Credit Card, Bank Transfer, POS',
        amenityFeature: branch.amenities.map((amenity) => ({
          '@type': 'LocationFeatureSpecification',
          name: amenity.title,
          value: true,
        })),
        containsPlace: branch.roomRates.map((room) => ({
          '@type': 'HotelRoom',
          name: room.name,
          description: room.description,
          occupancy: {
            '@type': 'QuantitativeValue',
            value: room.capacity?.includes('3') ? 3 : 2,
          },
          offers: {
            '@type': 'Offer',
            price: (room.discountRate || room.rate).toString(),
            priceCurrency: 'NGN',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2027-12-31',
          },
        })),
      },

      // 2. Parent Hotel Group / Organization
      {
        '@type': 'Organization',
        '@id': 'https://ephoenixhotel.ng/#organization',
        name: 'E-Phoenix Hotel Group',
        url: 'https://ephoenixhotel.ng',
        logo: branch.image,
        sameAs: ['https://www.instagram.com/ephoenixhotel_ilorin'],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: branch.phones[0],
          contactType: 'reservations',
          areaServed: 'NG',
          availableLanguage: ['English', 'Yoruba'],
        },
        subOrganization: BRANCH_LIST.map((b) => ({
          '@type': 'Hotel',
          name: b.name,
          url: `https://ephoenixhotel.ng${b.path === '/' ? '' : b.path}`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: b.geo.streetAddress,
            addressLocality: b.geo.addressLocality,
            addressRegion: b.geo.addressRegion,
            addressCountry: 'NG',
          },
        })),
      },

      // 3. BreadcrumbList for Rich Snippets
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://ephoenixhotel.ng',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Ilorin Hotels',
            item: 'https://ephoenixhotel.ng/locations',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: branch.shortName,
            item: canonicalUrl,
          },
        ],
      },

      // 4. FAQPage Rich Snippet (Search Engines display expandable questions in SERPs)
      {
        '@type': 'FAQPage',
        mainEntity: HOTEL_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  scriptEl.textContent = JSON.stringify(structuredData, null, 2);
}
