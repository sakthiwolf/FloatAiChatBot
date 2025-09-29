import React from "react";
import styles from "../../styles/HamburgerMenu.module.css";

const HamburgerMenu = ({ isOpen, onClick }) => {
  console.log('HamburgerMenu rendered, isOpen:', isOpen);
  
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Hamburger clicked!');
    onClick();
  };
  
  return (
    <button 
      onClick={handleClick}
      aria-label="Toggle sidebar"
      className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default HamburgerMenu;
