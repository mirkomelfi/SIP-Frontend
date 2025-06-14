import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../logo.png";
import { useUser } from "../../context/UserContext";
import SessionButton from "../SessionButton/SessionButton";

const Navbar = () => {
  const { user, rol } = useUser();
  const isAdmin = rol === "ROL_ADMIN";

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo-container">
        <img className="navbar__logo" src={logo} alt="FindIt logo" />
      </Link>
      <nav className={`navigation-panel ${!user ? "not-logged" : ""}`}>
        {user && (
          <>
            {isAdmin && <Link to="/users" className="navbar__link">Usuarios</Link>}
            <Link to="/items" className="navbar__link">Items</Link>
            <Link to="/sectors" className="navbar__link">Sectores</Link>
            <Link to="/user/current" className="navbar__link">Mi Perfil</Link>
            <SessionButton />
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;