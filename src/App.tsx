import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { FeatureCardsStrip } from './components/FeatureCardsStrip.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ShopByCategory } from './components/ShopByCategory.tsx';
import { ProductsSection } from './components/ProductsSection.tsx';
import { ColorShadesSection } from './components/ColorShadesSection.tsx';
import { BrandsSection } from './components/BrandsSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { PaintRecommender } from './components/PaintRecommender.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { ShadeCardModal } from './components/ShadeCardModal.tsx';
import { Footer } from './components/Footer.tsx';
import { BottomStickyContactBar } from './components/BottomStickyContactBar.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeShadeBrandId, setActiveShadeBrandId] = useState<string | null>(null);
  const [inquirySubject, setInquirySubject] = useState<string>('');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenBrandShades = (brandId: string) => {
    setActiveShadeBrandId(brandId);
  };

  const handleCloseBrandShades = () => {
    setActiveShadeBrandId(null);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    handleNavigate('products');
  };

  const handleProductInquiry = (productName: string) => {
    setInquirySubject(`Product: ${productName}`);
    handleNavigate('contact');
  };

  const handleShadeInquiry = (shadeInfo: string) => {
    setInquirySubject(`Shade: ${shadeInfo}`);
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-orange-200 selection:text-orange-950 pb-16 sm:pb-20">
      
      {/* Top Header with SB Hardware & Paints brand, rainbow spectrum bar & quick actions */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} />

      <main className="flex-1">
        {/* 1. Home / Hero: Paint visuals, tagline, Call/WhatsApp/Get Quote CTAs, featured brands & services */}
        <div id="home">
          <Hero
            onNavigate={handleNavigate}
            onOpenBrandShades={handleOpenBrandShades}
          />
        </div>

        {/* 2. Four Pillars Feature Cards Strip */}
        <FeatureCardsStrip />

        {/* 3. About Us: Trusted local store serving homeowners, painters, contractors and builders */}
        <AboutSection />

        {/* 4. Shop by Category */}
        <ShopByCategory
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onViewAll={() => handleSelectCategory('all')}
        />

        {/* 5. Products: Interior/exterior paints, distemper, primer, putty, enamels, waterproofing, tools */}
        <ProductsSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProductForInquiry={handleProductInquiry}
        />

        {/* 6. Color Shades & Live Architectural Wall Visualizer */}
        <ColorShadesSection onInquireShade={handleShadeInquiry} />

        {/* 7. Brands: Indigo, Asian Paints, Shalimar, Astral, Raj Yog; clicking opens shade cards */}
        <BrandsSection onOpenBrandShades={handleOpenBrandShades} />

        {/* 8. Services: Expert guidance, home delivery, quality painters, quotation support */}
        <ServicesSection
          onNavigateToAdvice={() => handleNavigate('advice')}
          onNavigateToContact={() => handleNavigate('contact')}
        />

        {/* 9. Projects & Inspiration Gallery */}
        <GallerySection />

        {/* 10. Get Expert Advice: AI paint consultation & recommendation interface */}
        <PaintRecommender 
          onNavigateToContact={() => handleNavigate('contact')}
          onSelectProductForInquiry={handleProductInquiry}
        />

        {/* 11. Frequently Asked Questions */}
        <FaqSection />

        {/* 12. Contact: +91 9890722385, hakimaadamji786110@gmail.com, Pulgaon Station Chowk, hours, CTAs */}
        <ContactSection initialSubject={inquirySubject} />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBrandShades={handleOpenBrandShades}
      />

      {/* Prominent Sticky Bottom Contact Bar highlighting Call, WhatsApp, Get Directions */}
      <BottomStickyContactBar onOpenQuote={() => handleNavigate('contact')} />

      {/* Firebase Authentication Modal */}
      <AuthModal />

      {/* Interactive Official Brand Shade Card Modal */}
      {activeShadeBrandId && (
        <ShadeCardModal
          brandId={activeShadeBrandId}
          onClose={handleCloseBrandShades}
          onSelectBrand={setActiveShadeBrandId}
          onInquireShade={handleShadeInquiry}
        />
      )}
    </div>
  );
}
