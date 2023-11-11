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
  const navigateTo=(url)=>{
    navigate(url)
  }
    useEffect(()=>{
      ejecutarFetch()
      .catch(error => console.error(error))
    },[])

    return (
      <div className="home">
        {!rolUser&&
        <button class="button button-home btnPrimary-home" onClick={()=>navigateTo(`users`)}><span class="btnText">Usuarios</span></button>
        }
        <button class="button button-home btnPrimary-home" onClick={()=>navigateTo(`sectors`)}><span class="btnText">Sectores</span></button>
        <button class="button button-home btnPrimary-home" onClick={()=>navigateTo(`items`)}><span class="btnText">Items</span></button>
        <button class="button button-home btnPrimary-home" onClick={()=>navigateTo(`user/current`)}><span class="btnText">Mi perfil</span></button>
      </div>
    );
  }
  