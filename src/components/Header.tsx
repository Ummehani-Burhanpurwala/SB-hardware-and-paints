import React, { useState } from 'react';
import { Logo } from './Logo.tsx';
import { 
  Phone, 
  MessageCircle, 
  FileText, 
  Menu, 
  X, 
  Sparkles, 
  MapPin, 
  Lock, 
  Unlock, 
  UserCheck, 
  User, 
  LogOut,
  Home,
  Info,
  Package,
  Palette,
  Tags,
  Wrench,
  Image as GalleryIcon,
  HelpCircle
} from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData.ts';
import { useAuth } from '../context/AuthContext.tsx';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, isAuthenticated, openAuthModal, requireAuth, logout } = useAuth();

  // Navigation elements written in clear, precise format
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'colors', label: 'Colour Preview', icon: Palette, highlight: true },
    { id: 'brands', label: 'Brands & Shades', icon: Tags },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'gallery', label: 'Projects / Gallery', icon: GalleryIcon },
    { id: 'advice', label: 'Expert Advice', icon: Sparkles },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  const handleProtectedContact = (intent: string) => {
    if (requireAuth(intent)) {
      handleLinkClick('contact');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      {/* Top Colorful Rainbow Spectrum Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-orange-500 via-amber-400 via-emerald-500 via-cyan-500 via-blue-600 to-purple-600" />

      {/* Top Store Utility Bar */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Location & Hours */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Pulgaon Station Chowk, Nachangaon Road</span>
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-300 hidden md:inline font-medium">
              Mon–Sat: 7:00 AM – 10:00 PM
            </span>
            <span className="text-slate-600 hidden lg:inline">|</span>
            <span className="text-amber-300 hidden lg:inline font-semibold">
              Owner: {STORE_DETAILS.owner}
            </span>
          </div>

          {/* Quick Contact & Auth Status */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
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
                  <span>WhatsApp</span>
                </a>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-300 font-bold flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  <span>Verified Customer</span>
                </span>
              </>
            ) : (
              <button
                onClick={() => openAuthModal('Unlock Direct Store Phone & WhatsApp')}
                className="flex items-center gap-1.5 text-orange-300 hover:text-orange-200 font-bold cursor-pointer transition-colors"
              >
                <Lock className="w-3 h-3 text-orange-400" />
                <span>Sign In / Register with Firebase to Unlock Contact</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center focus:outline-none cursor-pointer text-left shrink-0"
            aria-label="SB Hardware & Paints Home"
          >
            <Logo size="md" />
          </button>

          {/* Formatted Desktop Navbar Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 font-extrabold shadow-2xs'
                      : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-orange-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            
            {/* Firebase Auth Account Control */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="max-w-[110px] truncate">{user?.name || 'Account'}</span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in">
                    <div className="px-2 py-1.5 border-b border-slate-100 mb-2">
                      <div className="font-bold text-xs text-slate-900">{user?.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{user?.phone}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">{user?.role || 'Customer'}</div>
                    </div>
                    <button
                      onClick={() => { handleLinkClick('contact'); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      My Quotations & Inquiries
                    </button>
                    <button
                      onClick={() => { logout(); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 mt-1 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('Sign In or Register with Firebase')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-orange-600" />
                <span>Sign In / Register</span>
              </button>
            )}

            {/* "Get in Touch" Action Button */}
            <button
              onClick={() => handleProtectedContact('Get in Touch with Owner Mr. Hakimuddin Saifuddin Bohra')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Formatted Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-4 border-b border-slate-100">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex items-center gap-2 text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-orange-500" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            {isAuthenticated ? (
              <>
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-bold flex items-center justify-between">
                  <span>Signed in: {user?.name}</span>
                  <button onClick={logout} className="text-rose-600 hover:underline cursor-pointer">
                    Sign Out
                  </button>
                </div>

                <a
                  href={`tel:${STORE_DETAILS.phoneRaw}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call Owner: {STORE_DETAILS.phone}</span>
                </a>

                <a
                  href={STORE_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Owner</span>
                </a>
              </>
            ) : (
              <button
                onClick={() => { openAuthModal('Unlock Store Owner Contact'); setMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 via-pink-600 to-indigo-600 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In / Register with Firebase</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
