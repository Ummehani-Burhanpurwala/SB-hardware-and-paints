import React, { useState } from 'react';
import { INSPIRATION_GALLERY, GalleryItem } from '../data/storeData.ts';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Spaces' },
    { id: 'living', label: 'Living Rooms' },
    { id: 'bedroom', label: 'Bedrooms' },
    { id: 'exterior', label: 'Exteriors' },
    { id: 'commercial', label: 'Showroom' },
  ];

  const filtered = activeFilter === 'all'
    ? INSPIRATION_GALLERY
    : INSPIRATION_GALLERY.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-white/30 backdrop-blur-sm border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 bg-white/70 px-3 py-1 rounded-full border border-white/60">
            Visual Exploration
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Inspiration Gallery
          </h2>
          <p className="text-sm sm:text-base text-stone-700 font-normal">
            Browse contemporary interior accents, calm bedroom suites, and all-weather exterior facades. Additional project visuals are being continuously added to this gallery.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-900 border border-white/70 shadow-2xs'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-white/80 bg-white/90 backdrop-blur-md overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-stone-700 text-xs font-medium border border-stone-200/80">
                  {item.tag}
                </div>
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="font-medium text-stone-600">{item.shades}</span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
