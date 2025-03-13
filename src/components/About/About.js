import React, { useEffect, useRef } from 'react';
import './About.css';

// Try to import the about image, but provide a fallback
let aboutImg;
try {
  aboutImg = require('../../assets/about.jpg');
} catch (e) {
  aboutImg = 'https://portfolio-shimanto.vercel.app/images/main.png';
}

const About = () => {
  const sectionRef = useRef(null);
  
  // Create a fallback for the about image
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://portfolio-shimanto.vercel.app/images/main.png';
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

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <h2 className="section-title animate-on-scroll fade-down">
        About <span>Me</span>
      </h2>
      
      <div className="about-container">
        <div className="about-img animate-on-scroll fade-right">
          <div className="img-wrapper">
            <img 
              src={aboutImg} 
              alt="About Me" 
              onError={handleImageError}
            />
            <div className="img-overlay"></div>
          </div>
        </div>
        
        <div className="about-content">
          <h3 className="animate-on-scroll fade-left">Frontend Developer!</h3>
          <p className="animate-on-scroll fade-up" style={{ animationDelay: '0.2s' }}>
            I'm a passionate frontend developer with a strong foundation in web technologies. 
            I specialize in creating responsive, user-friendly websites and applications that 
            deliver exceptional user experiences. With expertise in HTML, CSS, JavaScript, and 
            modern frameworks like React, I transform design concepts into functional, 
            interactive web solutions.
          </p>
          <p className="animate-on-scroll fade-up" style={{ animationDelay: '0.4s' }}>
            My journey in web development began with a curiosity about how websites work, 
            which evolved into a deep passion for creating digital experiences that are both 
            beautiful and functional. I'm constantly learning and adapting to new technologies 
            to stay at the forefront of web development trends.
          </p>
          
          <div className="skills-highlights animate-on-scroll fade-up" style={{ animationDelay: '0.6s' }}>
            {['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design', 'UI/UX'].map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
          
          <a href="#contact" className="btn animate-on-scroll fade-up" style={{ animationDelay: '0.8s' }}>Let's Talk</a>
        </div>
      </div>
    </section>
  );
};

export default About; 