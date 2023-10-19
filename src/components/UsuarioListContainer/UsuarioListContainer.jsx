import React from "react";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { UsuarioList } from "../UsuarioList/UsuarioList";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";


const UsuarioListContainer = ({greeting}) =>{

    const {id}= useParams();

    const [listaUsuarios,setListaUsuarios]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]= useState(null);

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios`, {
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
            setListaUsuarios(data)
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
          {loading ? <p>Cargando...</p> : <UsuarioList pid={id} listaUsuarios={listaUsuarios}/>}
          <Link to={`/`}>Volver</Link>
          </>
          : <Mensaje msj={mensaje}/>
        }
        </>
    );
  } 
  
export default UsuarioListContainer;