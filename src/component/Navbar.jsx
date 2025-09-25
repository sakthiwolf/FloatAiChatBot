import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Ocean Logo" className="logo" />
        {/* <h1>Ocean Chat</h1> */}
      </div>
      {/* <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/about">About</Link>
      </div> */}
    </nav>
  );
};

export default Navbar;
