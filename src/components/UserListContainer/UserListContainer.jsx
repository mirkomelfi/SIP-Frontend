import React from "react";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { UserList } from "../UserList/UserList";
import { Link } from "react-router-dom";
import { getToken, validateRol } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";


const UserListContainer = ({greeting}) =>{

    const {idUser}= useParams();

    const [listaUsers,setListaUsers]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]= useState(null);

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
      setMensaje("No posee los permisos necesarios")
    }else{
    const data = await response.json()
    if (data.msj){
      setMensaje(data.msj)
    }else{
      setListaUsers(data)
    }
    }
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
          {loading ? <p>Cargando...</p> : <UserList pid={idUser} listaUsers={listaUsers}/>}
          <Link to={`/`}>Volver</Link>
          </>
          : <Mensaje msj={mensaje}/>
        }
        </>
    );
  } 
  
export default UserListContainer;