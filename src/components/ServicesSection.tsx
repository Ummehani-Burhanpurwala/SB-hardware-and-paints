import React from 'react';
import { Palette, Truck, Users, Sparkles, ArrowRight } from 'lucide-react';
import { SERVICES_LIST } from '../data/storeData.ts';

interface ServicesSectionProps {
  onNavigateToAdvice: () => void;
  onNavigateToContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigateToAdvice,
  onNavigateToContact,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'service-advice':
        return <Palette className="w-6 h-6 text-stone-700" />;
      case 'service-tinting':
        return <Sparkles className="w-6 h-6 text-stone-700" />;
      case 'service-delivery':
        return <Truck className="w-6 h-6 text-stone-700" />;
      case 'service-painters':
        return <Users className="w-6 h-6 text-stone-700" />;
      default:
        return <Sparkles className="w-6 h-6 text-stone-700" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white/30 backdrop-blur-sm border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 bg-white/70 px-3 py-1 rounded-full border border-white/60">
            Support & Logistics
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Our Services
          </h2>
          <p className="text-sm sm:text-base text-stone-700 font-normal">
            Beyond supplying factory-sealed paints, SB Hardware & Paints provides technical guidance, computerized color matching, site delivery, and skilled painter coordination.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/80 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center">
                    {getIcon(service.id)}
                  </div>
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-stone-200/70">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-stone-900">
                  {service.title}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {service.shortDesc}
                </p>

                <div className="pt-2 space-y-1.5">
                  {service.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-stone-200 mt-5">
                {service.id === 'service-advice' ? (
                  <button
                    onClick={onNavigateToAdvice}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-900 hover:text-stone-700 transition-colors cursor-pointer"
                  >
                    <span>Launch Paint Advice Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={onNavigateToContact}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-900 hover:text-stone-700 transition-colors cursor-pointer"
                  >
                    <span>Inquire via Get in Touch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
