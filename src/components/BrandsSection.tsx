import React from 'react';
import { Palette, ExternalLink, ChevronRight } from 'lucide-react';
import { BRANDS_DATA } from '../data/storeData.ts';

interface BrandsSectionProps {
  onOpenBrandShades: (brandId: string) => void;
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ onOpenBrandShades }) => {
  return (
    <section id="brands" className="py-18 bg-white/30 backdrop-blur-sm border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 bg-white/70 px-3 py-1 rounded-full border border-white/60">
            Authorized Dealership
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Premium Brands & Shade Cards
          </h2>
          <p className="text-sm sm:text-base text-stone-700 font-normal">
            Click any manufacturer below to explore official shade cards, certified color codes, and preview hues on an interactive wall.
          </p>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDS_DATA.map((brand) => {
            const allShades = brand.shadeCategories.flatMap((c) => c.shades);
            const previewShades = allShades.slice(0, 5);

            return (
              <div
                key={brand.id}
                className="bg-white/85 backdrop-blur-md rounded-2xl border border-white/80 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group"
              >
                <div>
                  {/* Brand Header */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-2xs"
                        style={{ backgroundColor: brand.accentHex }}
                      >
                        {brand.logoText.slice(0, 3)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                          {brand.name}
                        </h3>
                        <span className="text-xs text-stone-500 font-medium">Authorized Retailer</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-stone-600 mb-1.5">{brand.tagline}</p>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed mb-5">
                    {brand.description}
                  </p>

                  {/* Swatches preview */}
                  <div className="bg-white rounded-xl p-3.5 mb-5 border border-stone-200">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2.5">
                      <span>Official Swatches</span>
                      <span className="text-stone-400 font-normal">{allShades.length} Colors</span>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {previewShades.map((s) => (
                        <div key={s.code} className="text-center group/swatch">
                          <div
                            className="w-full h-11 rounded-lg border border-black/10 shadow-2xs transition-transform group-hover/swatch:scale-105"
                            style={{ backgroundColor: s.hex }}
                            title={`${s.name} (${s.code})`}
                          />
                          <span className="text-[10px] text-stone-600 font-medium truncate block mt-1">
                            {s.name.split(' ')[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-stone-200 flex items-center gap-2">
                  <button
                    onClick={() => onOpenBrandShades(brand.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-medium transition-all cursor-pointer"
                  >
                    <Palette className="w-3.5 h-3.5 text-stone-400" />
                    <span>Open Shade Card</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>

                  {brand.officialResourceUrl && brand.officialResourceUrl !== '#' && (
                    <a
                      href={brand.officialResourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-500 transition-colors"
                      title={`Visit ${brand.name} official resource`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
