import React from 'react';
import { Palette, ExternalLink, ChevronRight, CheckCircle2 } from 'lucide-react';
import { BRANDS_DATA } from '../data/storeData.ts';

interface BrandsSectionProps {
  onOpenBrandShades: (brandId: string) => void;
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ onOpenBrandShades }) => {
  return (
    <section id="brands" className="py-20 bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold tracking-wider uppercase border border-purple-200">
            <Palette className="w-3.5 h-3.5 text-purple-600" />
            <span>Authorized Dealership & Shade Cards</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Premium Brands & Shade Cards
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Click any manufacturer below to explore certified shade catalogs, color codes, and preview hues directly on an interactive architectural wall.
          </p>
        </div>

        {/* Brand Cards Grid with Real Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BRANDS_DATA.map((brand) => {
            const allShades = brand.shadeCategories?.flatMap((c) => c.shades) || [];
            const previewShades = allShades.slice(0, 5);

            return (
              <div
                key={brand.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-left"
              >
                <div>
                  {/* Brand Visual Banner Image from JSON */}
                  {brand.brandImage && (
                    <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                      <img
                        src={brand.brandImage}
                        alt={`${brand.name} Architectural Finish`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/paint_can_interior_1790513290257.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                      
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-bold text-slate-900 shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Authorized Depot</span>
                      </span>

                      <div className="absolute bottom-3 left-4 text-white">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                          {brand.shadeCount || 'Official Palette'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Brand Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-xs shrink-0"
                        style={{ backgroundColor: brand.accentHex }}
                      >
                        {brand.logoText.slice(0, 4)}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                          {brand.name}
                        </h3>
                        <p className="text-xs font-bold text-orange-600">{brand.tagline}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {brand.description}
                    </p>

                    {/* Color Swatches preview */}
                    {previewShades.length > 0 && (
                      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 mb-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                          <span>Certified Shades</span>
                          <span className="text-slate-400 font-normal">{allShades.length} Colors</span>
                        </div>

                        <div className="grid grid-cols-5 gap-1.5">
                          {previewShades.map((s) => (
                            <div key={s.code} className="text-center group/swatch">
                              <div
                                className="w-full h-9 rounded-lg border border-black/10 shadow-2xs transition-transform group-hover/swatch:scale-108"
                                style={{ backgroundColor: s.hex }}
                                title={`${s.name} (${s.code})`}
                              />
                              <span className="text-[9px] text-slate-600 font-medium truncate block mt-1">
                                {s.name.split(' ')[0]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => onOpenBrandShades(brand.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>Open Official Shade Card</span>
                  </button>

                  {brand.officialResourceUrl && (
                    <a
                      href={brand.officialResourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-semibold text-[11px] transition-colors flex items-center justify-center gap-1 text-center"
                    >
                      <span>Manufacturer Website</span>
                      <ExternalLink className="w-3 h-3" />
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
