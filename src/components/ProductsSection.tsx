import React, { useState } from 'react';
import { PRODUCTS_DATA, ProductItem } from '../data/storeData.ts';
import { Star, ArrowRight, Check, X, ShieldCheck, Sparkles, Layers } from 'lucide-react';

interface ProductsSectionProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectProductForInquiry: (productName: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectProductForInquiry,
}) => {
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'interior', label: 'Interior Paints' },
    { id: 'exterior', label: 'Exterior Paints' },
    { id: 'putty', label: 'Wall Putty' },
    { id: 'primer', label: 'Primers' },
    { id: 'distemper', label: 'Distemper' },
    { id: 'enamels', label: 'Enamels & Gloss' },
    { id: 'waterproofing', label: 'Waterproofing' },
    { id: 'tools', label: 'Accessories & Tools' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter((p) => {
        if (selectedCategory === 'wood' || selectedCategory === 'metal') {
          return p.category === 'enamels' || p.category === 'interior';
        }
        if (selectedCategory === 'accessories') {
          return p.category === 'tools';
        }
        return p.category === selectedCategory;
      });

  const handleInquireFromModal = (prod: ProductItem) => {
    setActiveModalProduct(null);
    onSelectProductForInquiry(prod.name);
  };

  return (
    <section id="products" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header matching Screenshot 3 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bestsellers & Popular Coatings
            </h2>
            <p className="text-sm text-slate-500 font-normal">
              Loved by thousands of homeowners, contractors and architects
            </p>
          </div>

          {/* Quick Category filter buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid matching Screenshot 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => {
            const discounts = ['13% OFF', '11% OFF', '10% OFF', '15% OFF', '12% OFF', '14% OFF'];
            const discount = discounts[idx % discounts.length];

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-orange-600 text-white text-[10px] font-extrabold uppercase tracking-wide">
                      {discount}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wide">
                      Bestseller
                    </span>
                  </div>

                  {/* Product Packaging Image */}
                  <div className="relative w-full h-56 bg-slate-50 flex items-center justify-center p-4 overflow-hidden border-b border-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-44 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-2 text-left">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-orange-600 uppercase tracking-wider text-[11px]">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>4.9</span>
                        <span className="text-slate-400 font-normal text-[11px]">(120+)</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Finish & Packs */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">
                        {product.finish}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">
                        {product.packSizes?.join(', ') || '1L, 4L, 10L, 20L'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 hover:bg-orange-600 text-white transition-colors cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Product Details Modal */}
      {activeModalProduct && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalProduct(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
                  {activeModalProduct.brand}
                </span>
                <span className="text-xs text-slate-500 font-medium">Authorized Spec Sheet</span>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-slate-100">
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    className="max-h-56 w-auto object-contain"
                  />
                </div>

                <div className="sm:col-span-7 space-y-3 text-left">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                    {activeModalProduct.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeModalProduct.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Finish Sheen</span>
                      <strong className="text-slate-800 font-semibold">{activeModalProduct.finish}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Typical Coverage</span>
                      <strong className="text-slate-800 font-semibold">{activeModalProduct.coverage}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Available Packs</span>
                      <strong className="text-slate-800 font-semibold">{activeModalProduct.packSizes?.join(', ')}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Ideal Surface</span>
                      <strong className="text-slate-800 font-semibold">{activeModalProduct.idealFor}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Key Advantages */}
              <div className="space-y-2 text-left">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Features & Application Advantages:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {activeModalProduct.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500">
                100% Genuine authorized factory seal. Custom tinting available in store.
              </span>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => handleInquireFromModal(activeModalProduct)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold transition-all shadow-xs cursor-pointer text-center"
                >
                  Inquire About This Product
                </button>
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
