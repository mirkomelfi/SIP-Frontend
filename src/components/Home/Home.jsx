import React from "react";
import { Link } from "react-router-dom";
export const Home = () =>{

    return (
      <>
      <h1>RUTAS ADMIN</h1>
        <Link to={`reclamos`}>Reclamos</Link> 
        <Link to={`edificios`}>Edificios</Link> 
        <Link to={`usuarios`}>Usuarios</Link>
        <h1>RUTAS USER</h1>
        <Link to={`usuario/current`}>Mi perfil</Link> 
        <Link to={`usuario/unidades`}>Mis unidades</Link> 
        <Link to={`usuario/areas`}>Mis areas</Link> 
        <Link to={`usuario/reclamos`}>Mis reclamos</Link> 
        <Link to={`imagenes`}>prueba imagenes</Link> 
      </>
    );
  }
  