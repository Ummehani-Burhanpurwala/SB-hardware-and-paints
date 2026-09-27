import React, { useState } from 'react';
import { Logo } from './Logo.tsx';
import { Phone, MessageCircle, FileText, Menu, X, Sparkles, MapPin } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData.ts';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'colors', label: 'Color Preview' },
    { id: 'brands', label: 'Brands & Shades' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Projects' },
    { id: 'advice', label: 'Expert Advice' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Colorful Rainbow Spectrum Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-orange-500 via-amber-400 via-emerald-500 via-cyan-500 via-blue-600 to-purple-600" />

      {/* Top Utility Bar (Mobile & Desktop) */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <MapPin className="w-3 h-3 text-orange-400" />
              <span>Pulgaon Station Chowk, Nachangaon Road</span>
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-300 hidden md:inline font-medium">
              Mon–Sat: 7:00 AM – 10:00 PM
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${STORE_DETAILS.phoneRaw}`}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{STORE_DETAILS.phone}</span>
            </a>
            <span className="text-slate-600">•</span>
            <a
              href={STORE_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#25D366] hover:text-white font-bold transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Store</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo: SB HARDWARE & PAINTS */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center focus:outline-none cursor-pointer text-left"
            aria-label="SB Hardware & Paints Home"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-xs font-bold transition-colors cursor-pointer relative py-1.5 ${
                    isActive
                      ? 'text-orange-600'
                      : 'text-slate-700 hover:text-orange-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Live Preview CTA */}
            <button
              onClick={() => handleLinkClick('colors')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Color Preview</span>
            </button>

            {/* Get a Quote Button */}
            <button
              onClick={() => handleLinkClick('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 shadow-xs transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Get a Quote</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-slate-900 rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-4 border-b border-slate-100">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <a
              href={`tel:${STORE_DETAILS.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call: {STORE_DETAILS.phone}</span>
            </a>

            <a
              href={STORE_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
