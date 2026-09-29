import React from 'react';
import { STORE_DETAILS, WEBSITE_DATA } from '../data/storeData.ts';
import { ShieldCheck, Award, Sparkles, CheckCircle2, Quote } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const about = WEBSITE_DATA.about;

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Visual Storefront & Quality Pledge (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
              <img
                src={about.storefrontImage}
                alt="SB Hardware & Paints Showroom in Pulgaon"
                className="w-full h-84 object-cover group-hover:scale-103 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/hero_paint_store_1790511674504.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white text-left">
                <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-amber-300 font-bold mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Founder & Proprietor</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">{STORE_DETAILS.owner}</h3>
                <p className="text-xs text-slate-300">{STORE_DETAILS.name} • {STORE_DETAILS.experience}</p>
              </div>
            </div>

            {/* Quality Commitment Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 space-y-2.5 shadow-xs text-left">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Our Factory-Direct Guarantee</span>
              </div>
              <ul className="space-y-1.5 pl-1 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% sealed original cans straight from manufacturer company depots</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Automated spectrophotometer color tinting matching 10,000+ shades</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Early 7:00 AM dispatch for contractors and painting teams</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Narrative Story & Highlights (Col 6-12) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{about.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {about.title}
              </h2>
            </div>

            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {about.lead}
            </p>

            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              {about.story.map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Owner Quote Box */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
              <Quote className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-medium text-amber-950 italic leading-relaxed">
                "{about.ownerQuote}"
                <span className="block not-italic text-xs font-bold text-amber-800 mt-1">
                  — {STORE_DETAILS.owner}
                </span>
              </p>
            </div>

            {/* 4 Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {about.highlights.map((h: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="text-xs font-bold text-slate-900">{h.title}</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">{h.description}</div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
