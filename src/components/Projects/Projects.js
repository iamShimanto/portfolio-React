import React, { useEffect, useRef } from 'react';
import './Projects.css';

// Try to import images, but provide fallbacks
let project1, project2, project3, project4, project5, project6;

try {
  project1 = require('../../assets/project1.jpg');
} catch (e) {
  project1 = 'https://portfolio-shimanto.vercel.app/images/portfolio-01.jpg';
}

try {
  project2 = require('../../assets/project2.jpg');
} catch (e) {
  project2 = 'https://portfolio-shimanto.vercel.app/images/portfolio-02.jpg';
}

try {
  project3 = require('../../assets/project3.jpg');
} catch (e) {
  project3 = 'https://portfolio-shimanto.vercel.app/images/portfolio-03.jpg';
}

try {
  project4 = require('../../assets/project4.jpg');
} catch (e) {
  project4 = 'https://portfolio-shimanto.vercel.app/images/portfolio-04.jpg';
}

try {
  project5 = require('../../assets/project5.jpg');
} catch (e) {
  project5 = 'https://portfolio-shimanto.vercel.app/images/portfolio-05.jpg';
}

try {
  project6 = require('../../assets/project6.jpg');
} catch (e) {
  project6 = 'https://portfolio-shimanto.vercel.app/images/portfolio-06.jpg';
}

const Projects = () => {
  const sectionRef = useRef(null);
  
  const projects = [
    {
      id: 1,
      title: 'E-commerce Website',
      description: 'A fully responsive e-commerce website with product filtering, cart functionality, and payment integration.',
      image: project1,
      link: '#',
      github: 'https://github.com/shimanto7710',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'A modern portfolio website showcasing projects and skills with smooth animations and responsive design.',
      image: project2,
      link: '#',
      github: 'https://github.com/shimanto7710',
      tags: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'A task management application with drag-and-drop functionality, user authentication, and data persistence.',
      image: project3,
      link: '#',
      github: 'https://github.com/shimanto7710',
      tags: ['React', 'Firebase', 'Redux']
    },
    {
      id: 4,
      title: 'Weather App',
      description: 'A weather application that provides real-time weather information based on user location or search.',
      image: project4,
      link: '#',
      github: 'https://github.com/shimanto7710',
      tags: ['JavaScript', 'API', 'CSS']
    },
    {
      id: 5,
      title: 'Recipe Finder',
      description: 'A recipe finder application that allows users to search for recipes based on ingredients or cuisine type.',
      image: project5,
      link: '#',
      github: 'https://github.com/shimanto7710',
      tags: ['React', 'API', 'Styled Components']
    },
    {
      id: 6,
      title: 'Chat Application',
      description: 'A real-time chat application with user authentication, message persistence, and typing indicators.',
      image: project6,
      link: '#',
      github: 'https://github.com/shimanto7710',
      tags: ['Socket.io', 'Node.js', 'MongoDB']
    }
  ];

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `https://via.placeholder.com/400x250?text=Project+Image`;
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

    const animatedElements = document.querySelectorAll('.project-animate');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <h2 className="section-title project-animate fade-down">
        My <span>Projects</span>
      </h2>
      
      <div className="project-filters project-animate fade-up">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Web</button>
        <button className="filter-btn">App</button>
        <button className="filter-btn">Design</button>
      </div>
      
      <div className="projects-container">
        {projects.map((project, index) => (
          <div 
            className="project-box project-animate" 
            key={project.id}
            style={{ animationDelay: `${0.2 * index}s` }}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              onError={handleImageError}
            />
            <div className="project-layer">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">{tag}</span>
                ))}
              </div>
              
              <div className="project-links">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-circle">
                  <i className="fas fa-link"></i>
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-circle">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="project-cta project-animate fade-up">
        <p>Want to see more of my work?</p>
        <a href="https://github.com/shimanto7710" target="_blank" rel="noopener noreferrer" className="btn">
          View All Projects
        </a>
      </div>
    </section>
  );
};

export default Projects; 