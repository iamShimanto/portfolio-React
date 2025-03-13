import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const skillsList = [
    { name: 'HTML', percentage: 90, icon: 'fab fa-html5' },
    { name: 'CSS', percentage: 85, icon: 'fab fa-css3-alt' },
    { name: 'JavaScript', percentage: 80, icon: 'fab fa-js' },
    { name: 'React', percentage: 75, icon: 'fab fa-react' },
    { name: 'Node.js', percentage: 70, icon: 'fab fa-node-js' },
    { name: 'MongoDB', percentage: 65, icon: 'fas fa-database' },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <h2 className="section-title animate-on-scroll fade-down">
        My <span>Skills</span>
      </h2>
      
      <div className="skills-container">
        <div className="skills-content animate-on-scroll fade-right">
          <h3>Technical Skills</h3>
          <p>
            I've developed a diverse set of technical skills throughout my journey as a web developer.
            Below are some of the key technologies I work with regularly. I'm constantly learning and
            expanding my skillset to stay current with the latest web development trends and technologies.
          </p>
          
          <div className="skills-card-container">
            {skillsList.map((skill, index) => (
              <div 
                className="skill-card animate-on-scroll" 
                key={index}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="skill-icon">
                  <i className={skill.icon}></i>
                </div>
                <h4>{skill.name}</h4>
              </div>
            ))}
          </div>
        </div>
        
        <div className="skills-bars animate-on-scroll fade-left">
          {skillsList.map((skill, index) => (
            <div className="skill-box" key={index}>
              <div className="skill-name">
                <span>{skill.name}</span>
                <span className="percentage">{skill.percentage}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className={`skill-per ${isVisible ? 'animate' : ''}`} 
                  style={{ 
                    width: isVisible ? `${skill.percentage}%` : '0%',
                    transitionDelay: `${0.2 * index}s`
                  }}
                >
                  <span className="tooltip">{skill.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="experience-counter animate-on-scroll fade-up">
        <div className="counter-item">
          <span className="counter-number">2+</span>
          <p>Years of Experience</p>
        </div>
        <div className="counter-item">
          <span className="counter-number">15+</span>
          <p>Projects Completed</p>
        </div>
        <div className="counter-item">
          <span className="counter-number">10+</span>
          <p>Happy Clients</p>
        </div>
      </div>
    </section>
  );
};

export default Skills; 