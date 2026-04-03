// src/pages/ProductDetail.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import detailsData from '../data/productDetails.json';
import '../styles/ProductDetail.css';

// Highly performant scroll reveal hook
const useReveal = (delay = 0) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (currentRef) observer.observe(currentRef);
    const failsafe = setTimeout(() => setIsVisible(true), 1000 + delay);

    return () => {
      if (currentRef) observer.disconnect();
      clearTimeout(failsafe);
    };
  }, [delay]);

  return [ref, isVisible];
};

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Reveal Hooks for new sections
  const [overviewRef, overviewVisible] = useReveal();
  const [probSolRef, probSolVisible] = useReveal();
  const [capRef, capVisible] = useReveal();
  const [useCaseRef, useCaseVisible] = useReveal();
  const [statsRef, statsVisible] = useReveal();
  const [testRef, testVisible] = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (detailsData[productId]) {
      setProduct(detailsData[productId]);
    } else {
      setProduct(null);
    }

    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, [productId]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `https://placehold.co/1200x800/0b0f19/3b82f6?text=Intelligence+Visual+Offline`;
  };

  if (!product) {
    return (
      <div className="pd-not-found">
        <div className="pd-not-found-content">
          <h2>Intelligence Not Found</h2>
          <Link to="/products" className="btn-primary-glow">Return to Ecosystem</Link>
        </div>
      </div>
    );
  }

  const isFlagship = product.id === 'jureo';

  return (
    <div className={`pd-page-container ${isFlagship ? 'is-flagship' : ''}`}>
      {/* Ambient Background */}
      <div className="pd-bg-ambient"></div>

      {/* Top Navigation */}
      <div className="pd-nav">
        <Link to="/products" className="pd-back-link">
          <span aria-hidden="true">←</span> Back to Ecosystem
        </Link>
      </div>

      {/* 1. HERO SECTION */}
      <section className="pd-hero">
        <div className={`pd-hero-content reveal-hidden ${isMounted ? 'visible' : ''}`}>
          {product.badge && <span className="pd-badge">{product.badge}</span>}
          <h1 className="pd-title">
            {product.title} <span className="pd-text-gradient">{product.highlightText}</span>
          </h1>
          <p className="pd-subtitle">{product.subtitle}</p>
          <div className="pd-hero-actions">
            {/* If hostedLink exists, open in new tab. Otherwise fallback to /connect */}
            {product.hostedLink ? (
              <a
                href={product.hostedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-glow"
              >
                Initialize System
              </a>
            ) : (
              <Link to="/connect" className="btn-primary-glow">Initialize System</Link>
            )}
          </div>
        </div>

        <div className={`pd-hero-visual reveal-hidden ${isMounted ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <div className="pd-visual-wrapper">
            <img
              src={product.heroImage}
              alt={`${product.title} ${product.highlightText} - Enterprise AI Platform`}
              onError={handleImageError}
              loading="lazy"
            />
            {isFlagship && <div className="pd-flagship-glow"></div>}
            <div className="pd-visual-overlay"></div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      {product.stats && (
        <section className="pd-stats" ref={statsRef}>
          <div className="pd-stats-grid">
            {product.stats.map((stat, idx) => (
              <div
                key={idx}
                className={`pd-stat-card reveal-hidden ${statsVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${idx * 0.15}s` }}
              >
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. OVERVIEW SECTION */}
      <section className="pd-overview" ref={overviewRef}>
        <div className={`pd-overview-inner reveal-hidden ${overviewVisible ? 'visible' : ''}`}>
          <h2>System Overview</h2>
          <p className="pd-lead-desc">{product.description}</p>
          <p className="pd-detailed-desc">{product.detailedDescription}</p>
        </div>
      </section>

      {/* 4. PROBLEM -> SOLUTION SPLIT */}
      <section className="pd-problem-solution" ref={probSolRef}>
        <div className={`pd-split-layout reveal-hidden ${probSolVisible ? 'visible' : ''}`}>
          <div className="pd-split-card problem-card">
            <div className="pd-card-icon">✕</div>
            <h3>The Challenge</h3>
            <p>{product.problemStatement}</p>
          </div>
          <div className="pd-split-card solution-card">
            <div className="pd-card-icon highlight">✓</div>
            <h3>Our Solution</h3>
            <p>{product.solution}</p>
          </div>
        </div>
      </section>

      {/* 5. CORE CAPABILITIES */}
      {product.keyCapabilities && (
        <section className="pd-capabilities" ref={capRef}>
          <div className={`pd-section-header reveal-hidden ${capVisible ? 'visible' : ''}`}>
            <h2>Core Capabilities</h2>
            <p>Enterprise-grade features engineered for scale.</p>
          </div>
          <div className={`pd-capabilities-grid reveal-hidden ${capVisible ? 'visible' : ''}`}>
            {product.keyCapabilities.map((cap, idx) => (
              <div key={idx} className="pd-cap-block">
                <div className="pd-cap-dot"></div>
                <h4>{cap}</h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. USE CASES & TARGET AUDIENCE */}
      <section className="pd-applications" ref={useCaseRef}>
        <div className={`pd-app-grid reveal-hidden ${useCaseVisible ? 'visible' : ''}`}>

          <div className="pd-use-cases">
            <h2>Practical Applications</h2>
            <ul className="pd-use-case-list">
              {product.useCases.map((useCase, idx) => (
                <li key={idx}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7" /></svg>
                  {useCase}
                </li>
              ))}
            </ul>
          </div>

          <div className="pd-audience">
            <h2>Built For</h2>
            <div className="pd-audience-tags">
              {product.targetAudience.map((audience, idx) => (
                <span key={idx} className="pd-chip">{audience}</span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      {product.testimonials && product.testimonials.length > 0 && (
        <section className="pd-testimonials" ref={testRef}>
          <h2 className={`pd-section-header reveal-hidden ${testVisible ? 'visible' : ''}`}>
            Trusted Intelligence
          </h2>
          <div className="pd-testimonial-grid">
            {product.testimonials.map((test, idx) => (
              <div
                key={idx}
                className={`pd-testimonial-card reveal-hidden ${testVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${idx * 0.2}s` }}
              >
                <svg className="pd-quote-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p>"{test.quote}"</p>
                <div className="pd-author-info">
                  <h4>{test.author}</h4>
                  <span>{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}