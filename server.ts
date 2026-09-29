import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const SYSTEM_INSTRUCTION = `You are the Expert Paint & Surface Consultant for "SB Hardware & Paints" in Pulgaon (Maharashtra, India), owned by Mr. Hakimuddin Saifuddin Bohra.

CRITICAL PROJECT BOUNDARY & RULES:
1. You work EXCLUSIVELY for SB Hardware & Paints in Pulgaon. You MUST NOT answer questions outside of paints, primers, wall putty, surface waterproofing, anti-fungal coatings, color shades, enamel paints for grills/wood, hardware tools, coverage calculations, and painting best practices.
2. If a customer asks anything unrelated (e.g. general knowledge, entertainment, news, coding, crypto), politely decline: "I am exclusively the Paint & Surface Expert at SB Hardware & Paints, Pulgaon. I can only assist you with wall paints, primers, waterproofing, shades, and material estimates for your home or project. How can I help with your walls today?"
3. Tone: Warm, respectful, highly knowledgeable, and practical. You can understand and respond in English, Hinglish, Hindi, or Marathi depending on how the customer speaks.
4. Active Inquiring: When a user asks a general question, ask 1-2 focused questions to give them accurate advice:
   - Surface type: Interior bedroom/living, exterior facade, bathroom/kitchen, terrace/roof, or metal/wood?
   - Surface condition: Fresh unpainted plaster, old paint with peeling/chalking, or dampness/seepage?
   - Finish desired: Matte, soft sheen, luxury velvet, or high gloss?
   - Room size/area: (e.g. 10x12 room, 2BHK flat, square footage) to calculate exact liters.
5. Store Dealer Brands you recommend:
   - Indigo Paints (Metallic Emulsion, Dirtproof & Waterproof Exterior, Acrylic Distemper, Gold Series, PU Enamel)
   - Asian Paints (Royale Luxury, Apex Ultima, Apcolite Premium, Tractor Emulsion, Damp Proof)
   - Shalimar Paints (Superlac Hi-Gloss Enamel, Weather Pro, Signature Emulsion)
   - Astral Paints & Adhesives (Elastomeric Waterproof Membrane, Bond-Tight, Damp-Stop)
   - Raj Yog (Premium Polymer White Cement Wall Putty)
6. Coverage & Application Rules of Thumb:
   - Standard 2 coats of emulsion: ~120 - 140 sq. ft. per liter.
   - Primer: ~140 - 160 sq. ft. per liter (1 coat).
   - Putty: ~15 - 20 sq. ft. per kg for 2 coats.
   - For damp walls: MUST fix the source of moisture, apply waterproofing barrier (Astral Damp Stop) before putty!
7. Store Info & Contact:
   - Proprietor: Mr. Hakimuddin Saifuddin Bohra
   - Location: Near Pulgaon Station Chowk, Nachangaon Road, Pulgaon, Maharashtra 442302
   - Direct WhatsApp / Phone: +91 9890722385
   - Opening Hours: Mon–Sat: 7:00 AM – 10:00 PM
   - Always encourage them to visit the store or connect directly with Hakimuddin Ji on WhatsApp for computerized color tinting and special contractor discounts.`;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', store: 'SB Hardware & Paints', owner: 'Mr. Hakimuddin Saifuddin Bohra' });
  });

  // AI Paint Expert Advice Chatbot endpoint
  app.post('/api/chat', async (req, res) => {
    const messages = req.body?.messages;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    try {

      // Format conversation history for Gemini API
      // Transform client messages to contents format expected by @google/genai
      const contents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      // Initialize GoogleGenAI SDK
      const apiKey = process.env.GEMINI_API_KEY;
      const ai = new GoogleGenAI(apiKey ? { apiKey } : {});

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.6,
          maxOutputTokens: 1000,
        },
      });

      const replyText = response.text || 'I am ready to help you with your paint and waterproofing questions. What surface are you planning to paint?';
      return res.json({ reply: replyText });
    } catch (error: any) {
      console.warn('Gemini API call failed or upstream unavailable, generating localized expert advice:', error?.message);
      
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
      let fallbackReply = `Namaste! Based on your requirement:

For high-durability results in Pulgaon's climate, we recommend our authorized 3-stage system:
1. **Surface Prep & Putty**: Apply 2 coats of Raj Yog Polymer White Cement Putty to fill pores and level imperfections.
2. **Sealer Primer**: Apply 1 coat of Indigo Alkali-Resistant Sealing Primer to prevent discoloration.
3. **Finish Coats**: Apply 2 coats of premium topcoat (Asian Paints Royale / Apex Ultima or Indigo Metallic).

For exact square-footage estimates and computerized shade matching, visit our store at Pulgaon Station Chowk or contact Mr. Hakimuddin Saifuddin Bohra directly on WhatsApp (+91 9890722385).`;

      if (lastUserMsg.includes('bhk') || lastUserMsg.includes('estimate') || lastUserMsg.includes('how much') || lastUserMsg.includes('liter')) {
        fallbackReply = `📐 **Material & Quantity Estimate for Your Home:**

Standard authorized coverage metrics for 2 coats:
- **Interior Emulsion**: 1 Liter covers approx. **120 – 140 sq. ft.** (2 coats)
- **Wall Primer**: 1 Liter covers **130 – 150 sq. ft.** (1 coat)
- **Raj Yog White Cement Putty**: 1 Kg covers **16 – 20 sq. ft.** (2 coats)

**For a 2BHK Flat (~800–1000 sq.ft. carpet area / ~2,400 sq.ft. wall area):**
- **Interior Emulsion**: Approx. **18 to 22 Liters** (Asian Paints Royale / Apcolite or Indigo Metallic)
- **Primer**: ~16 Liters
- **Wall Putty**: ~120 Kg (3 bags of 40kg Raj Yog Putty)

Would you like a formal quotation for luxury or economy finish? You can also message Mr. Hakimuddin Ji on WhatsApp directly!`;
      } else if (lastUserMsg.includes('damp') || lastUserMsg.includes('seep') || lastUserMsg.includes('leak') || lastUserMsg.includes('waterproof')) {
        fallbackReply = `💧 **Anti-Dampness & Waterproofing System:**

For damp walls and water seepage, never apply putty or paint directly over damp plaster:
1. Scrape peeling paint and loose plaster down to masonry.
2. Apply **Astral Damp-Stop** or **Asian Paints SmartCare Damp Block** crystalline treatment.
3. Re-level with water-resistant **Raj Yog Polymer Putty**.
4. Apply 1 coat of **Indigo Deep Penetrating Primer** before emulsion.

For terrace roof leaks, we recommend 3 coats of **Astral Elastomeric Liquid Membrane** with solar-reflective heat reduction.`;
      } else if (lastUserMsg.includes('exterior') || lastUserMsg.includes('rain') || lastUserMsg.includes('outside') || lastUserMsg.includes('weather')) {
        fallbackReply = `☀️🌧️ **All-Weather Exterior Coating System:**

For exterior walls facing harsh summer sun and heavy monsoon rains in Pulgaon:
1. Pressure-wash exterior facade to remove loose dust and algae.
2. Apply 1 coat of **Exterior Acrylic Sealer Primer**.
3. Apply 2 coats of **Indigo Dirtproof & Waterproof Exterior** or **Asian Paints Apex Ultima**.
   - Dirt-resistant polymer technology sheets off rainwater and resists fungal stains for 7+ years.`;
      }

      return res.json({ reply: fallbackReply });
    }
  });

  // Vite integration
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
