// src/App.jsx

import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';

// --- DATA IMPORT ---
import appData from './data/app.json';

// --- PAGE IMPORTS ---
import CapabilitiesPage from './pages/capabilities';
import SolutionsPage from './pages/solutions';
import IntelligencePage from './pages/intelligence';
import JoinUsPage from './pages/join';
import CompanyPage from './pages/company';
import ConnectPage from './pages/connect';
import ProductsPage from './pages/products';

// --- ASSET IMPORTS ---
import logo from './img/logo.png';
import bgVideo from './img/vid/bv4.mp4';
import videoPoster from './img/video-poster.png';

import cap1 from './img/cap1.jpg';
import cap2 from './img/cap2.jpg';
import cap3 from './img/cap3.jpg';
import cap4 from './img/cap4.jpg';
import cap5 from './img/cap5.jpg';
import cap6 from './img/cap6.jpg';

// Mapping string keys from JSON to actual imported image variables
const imageMap = {
  cap1, cap2, cap3, cap4, cap5, cap6
};

// Mapping SVG Icons for Why Choose Us based on their JSON ID
const whyChooseIcons = {
  1: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" /></svg>,
  2: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m-6-6h6m2 8h6M9 8h6m2 8h6m-6-6h6" /></svg>,
  3: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  4: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98" /></svg>,
  5: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="6" rx="2" /><rect x="4" y="14" width="16" height="6" rx="2" /><path d="M12 10v4" /></svg>,
  6: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
};

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
    background: #0b0f19;
    transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.8s ease;
  }

  .lw-logo {
    width: 220px; 
    height: auto;
    margin-bottom: 30px;
    object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    animation: fadeScaleIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  @keyframes fadeScaleIn {
    0% { opacity: 0; transform: scale(0.95) translateY(10px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  .lw-loading-text {
    color: #94a3b8; 
    font-size: 0.85rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 20px;
    font-weight: 500;
    opacity: 0;
    animation: fadeIn 0.8s ease-out 0.3s forwards;
  }

  .lw-progress-container {
    width: 200px;
    height: 2px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    opacity: 0;
    animation: fadeIn 0.8s ease-out 0.5s forwards;
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  .lw-progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 30%;
    background: #3b82f6; 
    border-radius: 2px;
    animation: smoothSweep 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes smoothSweep {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(350%); }
  }
`;

function SplashScreen({ onComplete }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const timer = setTimeout(() => {
      wrap.style.transform = "translateY(-100%)";
      wrap.style.opacity = "0";
      setTimeout(() => {
        if (wrap) wrap.style.display = "none";
        if (onComplete) onComplete();
      }, 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      <style>{splashCSS}</style>
      <div className="lw-loader-wrap" ref={wrapRef}>
        <img src={logo} alt="Ethical Genesis Logo" className="lw-logo" />
        <div className="lw-loading-text">Loading...</div>
        <div className="lw-progress-container">
          <div className="lw-progress-bar"></div>
        </div>
      </div>
    </>
  );
}

// --- COMPONENTS ---

const CapabilitiesSlider = () => {
  const scrollRef = useRef(null);

  // Smoothly scrolls exactly one card width when an arrow is clicked
  const scrollCarousel = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="capabilities-slider-section" id="capabilities">
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
          {appData.marqueeItems.map((item, i) => (
            <div key={i} className="marquee-item">
              <span className={`mi-dot${i % 2 === 1 ? " navy" : ""}`}></span>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="cap-header-content">
        <h2 className="capabilities-title section-main-heading">
          {appData.capabilitiesSection.titleStart} <span className="highlight-text">{appData.capabilitiesSection.titleHighlight}</span>.
        </h2>
      </div>

      <div className="cap-slider-wrapper">
        
        {/* LEFT ARROW */}
        <button className="hm-slider-arrow left" onClick={() => scrollCarousel('left')} aria-label="Previous Capability">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div className="cap-slides-container" ref={scrollRef}>
          {appData.capabilitiesSection.items.map((item) => (
            <div key={item.id} className="cap-slide">
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
                <img src={imageMap[item.imgKey]} alt={item.title} />
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button className="hm-slider-arrow right" onClick={() => scrollCarousel('right')} aria-label="Next Capability">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>

      </div>
    </section>
  );
};

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

  const dataLength = appData.whyChooseUs.items.length - 1;
  const activeIndex = Math.min(Math.round(progress * dataLength), dataLength);
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

  const currentItem = appData.whyChooseUs.items[activeIndex];

  return (
    <section className="why-choose-wrap" ref={wrapperRef}>
      <div className="why-choose-sticky">
        <div className="why-bg-grid"></div>
        <div className="why-bg-glow"></div>
        <div className="why-container">
          <div className="why-content-side">
            <span className="section-tag">{appData.whyChooseUs.tag}</span>
            <h2 className="why-main-title section-main-heading">{appData.whyChooseUs.title}</h2>

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
                    <h3 className="why-active-title">{currentItem.title}</h3>
                  </div>
                  <div className="waf-body">
                    <p className="why-active-desc">{currentItem.desc}</p>
                    <div className="waf-hover-hint">Hover for impact ➔</div>
                  </div>
                </div>
                <div className="why-active-back">
                  <div className="waf-header">
                    <h4 className="wc-back-heading">Impact & Scale</h4>
                  </div>
                  <div className="waf-body centered-body">
                    <div className="wc-metrics-grid">
                      {currentItem.metrics.map((m, idx) => (
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
                {appData.whyChooseUs.items.map((item, idx) => {
                  const itemAngle = 90 - (idx * (180 / dataLength));
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
                          <div className="why-item-icon">{whyChooseIcons[item.id]}</div>
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
          <span className="section-tag">{appData.successStories.tag}</span>
          <h2 className="success-main-title section-main-heading">{appData.successStories.title}</h2>
          <p className="success-subtitle">{appData.successStories.subtitle}</p>
        </div>

        <div className="success-grid">
          {appData.successStories.items.map((story, index) => (
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
            {appData.hero.titleStart} <span className="highlight-text">{appData.hero.titleHighlight}</span>
          </h1>
          <p className="hero-subtitle reveal active delay-100">
            {appData.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Content Layer */}
      <div className="content-layer">

        {/* Product Section: Jureo */}
        <section className="jureo-section" ref={jureoRef}>
          <span className={`section-tag reveal ${jureoVisible ? 'active' : ''}`}>
            {appData.jureo.tag}
          </span>
          <h2 className={`jureo-title section-main-heading reveal delay-100 ${jureoVisible ? 'active' : ''}`}>
            {appData.jureo.title}
          </h2>
          <p className={`jureo-desc reveal delay-200 ${jureoVisible ? 'active' : ''}`}>
            {appData.jureo.description}
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
                src={appData.jureo.videoUrl}
                title="Jureo Product Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>

          <div className={`reveal delay-300 ${jureoVisible ? 'active' : ''}`}>
            <a href={appData.jureo.buttonLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {appData.jureo.buttonText}
            </a>
          </div>
        </section>

        {/* Sections */}
        <CapabilitiesSlider />
        <WhyChooseSection />
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Ethical Genesis Logo" />
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
          <li><NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/company" onClick={() => setIsMobileMenuOpen(false)}>Company</NavLink></li>
          <li><NavLink to="/capabilities" onClick={() => setIsMobileMenuOpen(false)}>Capabilities</NavLink></li>
          <li><NavLink to="/solution" onClick={() => setIsMobileMenuOpen(false)}>Solutions</NavLink></li>
          <li><NavLink to="/products" onClick={() => setIsMobileMenuOpen(false)}>Products</NavLink></li>
          <li><NavLink to="/intelligence" onClick={() => setIsMobileMenuOpen(false)}>Intelligence</NavLink></li>
          <li><NavLink to="/join-us" onClick={() => setIsMobileMenuOpen(false)}>Join Us</NavLink></li>
          <li><NavLink to="/connect" onClick={() => setIsMobileMenuOpen(false)}>Connect</NavLink></li>
        </ul>
      </nav>

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
            <p className="connect-desc">{appData.footer.connectDescription}</p>
            <a href={`mailto:${appData.footer.contactEmail}`} className="connect-email">
              {appData.footer.contactEmail}
            </a>
          </div>
        </div>

        <div className={`footer-bottom reveal delay-100 ${footerVisible ? 'active' : ''}`}>
          <p>{appData.footer.copyrightText}</p>
          <div className="social-icons">
            <a href="#linkedin" aria-label="LinkedIn">in</a>
            <a href="#twitter" aria-label="Twitter">𝕏</a>
            <a href="#youtube" aria-label="YouTube">▶</a>

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