// src/pages/capabilities.jsx

import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import capabilitiesData from '../data/capabilities.json';
import '../styles/capabilities.css';

// Hero Background Image

import HeroCapabilities from '../assets/img/company-3.avif';

// --- NEW NARRATIVE IMAGE IMPORTS (FIXED TO .jpg) ---
import cap1_1 from '../assets/img/cap-1.1.jpg';
import cap1_2 from '../assets/img/cap-1.2.jpg';
import cap1_3 from '../assets/img/cap-1.3.jpg';
import cap1_4 from '../assets/img/cap-1.4.jpg';

import cap2_1 from '../assets/img/cap-2.1.jpg';
import cap2_2 from '../assets/img/cap-2.2.jpg';
import cap2_3 from '../assets/img/cap-2.3.jpg';
import cap2_4 from '../assets/img/cap-2.4.jpg';

import cap3_1 from '../assets/img/cap-3.1.jpg';
import cap3_2 from '../assets/img/cap-3.2.jpg';
import cap3_3 from '../assets/img/cap-3.3.jpg';
import cap3_4 from '../assets/img/cap-3.4.jpg';

import cap4_1 from '../assets/img/cap-4.1.jpg';
import cap4_2 from '../assets/img/cap-4.2.jpg';
import cap4_3 from '../assets/img/cap-4.3.jpg';
import cap4_4 from '../assets/img/cap-4.4.jpg';

import cap5_1 from '../assets/img/cap-5.1.jpg';
import cap5_2 from '../assets/img/cap-5.2.jpg';
import cap5_3 from '../assets/img/cap-5.3.jpg';
import cap5_4 from '../assets/img/cap-5.4.jpg';

import cap6_1 from '../assets/img/cap-6.1.jpg';
import cap6_2 from '../assets/img/cap-6.2.jpg';
import cap6_3 from '../assets/img/cap-6.3.jpg';
import cap6_4 from '../assets/img/cap-6.4.jpg';

// --- IMAGE MAPPING OBJECT ---
const imageMap = {
  cap1_1, cap1_2, cap1_3, cap1_4,
  cap2_1, cap2_2, cap2_3, cap2_4,
  cap3_1, cap3_2, cap3_3, cap3_4,
  cap4_1, cap4_2, cap4_3, cap4_4,
  cap5_1, cap5_2, cap5_3, cap5_4,
  cap6_1, cap6_2, cap6_3, cap6_4
};

// Analytics Mock Hook
const trackEvent = (eventName, payload) => {
  console.log(`[Analytics] ${eventName}`, payload);
};

// --- MERGED SCROLL NARRATIVE COMPONENT ---
const ScrollNarrative = ({ narrative, activeId }) => {
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
    handleScroll(); // Init measurement
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeId]);

  const activeBlockIndex = Math.min(3, Math.floor(scrollProgress / 0.25));

  if (!narrative || narrative.length === 0) return null;

  // Premium fallback image just in case a narrative object in JSON is missing the "image" key
  const fallbackImg = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop";

  return (
    <section className="cp-nar-scroll-container" ref={scrollContainerRef}>
      <div className="cp-nar-sticky-viewport">
        {/* Animated Connecting Line */}
        <div className="cp-nar-flow-line-track">
          <div className="cp-nar-flow-line-fill" style={{ height: `${scrollProgress * 100}%` }}></div>
        </div>

        {/* Overlapping Content Blocks */}
        <div className="cp-nar-blocks-wrapper">
          {narrative.map((block, idx) => {
            let visibilityStatus = 'future';
            if (idx === activeBlockIndex) visibilityStatus = 'active';
            else if (idx < activeBlockIndex) visibilityStatus = 'past';

            return (
              <div key={`${activeId}-${block.id}`} className={`cp-nar-flow-block ${visibilityStatus}`}>

                {/* NEW SPLIT LAYOUT: Reverses flex direction based on alignment */}
                <div className={`cp-nar-row align-${block.align}`}>

                  {/* Center Dot perfectly positioned on the line */}
                  <div className="cp-nar-node-dot"></div>

                  {/* Text Side */}
                  <div className="cp-nar-text-side">
                    <div className={`cp-nar-node-content ${block.highlight ? 'highlight-box' : ''}`}>
                      <span className={`cp-nar-tag ${block.highlight ? 'highlight' : ''}`}>{block.tag}</span>
                      <p>{block.content}</p>
                    </div>
                  </div>

                  {/* Image Side - Automatically mirrors text */}
                  <div className="cp-nar-image-side">
                    <div className="cp-nar-image-wrapper">
                      {/* UPDATED: Uses the imageMap to pull the local imported file */}
                      <img src={imageMap[block.image] || fallbackImg} alt={block.tag} loading="lazy" />
                      <div className="cp-nar-image-overlay"></div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Reusable Component for Step Details
const StepDetailContent = ({ step }) => (
  <div className="cp-panel-content">
    <div className="cp-panel-header-inline">
      <span className="section-tag">Phase 0{step.id}</span>
      <h3>{step.title}</h3>
      <p>{step.summary}</p>
    </div>
    <div className="cp-panel-grid">
      <div className="cp-panel-block">
        <h5>Acceptance Criteria</h5>
        <p>{step.criteria}</p>
      </div>
      <div className="cp-panel-block">
        <h5>Inputs & Outputs</h5>
        <p>{step.inputsOutputs}</p>
      </div>
      <div className="cp-panel-block">
        <h5>Tools & Infra</h5>
        <p>{step.tools}</p>
      </div>
      <div className="cp-panel-block">
        <h5>Security Notes</h5>
        <p>{step.security}</p>
      </div>
      <div className="cp-panel-block">
        <h5>Time Estimate</h5>
        <p>{step.time}</p>
      </div>
      <div className="cp-panel-block">
        <h5>Risks & Mitigation</h5>
        <p>{step.risk}</p>
      </div>
    </div>
  </div>
);

export default function CapabilitiesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const detailRef = useRef(null);
  const carouselTrackRef = useRef(null);

  const [selectedCap, setSelectedCap] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [isFlowHovered, setIsFlowHovered] = useState(false);

  const scrollToDetails = () => {
    setTimeout(() => {
      if (detailRef.current) {
        const navbarOffset = 130;
        const elementPosition = detailRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 200);
  };

  useEffect(() => {
    trackEvent('page_view', { page: '/capabilities' });

    const hash = location.hash;
    if (hash && hash.startsWith('#capability-')) {
      const parts = hash.replace('#capability-', '').split('-step-');
      const capSlug = parts[0];
      const stepNum = parts[1] ? parseInt(parts[1], 10) : null;

      const foundCap = capabilitiesData.find(c => c.slug === capSlug);
      if (foundCap) {
        setSelectedCap(foundCap);
        if (stepNum) {
          const foundStep = foundCap.steps?.find(s => s.id === stepNum);
          if (foundStep) {
            setSelectedStep(foundStep);
            setIsFlowHovered(true);
          }
        } else {
          setSelectedStep(null);
          setIsFlowHovered(false);
        }
        scrollToDetails();
      }
    } else {
      setSelectedCap(null);
      setSelectedStep(null);
      setIsFlowHovered(false);
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  const handleSelectCap = (capSlug) => {
    trackEvent('capability_selected', { capability: capSlug });
    navigate(`/capabilities#capability-${capSlug}`);

    if (selectedCap?.slug === capSlug) {
      scrollToDetails();
    }
  };

  const handleHoverStep = (step) => {
    trackEvent('step_viewed', { capability: selectedCap?.slug, step: step.id });
    setSelectedStep(step);
    setIsFlowHovered(true);
  };

  const scrollCarousel = (direction) => {
    if (carouselTrackRef.current) {
      const scrollAmount = carouselTrackRef.current.clientWidth * 0.8;
      carouselTrackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // RESTORED FIX: activeStepIdx is required for the timeline CSS variable to prevent the app from crashing!
  const activeStepIdx = selectedStep && selectedCap?.steps
    ? selectedCap.steps.findIndex(s => s.id === selectedStep.id)
    : 0;

  return (
    <div className="cap-page-container" style={{ position: 'relative' }}>

      {/* --- STATIC HERO BACKGROUND IMAGE --- */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '550px',
          // UPDATED: Replaced Unsplash URL with the imported HeroCapabilities variable
          backgroundImage: `linear-gradient(to bottom, rgba(11, 15, 25, 0.4) 0%, var(--bg-primary) 100%), url(${HeroCapabilities})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />

      {/* 1. HERO SECTION */}
      <section className="cp-hero" key={`hero-${selectedCap ? selectedCap.slug : 'default'}`} style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="section-main-heading">Our Capabilities</h1>
        <p>Architecting enterprise intelligence through customized, high-performance AI workflows, models, and infrastructure.</p>
      </section>

      {/* 2. HORIZONTAL CAPABILITIES CAROUSEL */}
      <section className="cp-carousel-wrapper" style={{ position: 'relative', zIndex: 1 }}>
        <button className="cp-arrow-btn left" onClick={() => scrollCarousel('left')} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        <div className="cp-carousel-track" ref={carouselTrackRef}>
          {capabilitiesData.map((cap) => (
            <div
              key={cap.slug}
              className={`cp-tile ${selectedCap?.slug === cap.slug ? 'active' : ''}`}
              onClick={() => handleSelectCap(cap.slug)}
              role="button"
              tabIndex={0}
              aria-pressed={selectedCap?.slug === cap.slug}
              onKeyDown={(e) => e.key === 'Enter' && handleSelectCap(cap.slug)}
            >
              <h3>{cap.title}</h3>
              <p>{cap.shortDescription}</p>
              <span className="cp-tile-btn">
                Explore Capability <span aria-hidden="true">→</span>
              </span>
            </div>
          ))}
        </div>

        <button className="cp-arrow-btn right" onClick={() => scrollCarousel('right')} aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </section>

      {/* 3. DETAILED VIEW */}
      {selectedCap && (
        <section className="cp-detail-wrapper" ref={detailRef} tabIndex="-1" style={{ position: 'relative', zIndex: 1 }}>

          <div className="cp-overview">
            <div className="cp-pitch">
              <h2 className="section-main-heading">{selectedCap.title}</h2>
              <p>{selectedCap.elevatorPitch}</p>

              <div className="cp-metrics">
                {/* Added optional chaining ?. to prevent crashes if JSON is missing data */}
                {selectedCap.metrics?.map((m, i) => (
                  <div key={i} className="cp-metric">
                    <h4>{m.value}</h4>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cp-outcomes">
              <h3>Key Outcomes</h3>
              <ul>
                {selectedCap.outcomes?.map((out, i) => (
                  <li key={i}>{out}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- MERGED NARRATIVE SCROLL (The Story) --- */}
          <ScrollNarrative narrative={selectedCap.narrative} activeId={selectedCap.slug} />

          {/* INTERACTIVE FLOWCHART WITH CALLOUT */}
          <div className="cp-flowchart-container">
            <h3 className="section-main-heading">Deployment Lifecycle</h3>
            <p className="cp-flow-hint">Hover over a phase below to reveal architectural details.</p>

            <div className="cp-flow-desktop-wrapper" onMouseLeave={() => setIsFlowHovered(false)}>
              <div className="cp-flow-desktop">
                <div className="cp-flow-line"></div>
                {selectedCap.steps?.map((step) => (
                  <div
                    key={step.id}
                    className={`cp-node ${selectedStep?.id === step.id && isFlowHovered ? 'active' : ''}`}
                    onMouseEnter={() => handleHoverStep(step)}
                    onClick={() => handleHoverStep(step)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="cp-node-dot"></div>
                    <span className="cp-node-title">0{step.id}. {step.title}</span>
                  </div>
                ))}
              </div>

              <div className={`cp-callout-wrapper ${isFlowHovered && selectedStep ? 'open' : ''}`} style={{ "--active-idx": activeStepIdx }}>
                <div className="cp-callout-overflow">
                  <div className="cp-callout-box">
                    {selectedStep && <StepDetailContent step={selectedStep} />}
                  </div>
                </div>
              </div>
            </div>

            <div className="cp-flow-mobile">
              {selectedCap.steps?.map((step) => (
                <div key={step.id} className="cp-mob-accordion">
                  <button
                    className={`cp-mob-node ${selectedStep?.id === step.id ? 'active' : ''}`}
                    onClick={() => setSelectedStep(selectedStep?.id === step.id ? null : step)}
                  >
                    <span>0{step.id}. {step.title}</span>
                    <span className="cp-mob-icon">{selectedStep?.id === step.id ? '−' : '+'}</span>
                  </button>
                  <div className={`cp-mob-panel ${selectedStep?.id === step.id ? 'open' : ''}`}>
                    <div className="cp-mob-panel-inner">
                      <StepDetailContent step={step} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM SECTIONS */}
          <div className="cp-bottom-sections">
            <div className="cp-snapshot">
              <h4 className="section-main-heading">Security Snapshot</h4>
              <ul className="cp-sec-list">
                {selectedCap.securityChecklist?.map((item, i) => (
                  <li key={i}>
                    <svg className="cp-sec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <path d="M9 12l2 2 4-4"></path>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="cp-cases">
              <h4 className="section-main-heading">Case Highlights</h4>
              {selectedCap.caseStudies?.map((cs, i) => (
                <div key={i} className="cp-case-card">
                  <h5>{cs.title}</h5>
                  <div className="cp-case-metric">{cs.metric}</div>
                  <p>{cs.desc}</p>
                </div>
              ))}
            </div>
          </div>

{/* CTA */}
          <div className="cp-cta-block">
            <h2 className="section-main-heading">Ready to Architect the Future?</h2>
            <div className="cp-cta-buttons">
              
              {/* Redesigned Pill Button with Trailing Icon */}
              <Link to="/connect" className="btn-primary" aria-label="Start a PoC" onClick={() => trackEvent('cta_click', { type: 'poc' })}>
                <span>Start a PoC</span>
                <svg 
                  width="20" 
                  height="16" 
                  viewBox="0 0 20 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transition: 'transform 0.3s ease' }}
                >
                  <path 
                    d="M19.7071 8.70711C20.0976 8.31658 20.0976 7.68342 19.7071 7.29289L13.3431 0.928932C12.9526 0.538408 12.3195 0.538408 11.9289 0.928932C11.5384 1.31946 11.5384 1.95262 11.9289 2.34315L17.5858 8L11.9289 13.6569C11.5384 14.0474 11.5384 14.6805 11.9289 15.0711C12.3195 15.4616 12.9526 15.4616 13.3431 15.0711L19.7071 8.70711ZM0 9H19V7H0V9Z" 
                    fill="currentColor"
                  />
                  <path 
                    d="M1 9V7H0V9H1Z" 
                    fill="currentColor" 
                  />
                </svg>
              </Link>

              <Link to="/connect" className="btn-outline" onClick={() => trackEvent('cta_click', { type: 'tech_spec' })}>
                Request Technical Spec
              </Link>
            </div>
          </div>

        </section>
      )}

    </div>
  );
}