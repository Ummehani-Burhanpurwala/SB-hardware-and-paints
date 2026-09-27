import React from 'react';
import { Package, ShieldCheck, MessageSquareText, Truck } from 'lucide-react';

export const FeatureCardsStrip: React.FC = () => {
  const features = [
    {
      icon: Package,
      title: 'Wide Range of Products',
      description: 'Paints, primers, putty & tools',
    },
    {
      icon: ShieldCheck,
      title: '100% Original Brands',
      description: 'Genuine products, guaranteed',
    },
    {
      icon: MessageSquareText,
      title: 'Expert Advice',
      description: 'Guidance for every project',
    },
    {
      icon: Truck,
      title: 'Fast & Reliable Delivery',
      description: 'Delivered to your doorstep',
    },
  ];

  return (
    <section className="bg-white pb-14 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100/70 flex items-center justify-center shrink-0 text-orange-600">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="space-y-0.5 text-left">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
