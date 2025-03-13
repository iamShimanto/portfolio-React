import React, { useState } from 'react';
import './Header.css';

const Header = ({ scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'sticky' : ''}`}>
      <a href="#home" className="logo">
        Shimanto
      </a>

      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#skills" onClick={closeMenu}>Skills</a>
        <a href="#projects" onClick={closeMenu}>Projects</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>

      <div className={`menu-icon ${menuOpen ? 'bx-x' : 'bx-menu'}`} onClick={toggleMenu}>
        <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
    </header>
  );
};

export default Header; 