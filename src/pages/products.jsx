// src/pages/products.jsx

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import '../styles/products.css';

// --- LOCAL IMAGE IMPORTS ---
import prod1 from '../img/prod-1.avif';
import prod2 from '../img/prod-2.avif';
import prod3 from '../img/prod-3.avif';
import prod4 from '../img/prod-4.avif';
import prod5 from '../img/prod-5.avif';
import prod6 from '../img/prod-6.webp';
import heroBgImage from '../img/company-page.png'; // Replaces Unsplash for Hero

// Map JSON string keys to actual imported files
const imageMap = {
  prod1, prod2, prod3, prod4, prod5, prod6
};

// Highly performant scroll reveal hook
const useReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return [ref, isVisible];
};

// 1. Flagship Product Component (Jureo gets special treatment)
const FlagshipProduct = ({ product }) => {
  const [ref, isVisible] = useReveal();

  return (
    <div ref={ref} className={`saas-flagship-wrapper ${isVisible ? 'visible' : ''}`}>
      <div className="saas-flagship-glow"></div>
      <div className="saas-flagship-card">
        <div className="flagship-content">
          <div className="flagship-badge">
            <span className="pulse-dot"></span>
            {product.label}
          </div>
          <h2>{product.title}</h2>
          {product.heading && <h3 className="flagship-subheading">{product.heading}</h3>}
          <p>{product.desc}</p>
          <div className="flagship-action">
            <Link to={product.link} className="btn-primary flagship-btn">
              {product.buttonText} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="flagship-visual">
          <div className="flagship-image-container">
            {/* Using the mapped local image */}
            <img src={imageMap[product.image]} alt={product.title} loading="lazy" />
            <div className="flagship-image-overlay"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Alternating Product Rows (Stripe/Apple style sections)
const AlternatingProduct = ({ product, index }) => {
  const [ref, isVisible] = useReveal();
  const isReversed = index % 2 !== 0; // Alternates left/right

  return (
    <section ref={ref} className={`saas-product-row ${isVisible ? 'visible' : ''} ${isReversed ? 'reversed' : ''}`}>
      <div className="saas-row-container">
        
        <div className="saas-row-content">
          <span className="saas-row-label">{product.label}</span>
          <h2>{product.title}</h2>
          <p>{product.desc}</p>
          <Link to={product.link} className="saas-text-link">
            {product.buttonText} <span className="arrow">→</span>
          </Link>
        </div>

        <div className="saas-row-visual">
          <Link to={product.link} className="saas-image-wrapper">
            {/* Using the mapped local image */}
            <img src={imageMap[product.image]} alt={product.title} loading="lazy" />
            <div className="saas-image-glass"></div>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default function ProductsPage() {
  const [heroRef, heroVisible] = useReveal();
  const [bannerRef, bannerVisible] = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const flagshipProduct = productsData.products[0];
  const otherProducts = productsData.products.slice(1);

  return (
    <div className="saas-page-container" style={{ position: 'relative' }}>
      
      {/* --- DYNAMIC HERO BACKGROUND IMAGE --- */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '600px',
          /* Used local heroBgImage instead of Unsplash */
          backgroundImage: `linear-gradient(to bottom, rgba(11, 15, 25, 0.5) 0%, var(--bg-primary) 100%), url(${heroBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />

      {/* Background Base */}
      <div className="saas-bg-ambient"></div>

      {/* HERO SECTION (SEO Optimized H1) */}
      <header className="saas-hero" ref={heroRef} style={{ position: 'relative', zIndex: 1 }}>
        <div className={`saas-hero-inner ${heroVisible ? 'visible' : ''}`}>
          <span className="section-tag">{productsData.hero.tagline}</span>
          <h1 className="section-main-heading">{productsData.hero.mainHeading}</h1>
          <p>{productsData.hero.subHeading}</p>
        </div>
      </header>

      {/* FLAGSHIP SHOWCASE (Jureo) */}
      <section className="saas-flagship-section">
        <div className="saas-container">
          <FlagshipProduct product={flagshipProduct} />
        </div>
      </section>

      {/* ALTERNATING PRODUCT ECOSYSTEM */}
      <div className="saas-ecosystem">
        {otherProducts.map((product, index) => (
          <AlternatingProduct key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* UNIFIED ENGINE BANNER */}
      <section className="saas-banner-section" ref={bannerRef}>
        <div className="saas-container">
          <div className={`saas-banner-card ${bannerVisible ? 'visible' : ''}`}>
            <div className="saas-banner-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p>{productsData.banner.text}</p>
            <Link to={productsData.banner.link} className="btn-outline">
              {productsData.banner.button}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}