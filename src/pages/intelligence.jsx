// src/pages/intelligence.jsx

import React, { useEffect, useRef, useState } from 'react';
import intelligenceData from '../data/intelligence.json';
import '../styles/intelligence.css';

// Local hook for scroll reveal specific to this page
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

export default function IntelligencePage() {
  const [heroRef, heroVisible] = useReveal();
  const [bentoRef, bentoVisible] = useReveal();
  const [labRef, labVisible] = useReveal();
  const [insightsRef, insightsVisible] = useReveal();
  const [synergyRef, synergyVisible] = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0); // Always start at top
  }, []);

  return (
    <div className="int-page-container">
      
      {/* 1. HERO SECTION */}
      <section className="int-hero" ref={heroRef}>
        <div className="int-hero-bg-mesh"></div>
        <div className={`int-hero-content ${heroVisible ? 'visible' : ''}`}>
          <span className="int-tagline">{intelligenceData.hero.tagline}</span>
          <h1 className="int-main-title">{intelligenceData.hero.mainHeading}</h1>
          <p className="int-subtitle">{intelligenceData.hero.subHeading}</p>
        </div>
      </section>

      {/* 2. THE ETHICAL FRAMEWORK (Balanced Bento Box UI) */}
      <section className="int-section int-framework" ref={bentoRef}>
        <div className="int-container">
          <div className={`int-section-header ${bentoVisible ? 'visible' : ''}`}>
            <span className="int-section-tag">{intelligenceData.framework.tagline}</span>
            <h2>{intelligenceData.framework.title}</h2>
          </div>
          
          <div className={`int-bento-grid ${bentoVisible ? 'visible' : ''}`}>
            {intelligenceData.framework.items.map((item) => (
              <div key={item.id} className={`int-bento-card span-${item.span}`}>
                <div className="int-bento-glow"></div>
                <div className="int-bento-inner">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE R&D LAB (Image Reveal Hover Cards) */}
      <section className="int-section int-lab" ref={labRef}>
        <div className="int-container">
          <div className={`int-section-header center ${labVisible ? 'visible' : ''}`}>
            <h2>{intelligenceData.lab.title}</h2>
            <p>{intelligenceData.lab.desc}</p>
          </div>

          <div className={`int-expand-container ${labVisible ? 'visible' : ''}`}>
            {intelligenceData.lab.projects.map((project, idx) => (
              <div key={project.id} className="int-expand-card">
                
                {/* Background Image that fades in on hover */}
                <div 
                  className="int-expand-bg" 
                  style={{ backgroundImage: `url(${project.bgImage})` }}
                ></div>
                
                {/* Dark overlay to maintain readability */}
                <div className="int-expand-overlay"></div>
                
                <div className="int-expand-inner">
                  <div className="int-expand-num">0{idx + 1}</div>
                  <div className="int-expand-content">
                    <span className="int-expand-category">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p className="int-expand-desc">{project.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INSIGHTS (Functional Links with Hover States) */}
      <section className="int-section int-insights" ref={insightsRef}>
        <div className="int-container">
          <h2 className={`int-editorial-title ${insightsVisible ? 'visible' : ''}`}>
            {intelligenceData.insights.title}
          </h2>
          
          <div className={`int-editorial-grid ${insightsVisible ? 'visible' : ''}`}>
            {intelligenceData.insights.articles.map((article, idx) => (
              <a key={idx} href={article.link} className="int-editorial-card">
                <div className="int-editorial-meta">
                  <span className="int-editorial-type">{article.type}</span>
                  <span className="int-editorial-time">{article.readTime}</span>
                </div>
                <div className="int-editorial-body">
                  <h3>{article.title}</h3>
                  <p>{article.desc}</p>
                </div>
                <div className="int-editorial-cta">
                  Read Article <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HUMAN-AI SYNERGY (Split Sticky Layout with Image) */}
      <section className="int-section int-synergy" ref={synergyRef}>
        <div className="int-container int-split-layout">
          <div className={`int-split-left ${synergyVisible ? 'visible' : ''}`}>
            <div className="int-sticky-text">
              <h2>{intelligenceData.synergy.title}</h2>
              <div className="int-synergy-image-wrapper">
                <img 
                  src={intelligenceData.synergy.image} 
                  alt="Enterprise team collaborating with advanced AI systems" 
                  className="int-synergy-img" 
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className={`int-split-right ${synergyVisible ? 'visible' : ''}`}>
            {intelligenceData.synergy.paragraphs.map((para, idx) => (
              <p key={idx} className={idx === 0 ? "int-lead-para" : ""}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA NEWSLETTER (Glassmorphism Floating Box) */}
      <section className="int-cta-section">
        <div className="int-container">
          <div className="int-glass-cta">
            <h2>{intelligenceData.cta.heading}</h2>
            <p>{intelligenceData.cta.text}</p>
            <form className="int-cta-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder={intelligenceData.cta.placeholder} required aria-label="Email address" />
              <button type="submit" className="btn-primary">{intelligenceData.cta.button}</button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}