// This file provides placeholder image URLs for use when actual images are not available

export const placeholders = {
  profile: 'https://via.placeholder.com/450x450?text=Profile+Image',
  about: 'https://via.placeholder.com/500x500?text=About+Image',
  project: 'https://via.placeholder.com/400x250?text=Project+Image',
  projectSpecific: (num) => `https://via.placeholder.com/400x250?text=Project+${num}`
};

export default placeholders; 