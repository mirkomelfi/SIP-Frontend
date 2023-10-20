import React from "react";
import { Link } from "react-router-dom";
export const Home = () =>{

    return (
      <>
      <h1>RUTAS ADMIN</h1>
        <Link to={`sectors`}>Sectores</Link> 
        {//<Link to={`containers`}>Contenedores</Link> 
        }
        <Link to={`items`}>Items</Link>
        <Link to={`users`}>Usuarios</Link>
        <h1>RUTAS USER</h1>
        <Link to={`user/current`}>Mi perfil</Link> 
      </>
    );
  }
  