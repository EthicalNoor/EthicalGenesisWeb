// src/pages/connect.jsx

import React, { useState, useEffect } from 'react';
import connectData from '../data/connect.json';
import '../styles/connect.css';

export default function ConnectPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Ensure page loads at the very top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the data to your backend (Formspree, EmailJS, etc.)
    setIsSubmitted(true);
  };

  return (
    <div className="conn-page-wrapper">
      {/* Cinematic Background */}
      <div 
        className="conn-background" 
        style={{ backgroundImage: `url(${connectData.background.image})` }}
      >
        <div className="conn-overlay"></div>
      </div>

      <div className="conn-container">
        {/* Floating Glassmorphism Command Center */}
        <div className="conn-glass-panel animate-fade-up">
          
          {/* LEFT SIDE: Brand & Info */}
          <div className="conn-info-side">
            <div className="conn-brand">
              {/* Premium SVG Logo Placeholder (Replace with your actual logo img if preferred) */}
              <svg className="conn-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
              <span className="conn-logo-text">Ethical Genesis</span>
            </div>
            
            <h1 className="conn-heading">{connectData.info.heading}</h1>
            <p className="conn-subheading">{connectData.info.subHeading}</p>

            <div className="conn-channels">
              {connectData.info.channels.map((channel, idx) => (
                <div key={idx} className="conn-channel-item">
                  <span className="conn-channel-label">{channel.label}</span>
                  <a href={channel.value.includes('@') ? `mailto:${channel.value}` : '#'} className="conn-channel-value">
                    {channel.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Enterprise Intake Form */}
          <div className="conn-form-side">
            {isSubmitted ? (
              <div className="conn-success-state animate-fade-up">
                <div className="conn-success-icon">✓</div>
                <h3>{connectData.form.successMessage.title}</h3>
                <p>{connectData.form.successMessage.desc}</p>
                <button className="btn-outline" onClick={() => setIsSubmitted(false)}>
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form className="conn-form" onSubmit={handleSubmit}>
                <div className="conn-form-row">
                  <div className="conn-input-group">
                    <label>Full Name</label>
                    <input type="text" required placeholder="Jane Doe" />
                  </div>
                  <div className="conn-input-group">
                    <label>Work Email</label>
                    <input type="email" required placeholder="jane@company.com" />
                  </div>
                </div>

                <div className="conn-input-group">
                  <label>Company Name</label>
                  <input type="text" required placeholder="Enterprise Corp Ltd." />
                </div>

                <div className="conn-input-group">
                  <label>Area of Interest</label>
                  <div className="conn-select-wrapper">
                    <select required defaultValue="">
                      {connectData.form.interests.map((interest, idx) => (
                        <option key={idx} value={idx === 0 ? "" : interest} disabled={idx === 0}>
                          {interest}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="conn-input-group">
                  <label>Project Scope</label>
                  <textarea 
                    rows="4" 
                    required 
                    placeholder="Briefly describe your core operational challenge or architecture goals..."
                  ></textarea>
                </div>

                <button type="submit" className="conn-submit-btn">
                  Request Architecture Review <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}