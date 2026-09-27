import React from 'react';
import { STORE_DETAILS, BRANDS_DATA } from '../data/storeData.ts';
import { Mail, Clock, ArrowUpRight } from 'lucide-react';

import { Logo } from './Logo.tsx';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBrandShades: (brandId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBrandShades }) => {
  return (
    <footer className="relative bg-stone-900 text-stone-400 pt-16 pb-12 border-t border-stone-800">
      {/* Top Colorful Rainbow Paint Gradient Ribbon on Footer */}
      <div 
        className="absolute top-0 left-0 right-0 h-2 rainbow-gradient-bar" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Store Intro (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <span className="text-xl font-bold text-white tracking-tight">
                SB Hardware & Paints
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Authorized retailer for architectural coatings, polymer wall putty, and elastomeric waterproofing systems. Supporting homeowners, designers, and building contractors.
            </p>

            <div className="space-y-2 text-xs text-stone-400 pt-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-500" />
                <a href={`mailto:${STORE_DETAILS.email}`} className="text-stone-300 hover:text-white">
                  {STORE_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                <span>{STORE_DETAILS.hours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Brand Shade Cards (Col 6-8) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Brand Shade Cards
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {BRANDS_DATA.map((brand) => (
                <li key={brand.id}>
                  <button
                    onClick={() => onOpenBrandShades(brand.id)}
                    className="text-stone-400 hover:text-white transition-colors text-left flex items-center gap-2 cursor-pointer"
                  >
                    <span>{brand.name}</span>
                    <span className="text-stone-600 text-xs">· Shade Palette</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation (Col 9-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { id: 'home', label: 'Home' },
                { id: 'colors', label: 'Color Shades Atelier' },
                { id: 'brands', label: 'Brands & Shade Cards' },
                { id: 'products', label: 'Product Catalogue' },
                { id: 'advice', label: 'Paint Advice' },
                { id: 'gallery', label: 'Inspiration Gallery' },
                { id: 'services', label: 'Our Services' },
                { id: 'faqs', label: 'FAQs' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Get in Touch' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} SB Hardware & Paints. All rights reserved.
          </div>
          <div>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-stone-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Get in Touch with SB Hardware & Paints</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
