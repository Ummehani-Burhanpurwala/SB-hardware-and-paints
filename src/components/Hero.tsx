import React, { useState } from 'react';
import { Phone, MessageCircle, FileText, ArrowRight, Palette, Sparkles, CheckCircle2, ShieldCheck, Truck, Users, Lock, Store, Eye } from 'lucide-react';
import { STORE_DETAILS, BRANDS_DATA, WEBSITE_DATA } from '../data/storeData.ts';
import { useAuth } from '../context/AuthContext.tsx';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenBrandShades: (brandId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenBrandShades }) => {
  const { isAuthenticated, requireAuth } = useAuth();
  const [activeImageTab, setActiveImageTab] = useState<'room' | 'store'>('room');
  const hero = WEBSITE_DATA.hero;

  const handleCallClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      requireAuth('Direct Call to Store');
      onNavigate('contact');
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      requireAuth('Chat on WhatsApp');
      onNavigate('contact');
    }
  };

  return (
    <section className="relative pt-6 pb-14 sm:pb-20 overflow-hidden">
      {/* Background ambient colorful glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/20 via-orange-300/20 to-purple-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-cyan-400/15 via-blue-400/15 to-indigo-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Content (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tagline / Store Trust Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-orange-200/80 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-orange-950 uppercase tracking-wider">
                {hero.badge}
              </span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="text-xs font-medium text-slate-600 hidden sm:inline">
                Proprietor: {STORE_DETAILS.owner}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Bring Vibrant Colour to <br />
                <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Your Home & Walls
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-xl">
                {hero.subheadline}
              </p>
            </div>

            {/* Direct CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Call Now */}
              <a
                href={isAuthenticated ? `tel:${STORE_DETAILS.phoneRaw}` : '#contact'}
                onClick={handleCallClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {isAuthenticated ? <Phone className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-orange-400" />}
                <span>{isAuthenticated ? 'Call Store' : 'Unlock Store Call'}</span>
              </a>

              {/* WhatsApp Chat */}
              <a
                href={isAuthenticated ? STORE_DETAILS.whatsappUrl : '#contact'}
                onClick={handleWhatsAppClick}
                target={isAuthenticated ? "_blank" : undefined}
                rel={isAuthenticated ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{isAuthenticated ? 'WhatsApp' : 'Unlock WhatsApp'}</span>
              </a>

              {/* Get a Quote */}
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Get in Touch / Quote</span>
              </button>

              {/* Live Color Preview button */}
              <button
                onClick={() => onNavigate('colors')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-white/90 hover:bg-white text-slate-800 border border-slate-300 shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <Palette className="w-4 h-4 text-pink-600" />
                <span>Live Color Studio</span>
              </button>
            </div>

            {/* Store Stats Strip from JSON */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-200/80">
              {hero.stats.map((stat: any, idx: number) => (
                <div key={idx} className="p-3 bg-white/80 rounded-2xl border border-slate-200/80">
                  <div className="text-xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Visual Column (Col 8-12): Real Storefront / Architectural Room Visualizer */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl border-4 border-white/80 bg-white aspect-[4/3] sm:aspect-[16/13] group">
              
              <img
                src={activeImageTab === 'room' 
                  ? 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
                  : hero.bgImage
                }
                alt={activeImageTab === 'room' ? "Architectural Living Room" : "SB Hardware & Paints Showroom Pulgaon"}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                loading="eager"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/hero_paint_store_1790511674504.jpg';
                }}
              />

              {/* View Switcher Top-Left */}
              <div className="absolute top-4 left-4 flex p-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
                <button
                  onClick={() => setActiveImageTab('room')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    activeImageTab === 'room' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>Room Finish</span>
                </button>
                <button
                  onClick={() => setActiveImageTab('store')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    activeImageTab === 'store' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Store className="w-3 h-3" />
                  <span>Pulgaon Store</span>
                </button>
              </div>

              {/* Floating Shade Visualizer Pill Top-Right */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-white/60 flex items-center gap-2">
                <div className="flex -space-x-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#EA580C] ring-2 ring-white" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#EC4899] ring-2 ring-white" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#3B82F6] ring-2 ring-white" />
                </div>
                <div className="text-[10px] font-black text-slate-900">
                  10,000+ Shades
                </div>
              </div>

              {/* Floating Bottom Card: Interactive preview invite */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/70">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-left">
                    <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                      <span>Live Color Visualizer</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-normal">
                      Preview shades on walls before purchasing
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('colors')}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    Try Studio →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Featured Brands Strip inside Hero */}
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 text-left">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Authorized Brands · Click Brand to Open Official Shade Cards
            </span>
            <button
              onClick={() => onNavigate('brands')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Brands</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {BRANDS_DATA.map((brand) => (
              <button
                key={brand.id}
                onClick={() => onOpenBrandShades(brand.id)}
                className="group p-3.5 rounded-2xl bg-white/85 hover:bg-white border border-slate-200/80 hover:border-orange-300 shadow-xs hover:shadow-md transition-all text-left flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                    {brand.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {brand.tagline}
                  </div>
                </div>
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0 ml-2"
                  style={{ backgroundColor: brand.accentHex }}
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
