// src/pages/solutions.jsx

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import solutionsData from '../data/solutions.json';
import '../styles/solutions.css';

const SolutionCard = ({ solution, isActive, onClick }) => (
  <button
    className={`sol-card ${isActive ? 'active' : ''}`}
    onClick={onClick}
    aria-expanded={isActive}
    aria-controls={`detail-${solution.id}`}
  >
    <div className="sol-card-inner">
      <div className="sol-card-indicator"></div>
      <h3>{solution.title}</h3>
      <p>{solution.shortDesc}</p>
      <span className="sol-view-btn">View Solution <span aria-hidden="true">→</span></span>
    </div>
  </button>
);

export default function SolutionsPage() {
  const [activeId, setActiveId] = useState(solutionsData.solutions[0].id);
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            const rect = scrollContainerRef.current.getBoundingClientRect();
            const offset = 130;
            const scrollableDistance = (rect.height - window.innerHeight) || 1;
            let p = -(rect.top - offset) / scrollableDistance;
            p = Math.max(0, Math.min(1, p || 0));
            setScrollProgress(p);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /*
   * Robust scroll using scrollIntoView.
   * We use `scroll-margin-top` in CSS for the navbar offset
   * so we don't have to manually compute window.scrollY here.
   */
  const handleSelect = useCallback((id) => {
    setActiveId(id);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!scrollContainerRef.current) return;
        scrollContainerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  }, []);

  const activeSolution = solutionsData.solutions.find(s => s.id === activeId);
  const activeBlockIndex = Math.min(3, Math.floor(scrollProgress / 0.25));

  const narrativeBlocks = [
    { id: 'challenge', tag: 'The Challenge', content: <p>{activeSolution?.challenge}</p>, align: 'left', highlight: false },
    { id: 'solution', tag: 'Our Solution', content: <p>{activeSolution?.solution}</p>, align: 'right', highlight: true },
    {
      id: 'outcomes',
      tag: 'Key Business Outcomes',
      content: (
        <ul className="sol-outcomes-list">
          {activeSolution?.outcomes.map((o, i) => (
            <li key={i} className="sol-outcome-item">{o}</li>
          ))}
        </ul>
      ),
      align: 'center',
      highlight: false
    },
    { id: 'poweredBy', tag: 'Powered By', content: <p className="sol-powered-text">{activeSolution?.poweredBy}</p>, align: 'left', highlight: false }
  ];

  return (
    <div className="sol-page-container">
      <div className="sol-hero-bg">
        <div className="sol-hero-grid"></div>
        <div className="sol-hero-glow"></div>
      </div>

      <section className="sol-hero">
        <div className="sol-hero-content animate-fade-up">
          <span className="section-tag">{solutionsData.hero.tagline}</span>
          <h1 className="section-main-heading">{solutionsData.hero.mainHeading}</h1>
          <p>{solutionsData.hero.subHeading}</p>
        </div>
      </section>

      <section className="sol-rail-section animate-fade-up animate-delay-1">
        <div className="sol-rail-container">
          {solutionsData.solutions.map((sol) => (
            <SolutionCard
              key={sol.id}
              solution={sol}
              isActive={activeId === sol.id}
              onClick={() => handleSelect(sol.id)}
            />
          ))}
        </div>
      </section>

      <section className="sol-pinned-scroll-container" ref={scrollContainerRef}>
        <div className="sol-sticky-viewport">
          <div className="sol-flow-line-track">
            <div className="sol-flow-line-fill" style={{ height: `${scrollProgress * 100}%` }}></div>
          </div>

          <div className="sol-blocks-wrapper">
            {narrativeBlocks.map((block, idx) => {
              let visibilityStatus = 'future';
              if (idx === activeBlockIndex) visibilityStatus = 'active';
              else if (idx < activeBlockIndex) visibilityStatus = 'past';

              return (
                <div key={`${activeId}-${block.id}`} className={`sol-flow-block ${visibilityStatus}`}>
                  <div className={`sol-node-container align-${block.align}`}>
                    <div className="sol-node-dot"></div>
                    <div className={`sol-node-content ${block.highlight ? 'highlight-box' : ''}`}>
                      <span className={`sol-tag ${block.highlight ? 'highlight' : ''}`}>{block.tag}</span>
                      {block.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sol-industry-section">
        <div className="sol-container">
          <h2 className="sol-section-title section-main-heading">Industries We Serve</h2>
          <div className="sol-industry-grid">
            {solutionsData.industries.map((ind, i) => (
              <div key={i} className="sol-industry-tile">
                <div className="sol-industry-icon" aria-hidden="true">❖</div>
                <h4>{ind.title}</h4>
                <p>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sol-advantage-section">
        <div className="sol-container">
          <h2 className="sol-section-title section-main-heading">
            The Ethical Genesis AI Advantage
          </h2>
          <div className="sol-advantage-grid">
            {solutionsData.advantages.map((adv, i) => (
              <div key={i} className="sol-adv-card">
                <div className="sol-adv-number">0{i + 1}</div>
                <h4>{adv.title}</h4>
                <p>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sol-cta-section">
        <div className="sol-cta-box">
          <h2 className="section-main-heading">{solutionsData.cta.heading}</h2>
          <p>{solutionsData.cta.text}</p>
          <div className="sol-cta-buttons">
            <Link to="/connect" className="btn-primary">Schedule a Strategy Call</Link>
            <Link to="/connect" className="btn-outline">Explore Our Capabilities</Link>
          </div>
        </div>
      </section>
    </div>
  );
}