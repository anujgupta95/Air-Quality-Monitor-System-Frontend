import React from "react";
import "../styles/Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="/logo.png" 
          alt="BreatheairMind"
          className="logo"
        />
        <span className="brand-name">BreatheairMind</span>
      </div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#air-maps" className="active">Air Maps</a></li>
        <li><a href="#newsroom">Newsroom</a></li>
        <li><a href="#breathe-care">Breathe Care</a></li>
      </ul>

      <div className="navbar-icons">
        <i className="fas fa-search search-icon"></i>
        <i className="fas fa-bell notification-icon"></i>
        <div className="user-profile">
          <img
            src="/user.jpg" // Replace with user profile image path
            alt="User"
            className="profile-pic"
          />
          <span className="username">Christopher Wibisono</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
