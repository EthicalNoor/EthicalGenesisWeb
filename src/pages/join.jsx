// src/pages/join.jsx

import React, { useEffect, useRef, useState } from 'react';
import joinData from '../data/join.json';
import '../styles/join.css';

// Local scroll reveal hook
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return [ref, isVisible];
};

export default function JoinUsPage() {
  const [heroRef, heroVisible] = useReveal();
  const [perksRef, perksVisible] = useReveal();
  const [openingsRef, openingsVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0); // Always start at top
  }, []);

  return (
    <div className="join-page-container">
      <div className="join-split-layout">
        
        {/* LEFT SIDE: Scrollable Content */}
        <div className="join-content-pane">
          <div className="join-content-inner">
            
            {/* 1. HERO SECTION */}
            <div className={`join-section join-hero ${heroVisible ? 'visible' : ''}`} ref={heroRef}>
              <span className="join-tagline">{joinData.hero.tagline}</span>
              <h1 className="join-title">{joinData.hero.mainHeading}</h1>
              <p className="join-subtitle">{joinData.hero.subHeading}</p>
            </div>

            {/* 2. CORE PERKS */}
            <div className={`join-section join-perks ${perksVisible ? 'visible' : ''}`} ref={perksRef}>
              <div className="join-perks-grid">
                {joinData.perks.map((perk, idx) => (
                  <div key={idx} className="join-perk-item">
                    <h4>{perk.title}</h4>
                    <p>{perk.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. OPEN POSITIONS */}
            <div className={`join-section join-openings ${openingsVisible ? 'visible' : ''}`} ref={openingsRef}>
              <h3 className="join-section-title">{joinData.openings.title}</h3>
              <div className="join-roles-list">
                {joinData.openings.roles.map((role) => (
                  <a href={role.link} key={role.id} className="join-role-card">
                    <div className="join-role-info">
                      <h4>{role.title}</h4>
                      <span>{role.type}</span>
                    </div>
                    <div className="join-role-action">
                      Apply <span aria-hidden="true">→</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* 4. OPEN APPLICATION CTA */}
            <div className={`join-section join-cta ${ctaVisible ? 'visible' : ''}`} ref={ctaRef}>
              <div className="join-cta-box">
                <p>{joinData.cta.text}</p>
                <a href={`mailto:${joinData.cta.email}`} className="btn-primary">
                  {joinData.cta.button}
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE: Sticky Image Pane */}
        <div className="join-image-pane">
          <div className="join-sticky-image-wrapper">
            <img 
              src={joinData.image} 
              alt="Ethical Genesis Innovation Lab" 
              className="join-sticky-image"
              loading="lazy"
            />
            <div className="join-image-overlay"></div>
          </div>
        </div>

      </div>
    </div>
  );
}