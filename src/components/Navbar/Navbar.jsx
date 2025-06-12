import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../logo.png";

const Navbar = () => {
  // Tenemos que hacer render condicional dependiendo de el usuario loggeado (y si esta loggeado o no)
  // Hacer un SessionButton que cambie su render segun si esta loggeado o no el usuario
  //Va a haber que agregar al logica del Home a este componente (Fetchear el rol y todo eso)
  return (
    <header className="navbar">
      <Link to="/">
        <img className="navbar__logo" src={logo} alt="FindIt logo" />
      </Link>
      <nav className="navigation-panel">
        <Link to="/users" className="navbar__link">Usuarios</Link>
        <Link to="/items" className="navbar__link">Items</Link>
        <Link to="/sectors" className="navbar__link">Sectores</Link>
        <Link to="/user/current" className="navbar__link">Mi Perfil</Link>
        <Link to="/logout" className="session-button">Logout</Link>
        <Link to="/login" className="navbar__link">Login</Link>
      </nav>
    </header>
  );
};

export default Navbar;
