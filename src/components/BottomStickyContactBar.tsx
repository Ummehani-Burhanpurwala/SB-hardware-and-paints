import React from 'react';
import { Phone, MessageCircle, Navigation, FileText, Clock, MapPin } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData.ts';

interface BottomStickyContactBarProps {
  onOpenQuote: () => void;
}

export const BottomStickyContactBar: React.FC<BottomStickyContactBarProps> = ({ onOpenQuote }) => {
  return (
    <aside 
      aria-label="Direct store contact actions" 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.1)] px-3 py-2.5 sm:px-6 sm:py-3 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Info: Store Name & Hours (hidden on mobile, visible on tablet/desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-slate-900 leading-tight">
              SB Hardware & Paints • Pulgaon
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Mon–Sat 7:00 AM – 10:00 PM</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Call, WhatsApp, Get Directions, Get a Quote */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-2 sm:gap-3">
          
          {/* 1. Call Now */}
          <a
            href={`tel:${STORE_DETAILS.phoneRaw}`}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all"
          >
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">Call Store</span>
          </a>

          {/* 2. WhatsApp Chat */}
          <a
            href={STORE_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>

          {/* 3. Get Directions */}
          <a
            href={STORE_DETAILS.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200 shadow-2xs hover:shadow-xs transition-all"
          >
            <Navigation className="w-4 h-4 text-orange-600 shrink-0" />
            <span className="truncate">Directions</span>
          </a>

          {/* 4. Get a Quote */}
          <button
            onClick={onOpenQuote}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Get Quote</span>
          </button>

        </div>

      </div>
    </aside>
  );
};
