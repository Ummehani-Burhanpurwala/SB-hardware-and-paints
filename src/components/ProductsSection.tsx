import React, { useState } from 'react';
import { PRODUCTS_DATA, ProductItem } from '../data/storeData.ts';
import { Star, ArrowRight, Check, X, ShieldCheck, Sparkles, Layers, MessageCircle, Lock, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

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
  const { user, isAuthenticated, requireAuth } = useAuth();

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

  const handleWhatsAppInquiry = (product: ProductItem) => {
    if (!isAuthenticated) {
      requireAuth(`Inquire on WhatsApp for ${product.name} (${product.brand})`);
      onSelectProductForInquiry(product.name);
      return;
    }

    // Direct WhatsApp with user details and requested template
    const text = encodeURIComponent(
      `Hello! 👋\nI’m interested in your products/services from SB Hardware & Paints. I’d like to know more about the available paints, prices, and offers.\n\nSpecifically inquiring about: ${product.name} (${product.brand})\nFrom: ${user?.name || 'Customer'}\n\nThank you!`
    );
    window.open(`https://wa.me/919890722385?text=${text}`, '_blank');
  };

  const handleInquireFromModal = (prod: ProductItem) => {
    setActiveModalProduct(null);
    if (!isAuthenticated) {
      requireAuth(`Quotation for ${prod.name}`);
      onSelectProductForInquiry(prod.name);
    } else {
      onSelectProductForInquiry(prod.name);
    }
  };

  return (
    <section id="products" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bestsellers & Popular Coatings
            </h2>
            <p className="text-sm text-slate-500 font-normal">
              Loved by thousands of homeowners, contractors and architects
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isAuthenticated && (
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-orange-500" />
                <span>Sign up to unlock direct WhatsApp rates</span>
              </span>
            )}
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => {
            const discounts = ['13% OFF', '11% OFF', '10% OFF', '15% OFF'];
            const badge = discounts[idx % discounts.length];

            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges & Image */}
                  <div className="relative aspect-square p-5 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center border-b border-slate-100/80">
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                      <span className="px-2 py-0.5 rounded-md bg-orange-600 text-white text-[10px] font-bold">
                        {badge}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                        Bestseller
                      </span>
                    </div>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-5 space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
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

                {/* Card Action Buttons: View Details & WhatsApp Inquiry */}
                <div className="p-4 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveModalProduct(product)}
                      className="inline-flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => handleWhatsAppInquiry(product)}
                      className="inline-flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xs transition-colors cursor-pointer"
                    >
                      {isAuthenticated ? <MessageCircle className="w-3.5 h-3.5 fill-white" /> : <Lock className="w-3.5 h-3.5" />}
                      <span>{isAuthenticated ? 'WhatsApp' : 'Inquire'}</span>
                    </button>
                  </div>
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
                <div className="sm:col-span-5 bg-slate-50 p-4 rounded-2xl flex items-center justify-center">
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    className="w-48 h-48 object-contain"
                  />
                </div>

                <div className="sm:col-span-7 space-y-3 text-left">
                  <h3 className="text-xl font-bold text-slate-900">{activeModalProduct.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {activeModalProduct.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 text-xs pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Sheen Finish</span>
                      <strong className="text-slate-800 font-semibold">{activeModalProduct.finish}</strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Available Sizes</span>
                      <strong className="text-slate-800 font-semibold">{activeModalProduct.packSizes?.join(', ') || '1L, 4L, 10L, 20L'}</strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Coverage</span>
                      <strong className="text-slate-800 font-semibold">{activeModalProduct.coverage}</strong>
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
                  onClick={() => handleWhatsAppInquiry(activeModalProduct)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold transition-all shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>{isAuthenticated ? 'Inquire on WhatsApp' : 'Sign Up to Chat'}</span>
                </button>
                <button
                  onClick={() => handleInquireFromModal(activeModalProduct)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold transition-all shadow-xs cursor-pointer text-center"
                >
                  Request Quote
                </button>
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="px-3 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold cursor-pointer"
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
