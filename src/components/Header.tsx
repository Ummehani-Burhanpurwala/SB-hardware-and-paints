import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo.tsx';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  Sparkles, 
  MapPin, 
  Lock, 
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
  Bot,
  ChevronDown,
  Layers
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
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const { user, isAuthenticated, openAuthModal, requireAuth, logout } = useAuth();

  // Primary navigation items (always visible on desktop)
  const primaryNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'colors', label: 'Color Studio', icon: Palette, highlight: true },
    { id: 'brands', label: 'Brands', icon: Tags },
    { id: 'advice', label: 'Expert Advice', icon: Bot, isAi: true },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  // Secondary items (accessible under "More ▾" on mid-size screens, fully listed on wide screens & mobile)
  const secondaryNavItems = [
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'gallery', label: 'Projects & Gallery', icon: GalleryIcon },
  ];

  const allNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'colors', label: 'Color Studio', icon: Palette, highlight: true },
    { id: 'brands', label: 'Brands & Shades', icon: Tags },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'gallery', label: 'Projects & Gallery', icon: GalleryIcon },
    { id: 'advice', label: 'Expert AI Advice', icon: Bot, isAi: true },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setMoreDropdownOpen(false);
  };

  const handleProtectedContact = (intent: string) => {
    if (requireAuth(intent)) {
      handleLinkClick('contact');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-2xs transition-all">
      {/* Top Colorful Rainbow Spectrum Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-orange-500 via-amber-400 via-emerald-500 via-cyan-500 via-blue-600 to-purple-600" />

      {/* Top Store Utility Bar (Streamlined to prevent wrapping overflow) */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-3 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Location & Hours */}
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <span className="flex items-center gap-1 font-medium text-slate-300 truncate">
              <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
              <span className="truncate">Station Chowk, Pulgaon</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline font-normal">
              7:00 AM – 10:00 PM
            </span>
            <span className="text-slate-600 hidden lg:inline">•</span>
            <span className="text-amber-300 hidden lg:inline font-semibold">
              Owner: {STORE_DETAILS.owner}
            </span>
          </div>

          {/* Contact / Auth pill */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${STORE_DETAILS.phoneRaw}`}
                  className="hidden sm:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>{STORE_DETAILS.phone}</span>
                </a>
                <span className="hidden sm:inline text-slate-600">•</span>
                <a
                  href={STORE_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#25D366] hover:text-white font-bold transition-colors"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('Unlock Direct Store Phone & WhatsApp')}
                className="flex items-center gap-1 text-orange-300 hover:text-orange-200 font-bold cursor-pointer transition-colors"
              >
                <Lock className="w-3 h-3 text-orange-400" />
                <span className="hidden sm:inline">Sign In / Register</span>
                <span className="sm:hidden">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar: Responsive Layout with Zero Overfitting */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center focus:outline-none cursor-pointer text-left shrink-0"
            aria-label="SB Hardware & Paints Home"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation Links (Compact & Non-overflowing) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {primaryNavItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer relative whitespace-nowrap ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 font-extrabold shadow-2xs'
                      : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${
                    item.isAi ? 'text-indigo-600' : isActive ? 'text-orange-600' : 'text-slate-400'
                  }`} />
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                  )}
                  {item.isAi && (
                    <span className="px-1 py-0.2 rounded bg-indigo-100 text-indigo-700 text-[9px] font-black uppercase">
                      AI
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-orange-600 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* "More ▾" Dropdown for secondary pages (prevents navbar crowding on 1024-1440px) */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  secondaryNavItems.some((s) => s.id === activeSection)
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in">
                  {secondaryNavItems.map((s) => {
                    const isSubActive = activeSection === s.id;
                    const SubIcon = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => handleLinkClick(s.id)}
                        className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold transition-colors text-left cursor-pointer ${
                          isSubActive
                            ? 'bg-orange-50 text-orange-600 font-bold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-orange-600'
                        }`}
                      >
                        <SubIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Account Profile / Firebase Auth Button */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="max-w-[70px] sm:max-w-[90px] truncate">{user?.name || 'Account'}</span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in text-left">
                    <div className="px-2 py-1.5 border-b border-slate-100 mb-2">
                      <div className="font-bold text-xs text-slate-900 truncate">{user?.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono truncate">{user?.phone}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">{user?.role || 'Customer'}</div>
                    </div>
                    <button
                      onClick={() => handleLinkClick('contact')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Inquiries & Quotations
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
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* "Get in Touch" Button */}
            <button
              onClick={() => handleProtectedContact('Get in Touch with Owner Mr. Hakimuddin Saifuddin Bohra')}
              className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Get in Touch</span>
            </button>

            {/* Mobile Hamburger Menu Toggle (Visible on < lg:) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Formatted Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-5 space-y-4 shadow-xl text-left animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-4 border-b border-slate-100">
            {allNavItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex items-center gap-2 text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${item.isAi ? 'text-indigo-600' : 'text-orange-500'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            {isAuthenticated ? (
              <>
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-bold flex items-center justify-between">
                  <span className="truncate">Signed in: {user?.name}</span>
                  <button onClick={logout} className="text-rose-600 hover:underline cursor-pointer shrink-0 ml-2">
                    Sign Out
                  </button>
                </div>

                <a
                  href={`tel:${STORE_DETAILS.phoneRaw}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call: {STORE_DETAILS.phone}</span>
                </a>

                <a
                  href={STORE_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold"
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
