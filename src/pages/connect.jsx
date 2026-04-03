import React, { useState, useEffect } from 'react';
import connectData from '../data/connect.json';
import '../styles/connect.css';
import emailjs from '@emailjs/browser';

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

  // demo need to replace by official
  const YOUR_SERVICE_ID = "service_jga9uoa"; 
  const YOUR_TEMPLATE_ID = "template_4660upo";
  const YOUR_PUBLIC_KEY = "LbAG0xoa3ZGK3YZhM";

  // Ensure page loads at the very top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Honeypot spam check
    if (formData.honeypot) {
      return; 
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, YOUR_PUBLIC_KEY)
      .then((result) => {
          console.log('SUCCESS!', result.text);
          setIsSubmitted(true);
          setIsSubmitting(false);
          setFormData({ name: '', email: '', message: '', honeypot: '' });
      }, (error) => {
          console.log('FAILED...', error.text);
          setErrorMessage('Failed to send message. Please try again later.');
          setIsSubmitting(false);
      });
  };

  return (
    <div className="conn-page-wrapper">
      
      {/* Background Ambience */}
      <div className="conn-bg-mesh"></div>

      <div className="conn-container">
        <div className="conn-grid">

          {/* --- LEFT COLUMN: Info --- */}
          <div className="conn-info-side">
            <h1 className="conn-heading">{connectData.info.heading}</h1>
            <p className="conn-subheading">{connectData.info.subHeading}</p>
            
            <div className="conn-channels">
              {connectData.info.channels.map((channel, idx) => (
                <div key={idx} className="conn-channel">
                  <h5>{channel.label}</h5>
                  <p>{channel.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN: Form Card --- */}
          <div className="conn-form-side">
            {isSubmitted ? (
              <div className="conn-success-state">
                <div className="conn-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3>{connectData.form.successMessage.title}</h3>
                <p>{connectData.form.successMessage.desc}</p>
                <button onClick={() => setIsSubmitted(false)} className="btn-outline conn-reset-btn">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="conn-form" onSubmit={handleSubmit}>
                {errorMessage && <div className="conn-error-message">{errorMessage}</div>}
                
                {/* Honeypot Field (Hidden from real users) */}
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