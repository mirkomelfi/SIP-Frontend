import React from "react";
//import logo from "../../assets/logo1.jpg"
//import { CartWidget } from "../CartWidget/CartWidget";
import {Link} from "react-router-dom";
import "./Navbar.css"

const Navbar = () =>{

    return (
        <header>
            <Link to="/logout"><h3>Logout</h3></Link>
            <Link to="/"><h1>Sistema de Búsqueda</h1></Link>
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
  