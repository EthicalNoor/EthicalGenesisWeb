// src/pages/company.jsx

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import companyData from '../data/company.json';
import '../styles/company.css';
import heroBgImage from '../img/company-page.png';

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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return [ref, isVisible];
};

export default function CompanyPage() {
  const [originRef, originVisible] = useReveal();
  const [valuesRef, valuesVisible] = useReveal();
  const [teamRef, teamVisible] = useReveal();
  const [visionRef, visionVisible] = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0); // Always start at top
  }, []);

  return (
    <div className="cmp-page-container">

      {/* 1. HERO SECTION (With Native Parallax) */}
      <section
        className="cmp-hero parallax-bg"
        style={{ backgroundImage: `url(${heroBgImage})` }}
      >
        <div className="cmp-hero-overlay"></div>
        <div className="cmp-hero-content animate-fade-up">
          <span className="section-tag">{companyData.hero.tagline}</span>
          <h1 className="cmp-title">{companyData.hero.mainHeading}</h1>
          <p className="cmp-subtitle">{companyData.hero.subHeading}</p>
        </div>
      </section>

      {/* 2. OUR ORIGIN (Split Screen) */}
      <section className="cmp-section cmp-origin" ref={originRef}>
        <div className="cmp-container cmp-split-layout">
          <div className={`cmp-split-left ${originVisible ? 'visible' : ''}`}>
            <h2>{companyData.origin.heading}</h2>
            {companyData.origin.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
          <div className={`cmp-split-right ${originVisible ? 'visible' : ''}`}>
            <div className="cmp-image-wrapper">
              <img src={companyData.origin.image} alt="Ethical Genesis Office" loading="lazy" />
              <div className="cmp-image-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (Glassmorphism Cards) */}
      <section className="cmp-section cmp-values" ref={valuesRef}>
        <div className="cmp-container">
          <h2 className={`cmp-section-title center ${valuesVisible ? 'visible' : ''}`}>
            {companyData.values.title}
          </h2>
          <div className={`cmp-values-grid ${valuesVisible ? 'visible' : ''}`}>
            {companyData.values.items.map((val, idx) => (
              <div key={val.id} className="cmp-value-card">
                <div className="cmp-value-num">0{idx + 1}</div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE TEAM (B&W to Color Hover Grid)
      <section className="cmp-section cmp-team" ref={teamRef}>
        <div className="cmp-container">
          <div className={`cmp-section-header center ${teamVisible ? 'visible' : ''}`}>
            <h2>{companyData.team.title}</h2>
            <p>{companyData.team.desc}</p>
          </div>
          
          <div className={`cmp-team-grid ${teamVisible ? 'visible' : ''}`}>
            {companyData.team.members.map((member, idx) => (
              <div key={idx} className="cmp-team-card">
                <div className="cmp-team-image">
                  <img src={member.image} alt={member.name} loading="lazy" />
                  <div className="cmp-team-overlay"></div>
                </div>
                <div className="cmp-team-info">
                  <h4>{member.name}</h4>
                  <span>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 5. LOOKING AHEAD (Vision Parallax Block) */}
      <section
        className="cmp-vision parallax-bg"
        style={{ backgroundImage: `url(${companyData.vision.bgImage})` }}
        ref={visionRef}
      >
        <div className="cmp-vision-overlay"></div>
        <div className="cmp-container">
          <div className={`cmp-vision-box ${visionVisible ? 'visible' : ''}`}>
            <h2>{companyData.vision.heading}</h2>
            <p>{companyData.vision.desc}</p>
            {/* CHANGED FROM <a> TO <Link> and explicitly set to "/connect" */}
            <Link to="/connect" className="btn-primary">
              {companyData.vision.button}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}