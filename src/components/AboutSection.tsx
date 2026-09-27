import React from 'react';
import { STORE_DETAILS } from '../data/storeData.ts';
import { ShieldCheck, Clock, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white/30 backdrop-blur-sm border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-white/80 shadow-lg group">
              <img
                src="/src/assets/images/storefront_sb_paints_1790511702998.jpg"
                alt="SB Hardware & Paints Showroom"
                className="w-full h-80 object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold">
                  Proprietor & Founder
                </span>
                <h3 className="text-xl font-bold">{STORE_DETAILS.owner}</h3>
                <p className="text-xs text-stone-300">SB Hardware & Paints</p>
              </div>
            </div>

            {/* Quiet credentials badge */}
            <div className="p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-white/80 text-xs text-stone-700 space-y-2 shadow-md">
              <div className="flex items-center gap-2 font-semibold text-stone-900">
                <ShieldCheck className="w-4 h-4 text-stone-700" />
                <span>Our Quality Commitment</span>
              </div>
              <ul className="space-y-1 pl-4 list-disc text-stone-600">
                <li>100% factory-sealed original cans with manufacturer seals intact</li>
                <li>Digital automated pigment dispensing for shade accuracy</li>
                <li>Early 7:00 AM dispatch for contractors and painting teams</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Narrative Story (Col 6-12) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Store Story
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                About SB Hardware & Paints
              </h2>
            </div>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Founded and managed by <strong>Mr. Hakimuddin Saifuddin Bohra</strong>, SB Hardware & Paints is an established retail destination for premium architectural coatings, white cement putty, and waterproofing solutions.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              We work directly with authorized brand networks — including Indigo Paints, Asian Paints, Shalimar, Astral, and Raj Yog — ensuring that every gallon of paint and bag of polymer putty meets manufacturer performance benchmarks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl border border-white/80 bg-white/85 backdrop-blur-md space-y-1 shadow-md">
                <h4 className="font-bold text-sm text-stone-900">For Homeowners & Designers</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Clear shade card catalogs, unbiased finish recommendations, and trustworthy painting advice.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/80 bg-white/85 backdrop-blur-md space-y-1 shadow-md">
                <h4 className="font-bold text-sm text-stone-900">For Contractors & Builders</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Bulk 20L containers, early morning 7:00 AM pickup, reliable site delivery, and technical backing.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-6 text-xs text-stone-500">
              <div className="flex items-center gap-1.5 font-medium text-stone-700">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>Near Pulgaon Station Chowk, Nachangaon Road</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-stone-700">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                <span>Mon–Sat: 7:00 AM – 10:00 PM</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
