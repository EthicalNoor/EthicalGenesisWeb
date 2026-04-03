import React, { useState, useEffect } from 'react';
import connectData from '../data/connect.json';
import '../styles/connect.css';

export default function ConnectPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' 
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errorMessage) setErrorMessage('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Please provide your name.";
    if (!formData.message.trim()) return "Message cannot be empty.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) return "Please enter a valid corporate email.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    console.log("Form submission started...");

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (formData.honeypot) {
      console.warn("Spam trap triggered.");
      return; 
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    // Safely grab the URL. Fallback to localhost if env is missing during testing.
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/contact.php';
    console.log("Target API URL:", API_URL);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      console.log("Server Response Status:", response.status);
      
      const result = await response.json();
      console.log("Server Response Data:", result);

      if (!response.ok || result.status === 'error') {
        throw new Error(result.message || 'Server rejected the request.');
      }

      setIsSubmitted(true);
      
    } catch (error) {
      console.error("Fetch Error:", error);
      if (error.name === 'AbortError') {
        setErrorMessage("Request timed out. Please ensure the PHP server is running on port 8000.");
      } else {
        setErrorMessage(error.message || "Network error. Is your PHP server running? Check console (F12).");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="conn-page-wrapper">
      {/* Cinematic Background Mesh */}
      <div className="conn-bg-mesh"></div>

      <div className="conn-container reveal active">
        <div className="conn-grid">
          
          {/* Left Column: Contact Info */}
          <div className="conn-info-panel">
            <span className="conn-badge">Contact Us</span>
            <h1 className="conn-title">{connectData.info.heading}</h1>
            <p className="conn-subtitle">{connectData.info.subHeading}</p>
            
            <div className="conn-channels-wrapper">
              {connectData.info.channels.map((channel, idx) => (
                <div key={idx} className="conn-channel-card">
                  <div className="conn-channel-icon">
                    {idx === 0 ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    )}
                  </div>
                  <div>
                    <h4 className="conn-channel-label">{channel.label}</h4>
                    <p className="conn-channel-val">{channel.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Glassmorphism Form */}
          <div className="conn-form-panel">
            {isSubmitted ? (
              <div className="conn-success">
                <div className="conn-success-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h3>{connectData.form.successMessage.title}</h3>
                <p>{connectData.form.successMessage.desc}</p>
              </div>
            ) : (
              <form className="conn-form" onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="conn-alert-error">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Honeypot Spam Trap */}
                <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" value={formData.honeypot} onChange={handleChange} />

                <div className="conn-input-wrapper">
                  <input type="text" name="name" id="name" required placeholder=" " value={formData.name} onChange={handleChange} disabled={isSubmitting} />
                  <label htmlFor="name">Full Name</label>
                </div>

                <div className="conn-input-wrapper">
                  <input type="email" name="email" id="email" required placeholder=" " value={formData.email} onChange={handleChange} disabled={isSubmitting} />
                  <label htmlFor="email">Corporate Email</label>
                </div>

                <div className="conn-input-wrapper">
                  <textarea rows="5" name="message" id="message" required placeholder=" " value={formData.message} onChange={handleChange} disabled={isSubmitting}></textarea>
                  <label htmlFor="message">How can we assist you?</label>
                </div>

                <button type="submit" className="conn-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="conn-loader"></span>
                  ) : (
                    <>Send Request <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}