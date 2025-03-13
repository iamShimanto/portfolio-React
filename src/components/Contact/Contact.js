import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with a delay
    setTimeout(() => {
      // In a real application, you would handle form submission here
      console.log('Form submitted:', formData);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show-animation');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.contact-animate');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <h2 className="section-title contact-animate fade-down">
        Contact <span>Me</span>
      </h2>
      
      <div className="contact-container">
        <div className="contact-info">
          {[
            { 
              icon: 'fas fa-envelope', 
              title: 'Email', 
              content: 'shimanto7710@gmail.com',
              delay: '0.2s',
              link: 'mailto:shimanto7710@gmail.com'
            },
            { 
              icon: 'fas fa-phone', 
              title: 'Phone', 
              content: '+880 1234 567890',
              delay: '0.4s',
              link: 'tel:+8801234567890'
            },
            { 
              icon: 'fas fa-map-marker-alt', 
              title: 'Location', 
              content: 'Dhaka, Bangladesh',
              delay: '0.6s',
              link: 'https://goo.gl/maps/Dhaka'
            }
          ].map((item, index) => (
            <div 
              className="contact-card contact-animate fade-right" 
              key={index}
              style={{ animationDelay: item.delay }}
            >
              <div className="icon-wrapper">
                <i className={item.icon}></i>
              </div>
              <h3>{item.title}</h3>
              <p>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.content}
                </a>
              </p>
            </div>
          ))}
          
          <div className="social-links contact-animate fade-up" style={{ animationDelay: '0.8s' }}>
            <h3>Connect With Me</h3>
            <div className="social-icons">
              <a href="https://github.com/I-Am-Shimanto" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/iam-shimanto/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/iam_shimanto/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="contact-form contact-animate fade-left">
          <div className="form-header">
            <h3>Send Me a Message</h3>
            <p>I'll get back to you as soon as possible</p>
          </div>
          
          <div className="input-row">
            <div className="input-box">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name"
                name="name" 
                placeholder="John Doe" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="input-box">
              <label htmlFor="email">Your Email</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                placeholder="john@example.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="input-box">
            <label htmlFor="subject">Subject</label>
            <input 
              type="text" 
              id="subject"
              name="subject" 
              placeholder="Project Inquiry" 
              required 
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-box">
            <label htmlFor="message">Your Message</label>
            <textarea 
              id="message"
              name="message" 
              rows="6" 
              placeholder="Hello, I'd like to discuss a project..." 
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className={`btn submit-btn ${isSubmitting ? 'submitting' : ''} ${submitStatus ? submitStatus : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : submitStatus === 'success' ? (
              <>
                <i className="fas fa-check"></i> Message Sent
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
      
      <div className="map-container contact-animate fade-up">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.3870399631!2d90.2792364709319!3d23.780863189539755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus" 
          width="100%" 
          height="300" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Dhaka Map"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact; 