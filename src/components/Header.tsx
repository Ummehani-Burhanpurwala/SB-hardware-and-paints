import React, { useState } from 'react';
import { Logo } from './Logo.tsx';
import { Search, User, Sparkles, Menu, X, Phone, MessageCircle } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData.ts';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'categories', label: 'Categories' },
    { id: 'products', label: 'Products' },
    { id: 'colors', label: 'Colours' },
    { id: 'brands', label: 'Brands' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('products');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Brand: SB PAINTS */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center focus:outline-none cursor-pointer"
            aria-label="SB PAINTS Home"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                    isActive
                      ? 'text-orange-600 font-semibold'
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

          {/* Right Action Icons (Matching reference: Search, Profile/Advisor, Contact CTA) */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search paints, shades..."
                    className="w-44 sm:w-60 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full text-slate-800 focus:outline-none focus:border-orange-500"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-slate-600 hover:text-orange-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Profile / Paint Expert Contact */}
            <button
              onClick={() => handleLinkClick('contact')}
              className="p-2 text-slate-600 hover:text-orange-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
              title="Get in Touch"
              aria-label="Account / Contact"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Contact Action Button */}
            <button
              onClick={() => handleLinkClick('contact')}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-sm transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-3 animate-in fade-in duration-150">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <a
              href={`tel:${STORE_DETAILS.phoneRaw}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 text-white"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Store</span>
            </a>
            <a
              href={STORE_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
