// src/App.jsx

import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// --- NEW CAPABILITIES PAGE IMPORT ---
import CapabilitiesPage from './pages/capabilities';
import SolutionsPage from './pages/solutions';
import IntelligencePage from './pages/intelligence';
import JoinUsPage from './pages/join';
import CompanyPage from './pages/company';
import ConnectPage from './pages/connect';
import ProductsPage from './pages/products';

// --- IMPORT ASSETS HERE ---
import logo from './img/logo.png';
import bgVideo from './img/vid/bv4.mp4';
import videoPoster from './img/video-poster.png';

// Capability Images
import cap1 from './img/cap1.jpg';
import cap2 from './img/cap2.jpg';
import cap3 from './img/cap3.jpg';
import cap4 from './img/cap4.jpg';
import cap5 from './img/cap5.jpg';
import cap6 from './img/cap6.jpg';

// Custom Hook for Scroll Reveal Animation
const useScrollReveal = () => {
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
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
};


// --- LOADER ---

// --- PREMIUM BRANDED LOADER ---

const splashCSS = `
  .lw-loader-wrap {
    position: fixed;
    z-index: 99999999999999;
    height: 100vh;
    width: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #0b0f19; /* Perfectly matches your --bg-primary */
    transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.8s ease;
  }

  /* Soft glowing pulse animation for your logo */
  .lw-logo {
    width: 280px; 
    height: auto;
    margin-bottom: 40px;
    animation: pulseLogo 2s ease-in-out infinite;
    /* Optional: If logo is white, this ensures it looks crisp */
    filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.2));
  }

  @keyframes pulseLogo {
    0% { opacity: 0.8; transform: scale(0.98); filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0)); }
    50% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.5)); }
    100% { opacity: 0.8; transform: scale(0.98); filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0)); }
  }

  /* Enterprise-style loading text */
  .lw-loading-text {
    color: #94a3b8; /* Matches your --text-secondary */
    font-size: 0.75rem;
    letter-spacing: 5px;
    text-transform: uppercase;
    margin-bottom: 15px;
    font-weight: 600;
  }

  /* Sleek, thin progress track */
  .lw-progress-container {
    width: 220px;
    height: 2px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
  }

  /* Sweeping blue progress indicator */
  .lw-progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 40%;
    background: #3b82f6; /* Matches your --accent-color */
    border-radius: 2px;
    box-shadow: 0 0 10px #3b82f6;
    animation: sweepingBar 1.5s ease-in-out infinite alternate;
  }

  @keyframes sweepingBar {
    0% { left: -40%; width: 40%; }
    100% { left: 100%; width: 40%; }
  }
`;

function SplashScreen({ onComplete }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Display loader for 2.2 seconds, then trigger the slide-up exit
    const timer = setTimeout(() => {
      wrap.style.transform = "translateY(-100%)";
      wrap.style.opacity = "0";

      // Wait for CSS transition to finish before totally unmounting
      setTimeout(() => {
        if (wrap) wrap.style.display = "none";
        if (onComplete) onComplete();
      }, 800);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      <style>{splashCSS}</style>
      <div className="lw-loader-wrap" ref={wrapRef}>
        {/* Uses the actual logo imported at the top of App.jsx */}
        <img src={logo} alt="Ethical Genesis" className="lw-logo" />
        
        <div className="lw-loading-text">System Initializing</div>
        
        <div className="lw-progress-container">
          <div className="lw-progress-bar"></div>
        </div>
      </div>
    </>
  );
}


// --- PREMIUM CAPABILITIES SLIDER ---
const capabilitiesData = [
  { id: 1, tag: "Capability", title: "Generative AI Solutions", desc: "Deploy custom LLMs and multimodal models to automate content, code, and design generation seamlessly into your enterprise ecosystem.", img: cap1 },
  { id: 2, tag: "Capability", title: "Agentic AI Systems", desc: "Build autonomous, goal-oriented AI agents capable of complex reasoning, decision-making, and multi-step execution with minimal human oversight.", img: cap2 },
  { id: 3, tag: "Capability", title: "LLM Fine-Tuning & RAG", desc: "Ground foundational AI models in your proprietary enterprise data using advanced Retrieval-Augmented Generation for pinpoint accuracy and reduced hallucinations.", img: cap3 },
  { id: 4, tag: "Capability", title: "Knowledge Graphs", desc: "Connect siloed organizational data intelligently to uncover hidden relationships, power semantic search, and drive context-aware reasoning.", img: cap4 },
  { id: 5, tag: "Capability", title: "Machine Learning Engineering", desc: "Develop end-to-end MLOps pipelines, predictive modeling architectures, and scalable infrastructure for robust, production-grade AI deployment.", img: cap5 },
  { id: 6, tag: "Capability", title: "Autonomous AI Workflows", desc: "Transform static operational bottlenecks into self-optimizing, adaptive pipelines powered by next-generation intelligent automation.", img: cap6 }
];

// --- PREMIUM MARQUEE DATA ---
const MARQUEE_ITEMS = [
  "Generative AI Systems",
  "Large Language Model (LLM) Engineering",
  "Multimodal AI",
  "Retrieval-Augmented Generation (RAG)",
  "AI Agents & Autonomous Workflows",
  "Agentic AI Architecture",
  "Fine-Tuning & Model Alignment",
  "Prompt Engineering & Optimization",
  "AI Copilot Development",
  "Conversational AI Platforms",
  "Vector Databases & Embeddings",
  "Knowledge Graph Intelligence",
  "Computer Vision Systems",
  "Vision-Language Models (VLM)",
  "Speech AI & Voice Cloning",
  "Synthetic Data Generation",
  "Reinforcement Learning",
  "Edge AI Deployment",
  "MLOps & LLMOps",
  "Model Monitoring & AI Observability",
  "AI Security & Model Safeguarding",
  "Federated Learning",
  "Blockchain + AI Integration",
  "AI-Powered Automation",
  "Predictive Analytics",
  "Data Intelligence Engineering",
  "Cloud-Native AI Infrastructure",
  "AI API & SaaS Platforms",
  "Digital Transformation with AI",
  "Human-AI Collaboration Systems"
];

const CapabilitiesSlider = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide logic using native horizontal scrolling
  useEffect(() => {
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
          }
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="capabilities-slider-section" id="capabilities">
      {/* ══════════ MARQUEE ══════════ */}
      <div
        className="marquee-wrap"
        onMouseEnter={(e) => {
          const track = e.currentTarget.querySelector('.marquee-track');
          track.getAnimations().forEach(anim => anim.playbackRate = 0.5);
        }}
        onMouseLeave={(e) => {
          const track = e.currentTarget.querySelector('.marquee-track');
          track.getAnimations().forEach(anim => anim.playbackRate = 1);
        }}
      >
        <div className="marquee-track" id="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <div key={i} className="marquee-item">
              <span className={`mi-dot${i % 2 === 1 ? " navy" : ""}`}></span>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="cap-header-content">
        <h2 className="capabilities-title section-main-heading">
          Turn tomorrow’s challenges into today’s opportunities with <span className="highlight-text">AI, ML, & GenAI</span>.
        </h2>
      </div>

      <div className="cap-slider-wrapper">
        <div className="cap-slides-container" ref={scrollRef}>
          {capabilitiesData.map((item) => (
            <div
              key={item.id}
              className="cap-slide"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="cap-slide-content">
                <span className="slide-tag">{item.tag}</span>
                <h3 className="slide-title">{item.title}</h3>
                <p className="slide-desc">{item.desc}</p>
                <div className="slide-action">
                  <Link to="/capabilities" className="btn-primary btn-outline">Read More</Link>
                </div>
              </div>
              <div className="cap-slide-image">
                <div className="image-overlay-glow"></div>
                <img src={item.img} alt={item.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: Premium 3D Flip "Why Choose Us" Section ---
const CountUpMetric = ({ target, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, trigger]);

  return <span>{count}</span>;
};

const whyChooseData = [
  {
    id: 1,
    title: "Generative & Agentic AI",
    desc: "We engineer next-generation Generative and Agentic AI systems that go beyond simple automation. Our solutions design, reason, adapt, and execute multi-step workflows autonomously.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" /></svg>,
    metrics: [
      { num: 10, suffix: "x", label: "Workflow Acceleration" },
      { num: 99, suffix: "%", label: "Task Autonomy" },
      { num: 50, prefix: "<", suffix: "ms", label: "Decision Latency" }
    ]
  },
  {
    id: 2,
    title: "Tailored Architecture",
    desc: "Every enterprise operates within a unique data ecosystem. We architect fully customized AI, Machine Learning, and Generative AI solutions designed specifically around your workflows.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m-6-6h6m2 8h6M9 8h6m2 8h6m-6-6h6" /></svg>,
    metrics: [
      { num: 100, suffix: "%", label: "Custom Architected" },
      { num: 300, suffix: "%", label: "ROI Multiplier" },
      { num: 0, suffix: "", label: "Legacy Tech Debt" }
    ]
  },
  {
    id: 3,
    title: "Proactive Innovation",
    desc: "Technology evolves rapidly — your systems should evolve with it. We design AI architectures that are modular, scalable, and integration-ready for emerging breakthroughs.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
    metrics: [
      { num: 40, suffix: "%", label: "R&D Time Saved" },
      { num: 100, suffix: "%", label: "API Extensibility" },
      { num: 24, suffix: "/7", label: "System Adaptability" }
    ]
  },
  {
    id: 4,
    title: "Knowledge Graphs",
    desc: "We transform fragmented enterprise data into interconnected intelligence using advanced knowledge graphs and semantic reasoning frameworks.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98" /></svg>,
    metrics: [
      { num: 10, suffix: "M+", label: "Nodes Processed" },
      { num: 90, suffix: "%", label: "Silo Reduction" },
      { num: 1, prefix: "<", suffix: "s", label: "Semantic Query Time" }
    ]
  },
  {
    id: 5,
    title: "Scalable RAG & LLMs",
    desc: "We deploy enterprise-grade Large Language Models powered by Retrieval-Augmented Generation (RAG), grounded securely in your proprietary data.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="6" rx="2" /><rect x="4" y="14" width="16" height="6" rx="2" /><path d="M12 10v4" /></svg>,
    metrics: [
      { num: 99, suffix: ".99%", label: "System Uptime" },
      { num: 50, suffix: "M+", label: "Tokens Processed" },
      { num: 98, suffix: "%", label: "Hallucination Reduction" }
    ]
  },
  {
    id: 6,
    title: "Ethical & Secure AI",
    desc: "Trust is foundational to intelligent systems. We embed enterprise-grade security, robust data governance, bias mitigation strategies, and regulatory compliance into every layer.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    metrics: [
      { num: 100, suffix: "%", label: "Data Privacy" },
      { num: 0, suffix: "%", label: "Algorithmic Bias" },
      { num: 256, suffix: "-bit", label: "AES Encryption" }
    ]
  }
];

const WhyChooseSection = () => {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [animatedIndices, setAnimatedIndices] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const { top, height } = wrapperRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = height - windowHeight;

      let p = -top / scrollableDistance;
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeIndex = Math.min(Math.round(progress * 5), 5);
  const circleRotation = -90 + (progress * 180);

  useEffect(() => {
    setIsFlipped(false);
  }, [activeIndex]);

  const handleInteraction = (state) => {
    setIsFlipped(state);
    if (state) {
      setAnimatedIndices(prev => ({ ...prev, [activeIndex]: true }));
    }
  };

  return (
    <section className="why-choose-wrap" ref={wrapperRef}>
      <div className="why-choose-sticky">
        <div className="why-bg-grid"></div>
        <div className="why-bg-glow"></div>
        <div className="why-container">
          <div className="why-content-side">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="why-main-title section-main-heading">Ethical Genesis AI</h2>

            <div
              className="wc-flip-container"
              key={activeIndex}
              onMouseEnter={() => handleInteraction(true)}
              onMouseLeave={() => handleInteraction(false)}
              onClick={() => handleInteraction(!isFlipped)}
            >
              <div className={`wc-flip-inner ${isFlipped ? 'is-flipped' : ''}`}>
                <div className="why-active-front">
                  <div className="waf-header">
                    <h3 className="why-active-title">{whyChooseData[activeIndex].title}</h3>
                  </div>
                  <div className="waf-body">
                    <p className="why-active-desc">{whyChooseData[activeIndex].desc}</p>
                    <div className="waf-hover-hint">Hover for impact ➔</div>
                  </div>
                </div>
                <div className="why-active-back">
                  <div className="waf-header">
                    <h4 className="wc-back-heading">Impact & Scale</h4>
                  </div>
                  <div className="waf-body centered-body">
                    <div className="wc-metrics-grid">
                      {whyChooseData[activeIndex].metrics.map((m, idx) => (
                        <div key={idx} className="wc-metric-item">
                          <div className="wc-metric-number">
                            {m.prefix}
                            <CountUpMetric target={m.num} trigger={animatedIndices[activeIndex]} />
                            {m.suffix}
                          </div>
                          <div className="wc-metric-label">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/why-us" className="btn-primary btn-outline wc-read-more">Read More</Link>
          </div>

          <div className="why-circle-side">
            <div className="why-circle-positioner">
              <div className="why-circle-arc"></div>
              <div className="why-circle" style={{ transform: `rotate(${circleRotation}deg)` }}>
                {whyChooseData.map((item, idx) => {
                  const itemAngle = 90 - (idx * 36);
                  const inverseAngle = -(itemAngle + circleRotation);
                  const isActive = idx === activeIndex;

                  return (
                    <div
                      key={item.id}
                      className="why-circle-item-wrap"
                      style={{ transform: `rotate(${itemAngle}deg) translateX(calc(var(--circle-radius) * -1))` }}
                    >
                      <div className="why-circle-item-counter" style={{ transform: `rotate(${inverseAngle}deg)` }}>
                        <div className={`why-circle-item-inner ${isActive ? 'active' : ''}`}>
                          <div className="why-item-icon">{item.icon}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: Client Success Stories (Modern Flip Cards) ---
const successStoriesData = [
  {
    id: 1,
    clientName: "Jonathan D.",
    industry: "FinTech & Banking",
    duration: "6 Months",
    challenge: "Legacy fraud detection systems were producing high false-positive rates and lagging in real-time transaction processing.",
    solution: "Engineered a custom ML pipeline with real-time predictive analytics and autonomous decision-making agents.",
    metrics: [
      { value: "45%", label: "Cost Reduction" },
      { value: "<15ms", label: "Latency" }
    ]
  },
  {
    id: 2,
    clientName: "Sarah M.",
    industry: "Healthcare Systems",
    duration: "4 Months",
    challenge: "Medical professionals spent countless hours manually parsing complex patient records and siloed clinical data.",
    solution: "Deployed an enterprise RAG-based Large Language Model system for instant, semantic medical record querying.",
    metrics: [
      { value: "3x", label: "Productivity Lift" },
      { value: "2M+", label: "Records Parsed" }
    ]
  },
  {
    id: 3,
    clientName: "Marcus R.",
    industry: "Global E-Commerce",
    duration: "8 Months",
    challenge: "Generic product recommendations and disconnected customer journeys were leading to high bounce rates and stagnant growth.",
    solution: "Developed an Agentic AI personalization engine powered by real-time Knowledge Graphs to dynamically tailor user experiences.",
    metrics: [
      { value: "+35%", label: "Conversion Rate" },
      { value: "$12M", label: "Revenue Lift" }
    ]
  }
];

const SuccessStoriesSection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      className="success-section"
      id="success-stories"
      ref={ref}
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop')" }}
    >
      <div className="success-overlay"></div>
      <div className="success-container">

        <div className={`success-header-wrap reveal ${isVisible ? 'active' : ''}`}>
          <span className="section-tag">Proven Impact</span>
          <h2 className="success-main-title section-main-heading">Client Success Stories</h2>
          <p className="success-subtitle">Discover how we transform complex enterprise challenges into measurable, scalable technological triumphs.</p>
        </div>

        <div className="success-grid">
          {successStoriesData.map((story, index) => (
            <div
              key={story.id}
              className={`sc-flip-container reveal delay-${(index + 1) * 100} ${isVisible ? 'active' : ''}`}
            >
              <div className="sc-flip-inner">
                {/* FRONT OF CARD */}
                <div className="sc-front">
                  <div className="sc-client-profile">
                    <div className="sc-avatar">{story.clientName.charAt(0)}</div>
                    <div className="sc-client-info">
                      <span className="sc-client-name">{story.clientName}</span>
                      <span className="sc-industry">{story.industry}</span>
                    </div>
                  </div>
                  <div className="sc-challenge-brief">
                    <h5>The Challenge</h5>
                    <p>"{story.challenge}"</p>
                  </div>
                  <div className="sc-hover-hint">Hover for Solution ➔</div>
                </div>

                {/* BACK OF CARD */}
                <div className="sc-back">
                  <div className="sc-solution-brief">
                    <h5>The Solution</h5>
                    <p>{story.solution}</p>
                  </div>
                  <div className="sc-metrics">
                    {story.metrics.map((metric, idx) => (
                      <div key={idx} className="sc-metric-box">
                        <div className="sc-metric-val">{metric.value}</div>
                        <div className="sc-metric-lab">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`success-cta reveal delay-400 ${isVisible ? 'active' : ''}`}>
          <Link to="/contact" className="btn-primary">Start Your Success Story</Link>
        </div>

      </div>
    </section>
  );
};

// ----------------------------------------------------
// EXTRACTED HOME PAGE COMPONENT
// ----------------------------------------------------
function HomePage() {
  const [jureoRef, jureoVisible] = useScrollReveal();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="hero-video-container">
          <video
            className="hero-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
        </div>

        <div className="hero-content">
          <h1 className="hero-title reveal active">
            Empower your business with <span className="highlight-text">EthicalGenesis</span>
          </h1>
          <p className="hero-subtitle reveal active delay-100">
            Driving unparalleled success with data-driven insights and innovative AI solutions crafted by our experts.
          </p>
        </div>
      </section>

      {/* Content Layer */}
      <div className="content-layer">

        {/* Product Section: Jureo */}
        <section className="jureo-section" ref={jureoRef}>
          <span className={`section-tag reveal ${jureoVisible ? 'active' : ''}`}>
            Our Flagship Product
          </span>
          <h2 className={`jureo-title section-main-heading reveal delay-100 ${jureoVisible ? 'active' : ''}`}>
            AI Paralegal Platform for Indian Lawyers & Law Firms
          </h2>
          <p className={`jureo-desc reveal delay-200 ${jureoVisible ? 'active' : ''}`}>
            Experience smarter legal research workflows. Jureo seamlessly combines intelligent fact extraction, intuitive questioning, and comprehensive precedent search into one powerful platform.
          </p>

          <div className={`video-wrapper reveal delay-300 ${jureoVisible ? 'active' : ''}`}>
            {!isVideoPlaying ? (
              <div className="custom-video-cover" onClick={() => setIsVideoPlaying(true)}>
                <img src={videoPoster} alt="Jureo Video Thumbnail" className="video-thumbnail" />
                <div className="play-button">
                  <div className="play-icon"></div>
                </div>
              </div>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/IJJ8AVRb6jE?rel=0&autoplay=1"
                title="Jureo Product Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>

          <div className={`reveal delay-300 ${jureoVisible ? 'active' : ''}`}>
            <a href="https://jureo.com/" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Discover Jureo
            </a>
          </div>
        </section>

        {/* --- PREMIUM CAPABILITIES SECTION --- */}
        <CapabilitiesSlider />

        {/* --- WHY CHOOSE US ROTATING SECTION --- */}
        <WhyChooseSection />

        {/* --- CLIENT SUCCESS STORIES SECTION --- */}
        <SuccessStoriesSection />
      </div>
    </>
  );
}

// ----------------------------------------------------
// MAIN APP COMPONENT WITH ROUTING
// ----------------------------------------------------
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [footerRef, footerVisible] = useScrollReveal();
  

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [done, setDone] = useState(false);


  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      {/* Global Navigation */}
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">
            <img
              src={logo}
              alt="Ethical Genesis Logo"
            />
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/capabilities" onClick={() => setIsMobileMenuOpen(false)}>Capabilities</Link></li>
          <li><Link to="/solution" onClick={() => setIsMobileMenuOpen(false)}>Solutions</Link></li>
          <li><Link to="/intelligence" onClick={() => setIsMobileMenuOpen(false)}>Intelligence</Link></li>
          <li><Link to="/company" onClick={() => setIsMobileMenuOpen(false)}>Company</Link></li>
          <li><Link to="/connect" onClick={() => setIsMobileMenuOpen(false)}>Connect</Link></li>
          <li><Link to="/join-us" onClick={() => setIsMobileMenuOpen(false)}>Join Us</Link></li>
          <li><Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Products</Link></li>
        </ul>
      </nav>

      {/* Route Switcher */}
      
      {!done && <SplashScreen onComplete={() => setDone(true)} />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/capabilities" element={<CapabilitiesPage />} />
        <Route path="/solution" element={<SolutionsPage />} />
        <Route path="/intelligence" element={<IntelligencePage />} />
        <Route path="/join-us" element={<JoinUsPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>

      {/* Global Footer */}
      <footer className="footer" ref={footerRef}>
        <div className={`footer-grid reveal ${footerVisible ? 'active' : ''}`}>
          <div className="footer-column">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/capabilities">Capabilities</Link></li>
              <li><Link to="/solution">Solutions</Link></li>
              <li><Link to="/intelligence">Intelligence</Link></li>
              <li><Link to="/join-us">Join Us</Link></li>
              <li><Link to="/company">Company</Link></li>
              <li><Link to="/connect">Connect</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Insights</h4>
            <ul>
              <li><a href="#articles">Articles</a></li>
              <li><a href="#blogs">Blogs</a></li>
              <li><a href="#podcasts">Podcasts</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#accessibility">Accessibility Statement</a></li>
              <li><a href="#code">Code of Conduct</a></li>
            </ul>
          </div>

          <div className="footer-column connect-column">
            <h4>Connect with us</h4>
            <p className="connect-desc">
              We know that our clients have unique needs. Send us a message, and we will get back to you at the earliest.
            </p>
            <a href="mailto:info@ethicalgenesis.ai" className="connect-email">
              info@ethicalgenesis.ai
            </a>
          </div>
        </div>

        <div className={`footer-bottom reveal delay-100 ${footerVisible ? 'active' : ''}`}>
          <p>&copy; 2024 Ethical Genesis. All rights reserved.</p>
          <div className="social-icons">
            <a href="#linkedin" aria-label="LinkedIn">in</a>
            <a href="#twitter" aria-label="Twitter">𝕏</a>
            <a href="#youtube" aria-label="YouTube">▶</a>

            {/* Scroll To Top Button */}
            <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </Router>
  );
}
