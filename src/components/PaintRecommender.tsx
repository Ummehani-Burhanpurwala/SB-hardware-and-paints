import React, { useState } from 'react';
import { Sparkles, ArrowRight, HelpCircle, Layers, Check, Bot, MessageSquare } from 'lucide-react';
import { ExpertChatbot } from './ExpertChatbot.tsx';

interface PaintRecommenderProps {
  onNavigateToContact: () => void;
  onSelectProductForInquiry?: (productName: string) => void;
}

export const PaintRecommender: React.FC<PaintRecommenderProps> = ({ 
  onNavigateToContact,
  onSelectProductForInquiry 
}) => {
  const [activeTab, setActiveTab] = useState<'chatbot' | 'matrix'>('chatbot');
  const [spaceType, setSpaceType] = useState<'interior' | 'exterior' | 'terrace' | 'metal_wood'>('interior');
  const [sheenPreference, setSheenPreference] = useState<'luxury' | 'premium' | 'economy'>('luxury');
  const [wallCondition, setWallCondition] = useState<'fresh' | 'repainting'>('fresh');

  const getSystemRecommendation = () => {
    if (spaceType === 'interior') {
      if (sheenPreference === 'luxury') {
        return {
          title: 'Luxury Velvet Washable System',
          topcoat: 'Asian Paints Royale Luxury or Indigo Metallic Emulsion',
          primer: 'Indigo Deep Penetrating Alkali Sealing Primer (1 Coat)',
          putty: 'Raj Yog Polymer White Cement Putty (2 Coats)',
          sheen: 'Soft Silky Velvet Finish',
          lifespan: '8+ Years Lifespan with 100% Scrub Resistance',
          washability: 'Highest (Tea, coffee, crayons and ketchup wipe clean)',
          expertTip: 'Allow 6 hours curing after the second putty coat before sealing with primer for a mirror-smooth reflection.',
        };
      }
      if (sheenPreference === 'economy') {
        return {
          title: 'Smooth Distemper Coating System',
          topcoat: 'Indigo Acrylic Distemper or Shalimar No. 1 Synthetic Distemper',
          primer: 'Water-thinnable Interior Cement Primer (1 Coat)',
          putty: 'Raj Yog Smooth White Wall Putty (1 - 2 Coats)',
          sheen: 'Smooth Soft Matt',
          lifespan: '3 - 4 Years Lifespan',
          washability: 'Gentle damp-cloth wipeable',
          expertTip: 'Great choice for rental spaces, ceilings, and budget revamps with bright clean opacity.',
        };
      }
      return {
        title: 'Premium Everyday Living Emulsion',
        topcoat: 'Asian Paints Apcolite Premium or Indigo Sleek Emulsion',
        primer: 'Alkali-Resistant Interior Wall Primer (1 Coat)',
        putty: 'Raj Yog White Cement Putty (2 Coats)',
        sheen: 'Rich Soft Sheen',
        lifespan: '5 - 6 Years Lifespan',
        washability: 'Washable with mild soapy water',
        expertTip: 'The perfect balance of rich color retention and everyday durability for busy family rooms.',
      };
    }

    if (spaceType === 'exterior') {
      return {
        title: 'All-Weather Siliconized Facade Shield',
        topcoat: 'Indigo Dirtproof & Waterproof Exterior or Asian Paints Apex Ultima',
        primer: 'Exterior Acrylic Weather Sealer Primer (1 Coat)',
        putty: 'Raj Yog Hydrophobic Exterior White Putty (minor leveling only)',
        sheen: 'Rain-Proof Dirt-Resistant Soft Sheen',
        lifespan: '7-Year Weatherproof Performance Grade',
        washability: 'Self-cleaning in rains; resists dust and algae buildup',
        expertTip: 'Never apply topcoat on damp plaster. Wall moisture should be below 15% for enduring bond.',
      };
    }

    if (spaceType === 'metal_wood') {
      return {
        title: 'Anti-Rust Mirror Gloss Enamel System',
        topcoat: 'Shalimar Superlac Hi-Gloss Enamel or Asian Paints Gloss Enamel',
        primer: 'Zinc Chromate Red Oxide Primer for Metal / Pink Wood Primer for Wood',
        putty: 'Specialty filler paste for joints and cracks',
        sheen: 'Deep Mirror High Gloss',
        lifespan: '5+ Years without peeling or rusting',
        washability: 'High resistance to weather, oils, and friction',
        expertTip: 'Scrape away all flaking rust with wire brush and emery paper before applying the first red oxide primer coat.',
      };
    }

    return {
      title: 'Elastomeric Heavy-Duty Waterproof Roof Coating',
      topcoat: 'Astral Elastomeric Liquid Membrane or Asian Paints Damp Proof',
      primer: '1:1 Diluted Primer Coat of the same membrane',
      putty: 'Polymer crack bridging compound for joints and parapets',
      sheen: 'Solar-Reflective Cool White Finish',
      lifespan: '8-Year Waterproof Protection with Heat Reduction',
      washability: 'Withstands standing pooling water',
      expertTip: 'Ensure proper drainage slope on the terrace before coating. Three crosswise coats deliver maximum tensile strength.',
    };
  };

  const rec = getSystemRecommendation();

  return (
    <section id="advice" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Pulgaon Paint Consultation & System Guide</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Expert Paint Advice & AI Consultant
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Get personalized recommendations for wall preparation, dampness treatment, primer sealing, and coverage estimates directly from our paint experts.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 mt-4">
            <button
              onClick={() => setActiveTab('chatbot')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'chatbot'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot className="w-4 h-4 text-orange-500" />
              <span>Ask Paint AI Advisor (Custom Q&A)</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-orange-500" />
              <span>Multi-Coat System Matrix</span>
            </button>
          </div>
        </div>

        {/* Tab 1: AI Chatbot (Default & Custom for Project) */}
        {activeTab === 'chatbot' && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
            <ExpertChatbot onOpenProductModal={onSelectProductForInquiry} />
          </div>
        )}

        {/* Tab 2: Interactive Multi-Coat System Matrix */}
        {activeTab === 'matrix' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            
            {/* Left Column: Selectors */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  1. Surface to be coated
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'interior', label: 'Interior Rooms' },
                    { id: 'exterior', label: 'Exterior Facade' },
                    { id: 'terrace', label: 'Roof / Terrace' },
                    { id: 'metal_wood', label: 'Grills & Wood' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSpaceType(item.id as any)}
                      className={`p-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer border ${
                        spaceType === item.id
                          ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {spaceType === 'interior' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                    2. Desired Finish & Sheen
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'luxury', label: 'Luxury Velvet' },
                      { id: 'premium', label: 'Soft Sheen' },
                      { id: 'economy', label: 'Distemper' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSheenPreference(item.id as any)}
                        className={`p-2.5 rounded-2xl text-xs font-bold transition-all text-center cursor-pointer border ${
                          sheenPreference === item.id
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  3. Plaster Condition
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'fresh', label: 'Fresh New Plaster' },
                    { id: 'repainting', label: 'Repainting Old Wall' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setWallCondition(item.id as any)}
                      className={`p-2.5 rounded-2xl text-xs font-bold transition-all text-center cursor-pointer border ${
                        wallCondition === item.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('chatbot')}
                  className="w-full py-3 px-4 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Bot className="w-4 h-4 text-orange-600" />
                  <span>Have unique questions? Ask AI Paint Advisor</span>
                </button>
              </div>
            </div>

            {/* Right Column: Recommended Multi-Coat System Spec */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md text-left space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
                  Recommended System
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2">
                  {rec.title}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[11px] font-bold uppercase text-slate-500">Step 1: Surface Leveling</div>
                  <div className="text-sm font-bold text-slate-900">{rec.putty}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[11px] font-bold uppercase text-slate-500">Step 2: Undercoat Sealer</div>
                  <div className="text-sm font-bold text-slate-900">{rec.primer}</div>
                </div>

                <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-1">
                  <div className="text-[11px] font-bold uppercase text-orange-700">Step 3: Finish Topcoat (2 Coats)</div>
                  <div className="text-sm font-black text-slate-900">{rec.topcoat}</div>
                  <div className="text-xs text-orange-900 font-medium">Sheen: {rec.sheen} • {rec.lifespan}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-1">
                <strong>Expert Application Tip:</strong>
                <p>{rec.expertTip}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={onNavigateToContact}
                  className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Request Material Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
