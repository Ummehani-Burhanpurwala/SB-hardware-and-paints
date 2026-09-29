import websiteData from './websiteData.json';

export interface BrandInfo {
  id: string;
  name: string;
  tagline: string;
  logoText: string;
  badgeBg: string;
  badgeText: string;
  accentHex: string;
  description: string;
  brandImage?: string;
  officialResourceUrl?: string;
  pdfNote?: string;
  shadeCount?: string;
  shadeCategories: {
    categoryName: string;
    shades: {
      name: string;
      code: string;
      hex: string;
      sheen: string;
      description: string;
    }[];
  }[];
}

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: 'interior' | 'exterior' | 'distemper' | 'primer' | 'putty' | 'enamels' | 'waterproofing' | 'tools';
  categoryLabel: string;
  image: string;
  colorTheme: {
    softBg: string;
    accentHex: string;
    border: string;
  };
  description: string;
  finish: string;
  packSizes: string[];
  coverage: string;
  idealFor: string;
  dryingTime: string;
  features: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  category: 'living' | 'exterior' | 'bedroom' | 'dining' | 'commercial';
  shades: string;
  image: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ColorShade {
  name: string;
  code: string;
  hex: string;
  family: 'warm' | 'cool' | 'green' | 'pastel' | 'regal';
  familyName: string;
  sheen: string;
  description: string;
}

// Master JSON website data export
export const WEBSITE_DATA = websiteData;

export const DEFAULT_WHATSAPP_MESSAGE = websiteData.storeDetails.whatsappDefaultMessage;

export const getStoreWhatsappUrl = (customNote?: string) => {
  const base = DEFAULT_WHATSAPP_MESSAGE;
  const message = customNote ? `${base}\n\nNote: ${customNote}` : base;
  return `https://wa.me/919890722385?text=${encodeURIComponent(message)}`;
};

export const STORE_DETAILS = {
  name: websiteData.storeDetails.name,
  owner: websiteData.storeDetails.owner,
  phone: websiteData.storeDetails.phone,
  phoneRaw: websiteData.storeDetails.phoneRaw,
  email: websiteData.storeDetails.email,
  address: websiteData.storeDetails.address,
  hours: websiteData.storeDetails.hours,
  whatsappUrl: websiteData.storeDetails.whatsappUrl,
  directionsUrl: websiteData.storeDetails.directionsUrl,
  instagram: websiteData.storeDetails.instagram,
  storefrontImage: websiteData.storeDetails.storefrontImage,
  heroImage: websiteData.storeDetails.heroImage,
  establishedYear: websiteData.storeDetails.establishedYear,
  experience: websiteData.storeDetails.experience,
};

// Vibrant & Designer Paint Colors Palette directly from websiteData.json
export const DESIGNER_SHADES: ColorShade[] = websiteData.colorShades as ColorShade[];

// Official Brand Shade Cards with shade categories for interactive modal exploration
export const BRANDS_DATA: BrandInfo[] = [
  {
    ...websiteData.brands[0],
    shadeCategories: [
      {
        categoryName: 'Living & Warm Accents',
        shades: [
          { name: 'Warm Terracotta', code: 'IND-2104', hex: '#C25E43', sheen: 'Soft Sheen', description: 'Deep, earthy terracotta accent tone for focal walls' },
          { name: 'Golden Marigold', code: 'IND-3209', hex: '#F59E0B', sheen: 'Rich Silk', description: 'Vibrant celebratory ochre for welcoming hallways' },
          { name: 'Almond Beige', code: 'IND-1045', hex: '#F3E5D8', sheen: 'Velvet Matt', description: 'Gentle, neutral backdrop for airy living rooms' },
          { name: 'Desert Sandstone', code: 'IND-1188', hex: '#E6D3B3', sheen: 'Matt', description: 'Refined neutral that pairs with natural woodwork' },
          { name: 'Spiced Saffron', code: 'IND-2401', hex: '#EA580C', sheen: 'High Sheen', description: 'Dynamic festive accent for feature walls' },
        ],
      },
      {
        categoryName: 'Serene Blues & Lush Greens',
        shades: [
          { name: 'Royal Indigo Blue', code: 'IND-5012', hex: '#1E3A8A', sheen: 'Rich Silk', description: 'Signature deep Indigo blue with regal character' },
          { name: 'Sky Breeze Blue', code: 'IND-4820', hex: '#93C5FD', sheen: 'Matt', description: 'Cool airy sky hue ideal for master bedrooms' },
          { name: 'Eucalyptus Mist', code: 'IND-6204', hex: '#A7F3D0', sheen: 'Eggshell', description: 'Peaceful soothing green with organic balance' },
          { name: 'Forest Jade', code: 'IND-6901', hex: '#065F46', sheen: 'Soft Sheen', description: 'Luxurious botanical tone for study and prayer rooms' },
        ],
      },
      {
        categoryName: 'Ceiling Whites & Pure Light',
        shades: [
          { name: 'Bright Ceiling White', code: 'IND-0010', hex: '#FAFAFA', sheen: 'Dead Matt', description: 'Anti-glare high-opacity ceiling emulsion' },
          { name: 'Pearl Drop', code: 'IND-0120', hex: '#F8FAFC', sheen: 'Eggshell', description: 'Crisp contemporary white with delicate luminescence' },
          { name: 'Ivory Glow', code: 'IND-0340', hex: '#FFFBEB', sheen: 'Silk Sheen', description: 'Warm comforting ivory that enhances natural sunlight' },
        ],
      },
    ],
  },
  {
    ...websiteData.brands[1],
    shadeCategories: [
      {
        categoryName: 'Royale Luxury Classics',
        shades: [
          { name: 'Morning Frost', code: 'AP-L102', hex: '#F1F5F9', sheen: 'Silky Sheen', description: 'Soft radiant white with a soothing calm touch' },
          { name: 'Royale Imperial Gold', code: 'AP-7845', hex: '#CA8A04', sheen: 'Teflon Surface', description: 'Opulent gold-toned yellow with washable durability' },
          { name: 'Plum Royale', code: 'AP-8190', hex: '#701A75', sheen: 'Velvet Sheen', description: 'Deep jewel hue for bespoke drawing room accents' },
          { name: 'Teal Magic', code: 'AP-9204', hex: '#115E59', sheen: 'Teflon Finish', description: 'Sophisticated rich teal for luxury bedroom walls' },
        ],
      },
      {
        categoryName: 'Apex Ultima Exterior Weatherproof',
        shades: [
          { name: 'Muted Taupe', code: 'AP-EXT-991', hex: '#78716C', sheen: 'Anti-Bacterial', description: 'Dirt-pickup resistant modern facade color' },
          { name: 'Sunshine Ochre', code: 'AP-EXT-041', hex: '#FBBF24', sheen: 'UV-Resistant', description: 'Bright cheerful facade color that stands out' },
          { name: 'Steel Fortress', code: 'AP-EXT-820', hex: '#475569', sheen: 'Weatherproof', description: 'Modern architectural graphite for exterior accents' },
        ],
      },
    ],
  },
  {
    ...websiteData.brands[2],
    shadeCategories: [
      {
        categoryName: 'Superlac Metal & Wood Enamels',
        shades: [
          { name: 'Signal Red Hi-Gloss', code: 'SH-EN-01', hex: '#DC2626', sheen: 'High Gloss', description: 'Bold protective enamel for gates and grills' },
          { name: 'Oxford Deep Blue', code: 'SH-EN-08', hex: '#1D4ED8', sheen: 'High Gloss', description: 'Rich industrial & decorative enamel for railings' },
          { name: 'Emerald Leaf Green', code: 'SH-EN-14', hex: '#15803D', sheen: 'High Gloss', description: 'Glossy finish for garden gates and window frames' },
          { name: 'Brilliant Snow White', code: 'SH-EN-00', hex: '#FFFFFF', sheen: 'Mirror Gloss', description: 'High-durability white for doors and cabinets' },
        ],
      },
    ],
  },
  {
    ...websiteData.brands[3],
    shadeCategories: [
      {
        categoryName: 'Waterproofing Shields & Primers',
        shades: [
          { name: 'Damp Barrier White', code: 'AST-WP-01', hex: '#F8FAFC', sheen: 'Flexible Membrane', description: 'Heavy-duty 2mm elastomeric crack-bridging coating' },
          { name: 'Terrace Cool Grey', code: 'AST-WP-02', hex: '#94A3B8', sheen: 'Heat Reflective', description: 'Reflects heat while sealing flat roofs and terraces' },
        ],
      },
      {
        categoryName: 'Polymer Putty & Surface Levelers',
        shades: [
          { name: 'Ultra Bright White Putty', code: 'AST-PUT-01', hex: '#FFFFFF', sheen: 'Smooth Satin Base', description: 'Water-resistant polymer white cement skim coat' },
        ],
      },
    ],
  },
  {
    ...websiteData.brands[4],
    shadeCategories: [
      {
        categoryName: 'White Cement Putty Grades',
        shades: [
          { name: 'Super Fine Putty White', code: 'RY-P-101', hex: '#FFFFFF', sheen: 'Ultra Smooth', description: 'Ultra-bright white base that cuts paint consumption by 25%' },
          { name: 'Waterproof Exterior Putty', code: 'RY-P-102', hex: '#F8FAFC', sheen: 'Hydrophobic', description: 'Prevents efflorescence and alkali flaking on exterior walls' },
        ],
      },
    ],
  },
];

// Product catalog loaded from JSON
export const PRODUCTS_LIST: ProductItem[] = websiteData.products as ProductItem[];
export const PRODUCTS_DATA = PRODUCTS_LIST;

// Project inspiration gallery loaded from JSON
export const GALLERY_ITEMS: GalleryItem[] = websiteData.gallery as GalleryItem[];
export const INSPIRATION_GALLERY = GALLERY_ITEMS;

// Services loaded from JSON
export const SERVICES_LIST = websiteData.services;

// Categories loaded from JSON
export const CATEGORIES_LIST = websiteData.categories;

// FAQs loaded from JSON
export const FAQS_LIST: FAQItem[] = websiteData.faqs as FAQItem[];
