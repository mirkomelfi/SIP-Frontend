import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, isRolUser, validateRol } from "../../utils/auth-utils";
export const Home = () =>{
    const [rolUser,setRolUser]=useState(true)
    const navigate=useNavigate()

  const ejecutarFetch = async () =>{
    let url=`${process.env.REACT_APP_DOMINIO_BACK}/profile`
    const response= await  fetch(url, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
      }  
    })

    const rol=validateRol(response)
    if (!rol){
      navigate("/login")
    }else{
      setRolUser(isRolUser(getToken()))
    }

  }

    useEffect(()=>{
      ejecutarFetch()
      .catch(error => console.error(error))
    },[])

    return (
      <>
      <div className="contenedorBotones">
        {!rolUser&&<Link to={`users`}>Usuarios</Link>}
        <Link to={`sectors`}>Sectores</Link> 
        <Link to={`items`}>Items</Link>
        <Link to={`user/current`}>Mi perfil</Link> 
        </div>
      </>
    );
  }
  