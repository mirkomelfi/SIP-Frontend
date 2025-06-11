import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../logo.png";

const Navbar = () => {
  return (
    <header className="navbar">
        <Link to="/logout" className="navbar__link">Logout</Link>
        <Link to="/">
            <img className="navbar__logo" src={logo} alt="FindIt logo" />
        </Link>
        <Link to="/login" className="navbar__link">Login</Link>
    </header>
  );
};

export default Navbar;
