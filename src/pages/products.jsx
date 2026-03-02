// src/pages/products.jsx

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import '../styles/products.css';

// Reusable hook for scroll animations
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return [ref, isVisible];
};

export default function ProductsPage() {
  const [heroRef, heroVisible] = useReveal();
  const [flagshipRef, flagshipVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();
  const [bannerRef, bannerVisible] = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0); // Always start at top
  }, []);

  return (
    <div className="prod-page-container">
      
      {/* Abstract Background Layer */}
      <div className="prod-bg-mesh"></div>

      {/* 1. HERO SECTION */}
      <section className="prod-hero" ref={heroRef}>
        <div className={`prod-hero-content ${heroVisible ? 'visible' : ''}`}>
          <span className="section-tag">{productsData.hero.tagline}</span>
          <h1 className="section-main-heading">{productsData.hero.mainHeading}</h1>
          <p className="prod-subtitle">{productsData.hero.subHeading}</p>
        </div>
      </section>

      {/* 2. FLAGSHIP SPOTLIGHT (Jureo) */}
      <section className="prod-section" ref={flagshipRef}>
        <div className="prod-container">
          <div className={`prod-flagship-card ${flagshipVisible ? 'visible' : ''}`}>
            <div className="prod-flagship-content">
              <span className="prod-label">{productsData.flagship.label}</span>
              <h2>{productsData.flagship.title}</h2>
              <p>{productsData.flagship.desc}</p>
              <Link to={productsData.flagship.link} className="btn-primary">
                Explore Jureo <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="prod-flagship-image">
              <img src={productsData.flagship.image} alt={productsData.flagship.title} loading="lazy" />
              <div className="prod-image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INDUSTRY INTELLIGENCE (Bento Grid) */}
      <section className="prod-section" ref={gridRef}>
        <div className="prod-container">
          <h2 className={`prod-section-title section-main-heading ${gridVisible ? 'visible' : ''}`}>
            {productsData.grid.title}
          </h2>
          
          <div className={`prod-bento-grid ${gridVisible ? 'visible' : ''}`}>
            {productsData.grid.products.map((product) => (
              <Link to={product.link} key={product.id} className={`prod-bento-item span-${product.span}`}>
                <div 
                  className="prod-bento-bg" 
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
                <div className="prod-bento-overlay"></div>
                <div className="prod-bento-content">
                  <h3>{product.title}</h3>
                  <p>{product.desc}</p>
                  <span className="prod-view-btn">View Product <span aria-hidden="true">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. UNIFIED ENGINE BANNER */}
      <section className="prod-banner-section" ref={bannerRef}>
        <div className="prod-container">
          <div className={`prod-banner-card ${bannerVisible ? 'visible' : ''}`}>
            <div className="prod-banner-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
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