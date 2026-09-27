import React, { useState } from 'react';
import { Palette, Check, Copy, ArrowUpRight, Eye, Sparkles } from 'lucide-react';
import { DESIGNER_SHADES, ColorShade } from '../data/storeData.ts';

interface ColorShadesSectionProps {
  onInquireShade: (shadeInfo: string) => void;
}

export const ColorShadesSection: React.FC<ColorShadesSectionProps> = ({ onInquireShade }) => {
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [activeShade, setActiveShade] = useState<ColorShade>(DESIGNER_SHADES[0]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [previewRoom, setPreviewRoom] = useState<'living' | 'bedroom' | 'dining'>('living');

  const families = [
    { id: 'all', label: 'All 24 Shades' },
    { id: 'warm', label: 'Warm & Earthy' },
    { id: 'cool', label: 'Ocean Blues' },
    { id: 'green', label: 'Lush Greens' },
    { id: 'regal', label: 'Regal Jewels' },
    { id: 'pastel', label: 'Pastel Light' },
  ];

  const filteredShades = selectedFamily === 'all'
    ? DESIGNER_SHADES
    : DESIGNER_SHADES.filter((s) => s.family === selectedFamily);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="colors" className="py-20 bg-white/30 backdrop-blur-sm border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-xs text-stone-800 text-xs font-semibold uppercase tracking-wider border border-white/60">
            <Palette className="w-3.5 h-3.5 text-pink-600" />
            <span>Interactive Color Atelier</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Explore Designer Paint Color Shades
          </h2>

          <p className="text-base text-stone-700 font-normal">
            Touch any vibrant shade below to test it live on our architectural wall preview. Over 2,000+ custom computerized formulas available at SB Hardware & Paints.
          </p>
        </div>

        {/* Live Interactive Wall Preview Box - Big, Beautiful & Colorful */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/70 mb-12 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full border border-black/10 shadow-xs transition-colors duration-500"
                style={{ backgroundColor: activeShade.hex }}
              />
              <div>
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span>{activeShade.name}</span>
                  <span className="text-xs font-mono text-stone-500 font-normal">({activeShade.code})</span>
                </h3>
                <span className="text-xs text-stone-500">
                  {activeShade.familyName} · Sheen: <strong>{activeShade.sheen}</strong>
                </span>
              </div>
            </div>

            {/* Room Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-stone-200/70 p-1.5 rounded-xl text-xs font-medium text-stone-700">
              <span className="text-[11px] font-semibold text-stone-500 px-2 hidden sm:inline">Preview:</span>
              <button
                onClick={() => setPreviewRoom('living')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  previewRoom === 'living' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'hover:text-stone-900'
                }`}
              >
                Living Room
              </button>
              <button
                onClick={() => setPreviewRoom('bedroom')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  previewRoom === 'bedroom' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'hover:text-stone-900'
                }`}
              >
                Bedroom
              </button>
              <button
                onClick={() => setPreviewRoom('dining')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  previewRoom === 'dining' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'hover:text-stone-900'
                }`}
              >
                Dining Accent
              </button>
            </div>
          </div>

          {/* Architectural Wall Display Canvas */}
          <div
            className="relative mt-6 h-64 sm:h-80 rounded-2xl overflow-hidden shadow-inner flex flex-col justify-end p-6 sm:p-8 transition-colors duration-500"
            style={{ backgroundColor: activeShade.hex }}
          >
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-xs text-xs font-mono">
                  <span>{activeShade.hex}</span>
                  <span>•</span>
                  <span>{activeShade.code}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold">{activeShade.name}</div>
                <p className="text-xs sm:text-sm text-stone-200 max-w-lg leading-relaxed">
                  {activeShade.description}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleCopy(activeShade.code)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-xs text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedCode === activeShade.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === activeShade.code ? 'Copied' : 'Copy Code'}</span>
                </button>

                <button
                  onClick={() => onInquireShade(`${activeShade.name} (${activeShade.code})`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs transition-colors shadow-xs cursor-pointer"
                >
                  <span>Inquire this Color</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Color Family Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {families.map((fam) => {
            const isSelected = selectedFamily === fam.id;
            return (
              <button
                key={fam.id}
                onClick={() => setSelectedFamily(fam.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {fam.label}
              </button>
            );
          })}
        </div>

        {/* Swatches Grid - Large, Rich, Vivid & Colorful */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {filteredShades.map((shade) => {
            const isActive = activeShade.code === shade.code;
            return (
              <div
                key={shade.code}
                onClick={() => setActiveShade(shade)}
                className={`group rounded-2xl p-3 border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'border-stone-900 bg-stone-50 ring-2 ring-stone-900/10 shadow-xs scale-102'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-2xs'
                }`}
              >
                {/* Big Color Block */}
                <div
                  className="w-full h-24 rounded-xl shadow-xs mb-2.5 border border-black/5 relative flex items-start justify-end p-1.5 transition-transform group-hover:scale-102"
                  style={{ backgroundColor: shade.hex }}
                >
                  {isActive && (
                    <div className="bg-black/60 text-white rounded-full p-1 shadow-xs backdrop-blur-xs">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {/* Shade Info */}
                <div className="space-y-0.5 text-left">
                  <div className="text-xs font-bold text-stone-900 group-hover:text-stone-700 truncate">
                    {shade.name}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                    <span>{shade.code}</span>
                    <span>{shade.hex}</span>
                  </div>
                  <div className="text-[10px] text-stone-400 font-medium pt-0.5">
                    {shade.sheen}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Tinting Bottom Note */}
        <div className="mt-12 p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-stone-600">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-stone-700 shrink-0" />
            <span>
              Looking for a specific color sample from fabric, tile, or photograph? We formulate exact computerized matches.
            </span>
          </div>
          <button
            onClick={() => onInquireShade('Custom Color Matching & Tinting')}
            className="px-4 py-2 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            Inquire Custom Color
          </button>
        </div>

      </div>
    </section>
  );
};
