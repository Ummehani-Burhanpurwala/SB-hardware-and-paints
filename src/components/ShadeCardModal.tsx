import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Sparkles, Eye, ArrowUpRight } from 'lucide-react';
import { BRANDS_DATA, BrandInfo, STORE_DETAILS } from '../data/storeData.ts';

interface ShadeCardModalProps {
  brandId: string | null;
  onClose: () => void;
  onSelectBrand: (brandId: string) => void;
  onInquireShade: (shadeInfo: string) => void;
}

export const ShadeCardModal: React.FC<ShadeCardModalProps> = ({
  brandId,
  onClose,
  onSelectBrand,
  onInquireShade,
}) => {
  if (!brandId) return null;

  const currentBrand: BrandInfo = BRANDS_DATA.find((b) => b.id === brandId) || BRANDS_DATA[0];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const activeCategory = currentBrand.shadeCategories[selectedCategoryIndex] || currentBrand.shadeCategories[0];
  
  // Selected shade for live room preview
  const [selectedShade, setSelectedShade] = useState(activeCategory?.shades[0] || {
    name: 'Warm Terracotta',
    code: 'IND-2104',
    hex: '#C25E43',
    sheen: 'Soft Sheen',
    description: 'Deep, earthy terracotta accent tone for focal walls',
  });

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'living' | 'bedroom' | 'exterior'>('living');

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleInquire = () => {
    onInquireShade(`${currentBrand.name} - ${selectedShade.name} (${selectedShade.code})`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-2xs"
              style={{ backgroundColor: currentBrand.accentHex }}
            >
              {currentBrand.logoText.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-stone-900">{currentBrand.name} Shade Palette</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                  Certified
                </span>
              </div>
              <p className="text-xs text-stone-500">{currentBrand.tagline}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-xl transition-colors focus:outline-none cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Selector Tabs */}
        <div className="px-6 sm:px-8 py-2.5 bg-stone-100 border-b border-stone-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider whitespace-nowrap mr-1">
            Brand:
          </span>
          {BRANDS_DATA.map((brand) => (
            <button
              key={brand.id}
              onClick={() => {
                onSelectBrand(brand.id);
                setSelectedCategoryIndex(0);
                const firstShade = brand.shadeCategories[0]?.shades[0];
                if (firstShade) setSelectedShade(firstShade);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                brand.id === currentBrand.id
                  ? 'bg-stone-900 text-white shadow-2xs font-semibold'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Brand Info Banner */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-stone-600" />
                <span>Authorized Color Formulations</span>
              </div>
              <p className="text-xs text-stone-600 max-w-xl">
                {currentBrand.description} {currentBrand.pdfNote && `— ${currentBrand.pdfNote}`}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {currentBrand.officialResourceUrl && (
                <a
                  href={currentBrand.officialResourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  <span>Official Catalog</span>
                </a>
              )}
              <button
                onClick={handleInquire}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg cursor-pointer"
              >
                <span>Inquire This Shade</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
              </button>
            </div>
          </div>

          {/* Interactive Wall Visualizer */}
          <div className="rounded-2xl border border-stone-200 bg-stone-900 text-white p-5 overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-stone-400" />
                <h4 className="text-sm font-semibold text-white">Live Architectural Preview</h4>
                <span className="text-xs text-stone-400">
                  (<strong className="text-stone-200">{selectedShade.name}</strong> · {selectedShade.code})
                </span>
              </div>

              {/* Room type toggles */}
              <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-lg">
                <button
                  onClick={() => setPreviewMode('living')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${previewMode === 'living' ? 'bg-stone-100 text-stone-900 font-semibold' : 'text-stone-300 hover:text-white'}`}
                >
                  Living Room
                </button>
                <button
                  onClick={() => setPreviewMode('bedroom')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${previewMode === 'bedroom' ? 'bg-stone-100 text-stone-900 font-semibold' : 'text-stone-300 hover:text-white'}`}
                >
                  Bedroom
                </button>
                <button
                  onClick={() => setPreviewMode('exterior')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${previewMode === 'exterior' ? 'bg-stone-100 text-stone-900 font-semibold' : 'text-stone-300 hover:text-white'}`}
                >
                  Exterior
                </button>
              </div>
            </div>

            {/* Visualizer Frame */}
            <div 
              className="relative mt-4 h-48 sm:h-60 rounded-xl overflow-hidden border border-stone-800 flex flex-col justify-end p-5 transition-colors duration-500" 
              style={{ backgroundColor: selectedShade.hex }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-white">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/50 text-[10px] font-mono text-stone-300 backdrop-blur-xs">
                    <span>{selectedShade.code}</span>
                    <span>•</span>
                    <span>{selectedShade.sheen}</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">{selectedShade.name}</div>
                  <p className="text-xs text-stone-200 max-w-md">{selectedShade.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(selectedShade.code)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-xs text-xs font-medium transition-colors cursor-pointer"
                  >
                    {copiedCode === selectedShade.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === selectedShade.code ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Palette Categories for Current Brand */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-stone-800 uppercase tracking-wider">
                Select Shade Category
              </h4>
              <span className="text-xs text-stone-500">
                Click any swatch to apply to wall
              </span>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {currentBrand.shadeCategories.map((cat, idx) => (
                <button
                  key={cat.categoryName}
                  onClick={() => setSelectedCategoryIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategoryIndex === idx
                      ? 'bg-stone-900 text-white shadow-2xs font-semibold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat.categoryName}
                </button>
              ))}
            </div>

            {/* Swatch Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {activeCategory?.shades.map((shade) => {
                const isSelected = selectedShade.code === shade.code;
                return (
                  <div
                    key={shade.code}
                    onClick={() => setSelectedShade(shade)}
                    className={`group relative rounded-xl border p-3 cursor-pointer transition-all hover:border-stone-400 ${
                      isSelected
                        ? 'border-stone-900 bg-stone-50 ring-2 ring-stone-900/10'
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div 
                      className="w-full h-18 rounded-lg shadow-inner mb-2.5 relative flex items-start justify-end p-1.5 transition-transform group-hover:scale-102 border border-black/5"
                      style={{ backgroundColor: shade.hex }}
                    >
                      {isSelected && (
                        <div className="bg-stone-950/80 text-white rounded-full p-1 shadow-xs">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-0.5 text-left">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
                          {shade.name}
                        </span>
                        <span className="font-mono text-[10px] text-stone-500">{shade.code}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-stone-400">
                        <span>{shade.sheen}</span>
                        <span className="font-mono text-[10px]">{shade.hex}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-3.5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            Need exact computerized shade mixing? Contact SB Hardware & Paints via Get in Touch.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleInquire}
              className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium transition-colors cursor-pointer"
            >
              Inquire via Get in Touch
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-200 font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
