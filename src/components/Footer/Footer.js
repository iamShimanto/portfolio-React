import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-text">
        <p>&copy; {new Date().getFullYear()} Shimanto | All Rights Reserved</p>
      </div>
      
      <div className="footer-iconTop">
        <a href="#home">
          <i className="fas fa-arrow-up"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer; 