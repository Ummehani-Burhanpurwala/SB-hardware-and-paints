import React, { useState } from 'react';
import { Palette, Check, Copy, ArrowUpRight, Sparkles, Home, Eye, SunMedium, Layers } from 'lucide-react';
import { DESIGNER_SHADES, ColorShade } from '../data/storeData.ts';

interface ColorShadesSectionProps {
  onInquireShade: (shadeInfo: string) => void;
}

export const ColorShadesSection: React.FC<ColorShadesSectionProps> = ({ onInquireShade }) => {
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [activeShade, setActiveShade] = useState<ColorShade>(DESIGNER_SHADES[0]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [previewRoom, setPreviewRoom] = useState<'living' | 'bedroom' | 'facade'>('living');

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
    <section id="colors" className="py-16 sm:py-20 bg-gradient-to-b from-orange-50/50 via-pink-50/30 to-purple-50/50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xs border border-orange-200 text-orange-950 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Interactive Color Visualizer</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Preview Colors on Real Walls
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Click any vibrant shade below to test it live on our architectural room simulator. Over 2,000+ computer-tinted shades mixed instantly at <strong>SB Hardware & Paints</strong>.
          </p>
        </div>

        {/* Live Interactive Wall Simulator Display */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-xl mb-12">
          
          {/* Top Bar inside Preview */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl shadow-inner border border-black/10 transition-colors duration-500 shrink-0"
                style={{ backgroundColor: activeShade.hex }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900">{activeShade.name}</h3>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-bold">
                    {activeShade.code}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {activeShade.familyName} • Sheen: <strong className="text-slate-800">{activeShade.sheen}</strong> • Hex: {activeShade.hex}
                </div>
              </div>
            </div>

            {/* Room Switcher Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold text-slate-600 self-stretch sm:self-auto justify-between sm:justify-start">
              <button
                onClick={() => setPreviewRoom('living')}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  previewRoom === 'living' ? 'bg-white text-orange-600 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Living Room
              </button>
              <button
                onClick={() => setPreviewRoom('bedroom')}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  previewRoom === 'bedroom' ? 'bg-white text-orange-600 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Bedroom
              </button>
              <button
                onClick={() => setPreviewRoom('facade')}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  previewRoom === 'facade' ? 'bg-white text-orange-600 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Exterior Wall
              </button>
            </div>
          </div>

          {/* Realistic Architectural Visualizer Canvas */}
          <div className="relative mt-6 rounded-2xl overflow-hidden shadow-inner min-h-[340px] sm:min-h-[420px] flex flex-col justify-between transition-colors duration-700">
            
            {/* Dynamic Wall Background Layer */}
            <div
              className="absolute inset-0 transition-colors duration-700"
              style={{ backgroundColor: activeShade.hex }}
            />

            {/* Architectural Room Lighting & Room Silhouette Layer */}
            {previewRoom === 'living' && (
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-end">
                {/* Ceiling light cone */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-b from-white/30 to-transparent blur-2xl" />
                
                {/* Wall Decor Mockup: Artwork Frame */}
                <div className="absolute top-8 left-12 w-28 sm:w-36 h-36 sm:h-44 rounded-lg bg-white/90 shadow-xl border-4 border-slate-900/40 p-2 flex flex-col items-center justify-center text-center">
                  <div className="w-full h-full bg-slate-100 rounded flex items-center justify-center p-2 text-[10px] text-slate-400 font-serif italic">
                    &ldquo;Modern Living&rdquo;
                  </div>
                </div>

                {/* Wall Sconce lamp glow */}
                <div className="absolute top-16 right-16 w-8 h-8 rounded-full bg-amber-200 blur-md opacity-80" />

                {/* Floor and Modern Furniture Silhouette */}
                <div className="relative w-full">
                  {/* Wooden flooring base */}
                  <div className="h-20 sm:h-24 bg-gradient-to-r from-[#8B5A2B] via-[#A0522D] to-[#6B4226] border-t-4 border-[#5c371d] shadow-2xl relative">
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Sofa Illustration Overlay */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-28 sm:h-36 bg-slate-900/90 backdrop-blur-sm rounded-t-3xl shadow-2xl border-t-2 border-slate-700/60 p-4 flex flex-col justify-between">
                    <div className="flex justify-around items-center pt-2">
                      <div className="w-16 sm:w-20 h-10 rounded-xl bg-orange-500/80 shadow-inner" />
                      <div className="w-16 sm:w-20 h-10 rounded-xl bg-white/20 shadow-inner" />
                      <div className="w-16 sm:w-20 h-10 rounded-xl bg-orange-500/80 shadow-inner" />
                    </div>
                    <div className="text-center text-[11px] font-bold text-slate-300">
                      Contemporary Sofa Lounge
                    </div>
                  </div>
                </div>
              </div>
            )}

            {previewRoom === 'bedroom' && (
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-end">
                {/* Ambient warm lamp light */}
                <div className="absolute top-10 right-1/4 w-48 h-48 bg-amber-100/30 rounded-full blur-3xl" />
                
                {/* Wall Panel Accent Lines */}
                <div className="absolute inset-x-0 top-0 bottom-24 flex justify-around opacity-20">
                  <div className="w-px h-full bg-white" />
                  <div className="w-px h-full bg-white" />
                  <div className="w-px h-full bg-white" />
                </div>

                {/* Bedroom Headboard & Floor */}
                <div className="relative w-full">
                  <div className="h-20 sm:h-24 bg-gradient-to-r from-stone-800 to-stone-900 border-t-2 border-stone-700" />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-80 sm:w-[420px] h-32 bg-stone-900/95 rounded-t-2xl shadow-2xl p-4 flex flex-col justify-end text-center">
                    <div className="text-[11px] font-bold text-stone-300">
                      Master Suite Headboard Accent Wall
                    </div>
                  </div>
                </div>
              </div>
            )}

            {previewRoom === 'facade' && (
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-end">
                {/* Daylight sun flare */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl" />
                
                {/* Window with architectural framing */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 sm:w-60 h-36 sm:h-44 bg-sky-200/70 border-8 border-white rounded-lg shadow-2xl overflow-hidden flex items-center justify-center">
                  <div className="w-full h-1 bg-white" />
                  <div className="absolute w-1 h-full bg-white" />
                </div>

                {/* Ground foundation */}
                <div className="h-16 sm:h-20 bg-stone-800 border-t-4 border-stone-600" />
              </div>
            )}

            {/* Top Info Tag on Canvas */}
            <div className="relative z-10 p-4 sm:p-6 flex items-start justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-mono font-bold shadow-md">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeShade.hex }} />
                <span>{activeShade.name} • {activeShade.code}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold shadow-sm">
                <Eye className="w-3.5 h-3.5 text-orange-600" />
                <span>Simulated Finish: {activeShade.sheen}</span>
              </div>
            </div>

            {/* Bottom Actions Floating Overlay */}
            <div className="relative z-10 p-4 sm:p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-black">{activeShade.name}</div>
                <p className="text-xs sm:text-sm text-slate-200 max-w-lg leading-relaxed font-normal">
                  {activeShade.description}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => handleCopy(activeShade.code)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold transition-all cursor-pointer"
                >
                  {copiedCode === activeShade.code ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode === activeShade.code ? 'Copied' : 'Copy Code'}</span>
                </button>

                <button
                  onClick={() => onInquireShade(`${activeShade.name} (${activeShade.code})`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
                >
                  <span>Inquire this Color</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Color Family Filter Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {families.map((fam) => {
            const isSelected = selectedFamily === fam.id;
            return (
              <button
                key={fam.id}
                onClick={() => setSelectedFamily(fam.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {fam.label}
              </button>
            );
          })}
        </div>

        {/* Swatches Grid - 24 Designer Shades */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {filteredShades.map((shade) => {
            const isActive = activeShade.code === shade.code;
            return (
              <div
                key={shade.code}
                onClick={() => setActiveShade(shade)}
                className={`group rounded-2xl p-3 border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-500/20 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {/* Big Color Swatch Tile */}
                <div
                  className="w-full h-24 rounded-xl shadow-xs mb-2.5 border border-black/5 relative flex items-start justify-end p-2 transition-transform group-hover:scale-102"
                  style={{ backgroundColor: shade.hex }}
                >
                  {isActive && (
                    <div className="bg-black/70 text-white rounded-full p-1 shadow-sm backdrop-blur-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Shade Information */}
                <div className="space-y-0.5 text-left">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-orange-600 truncate transition-colors">
                    {shade.name}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{shade.code}</span>
                    <span>{shade.hex}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium pt-0.5">
                    {shade.sheen}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
