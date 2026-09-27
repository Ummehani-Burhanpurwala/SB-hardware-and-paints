import React from 'react';
import { Phone, MessageCircle, FileText, ArrowRight, Palette, Sparkles, CheckCircle2, ShieldCheck, Truck, Users, Lock } from 'lucide-react';
import { STORE_DETAILS, BRANDS_DATA } from '../data/storeData.ts';
import { useAuth } from '../context/AuthContext.tsx';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenBrandShades: (brandId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenBrandShades }) => {
  const { isAuthenticated, requireAuth } = useAuth();

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
                SB HARDWARE & PAINTS • PULGAON
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
                Your trusted local retailer for 100% genuine paints, primers, waterproof coatings, and construction hardware in Pulgaon. Authorized dealer for Indigo, Asian Paints, Shalimar, Astral, and Raj Yog.
              </p>
            </div>

            {/* Direct CTAs: Call, WhatsApp, Get Quote, Explore Colours */}
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
                <span>Live Color Preview</span>
              </button>
            </div>

            {/* Quick Trust Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Original Sealed Cans</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automated Computer Tinting</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Doorstep Delivery in Pulgaon</span>
              </div>
            </div>

          </div>

          {/* Right Visual Column (Col 8-12): Beautiful Architectural Room + Color Palette overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl border-4 border-white/80 bg-white aspect-[4/3] sm:aspect-[16/13] group">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
                alt="Beautiful Modern Home Interior by SB Hardware & Paints"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                loading="eager"
              />

              {/* Floating Shade Visualizer Pill */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-white/60 flex items-center gap-2.5">
                <div className="flex -space-x-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#EA580C] ring-2 ring-white" />
                  <span className="w-4 h-4 rounded-full bg-[#EC4899] ring-2 ring-white" />
                  <span className="w-4 h-4 rounded-full bg-[#3B82F6] ring-2 ring-white" />
                  <span className="w-4 h-4 rounded-full bg-[#10B981] ring-2 ring-white" />
                </div>
                <div className="text-[11px] font-bold text-slate-900">
                  2,000+ Paint Shades
                </div>
              </div>

              {/* Floating Bottom Card: Interactive preview invite */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/70">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                      <span>Interactive Room Preview</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-normal">
                      Click any shade below to see how it looks on living & bedroom walls.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('colors')}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    Try Visualizer →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Featured Brands Strip inside Hero */}
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Authorized Brands · Click Brand to Open Official Shade Cards
            </span>
            <button
              onClick={() => onNavigate('brands')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Shade Cards</span>
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
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: brand.accentHex }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Featured Store Services Highlights */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Expert Guidance</div>
              <div className="text-[11px] text-slate-500">Free paint & surface consultation</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Home Delivery</div>
              <div className="text-[11px] text-slate-500">Timely delivery to your site</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Quality Painters</div>
              <div className="text-[11px] text-slate-500">Experienced painter referrals</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Quotation Support</div>
              <div className="text-[11px] text-slate-500">Accurate bill of quantities</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
