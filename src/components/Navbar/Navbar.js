import React from 'react';
import {Link} from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div>
        <h1>
          <Link to="/welcome" className="logo">
            Shoping Online
          </Link>
        </h1>
      </div>
      <ul className="nav-links">
          <Link to="/cart" className="cart">
              <i className="fas fa-shopping-cart"/>
          </Link>
          <Link to="/signup" className="signup">
              <li>Sign Up</li>
          </Link>
          <Link to="/login" className="login">
              <li>Log In</li>
          </Link>
      </ul>
      </header>
    
  )
}

export default Navbar
