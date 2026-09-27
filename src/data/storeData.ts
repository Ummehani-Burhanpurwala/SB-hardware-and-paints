export interface BrandInfo {
  id: string;
  name: string;
  tagline: string;
  logoText: string;
  badgeBg: string;
  badgeText: string;
  accentHex: string;
  description: string;
  officialResourceUrl?: string;
  pdfNote?: string;
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

export const STORE_DETAILS = {
  name: 'SB Hardware & Paints',
  owner: 'Mr. Hakimuddin Saifuddin Bohra',
  phone: '+91 9890722385',
  phoneRaw: '+919890722385',
  email: 'hakimaadamji786110@gmail.com',
  address: 'Near Pulgaon Station Chowk, Nachangaon Road, Pulgaon, Maharashtra 442302',
  hours: 'Monday – Saturday: 7:00 AM – 10:00 PM',
  whatsappUrl: 'https://wa.me/919890722385?text=Hello%20SB%20Hardware%20%26%20Paints%2C%20I%20am%20getting%20in%20touch%20regarding%20paints%20and%20hardware.',
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Pulgaon+Station+Chowk+Nachangaon+Road+Pulgaon+Maharashtra+442302',
  instagram: 'https://instagram.com/sbhardwarepaints',
};

// Vibrant & Designer Paint Colors Palette for live exploration
export interface ColorShade {
  name: string;
  code: string;
  hex: string;
  family: 'warm' | 'cool' | 'green' | 'pastel' | 'regal';
  familyName: string;
  sheen: string;
  description: string;
}

export const DESIGNER_SHADES: ColorShade[] = [
  // Warm & Earthy
  { name: 'Warm Terracotta', code: 'SH-2104', hex: '#C25E43', family: 'warm', familyName: 'Warm Earthy', sheen: 'Velvet Matt', description: 'Rich earthen terracotta creating a cozy, grounded sanctuary.' },
  { name: 'Spiced Saffron', code: 'SH-2401', hex: '#EA580C', family: 'warm', familyName: 'Warm Earthy', sheen: 'Silk Sheen', description: 'Energetic celebratory orange for spirited living rooms.' },
  { name: 'Golden Marigold', code: 'SH-3209', hex: '#F59E0B', family: 'warm', familyName: 'Warm Earthy', sheen: 'Rich Silk', description: 'Warm joyous amber-gold bringing festive sunshine indoors.' },
  { name: 'Sunset Coral', code: 'SH-2819', hex: '#F43F5E', family: 'warm', familyName: 'Warm Earthy', sheen: 'Soft Sheen', description: 'Modern vivid coral adding youthful warmth to dining walls.' },
  { name: 'Desert Sandstone', code: 'SH-1188', hex: '#D97706', family: 'warm', familyName: 'Warm Earthy', sheen: 'Matt', description: 'Earthy golden ochre that pairs beautifully with wood finishes.' },
  { name: 'Burnt Cinnamon', code: 'SH-2910', hex: '#9A3412', family: 'warm', familyName: 'Warm Earthy', sheen: 'Eggshell', description: 'Deep rustic amber-brown for library and accent feature walls.' },

  // Cool & Ocean Blues
  { name: 'Royal Indigo Blue', code: 'SH-5012', hex: '#1E3A8A', family: 'cool', familyName: 'Ocean Blues', sheen: 'Rich Silk', description: 'Prestigious deep ocean blue exuding grandeur and timeless calm.' },
  { name: 'Sky Breeze Blue', code: 'SH-4820', hex: '#38BDF8', family: 'cool', familyName: 'Ocean Blues', sheen: 'Soft Sheen', description: 'Crisp open sky hue creating an airy, expansive atmosphere.' },
  { name: 'Aegean Teal', code: 'SH-5219', hex: '#0D9488', family: 'cool', familyName: 'Ocean Blues', sheen: 'Satin', description: 'Jewel-toned Mediterranean teal for contemporary spaces.' },
  { name: 'Powder Morning Blue', code: 'SH-4102', hex: '#93C5FD', family: 'cool', familyName: 'Ocean Blues', sheen: 'Matt', description: 'Gentle morning haze blue ideal for peaceful master bedrooms.' },
  { name: 'Deep Cobalt', code: 'SH-5804', hex: '#2563EB', family: 'cool', familyName: 'Ocean Blues', sheen: 'High Gloss', description: 'Vivid vibrant blue bringing bold modern energy to doors and grills.' },
  { name: 'Midnight Navy', code: 'SH-5990', hex: '#1E293B', family: 'cool', familyName: 'Ocean Blues', sheen: 'Velvet Matt', description: 'Sophisticated architectural navy for dramatic contrasts.' },

  // Greens & Botanicals
  { name: 'Forest Emerald', code: 'SH-6901', hex: '#059669', family: 'green', familyName: 'Lush Greens', sheen: 'Soft Sheen', description: 'Lush organic emerald reflecting botanical serenity and vitality.' },
  { name: 'Eucalyptus Mist', code: 'SH-6204', hex: '#6EE7B7', family: 'green', familyName: 'Lush Greens', sheen: 'Eggshell', description: 'Soothing sage green with gentle undertones for calm reading rooms.' },
  { name: 'Olive Grove', code: 'SH-6150', hex: '#65A30D', family: 'green', familyName: 'Lush Greens', sheen: 'Matt', description: 'Natural Mediterranean olive green that harmonizes with stone.' },
  { name: 'Mint Meadow', code: 'SH-6320', hex: '#A7F3D0', family: 'green', familyName: 'Lush Greens', sheen: 'Velvet', description: 'Fresh, airy pastel mint that revitalizes small compact rooms.' },
  { name: 'Deep Pine', code: 'SH-6992', hex: '#064E3B', family: 'green', familyName: 'Lush Greens', sheen: 'High Sheen', description: 'Regal botanical evergreen for heritage doors and accents.' },

  // Regal Jewels & Purples
  { name: 'Plum Royale', code: 'SH-8190', hex: '#701A75', family: 'regal', familyName: 'Regal Jewels', sheen: 'Velvet Sheen', description: 'Opulent deep amethyst providing exquisite backdrop for warm lighting.' },
  { name: 'Imperial Violet', code: 'SH-8402', hex: '#7C3AED', family: 'regal', familyName: 'Regal Jewels', sheen: 'Rich Silk', description: 'Creative majestic violet that makes feature walls memorable.' },
  { name: 'Crimson Velvet', code: 'SH-7201', hex: '#BE123C', family: 'regal', familyName: 'Regal Jewels', sheen: 'High Sheen', description: 'Dramatic romantic vermilion for luxury dining spaces.' },
  { name: 'Rich Wine', code: 'SH-7904', hex: '#831843', family: 'regal', familyName: 'Regal Jewels', sheen: 'Eggshell', description: 'Sophisticated berry tone with timeless warmth and richness.' },

  // Pastels & Soft Light
  { name: 'Blush Rose', code: 'SH-2041', hex: '#F472B6', family: 'pastel', familyName: 'Pastel Light', sheen: 'Soft Sheen', description: 'Delicate blossom pink that creates gentle, uplifting rooms.' },
  { name: 'Butter Cream', code: 'SH-1010', hex: '#FDE047', family: 'pastel', familyName: 'Pastel Light', sheen: 'Smooth Matt', description: 'Soft luminous yellow reflecting sunlight in dimly lit hallways.' },
  { name: 'Almond Silk', code: 'SH-1045', hex: '#F3E5D8', family: 'pastel', familyName: 'Pastel Light', sheen: 'Velvet Matt', description: 'Versatile warm porcelain neutral that matches any furnishings.' },
  { name: 'Lavender Haze', code: 'SH-8102', hex: '#C084FC', family: 'pastel', familyName: 'Pastel Light', sheen: 'Eggshell', description: 'Dreamy soft lilac bringing tranquility to study and prayer rooms.' },
];

export const BRANDS_DATA: BrandInfo[] = [
  {
    id: 'indigo',
    name: 'Indigo Paints',
    tagline: 'Innovative Coatings & Metallic Finishes',
    logoText: 'INDIGO',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-900',
    accentHex: '#4F46E5',
    description: 'Specialists in metallic emulsions, dirtproof & waterproof exterior topcoats, ceiling white, and tile coatings.',
    pdfNote: 'Official Indigo Shade Palette Available',
    officialResourceUrl: 'https://indigopaints.com',
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
          { name: 'Coastal Turquoise', code: 'IND-5219', hex: '#0D9488', sheen: 'Satin', description: 'Fresh, invigorating color for modern wash spaces' },
        ],
      },
      {
        categoryName: 'Ceiling Whites & Pure Light',
        shades: [
          { name: 'Bright Ceiling White', code: 'IND-0010', hex: '#FAFAFA', sheen: 'Dead Matt', description: 'Anti-glare high-opacity ceiling emulsion' },
          { name: 'Pearl Drop', code: 'IND-0120', hex: '#F8FAFC', sheen: 'Eggshell', description: 'Crisp contemporary white with delicate luminescence' },
          { name: 'Ivory Glow', code: 'IND-0340', hex: '#FFFBEB', sheen: 'Silk Sheen', description: 'Warm comforting ivory that enhances natural sunlight' },
          { name: 'Platinum Mist', code: 'IND-0802', hex: '#E2E8F0', sheen: 'Smooth Matt', description: 'Sophisticated modern grey with neutral reflection' },
        ],
      },
      {
        categoryName: 'Exterior Weatherproof Shields',
        shades: [
          { name: 'Weather Fortress Grey', code: 'IND-EXT-701', hex: '#64748B', sheen: 'Dirt-Resistant', description: 'High-UV exterior facade emulsion with silicone polymer' },
          { name: 'Heritage Sandalwood', code: 'IND-EXT-402', hex: '#D97706', sheen: 'Weatherproof', description: 'Rich sun-fast exterior shade for multi-season homes' },
          { name: 'Bungalow Olive', code: 'IND-EXT-615', hex: '#4D7C0F', sheen: 'Anti-Algae', description: 'Resistant to heavy rains and mold growth' },
        ],
      },
    ],
  },
  {
    id: 'asian-paints',
    name: 'Asian Paints',
    tagline: 'World-Class Finishes & Luxury Emulsions',
    logoText: 'ASIAN PAINTS',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-900',
    accentHex: '#E11D48',
    description: 'Benchmark collections including Royale Luxury Emulsion, Apcolite Premium, Tractor Emulsion, and Apex Ultima Weatherproof exterior shields.',
    officialResourceUrl: 'https://www.asianpaints.com',
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
        categoryName: 'Apcolite Everyday Living',
        shades: [
          { name: 'Country Cream', code: 'AP-0382', hex: '#FEF3C7', sheen: 'Smooth Matt', description: 'Warm family favorite for expansive hall walls' },
          { name: 'Pebble Walk', code: 'AP-8422', hex: '#CBD5E1', sheen: 'Smooth Matt', description: 'Neutral slate tone complementing tiles and wood floors' },
          { name: 'Warm Terracotta', code: 'AP-0533', hex: '#B45309', sheen: 'Rich Sheen', description: 'Earthy tone creating cheerful, cozy spaces' },
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
    id: 'shalimar',
    name: 'Shalimar Paints',
    tagline: 'Heritage Enamels & Synthetic Distemper',
    logoText: 'SHALIMAR',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-900',
    accentHex: '#059669',
    description: 'Heritage formulations including Superlac Hi-Gloss Enamel for doors/grills and No. 1 Synthetic Distemper for smooth finishes.',
    officialResourceUrl: 'https://shalimarpaints.com',
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
      {
        categoryName: 'Economy Emulsions & Distempers',
        shades: [
          { name: 'Butter Milk', code: 'SH-DIS-101', hex: '#FEF9C3', sheen: 'Smooth Matt', description: 'Affordable, easy-to-apply wall distemper' },
          { name: 'Blush Rose', code: 'SH-DIS-204', hex: '#FCE7F3', sheen: 'Velvet Matt', description: 'Gentle pastel pink for bedrooms and guest spaces' },
          { name: 'Cool Aqua', code: 'SH-DIS-312', hex: '#CFFAFE', sheen: 'Matt', description: 'Fresh soothing tint for bright interiors' },
        ],
      },
    ],
  },
  {
    id: 'astral',
    name: 'Astral Paints & Adhesives',
    tagline: 'High-Performance Waterproofing & Polymer Putty',
    logoText: 'ASTRAL',
    badgeBg: 'bg-cyan-50',
    badgeText: 'text-cyan-900',
    accentHex: '#0891B2',
    description: 'Specialists in elastomeric damp-proof membranes, polymer wall putty, tile adhesives, and structural waterproofing chemicals.',
    officialResourceUrl: 'https://astralpaints.com',
    shadeCategories: [
      {
        categoryName: 'Waterproofing Shields & Primers',
        shades: [
          { name: 'Damp Barrier White', code: 'AST-WP-01', hex: '#F8FAFC', sheen: 'Flexible Membrane', description: 'Heavy-duty 2mm elastomeric crack-bridging coating' },
          { name: 'Terrace Cool Grey', code: 'AST-WP-02', hex: '#94A3B8', sheen: 'Heat Reflective', description: 'Reflects heat while sealing flat roofs and terraces' },
          { name: 'Aqua Stop Clear', code: 'AST-WP-05', hex: '#E0F2FE', sheen: 'Silicone Repellent', description: 'Clear penetrative water repellent for brick & stone' },
        ],
      },
      {
        categoryName: 'Polymer Putty & Surface Levelers',
        shades: [
          { name: 'Ultra Bright White Putty', code: 'AST-PUT-01', hex: '#FFFFFF', sheen: 'Smooth Satin Base', description: 'Water-resistant polymer white cement skim coat' },
          { name: 'Coarse Repair Undercoat', code: 'AST-PUT-02', hex: '#F1F5F9', sheen: 'Structural Filler', description: 'Fills deep undulations and hairline wall plaster cracks' },
        ],
      },
    ],
  },
  {
    id: 'raj-yog',
    name: 'Raj Yog Paints & Putty',
    tagline: 'Contractor-Trusted White Cement Putty',
    logoText: 'RAJ YOG',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-900',
    accentHex: '#D97706',
    description: 'Preferred by master painters and plastering contractors for exceptional adhesion, extra whiteness, high square-foot coverage, and silky smoothness.',
    officialResourceUrl: 'https://sbhardwarepaints.in/rajyog',
    shadeCategories: [
      {
        categoryName: 'White Cement Putty Grades',
        shades: [
          { name: 'Super Fine Putty White', code: 'RY-P-101', hex: '#FFFFFF', sheen: 'Ultra Smooth', description: 'Ultra-bright white base that cuts paint consumption by 25%' },
          { name: 'Waterproof Exterior Putty', code: 'RY-P-102', hex: '#F8FAFC', sheen: 'Hydrophobic', description: 'Prevents efflorescence and alkali flaking on exterior walls' },
        ],
      },
      {
        categoryName: 'Raj Yog Washable Distemper Shades',
        shades: [
          { name: 'Golden Wheat', code: 'RY-D-21', hex: '#FEF08A', sheen: 'Soft Matt', description: 'Bright cheerful living room yellow with great opacity' },
          { name: 'Pista Green', code: 'RY-D-34', hex: '#BBF7D0', sheen: 'Velvet Matt', description: 'Cool organic mint green for family rooms' },
          { name: 'Sky Glow', code: 'RY-D-45', hex: '#BAE6FD', sheen: 'Matt', description: 'Clear soothing blue for ceilings and bedrooms' },
        ],
      },
    ],
  },
];

export const PRODUCTS_LIST: ProductItem[] = [
  {
    id: 'prod-interior-luxury',
    name: 'Luxury & Premium Interior Emulsions',
    brand: 'Indigo & Asian Paints',
    category: 'interior',
    categoryLabel: 'Interior Paints',
    image: '/src/assets/images/paint_can_interior_1790513290257.jpg',
    colorTheme: {
      softBg: 'bg-rose-50/50',
      accentHex: '#E11D48',
      border: 'border-rose-100',
    },
    description: 'Ultra-smooth washable paints with Teflon surface protection, stain resistance, and silky velvet finishes that elevate any living room or bedroom.',
    finish: 'Velvet Matt / Silky Sheen / High Gloss',
    packSizes: ['1 L', '4 L', '10 L', '20 L'],
    coverage: '140 - 160 sq.ft / Litre (2 coats)',
    idealFor: 'Living rooms, master bedrooms, dining spaces, luxury accent walls',
    dryingTime: '30 mins touch dry; 4 hours recoat',
    features: ['100% washable stains', 'Anti-fungal protection', 'Low odor & low VOC', 'Rich deep color depth'],
  },
  {
    id: 'prod-exterior-weatherproof',
    name: 'All-Weather Exterior Siliconized Emulsions',
    brand: 'Indigo & Asian Paints Apex',
    category: 'exterior',
    categoryLabel: 'Exterior Paints',
    image: '/src/assets/images/paint_can_exterior_1790513309831.jpg',
    colorTheme: {
      softBg: 'bg-sky-50/50',
      accentHex: '#0284C7',
      border: 'border-sky-100',
    },
    description: 'Heavy-duty weather shields engineered to resist blistering heat, heavy monsoon downpours, dirt pickup, and algae growth.',
    finish: 'Dirtproof Sheen / Crisp Matt',
    packSizes: ['1 L', '4 L', '10 L', '20 L'],
    coverage: '55 - 65 sq.ft / Litre (2 coats)',
    idealFor: 'Exterior building facades, bungalow boundary walls, balconies',
    dryingTime: '4 hours between coats',
    features: ['Up to 7 years weather protection', 'Silicone dirt-repellent', 'Anti-algae & anti-fungal', 'UV color fade resistant'],
  },
  {
    id: 'prod-distemper-washable',
    name: 'Acrylic Washable Distemper',
    brand: 'Shalimar & Raj Yog',
    category: 'distemper',
    categoryLabel: 'Distemper',
    image: '/src/assets/images/paint_can_interior_1790513290257.jpg',
    colorTheme: {
      softBg: 'bg-amber-50/40',
      accentHex: '#D97706',
      border: 'border-amber-100',
    },
    description: 'Clean, smooth wall finishes that provide opaque color coverage for rental homes, ceilings, and budget renovations.',
    finish: 'Smooth Soft Matt',
    packSizes: ['2 kg', '5 kg', '10 kg', '20 kg'],
    coverage: '80 - 100 sq.ft / kg (2 coats)',
    idealFor: 'Bedrooms, ceilings, budget interior makeovers, rental properties',
    dryingTime: '2 hours recoat',
    features: ['High opacity in single coat', 'Pleasant soft matt look', 'Quick drying', 'Economical application'],
  },
  {
    id: 'prod-wall-putty-polymeric',
    name: 'White Cement Polymer Putty',
    brand: 'Raj Yog & Astral',
    category: 'putty',
    categoryLabel: 'Wall Putty',
    image: '/src/assets/images/paint_waterproofing_1790513344977.jpg',
    colorTheme: {
      softBg: 'bg-slate-50',
      accentHex: '#475569',
      border: 'border-slate-200',
    },
    description: 'Superior grade white-cement base putty that fills plaster pores, bridges hairline cracks, and creates a glass-smooth canvas for paint.',
    finish: 'Porcelain White Smooth Base',
    packSizes: ['5 kg', '20 kg', '40 kg Bags'],
    coverage: '12 - 15 sq.ft / kg (2 coats, 1.5mm)',
    idealFor: 'Raw plastered walls, ceilings, pre-painting wall preparation',
    dryingTime: '4 - 6 hours dry before sanding',
    features: ['Extra white brilliance', 'Reduces paint consumption 25%', 'Water-resistant formulation', 'Zero chalking or peeling'],
  },
  {
    id: 'prod-primer-interior-exterior',
    name: 'Alkali-Resistant Wall Primers',
    brand: 'Indigo & Asian Paints',
    category: 'primer',
    categoryLabel: 'Primers',
    image: '/src/assets/images/paint_can_exterior_1790513309831.jpg',
    colorTheme: {
      softBg: 'bg-emerald-50/40',
      accentHex: '#059669',
      border: 'border-emerald-100',
    },
    description: 'Deep penetrating water-thinnable primer that binds to cured plaster and putty, sealing porous walls and locking in topcoat vibrancy.',
    finish: 'Matt White Undercoat',
    packSizes: ['1 L', '4 L', '10 L', '20 L'],
    coverage: '120 - 140 sq.ft / Litre (1 coat)',
    idealFor: 'Freshly puttied walls, cured cement plaster, repaint priming',
    dryingTime: '30 mins touch dry; 4 hours recoat',
    features: ['Alkali & moisture barrier', 'Maximum adhesion for paint', 'Uniform sheen across walls', 'Resists efflorescence salts'],
  },
  {
    id: 'prod-enamel-synthetic',
    name: 'Superlac Hi-Gloss Enamel',
    brand: 'Shalimar & Asian Paints',
    category: 'enamels',
    categoryLabel: 'Enamels & Gloss',
    image: '/src/assets/images/paint_can_enamel_1790513328393.jpg',
    colorTheme: {
      softBg: 'bg-purple-50/40',
      accentHex: '#7C3AED',
      border: 'border-purple-100',
    },
    description: 'Tough oil-based synthetic enamel for iron window grills, wooden doors, steel gates, and decorative woodwork.',
    finish: 'Mirror High Gloss / Satin Lustre',
    packSizes: ['500 ml', '1 L', '4 L', '20 L'],
    coverage: '100 - 120 sq.ft / Litre (1 coat)',
    idealFor: 'Safety grills, metal gates, entrance doors, cabinet woodwork',
    dryingTime: 'Touch dry in 3 hours; Hard dry in 16 hours',
    features: ['Anti-rust formulation', 'Resists chips and scratches', 'Deep mirror gloss', 'Interior & exterior grade'],
  },
  {
    id: 'prod-waterproofing-coat',
    name: 'Elastomeric Terrace & Wall Waterproofing',
    brand: 'Astral & Asian Paints Damp Proof',
    category: 'waterproofing',
    categoryLabel: 'Waterproofing',
    image: '/src/assets/images/paint_waterproofing_1790513344977.jpg',
    colorTheme: {
      softBg: 'bg-teal-50/40',
      accentHex: '#0D9488',
      border: 'border-teal-100',
    },
    description: 'Heavy-duty liquid acrylic elastomeric membrane with crack-bridging capability up to 2mm, ideal for terrace roofs, damp walls, and parapets.',
    finish: 'Elastic Rubberized White / Grey',
    packSizes: ['1 L', '4 L', '10 L', '20 L'],
    coverage: '10 - 12 sq.ft / Litre (3-coat membrane)',
    idealFor: 'Terraces, parapet walls, bathroom sink walls, foundation dampness',
    dryingTime: '6 hours between coats',
    features: ['Withstands hydrostatic pressure', 'Elongation up to 250%', 'Reflects summer heat', 'Stops persistent seepage'],
  },
  {
    id: 'prod-accessories-tools',
    name: 'Professional Painter Tools & Sundries',
    brand: 'Certified Quality',
    category: 'tools',
    categoryLabel: 'Painter Tools',
    image: '/src/assets/images/storefront_sb_paints_1790511702998.jpg',
    colorTheme: {
      softBg: 'bg-slate-50',
      accentHex: '#64748B',
      border: 'border-slate-200',
    },
    description: 'Complete range of microfiber rollers, fine bristle brushes, sharp edge masking tapes, putty blades, waterproof emery sheets, and tray gear.',
    finish: 'Contractor Grade',
    packSizes: ['Individual & Bulk Packs'],
    coverage: 'Job-ready',
    idealFor: 'Professional painters, DIY enthusiasts, interior contractors',
    dryingTime: 'Immediate',
    features: ['Zero bristle shedding', 'Lint-free microfiber rolling', 'Crisp border masking', 'Durable stainless steel blades'],
  },
];

export const PRODUCTS_DATA = PRODUCTS_LIST;

export const INSPIRATION_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Earthy Terracotta & Cream Living Space',
    tag: 'Living Room',
    category: 'living',
    shades: 'Warm Terracotta · Almond Beige',
    image: '/src/assets/images/project_interior_living_1790511719999.jpg',
    description: 'Soft afternoon sunlight highlights the warm textural contrast of the terracotta focal wall against light beige backdrop.',
  },
  {
    id: 'gal-2',
    title: 'Modern Minimalist Villa Facade',
    tag: 'Exterior Architecture',
    category: 'exterior',
    shades: 'Sandstone Warm Gold · Granite Peak',
    image: '/src/assets/images/project_exterior_villa_1790511735551.jpg',
    description: 'Crisp geometrical clean lines protected with weather-proof, dirt-repellent silicone emulsion.',
  },
  {
    id: 'gal-3',
    title: 'Serene Bedroom in Sky Blue Silk',
    tag: 'Master Bedroom',
    category: 'bedroom',
    shades: 'Sky Breeze Blue · Pearl Drop White',
    image: '/src/assets/images/hero_paint_store_1790511674504.jpg',
    description: 'A calming and restorative master suite coated with low-sheen velvet emulsion for zero glare and peaceful sleep.',
  },
  {
    id: 'gal-4',
    title: 'Paint Atelier & Live Swatch Display',
    tag: 'Showroom & Color Lab',
    category: 'commercial',
    shades: 'Bright Ceiling White · Royal Indigo',
    image: '/src/assets/images/storefront_sb_paints_1790511702998.jpg',
    description: 'Organized shelves, precision automated tinting machines, and live shade swatch boards for effortless color matching.',
  },
];

export const SERVICES_LIST = [
  {
    id: 'service-advice',
    title: 'Color & System Guidance',
    badge: 'Consultation',
    shortDesc: 'Step-by-step advice on coat thickness, primer compatibility, moisture checks, and shade harmony under natural and artificial light.',
    bullets: ['Free shade card walkthrough', 'Moisture check advice', 'Zero-wastage quantity sizing'],
  },
  {
    id: 'service-tinting',
    title: 'Computerized Shade Tinting',
    badge: 'Precision Lab',
    shortDesc: 'State-of-the-art automated tinting dispensers mixing 2,000+ exact factory shades with micro-gram pigment precision.',
    bullets: ['Exact shade repeatability', 'Custom shade matching', 'Same-day instant mixing'],
  },
  {
    id: 'service-delivery',
    title: 'Doorstep & Site Delivery',
    badge: 'Logistics',
    shortDesc: 'Careful transport of paint buckets, putty sacks, and waterproofing compounds directly to your house, building, or project site.',
    bullets: ['Safe handling of 20L barrels', 'Fast doorstep dispatch', 'Bulk contractor logistics'],
  },
  {
    id: 'service-painters',
    title: 'Trusted Painters Network',
    badge: 'Craftsmanship',
    shortDesc: 'Need skilled master painters? We connect you with verified tradesmen experienced in texture wall art, spray finishes, and smooth putty prep.',
    bullets: ['Experienced tradesmen', 'On-time project completion', 'Transparent labor standards'],
  },
];

export const FAQS_LIST: FAQItem[] = [
  {
    question: 'How do I choose between Distemper, Premium Emulsion, and Luxury Emulsion?',
    answer: 'Distemper is a budget-friendly soft matt finish ideal for ceilings and rental properties. Premium Emulsions offer smooth washability and durable rich colors for standard rooms. Luxury Emulsions (like Asian Paints Royale or Indigo Metallic) contain Teflon surface protection, allowing complete washability against tea, crayons, and oil stains with velvet soft touch.',
  },
  {
    question: 'Why is wall primer necessary before applying topcoat paint?',
    answer: 'Primer acts as a bonding anchor and chemical barrier. It seals porous putty and cured cement plaster, preventing moisture and alkali salts from leaching into the topcoat. Skipping primer often results in patchy color absorption, uneven sheen, and early paint flaking.',
  },
  {
    question: 'Can I get exact custom shades mixed at SB Hardware & Paints?',
    answer: 'Yes! We have automated computerized tinting machines that can mix over 2,000 certified shades across Indigo, Asian Paints, and Shalimar catalogs with exact digital pigment repeatability.',
  },
  {
    question: 'What is the recommended paint system for damp walls or terrace leakage?',
    answer: 'For terrace waterproofing, we recommend a 3-coat heavy elastomeric membrane (such as Astral or Asian Paints Damp Proof) which bridges cracks up to 2mm and reflects solar heat. For rising wall dampness, any peeling plaster must be chipped off, treated with a crystalline waterproofing barrier, leveled with polymer white cement putty, and sealed with an alkali-resistant primer.',
  },
  {
    question: 'How do I get in touch with the store or visit in person?',
    answer: 'You can use the Get in Touch section on this website to register your inquiry. Once registered, our complete store phone number, WhatsApp link, email, and Google Maps directions will be provided immediately so you can connect in whatever way is most convenient for you.',
  },
];
