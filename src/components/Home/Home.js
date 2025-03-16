import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const parallaxRef = useRef(null);
  const [loading, setLoading] = useState(true);
  
  // Create a fallback for the profile image
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/450x450?text=Profile+Image';
  };

  // Loading animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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

  // Generate grid lines for cyberpunk effect
  const generateGridLines = () => {
    const horizontalLines = [];
    const verticalLines = [];
    
    for (let i = 0; i < 20; i++) {
      horizontalLines.push(i * 5);
      verticalLines.push(i * 5);
    }
    
    return { horizontalLines, verticalLines };
  };

  const { horizontalLines, verticalLines } = generateGridLines();

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const slideUpVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const neonPulseVariants = {
    dim: {
      textShadow: "0 0 7px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3)",
      boxShadow: "0 0 7px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3)",
      color: "rgba(0, 255, 255, 0.8)"
    },
    bright: {
      textShadow: "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)",
      boxShadow: "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)",
      color: "#0ff"
    }
  };

  // Loading animation variants
  const loadingContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const loadingItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: {
        type: "spring",
        damping: 12
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200
      }
    },
    exit: { 
      scale: 1.5, 
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const progressVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: {
        duration: 2.5,
        ease: "easeInOut"
      }
    }
  };

  // Calculate parallax effect based on mouse position
  const getParallaxValue = (depth = 1) => {
    if (!parallaxRef.current) return { x: 0, y: 0 };
    
    const rect = parallaxRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const moveX = (mousePosition.x - centerX) / 50 * depth;
    const moveY = (mousePosition.y - centerY) / 50 * depth;
    
    return { x: moveX, y: moveY };
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            className="loading-screen"
            key="loading"
            variants={loadingContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
              className="loading-logo"
              variants={logoVariants}
            >
              <motion.div 
                className="logo-circle"
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(0, 255, 255, 0.5)",
                    "0 0 30px rgba(0, 255, 255, 0.8)",
                    "0 0 10px rgba(0, 255, 255, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <motion.span 
                  className="logo-text"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(0, 255, 255, 0.5)",
                      "0 0 30px rgba(0, 255, 255, 0.8)",
                      "0 0 10px rgba(0, 255, 255, 0.5)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  S
                </motion.span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="loading-text"
              variants={loadingItemVariants}
            >
              <span>INITIALIZING</span>
            </motion.div>
            
            <motion.div 
              className="loading-progress-container"
              variants={loadingItemVariants}
            >
              <motion.div 
                className="loading-progress"
                variants={progressVariants}
              />
            </motion.div>
            
            <motion.div 
              className="loading-status"
              variants={loadingItemVariants}
            >
              <motion.span
                animate={{
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                LOADING PORTFOLIO...
              </motion.span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.section 
            className="home" 
            id="home" 
            ref={parallaxRef}
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Cyberpunk Grid Background */}
            <div className="grid-background">
              {horizontalLines.map((pos, index) => (
                <motion.div 
                  key={`h-${index}`} 
                  className="grid-line horizontal"
                  style={{ top: `${pos}%` }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ 
                    scaleX: 1, 
                    opacity: [0, 0.5, 0.2],
                    x: getParallaxValue(0.2).x
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: index * 0.05,
                    opacity: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                />
              ))}
              
              {verticalLines.map((pos, index) => (
                <motion.div 
                  key={`v-${index}`} 
                  className="grid-line vertical"
                  style={{ left: `${pos}%` }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ 
                    scaleY: 1, 
                    opacity: [0, 0.5, 0.2],
                    y: getParallaxValue(0.2).y
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: index * 0.05,
                    opacity: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                />
              ))}
            </div>

            {/* Glowing Orbs */}
            <div className="orbs-container">
              {[...Array(5)].map((_, index) => (
                <motion.div
                  key={`orb-${index}`}
                  className="orb"
                  style={{
                    left: `${15 + index * 20}%`,
                    top: `${20 + (index % 3) * 20}%`,
                    backgroundColor: index % 2 === 0 ? "rgba(0, 255, 255, 0.2)" : "rgba(255, 0, 255, 0.2)",
                    width: 100 + (index % 3) * 50,
                    height: 100 + (index % 3) * 50
                  }}
                  animate={{
                    x: getParallaxValue(index + 1).x,
                    y: getParallaxValue(index + 1).y,
                    scale: [1, 1.2, 1],
                    filter: [
                      "blur(40px) brightness(1)",
                      "blur(40px) brightness(1.3)",
                      "blur(40px) brightness(1)"
                    ]
                  }}
                  transition={{
                    scale: {
                      duration: 4 + index,
                      repeat: Infinity,
                      repeatType: "reverse"
                    },
                    filter: {
                      duration: 3 + index,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                />
              ))}
            </div>

            {/* Dark Overlay with Vignette */}
            <div className="vignette-overlay" />

            {/* Main Content */}
            <div className="cyberpunk-container">
              {/* Text Content */}
              <motion.div 
                className="cyberpunk-content"
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
              >
                <motion.div className="content-card" variants={slideUpVariants}>
                  <motion.div 
                    className="card-header"
                    animate={{ 
                      x: getParallaxValue(0.5).x,
                      y: getParallaxValue(0.5).y
                    }}
                  >
                    <motion.div 
                      className="neon-line"
                      animate={{ 
                        scaleX: [0, 1],
                        opacity: [0, 1]
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.5
                      }}
                    />
                    
                    <motion.h3 
                      className="greeting"
                      variants={slideUpVariants}
                      animate={{ 
                        x: getParallaxValue(0.3).x,
                        y: getParallaxValue(0.3).y
                      }}
                    >
                      Hello, It's Me
                    </motion.h3>
                    
                    <motion.h1 
                      className="name"
                      variants={slideUpVariants}
                      animate={{ 
                        x: getParallaxValue(0.4).x,
                        y: getParallaxValue(0.4).y
                      }}
                    >
                      <motion.span 
                        className="neon-text"
                        animate={[
                          "dim", "bright", "dim"
                        ]}
                        variants={neonPulseVariants}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        Shimanto
                      </motion.span>
                    </motion.h1>
                    
                    <motion.h3 
                      className="profession"
                      variants={slideUpVariants}
                      animate={{ 
                        x: getParallaxValue(0.3).x,
                        y: getParallaxValue(0.3).y
                      }}
                    >
                      And I'm a <span className="typing-text">{typedText}<span className="cursor"></span></span>
                    </motion.h3>
                    
                    <motion.div 
                      className="neon-line"
                      animate={{ 
                        scaleX: [0, 1],
                        opacity: [0, 1]
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.7
                      }}
                    />
                  </motion.div>
                  
                  <motion.p 
                    className="bio"
                    variants={slideUpVariants}
                    animate={{ 
                      x: getParallaxValue(0.2).x,
                      y: getParallaxValue(0.2).y
                    }}
                  >
                    I'm a passionate web developer with expertise in creating responsive and user-friendly websites. 
                    I love turning ideas into reality through code.
                  </motion.p>
                  
                  <motion.div 
                    className="social-media"
                    variants={fadeInVariants}
                    animate={{ 
                      x: getParallaxValue(0.1).x,
                      y: getParallaxValue(0.1).y
                    }}
                  >
                    {[
                      { icon: 'fab fa-github', url: 'https://github.com/I-Am-Shimanto' },
                      { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/iam-shimanto/' },
                      { icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/iamshimanto18' },
                      { icon: 'fab fa-twitter', url: 'https://twitter.com/' }
                    ].map((social, index) => (
                      <motion.a 
                        key={index}
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        variants={slideUpVariants}
                        whileHover={{ 
                          scale: 1.2,
                          y: -5,
                          boxShadow: "0 0 20px #0ff, 0 0 30px rgba(0, 255, 255, 0.5)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        animate={[
                          "dim", "bright", "dim"
                        ]}
                        custom={index}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: index * 0.2
                        }}
                      >
                        <i className={social.icon}></i>
                      </motion.a>
                    ))}
                  </motion.div>
                  
                  <motion.a 
                    href="#contact" 
                    className="cyberpunk-button"
                    variants={slideUpVariants}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 20px #0ff, 0 0 30px rgba(0, 255, 255, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      x: getParallaxValue(0.1).x,
                      y: getParallaxValue(0.1).y
                    }}
                  >
                    <span>Contact Me</span>
                    <motion.span 
                      className="button-glow"
                      animate={[
                        "dim", "bright", "dim"
                      ]}
                      variants={neonPulseVariants}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Profile Image with Cyberpunk Effect */}
              <motion.div 
                className="cyberpunk-profile"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: getParallaxValue(-0.5).x,
                  y: getParallaxValue(-0.5).y
                }}
                transition={{ duration: 1 }}
              >
                <div className="profile-frame">
                  <motion.div 
                    className="frame-border"
                    animate={[
                      "dim", "bright", "dim"
                    ]}
                    variants={neonPulseVariants}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  <motion.div 
                    className="profile-image-wrapper"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="image-glitch"
                      animate={{
                        opacity: [0, 0.1, 0],
                        x: [0, -10, 10, -5, 5, 0],
                        y: [0, 5, -5, 2, -2, 0]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 5
                      }}
                    />
                    
                    <motion.img 
                      src={profileImg} 
                      alt="Profile" 
                      onError={handleImageError}
                      className="profile-image"
                      animate={{
                        filter: [
                          "drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))",
                          "drop-shadow(0 0 20px rgba(0, 255, 255, 0.8))",
                          "drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    
                    <motion.div 
                      className="scan-line"
                      animate={{
                        y: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                  </motion.div>
                  
                  {/* Corner Accents */}
                  {[...Array(4)].map((_, index) => (
                    <motion.div 
                      key={`corner-${index}`}
                      className={`corner corner-${index + 1}`}
                      animate={[
                        "dim", "bright", "dim"
                      ]}
                      variants={neonPulseVariants}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.2
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home; 