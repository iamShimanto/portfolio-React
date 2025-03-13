import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

// Try to import the profile image, but provide a fallback
let profileImg;
try {
  profileImg = require('../../assets/profile.png');
} catch (e) {
  profileImg = 'https://portfolio-shimanto.vercel.app/images/main.png';
}

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = ['Frontend Developer', 'Web Designer', 'Professional Coder', 'React Developer'];
  const typingSpeed = useRef(50);
  const deletingSpeed = useRef(50);
  const pauseTime = useRef(2000);
  
  // Create a fallback for the profile image
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/450x450?text=Profile+Image';
  };

  // Typing animation effect
  useEffect(() => {
    let timer;
    const role = roles[currentIndex];

    const type = () => {
      if (!isDeleting) {
        if (typedText.length < role.length) {
          setTypedText(role.substring(0, typedText.length + 1));
          timer = setTimeout(type, typingSpeed.current);
        } else {
          timer = setTimeout(() => setIsDeleting(true), pauseTime.current);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(role.substring(0, typedText.length - 1));
          timer = setTimeout(type, deletingSpeed.current);
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    timer = setTimeout(type, typingSpeed.current);

    return () => clearTimeout(timer);
  }, [typedText, currentIndex, isDeleting, roles]);

  return (
    <section className="home" id="home">
      <div className="home-content">
        <h3 className="animate-fadeInDown" style={{ animationDelay: '0.2s' }}>Hello, It's Me</h3>
        <h1 className="animate-fadeInLeft" style={{ animationDelay: '0.4s' }}>Shimanto</h1>
        <h3 className="animate-fadeInRight" style={{ animationDelay: '0.6s' }}>
          And I'm a <span className="typing-text">{typedText}<span className="cursor"></span></span>
        </h3>
        <p className="animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          I'm a passionate web developer with expertise in creating responsive and user-friendly websites. 
          I love turning ideas into reality through code.
        </p>
        
        <div className="social-media">
          {[
            { icon: 'fab fa-github', url: 'https://github.com/I-Am-Shimanto', delay: '1s' },
            { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/iam-shimanto/', delay: '1.2s' },
            { icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/iamshimanto18', delay: '1.4s' },
            { icon: 'fab fa-twitter', url: 'https://twitter.com/', delay: '1.6s' }
          ].map((social, index) => (
            <a 
              key={index}
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="animate-fadeIn"
              style={{ animationDelay: social.delay }}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
        
        <a href="#contact" className="btn animate-fadeInUp" style={{ animationDelay: '1.8s' }}>
          <span>Contact Me</span>
        </a>
      </div>
      
      <div className="home-img animate-zoomIn" style={{ animationDelay: '0.5s' }}>
        <img 
          src={profileImg} 
          alt="Profile" 
          onError={handleImageError}
          className="glow-effect"
        />
      </div>

      <div className="scroll-down animate-bounce">
        <a href="#about">
          <i className="fas fa-angle-down"></i>
        </a>
      </div>
    </section>
  );
};

export default Home; 