// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/auth">Login/Register</Link>
    </nav>
  );
}

export default Navbar;
