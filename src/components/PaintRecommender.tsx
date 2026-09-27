import React, { useState } from 'react';
import { Sparkles, ArrowRight, HelpCircle, Layers, Check } from 'lucide-react';

interface PaintRecommenderProps {
  onNavigateToContact: () => void;
}

export const PaintRecommender: React.FC<PaintRecommenderProps> = ({ onNavigateToContact }) => {
  const [spaceType, setSpaceType] = useState<'interior' | 'exterior' | 'terrace' | 'metal_wood'>('interior');
  const [sheenPreference, setSheenPreference] = useState<'luxury' | 'premium' | 'economy'>('luxury');
  const [wallCondition, setWallCondition] = useState<'fresh' | 'repainting'>('fresh');

  const [customQuestion, setCustomQuestion] = useState('');
  const [customAdviceResponse, setCustomAdviceResponse] = useState<string | null>(null);

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

  const handleAskQuick = (q: string) => {
    setCustomQuestion(q);
    generateAnswer(q);
  };

  const generateAnswer = (q: string) => {
    const query = q.toLowerCase();
    if (query.includes('terrace') || query.includes('heat') || query.includes('leak') || query.includes('roof')) {
      setCustomAdviceResponse(
        'For roof heat and leakage: Apply 3 coats of Astral Elastomeric Membrane. High solar reflectance reduces indoor temperature while bridging cracks up to 2mm.'
      );
    } else if (query.includes('damp') || query.includes('seepage') || query.includes('moisture')) {
      setCustomAdviceResponse(
        'For wall dampness: Chip off peeling paint up to the brick/plaster, apply Astral Damp-Stop crystalline barrier, re-level with polymer putty, and seal with an alkali-resistant primer.'
      );
    } else if (query.includes('metal') || query.includes('grill') || query.includes('gate') || query.includes('rust')) {
      setCustomAdviceResponse(
        'For metal grills & gates: Remove rust thoroughly with Emery 80, apply 1 coat of Zinc Chromate Red Oxide primer, followed by 2 coats of Shalimar Superlac Hi-Gloss Enamel.'
      );
    } else if (query.includes('ceiling')) {
      setCustomAdviceResponse(
        'For ceilings: Use high-opacity Indigo Bright Ceiling White. Its dead-matt formulation prevents glare and light reflections from chandeliers or windows.'
      );
    } else {
      setCustomAdviceResponse(
        'For ideal results: Use a complete system (Putty -> Sealing Primer -> 2 Topcoats). Register in our Get in Touch section for personalized consultation.'
      );
    }
  };

  return (
    <section id="advice" className="py-20 bg-white/30 backdrop-blur-sm border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-white/70 px-3 py-1 rounded-full border border-white/60">
            System Recommendation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Get Expert Paint Advice
          </h2>
          <p className="text-sm sm:text-base text-stone-700 font-normal">
            Select your surface conditions below to see the recommended multi-coat application system.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Selectors (Col 1-5) */}
          <div className="lg:col-span-5 bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/80 shadow-md space-y-5">
            
            {/* Step 1: Surface */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2.5">
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
                    className={`p-3 rounded-xl text-xs sm:text-sm font-medium transition-all text-center cursor-pointer border ${
                      spaceType === item.id
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sheen (if interior) */}
            {spaceType === 'interior' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2.5">
                  2. Sheen & Finish Grade
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'luxury', label: 'Luxury Velvet' },
                    { id: 'premium', label: 'Premium Silk' },
                    { id: 'economy', label: 'Matt Distemper' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSheenPreference(item.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-medium transition-all text-center cursor-pointer border ${
                        sheenPreference === item.id
                          ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Wall Condition */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2.5">
                3. Surface Condition
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'fresh', label: 'New / Fresh Plaster' },
                  { id: 'repainting', label: 'Repainting Old Walls' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setWallCondition(item.id as any)}
                    className={`p-3 rounded-xl text-xs sm:text-sm font-medium transition-all text-center cursor-pointer border ${
                      wallCondition === item.id
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Advisory note */}
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 space-y-1">
              <span className="font-semibold text-stone-800 block">Personal Consultation:</span>
              <p>
                Have a specialized plaster condition or high moisture issue? Register in our Get in Touch section to receive custom advice.
              </p>
            </div>

          </div>

          {/* Right Column: Recommended System Display (Col 6-12) */}
          <div className="lg:col-span-7 space-y-5">
            
            <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/80 shadow-md space-y-5">
              
              <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    Recommended Coating System
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                    {rec.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 font-medium">Estimated Durability</span>
                  <span className="text-xs sm:text-sm font-bold text-stone-800 block">{rec.lifespan}</span>
                </div>
              </div>

              {/* 3 Steps */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">Step 1: Putty & Leveling</span>
                    <h4 className="text-sm font-bold text-stone-900">{rec.putty}</h4>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">Step 2: Sealing Primer</span>
                    <h4 className="text-sm font-bold text-stone-900">{rec.primer}</h4>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">Step 3: Topcoat Emulsion</span>
                    <h4 className="text-sm font-bold text-stone-900">{rec.topcoat}</h4>
                    <p className="text-xs text-stone-500 mt-0.5">Finish: {rec.sheen} · {rec.washability}</p>
                  </div>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-stone-500" />
                  <span>Application Guidance:</span>
                </div>
                <p>{rec.expertTip}</p>
              </div>

              {/* Clean Action - Route to Get in Touch (No WhatsApp button) */}
              <div className="pt-2">
                <button
                  onClick={onNavigateToContact}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm transition-colors cursor-pointer"
                >
                  <span>Inquire Regarding This System</span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>
              </div>

            </div>

            {/* Quick Paint FAQs / Questions */}
            <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 border border-white/80 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-stone-500" />
                <span>Quick Diagnostic Answers</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  'How to prevent terrace heat & leakage?',
                  'Stopping wall dampness near skirting',
                  'Best paint for iron metal gates',
                  'Which paint for glare-free ceiling?',
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleAskQuick(q)}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300 transition-colors cursor-pointer text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {customAdviceResponse && (
                <div className="p-3 rounded-xl bg-white border border-stone-200 text-xs text-stone-700 mt-2">
                  <p>{customAdviceResponse}</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
