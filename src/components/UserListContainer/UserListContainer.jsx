import React from "react";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { UserList } from "../UserList/UserList";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";


const UserListContainer = ({greeting}) =>{

    const {idUser}= useParams();

    const [listaUsers,setListaUsers]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]= useState(null);

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.msj){
            setMensaje(data.msj)
          }else{
            setListaUsers(data)
          }

        })
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