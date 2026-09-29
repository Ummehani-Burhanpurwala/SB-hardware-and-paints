import React from 'react';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/storeData.ts';

interface ShopByCategoryProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onViewAll: () => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewAll,
}) => {
  return (
    <section id="categories" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-1 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Pulgaon Store Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-500 font-normal">
              Direct factory-sealed paints, primers, putty, and coatings for every surface
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer group"
          >
            <span>View All ({CATEGORIES_LIST.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid with Real Images from JSON */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer group text-left relative ${
                  isSelected
                    ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md bg-orange-50/20'
                    : 'border-slate-200/90 bg-white hover:border-orange-300 hover:shadow-md'
                }`}
              >
                {/* Real Category Image Container */}
                <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/paint_can_interior_1790513290257.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-900 shadow-xs">
                    {cat.badge}
                  </span>

                  {/* Title overlay on bottom of image */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <h3 className="font-bold text-sm leading-tight drop-shadow-xs">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[11px] font-semibold text-orange-600 border-t border-slate-100">
                    <span className="text-slate-400 text-[10px]">{cat.productCount}</span>
                    <span className="flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      Browse →
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
