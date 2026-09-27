import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { FeatureCardsStrip } from './components/FeatureCardsStrip.tsx';
import { ShopByCategory } from './components/ShopByCategory.tsx';
import { ProductsSection } from './components/ProductsSection.tsx';
import { ColorShadesSection } from './components/ColorShadesSection.tsx';
import { BrandsSection } from './components/BrandsSection.tsx';
import { PaintRecommender } from './components/PaintRecommender.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { ShadeCardModal } from './components/ShadeCardModal.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-orange-200 selection:text-orange-950">
      
      {/* Top Header matching reference */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} />

      <main className="flex-1">
        {/* Hero Section matching Screenshot 2 */}
        <div id="home">
          <Hero
            onNavigate={handleNavigate}
            onOpenBrandShades={handleOpenBrandShades}
          />
        </div>

        {/* 4 Feature Cards Strip matching Screenshot 3 */}
        <FeatureCardsStrip />

        {/* Shop by Category matching Screenshot 3 */}
        <ShopByCategory
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onViewAll={() => handleSelectCategory('all')}
        />

        {/* Bestsellers & Product Catalogue matching Screenshot 3 */}
        <ProductsSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProductForInquiry={handleProductInquiry}
        />

        {/* Explore Paint Color Shades & Live Wall Visualizer */}
        <ColorShadesSection onInquireShade={handleShadeInquiry} />

        {/* Authorized Brands & Shade Cards */}
        <BrandsSection onOpenBrandShades={handleOpenBrandShades} />

        {/* AI Surface Advice & Recommender */}
        <PaintRecommender onNavigateToContact={() => handleNavigate('contact')} />

        {/* Inspiration Gallery */}
        <GallerySection />

        {/* Store Services */}
        <ServicesSection
          onNavigateToAdvice={() => handleNavigate('advice')}
          onNavigateToContact={() => handleNavigate('contact')}
        />

        {/* FAQs */}
        <FaqSection />

        {/* About Us Story */}
        <AboutSection />

        {/* Get in Touch with SB Hardware & Paints */}
        <ContactSection initialSubject={inquirySubject} />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBrandShades={handleOpenBrandShades}
      />

      {/* Interactive Shade Card Modal */}
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
