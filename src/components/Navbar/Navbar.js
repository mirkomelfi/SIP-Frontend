import React from "react";
//import logo from "../../assets/logo1.jpg"
//import { CartWidget } from "../CartWidget/CartWidget";
import {Link} from "react-router-dom";
import "./Navbar.css"
import logo from "../../logo.png"


const Navbar = () =>{

    return (
        <header>
            <Link to="/logout"><h3>Logout</h3></Link>
            <img className="logo" src={logo} alt="" />
            <Link to="/login"><h3>Login</h3></Link>
            
            {/*<nav>
                <Link to="/category/cursos">Cursos</Link>
                <Link to="/category/seminarios">Seminarios</Link>
                <Link to="/category/accesorios">Accesorios</Link> 
                <CartWidget/>
                
                
            </nav>*/}
        </header>
    );
  }
  
  export default Navbar;
  