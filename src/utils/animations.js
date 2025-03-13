// Animation utility functions and constants

// Animation delay generator for staggered animations
export const getAnimationDelay = (index, baseDelay = 0.2) => {
  return `${baseDelay * index}s`;
};

// Animation classes that can be applied to elements
export const animationClasses = {
  fadeIn: 'animate-fadeIn',
  fadeInUp: 'animate-fadeInUp',
  fadeInDown: 'animate-fadeInDown',
  fadeInLeft: 'animate-fadeInLeft',
  fadeInRight: 'animate-fadeInRight',
  zoomIn: 'animate-zoomIn',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
  flip: 'animate-flip',
  rotateIn: 'animate-rotateIn',
  slideUp: 'animate-slideUp',
  slideDown: 'animate-slideDown',
  slideLeft: 'animate-slideLeft',
  slideRight: 'animate-slideRight',
};

export default {
  getAnimationDelay,
  animationClasses,
}; 