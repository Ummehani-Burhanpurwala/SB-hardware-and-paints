import React from 'react';
import { Palette, Truck, Users, Sparkles, ArrowRight, ShieldCheck, Calculator } from 'lucide-react';
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
      case 'consultation':
        return <Palette className="w-5 h-5 text-orange-600" />;
      case 'tinting':
        return <Sparkles className="w-5 h-5 text-indigo-600" />;
      case 'delivery':
        return <Truck className="w-5 h-5 text-emerald-600" />;
      case 'painters':
        return <Users className="w-5 h-5 text-cyan-600" />;
      case 'waterproofing':
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      case 'quotation':
        return <Calculator className="w-5 h-5 text-purple-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-orange-600" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold tracking-wider uppercase border border-cyan-200">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Support & Professional Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Store Services in Pulgaon
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Beyond supplying original factory paints, SB Hardware & Paints provides on-site diagnosis, computerized color tinting, doorstep site delivery, and skilled contractor referrals.
          </p>
        </div>

        {/* 6 Services Grid with Real Imagery from JSON */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((service: any) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-left"
            >
              <div>
                {/* Real Service Image from JSON */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/hero_paint_store_1790511674504.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Service Badge */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-bold text-slate-900 shadow-xs">
                    {service.badge}
                  </span>

                  {/* Icon circle */}
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center">
                    {getIcon(service.id)}
                  </div>
                </div>

                <div className="p-6 pt-4 space-y-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                {service.id === 'consultation' || service.id === 'waterproofing' || service.id === 'quotation' ? (
                  <button
                    onClick={onNavigateToAdvice}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer"
                  >
                    <span>Use Paint Advisor & Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={onNavigateToContact}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <span>Inquire with Store</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
