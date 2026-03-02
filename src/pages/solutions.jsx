// src/pages/solutions.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import solutionsData from '../data/solutions.json';
import '../styles/solutions.css';

// Reusable Solution Card Component
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

  // Advanced highly-performant scroll tracker for the pinned narrative section
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            const rect = scrollContainerRef.current.getBoundingClientRect();
            const offset = 130; // Matches navbar height
            
            // FIX: Add a fallback of || 1 to prevent division by zero bugs
            const scrollableDistance = (rect.height - window.innerHeight) || 1;
            
            // Calculate progress from 0 to 1 based on container position in viewport
            let p = -(rect.top - offset) / scrollableDistance;
            
            // FIX: Ensure 'p' never resolves to NaN if calculations act weird during resize
            p = Math.max(0, Math.min(1, p || 0));
            setScrollProgress(p);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init measurement
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Card Click -> Scrolls directly to the start of the pinned section
  const handleSelect = (id) => {
    setActiveId(id);
    if (scrollContainerRef.current) {
      const offset = 130; 
      const elementPosition = scrollContainerRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const activeSolution = solutionsData.solutions.find(s => s.id === activeId);

  // Divide the 100% scroll progress into 4 active phases
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
      
      {/* --- PURE CSS AI-THEMED BACKGROUND --- */}
      <div className="sol-hero-bg">
        <div className="sol-hero-grid"></div>
        <div className="sol-hero-glow"></div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="sol-hero">
        <div className="sol-hero-content animate-fade-up">
          <span className="section-tag">{solutionsData.hero.tagline}</span>
          <h1 className="section-main-heading">{solutionsData.hero.mainHeading}</h1>
          <p>{solutionsData.hero.subHeading}</p>
        </div>
      </section>

      {/* 2. CORE SOLUTIONS RAIL */}
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

      {/* 3. DYNAMIC PINNED SCROLL NARRATIVE */}
      <section className="sol-pinned-scroll-container" ref={scrollContainerRef}>
        <div className="sol-sticky-viewport">
          
          {/* Animated Connecting Line */}
          <div className="sol-flow-line-track">
            <div className="sol-flow-line-fill" style={{ height: `${scrollProgress * 100}%` }}></div>
          </div>

          {/* Overlapping Content Blocks */}
          <div className="sol-blocks-wrapper">
            {narrativeBlocks.map((block, idx) => {
              // Determine state of the block based on current scroll index
              let visibilityStatus = 'future'; // Coming up from bottom
              if (idx === activeBlockIndex) visibilityStatus = 'active'; // Currently showing
              else if (idx < activeBlockIndex) visibilityStatus = 'past'; // Exited to top

              return (
                <div key={`${activeId}-${block.id}`} className={`sol-flow-block ${visibilityStatus}`}>
                  <div className={`sol-node-container align-${block.align}`}>
                    
                    {/* Visual Connection Dot */}
                    <div className="sol-node-dot"></div>
                    
                    {/* Actual Content Box */}
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

      {/* 4. INDUSTRY FOCUS */}
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

      {/* 5. THE ADVANTAGE */}
      <section className="sol-advantage-section">
        <div className="sol-container">
          <h2 className="sol-section-title section-main-heading">The Ethical Genesis Advantage</h2>
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

      {/* 6. CTA SECTION */}
      <section className="sol-cta-section">
        <div className="sol-cta-box">
          <h2 className="section-main-heading">{solutionsData.cta.heading}</h2>
          <p>{solutionsData.cta.text}</p>
          <div className="sol-cta-buttons">
            <Link to="/contact" className="btn-primary">Schedule a Strategy Call</Link>
            <Link to="/capabilities" className="btn-outline">Explore Our Capabilities</Link>
          </div>
        </div>
      </section>

    </div>
  );
}