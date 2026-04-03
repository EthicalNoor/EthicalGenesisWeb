// src/pages/connect.jsx

import React, { useState, useEffect } from 'react';
import connectData from '../data/connect.json';
import '../styles/connect.css';
import emailjs from '@emailjs/browser';

export default function ConnectPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

   // demo need to replace by official
  const YOUR_SERVICE_ID = "service_jga9uoa"; 
  const YOUR_TEMPLATE_ID = "template_4660upo";
  const YOUR_PUBLIC_KEY = "LbAG0xoa3ZGK3YZhM";

  // Ensure page loads at the very top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 
   const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = {
      fullName: form[0].value,
      email: form[1].value,
      company: form[2].value,
      interest: form[3].value,
      message: form[4].value,
    };

    console.log(formData);
    emailjs.send(
      YOUR_SERVICE_ID,
      YOUR_TEMPLATE_ID,
      formData,
      YOUR_PUBLIC_KEY
    )
    .then((result) => {
      console.log(result.text);
      setIsSubmitted(true);
    })
    .catch((error) => {
      console.error(error.text);
      alert("Failed to send message. Try again.");
    });
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