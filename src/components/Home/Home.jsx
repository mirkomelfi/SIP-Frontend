import React from "react";
import { Link } from "react-router-dom";
export const Home = () =>{

    return (
      <>
      <h1>RUTAS UNICAMENTE DEL ADMIN</h1>

        <Link to={`users`}>Usuarios</Link>
        <h1>RUTAS USER Y ADMIN</h1>
        <Link to={`sectors`}>Sectores</Link> 
        <Link to={`items`}>Items</Link>
        <Link to={`user/current`}>Mi perfil</Link> 
      </>
    );
  }
  