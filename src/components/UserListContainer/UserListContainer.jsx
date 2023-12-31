import React from "react";
import { useState, useEffect } from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import { UserList } from "../UserList/UserList";
import { Link } from "react-router-dom";
import { deleteToken, getToken, isRolUser, validateRol } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";


const UserListContainer = ({greeting}) =>{

    const {idUser}= useParams();

    const [listaUsers,setListaUsers]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]= useState(null);
    const navigate= useNavigate()
  const ejecutarFetch = async() =>{

    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    })
    const rol=validateRol(response)
    if (!rol){
      if (isRolUser(getToken())){
        console.log("rol user")
          setMensaje("No posee los permisos necesarios")
      }else{
        deleteToken()
        navigate("/login")
      }
    }else{
    const data = await response.json()
    if (data.msj){
      setMensaje(data.msj)
    }else{
      setListaUsers(data)
    }
    }
  }

  const navigateTo=(url)=>{
    navigate(url)
  }

  useEffect(() => { 
    ejecutarFetch()
    .catch(error => console.error(error))
    .finally(()=>{
      setLoading(false)
    })
  },[])

    return (
        <>{!mensaje
          ?
          <>
          <h1 className="greeting">{greeting}</h1>
          <button class="button btnPrimary" onClick={()=>navigateTo("/register")}><span class="btnText">Registrar usuario</span></button>
          {loading ? <p>Cargando...</p> : <UserList pid={idUser} listaUsers={listaUsers}/>}
          <button class="button btnPrimary" onClick={()=>navigateTo("/")}><span class="btnText">Volver</span></button>
          </>
          : <Mensaje msj={mensaje}/>
        }
        </>
    );
  } 
  
export default UserListContainer;