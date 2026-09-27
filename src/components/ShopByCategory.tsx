import React from 'react';
import { Home, Shield, Droplets, Layers, Brush, Hammer, Palette, ArrowRight } from 'lucide-react';

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
  const categories = [
    { id: 'interior', name: 'Interior Paints', icon: Home },
    { id: 'exterior', name: 'Exterior Paints', icon: Shield },
    { id: 'primers', name: 'Primers', icon: Droplets },
    { id: 'putty', name: 'Wall Putty', icon: Layers },
    { id: 'wood', name: 'Wood Paint', icon: Brush },
    { id: 'metal', name: 'Metal Paint', icon: Hammer },
    { id: 'accessories', name: 'Accessories', icon: Palette },
  ];

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header matching Screenshot 3 */}
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-1 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-500 font-normal">
              Find exactly what your project needs
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid matching Screenshot 3 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all cursor-pointer group text-center min-h-[130px] ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/40 shadow-xs'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-2xs'
                }`}
              >
                {/* Round icon badge */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                    isSelected
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-slate-100/80 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>

                <span
                  className={`text-xs font-semibold tracking-tight transition-colors ${
                    isSelected ? 'text-orange-600 font-bold' : 'text-slate-700 group-hover:text-slate-950'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
