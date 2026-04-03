// src/pages/intelligence.jsx

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import intelligenceData from '../data/intelligence.json';
import '../styles/intelligence.css';

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

export default function IntelligencePage() {
  const [heroRef, heroVisible] = useReveal();
  const [fwRef, fwVisible] = useReveal();
  const [labRef, labVisible] = useReveal();
  const [synergyRef, synergyVisible] = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="int-page-container">
      
      {/* 1. HERO SECTION (Lighter, Brighter Overlay) */}
      <div 
        className="int-hero-bg"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(11, 15, 25, 0.25) 0%, var(--bg-primary) 100%), url('${intelligenceData.hero.bgImage}')`,
        }}
        aria-hidden="true"
      />
      
      <div className="int-bg-ambient"></div>

      <header className="int-hero" ref={heroRef}>
        <div className={`int-hero-content ${heroVisible ? 'visible' : ''}`}>
          <span className="section-tag">{intelligenceData.hero.tagline}</span>
          <h1 className="section-main-heading">{intelligenceData.hero.mainHeading}</h1>
          <p className="int-subtitle">{intelligenceData.hero.subHeading}</p>
        </div>
      </header>

      {/* 2. PHILOSOPHY FRAMEWORK (Alternating Rows - Fixes Grid Issues) */}
      <section className="int-framework-section" ref={fwRef}>
        <div className="int-container">
          <div className={`int-section-header center ${fwVisible ? 'visible' : ''}`}>
            <span className="section-tag">{intelligenceData.framework.tagline}</span>
            <h2 className="section-main-heading">{intelligenceData.framework.title}</h2>
          </div>
          
          <div className="int-fw-list">
            {intelligenceData.framework.items.map((item, idx) => {
              const isReversed = idx % 2 !== 0;
              return (
                <div key={item.id} className={`int-fw-row ${isReversed ? 'reversed' : ''} ${fwVisible ? 'visible' : ''}`} style={{ transitionDelay: `${idx * 0.15}s` }}>
                  
                  <div className="int-fw-text">
                    <div className="int-fw-number">0{idx + 1}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                  
                  <div className="int-fw-visual">
                    <div className="int-fw-glass-orb">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        {item.id === 'zero-bias' && <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>}
                        {item.id === 'transparency' && <path d="M2 12h4l3-9 5 18 3-9h5"/>}
                        {item.id === 'sovereignty' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
                      </svg>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. INNOVATION LAB (Perfect 50/50 Split Glass Cards) */}
      <section className="int-lab-section" ref={labRef}>
        <div className="int-container">
          <div className={`int-lab-grid ${labVisible ? 'visible' : ''}`}>
            {intelligenceData.lab.items.map((item, idx) => (
              <div key={item.id} className="int-lab-card" style={{ transitionDelay: `${idx * 0.2}s` }}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="int-lab-overlay"></div>
                <div className="int-lab-glass-panel">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SYNERGY (Premium Asymmetric Overlap Design) */}
      <section className="int-synergy-section" ref={synergyRef}>
        <div className="int-container">
          <div className={`int-synergy-overlap ${synergyVisible ? 'visible' : ''}`}>
            
            {/* Left Image Side - Bright & Clear */}
            <div className="int-syn-image-wrapper">
              <img 
                src={intelligenceData.synergy.image} 
                alt="AI Synergy" 
                loading="lazy" 
              />
            </div>

            {/* Right Overlapping Glass Panel */}
            <div className="int-syn-glass-content">
              <h2>{intelligenceData.synergy.title}</h2>
              {intelligenceData.synergy.paragraphs.map((para, idx) => (
                <p key={idx} className={idx === 0 ? "int-lead-para" : ""}>{para}</p>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="int-cta-section">
        <div className="int-container">
          <div className="int-cta-box">
            <h2>{intelligenceData.cta.heading}</h2>
            <p>{intelligenceData.cta.text}</p>
            <div className="int-cta-action">
              <Link to={intelligenceData.cta.link} className="btn-primary">
                {intelligenceData.cta.button}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}