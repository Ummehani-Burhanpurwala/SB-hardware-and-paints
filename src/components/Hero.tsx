import React from 'react';
import { ArrowRight, Palette } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenBrandShades?: (brandId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative bg-white pt-8 pb-16 lg:pt-14 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column (Col 1-6 / Col 1-7) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Pill Badge matching Screenshot 2 */}
            <div className="inline-flex items-center">
              <span className="px-3.5 py-1.5 rounded-full bg-orange-100/80 text-orange-600 text-[11px] sm:text-xs font-bold tracking-wider uppercase">
                COLOURS A BRIGHTER TOMORROW
              </span>
            </div>

            {/* Main Headline matching Screenshot 2 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Bring Colour to <br />
              <span className="text-orange-600">Your World</span>
            </h1>

            {/* Subtitle matching Screenshot 2 */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              Premium paints for brighter, safer and more beautiful spaces. Shop top brands with expert advice and fast, reliable delivery.
            </p>

            {/* Action Buttons matching Screenshot 2 */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('products')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('colors')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <span>Explore Colours</span>
              </button>
            </div>

          </div>

          {/* Right Column: Architectural Modern Room matching Screenshot 2 */}
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/13] border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Scandinavian living room with warm mustard accent wall, grey sofa, and wooden floor"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
