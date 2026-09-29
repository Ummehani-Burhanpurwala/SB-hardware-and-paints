import { STORE_DETAILS } from '../data/storeData.ts';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  recommendedProducts?: string[];
  suggestedActions?: string[];
}

export const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'init-msg',
  role: 'model',
  content: `Namaste! 🙏 I am the **SB Paints Expert Advisor** for **SB Hardware & Paints** in Pulgaon, owned by Mr. Hakimuddin Saifuddin Bohra.

I can guide you on the exact coatings, primers, waterproofing systems, and quantity estimates for your project. 

To give you the most accurate paint system, **tell me about your project or answer any of these**:
1. 🏠 **Which area are you painting?** (Interior rooms, exterior facade, bathroom/kitchen, terrace/roof, or metal gates/woodwork?)
2. 🧱 **What is the surface condition?** (Fresh newly plastered wall, repainting existing walls, peeling paint, or dampness/seepage?)
3. ✨ **What finish do you prefer?** (Luxury velvet sheen, smooth matte, wash-resistant, or high-gloss?)
4. 📐 **What is the approximate size or number of rooms?** (e.g. 10x12 room, 2BHK flat, 1200 sq.ft.)`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestedActions: [
    'Estimate paint for 2BHK flat',
    'Fix wall dampness & paint peeling',
    'Best exterior paint for heavy rains',
    'Luxury wash-resistant paint for living room',
  ],
};

// Client-side expert domain engine fallback for instant response and offline reliability
function generateDomainFallbackAdvice(userQuery: string): { reply: string; recommendedProducts?: string[]; suggestedActions?: string[] } {
  const q = userQuery.toLowerCase();

  // Guardrail check: Is it off-topic?
  const offTopicKeywords = ['weather in delhi', 'who is president', 'write python code', 'recipe', 'movie', 'crypto', 'bitcoin', 'football', 'cricket score'];
  if (offTopicKeywords.some(w => q.includes(w))) {
    return {
      reply: `I am exclusively the **Paint & Surface Expert at SB Hardware & Paints in Pulgaon**. I specialize only in wall paints, primers, waterproofing, exterior protection, and hardware coatings. 

How can I help you choose the right paints, calculate wall coverage, or treat dampness for your home today?`,
      suggestedActions: ['Exterior paint options', 'Interior emulsion comparison', 'Waterproofing advice'],
    };
  }

  // 1. Dampness / Seepage / Moisture
  if (q.includes('damp') || q.includes('seep') || q.includes('moisture') || q.includes('shora') || q.includes('efflorescence') || q.includes('water leak')) {
    return {
      reply: `💧 **Expert Waterproofing & Anti-Dampness System:**

Dampness cannot be solved by simply applying a fresh coat of emulsion—it will peel within months. Here is our proven 4-step treatment available at SB Hardware & Paints:

1. **Scraping**: Chip off all loose, peeling paint and powdery plaster back to the firm brick/mortar level. Clean thoroughly with a wire brush.
2. **Moisture Barrier**: Apply **Astral Damp-Stop** or **Asian Paints SmartCare Damp Block** crystalline treatment directly to the masonry. Allow 8–10 hours to cure.
3. **Leveling**: Re-level using water-resistant **Raj Yog Polymer White Cement Putty** (2 thin coats).
4. **Alkali-Resistant Sealer**: Prime with **Indigo Deep Penetrating Sealing Primer** before topcoating with anti-fungal emulsion.

💡 *Would you like me to connect you with Mr. Hakimuddin Ji on WhatsApp to inspect your site photos or arrange waterproofing chemicals?*`,
      recommendedProducts: ['Astral Damp-Stop Crystalline Barrier', 'Raj Yog Polymer Wall Putty', 'Indigo Alkali Sealing Primer'],
      suggestedActions: ['How to treat terrace roof leaks?', 'What primer should I use?', 'Calculate paint liters'],
    };
  }

  // 2. Quantity / Estimation (2BHK, 3BHK, Room size)
  if (q.includes('estimate') || q.includes('bhk') || q.includes('quantity') || q.includes('liter') || q.includes('sq ft') || q.includes('sqft') || q.includes('how much paint')) {
    return {
      reply: `📐 **Paint & Material Calculation Guide (Standard Coverage Rules):**

At SB Hardware & Paints, we use authorized coverage metrics for 2 coats:
- **Interior Emulsion**: 1 Liter covers approx. **120 – 140 sq. ft.** (2 coats)
- **Exterior Weatherproof Emulsion**: 1 Liter covers **55 – 65 sq. ft.** (2 coats on textured/plastered walls)
- **Wall Primer**: 1 Liter covers **130 – 150 sq. ft.** (1 coat)
- **Raj Yog White Cement Putty**: 1 Kg covers **16 – 20 sq. ft.** (2 coats)

**Quick Estimates for Typical Homes:**
- **Single Room (10x12 ft)**: ~350 sq. ft. wall area = **3 to 4 Liters** of Emulsion + 2.5L Primer + 20Kg Putty.
- **2BHK Flat (~800–1000 sq.ft. carpet)**: ~2,400 sq. ft. wall area = **18 to 22 Liters** of Interior Emulsion + 16L Primer + 120Kg Putty.
- **3BHK Flat (~1200–1500 sq.ft. carpet)**: ~3,400 sq. ft. wall area = **26 to 30 Liters** of Interior Emulsion.

Would you like a quote for **Luxury (Asian Paints Royale / Indigo Metallic)** or **Premium Value (Apcolite / Indigo Sleek)**?`,
      recommendedProducts: ['Asian Paints Royale Luxury', 'Indigo Metallic Emulsion', 'Raj Yog White Cement Putty (40kg bag)'],
      suggestedActions: ['Compare Royale vs Apcolite', 'Exterior paint estimate', 'Check current discounts'],
    };
  }

  // 3. Exterior facade / Rains / Monsoons
  if (q.includes('exterior') || q.includes('rain') || q.includes('outside') || q.includes('monsoon') || q.includes('fungus') || q.includes('algae') || q.includes('sun')) {
    return {
      reply: `☀️🌧️ **High-Performance Exterior Facade Protection:**

In Vidarbha and Pulgaon's climate (extreme summer heat + heavy monsoon rains), exterior walls suffer from thermal cracking and algae growth. We recommend:

1. **Top Recommendation**: **Indigo Dirtproof & Waterproof Exterior Emulsion**
   - Formulated with silicone polymer and nanoparticles that sheet off rain water and prevent dust accumulation (self-cleaning).
2. **Alternative Standard**: **Asian Paints Apex Ultima**
   - 7-year performance warranty with advanced anti-algal biopack.
3. **Application Protocol**:
   - Wash external walls with pressure water jet to remove dead algae.
   - 1 coat of Exterior Weather Primer (diluted with max 100% water).
   - 2 coats of topcoat with minimum 4–6 hours drying between coats.

Do you have fresh plaster or are you repainting over old exterior paint?`,
      recommendedProducts: ['Indigo Dirtproof & Waterproof Exterior', 'Asian Paints Apex Ultima All-Weather', 'Indigo Exterior Acrylic Primer'],
      suggestedActions: ['Can we apply putty outside?', 'How to stop terrace water seepage?', 'Request quote from store'],
    };
  }

  // 4. Metal gates, grills & woodwork
  if (q.includes('metal') || q.includes('grill') || q.includes('gate') || q.includes('rust') || q.includes('iron') || q.includes('wood') || q.includes('enamel') || q.includes('polish')) {
    return {
      reply: `🛡️ **Rust-Proof Metal & Wooden Door Protection:**

For Pulgaon homes, metal gates and window safety grills require proper rust passivation:
1. **Rust Removal**: Thoroughly rub off flaky rust using **Emery Paper Grade 80 / 120**.
2. **Primer**: Apply 1 coat of **Zinc Chromate Red Oxide Primer** (for iron/steel) or **Pink Wood Primer** (for wooden door frames).
3. **Topcoat**: Apply 2 coats of **Shalimar Superlac Hi-Gloss Synthetic Enamel** or **Indigo PU Enamel**.
   - Mirror-like high gloss, resists yellowing, and withstands harsh sunlight and rain.

Available in all shades (Black, Golden Brown, Signal Red, White, Smoke Grey, Brilliant Green) at SB Hardware & Paints!`,
      recommendedProducts: ['Shalimar Superlac Hi-Gloss Enamel', 'Red Oxide Metal Primer', 'Indigo PU Super Gloss'],
      suggestedActions: ['Paint estimate for grills', 'Anti-rust tips', 'WhatsApp store directly'],
    };
  }

  // 5. Sheen & Brand Comparison (Royale vs Indigo vs Apcolite)
  if (q.includes('royale') || q.includes('sheen') || q.includes('finish') || q.includes('brand') || q.includes('difference') || q.includes('matte') || q.includes('gloss') || q.includes('washable')) {
    return {
      reply: `🎨 **Finish & Sheen Comparison Guide:**

- **Luxury Silk / Soft Sheen**:
  - *Asian Paints Royale Luxury Emulsion* & *Indigo Metallic / Bright Ceiling White*
  - Best for: Master bedrooms, formal living rooms.
  - Washability: 100% washable (stains, tea, pencil marks wipe off easily).
- **Smooth Satin / Low Sheen**:
  - *Asian Paints Apcolite Premium Emulsion* & *Indigo Sleek Emulsion*
  - Best for: Dining rooms, corridors, children's study.
  - Washability: Moderate wipeable with mild soapy water.
- **Classic Matte**:
  - *Tractor Emulsion* or *Indigo Acrylic Distemper*
  - Best for: Ceilings and rental homes. Hides wall undulations cleanly without glare.

We provide **instant computerized shade tinting** directly at our Pulgaon counter!`,
      recommendedProducts: ['Asian Paints Royale Luxury', 'Indigo Metallic Emulsion', 'Asian Paints Apcolite'],
      suggestedActions: ['View Color Preview Studio', 'Check paint prices in Pulgaon', 'Estimate for my house'],
    };
  }

  // Default interactive inquiry
  return {
    reply: `Thank you for asking! For the best result on your project:

A proper paint job at **SB Hardware & Paints** always follows the **3-Tier Protection System**:
1. **Wall Putty (2 coats)**: Levels the wall and fills surface pores (Raj Yog Polymer Putty).
2. **Alkali-Resistant Primer (1 coat)**: Seals the porosity and prevents paint patches.
3. **Finish Emulsion (2 coats)**: Delivers true color depth, washability, and long life.

Could you tell me:
- Are you painting **indoor rooms** or **external walls**?
- What is the approximate wall area or number of rooms?
- Do you have any specific color or brand in mind (Indigo, Asian Paints, Shalimar)?`,
    recommendedProducts: ['Raj Yog Polymer White Cement Putty', 'Indigo Acrylic Primer', 'Asian Paints Royale Luxury'],
    suggestedActions: ['Estimate paint for 2BHK', 'Fix damp walls', 'Exterior wall protection'],
  };
}

export async function sendChatMessage(
  history: ChatMessage[],
  newMessage: string
): Promise<ChatMessage> {
  const userMsg: ChatMessage = {
    id: `msg-${Date.now()}-user`,
    role: 'user',
    content: newMessage,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const updatedHistory = [...history, userMsg];

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: updatedHistory.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reply) {
        return {
          id: `msg-${Date.now()}-bot`,
          role: 'model',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: [
            'Inquire this recommendation on WhatsApp',
            'Calculate required liters',
            'Ask another question',
          ],
        };
      }
    }
  } catch (err) {
    console.warn('Backend /api/chat error, using intelligent local domain fallback:', err);
  }

  // Fallback to high-fidelity localized paint domain engine
  const fallback = generateDomainFallbackAdvice(newMessage);
  return {
    id: `msg-${Date.now()}-bot`,
    role: 'model',
    content: fallback.reply,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    recommendedProducts: fallback.recommendedProducts,
    suggestedActions: fallback.suggestedActions,
  };
}
