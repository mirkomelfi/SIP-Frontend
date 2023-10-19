import React from "react";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { ReclamoList } from "../ReclamoList/ReclamoList";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";
import { ReclamoPost } from "../Reclamo/ReclamoPOST";
import { Mensaje } from "../Mensaje/Mensaje";


const UserReclamoListContainer = ({greeting}) =>{

    const [listaReclamos,setListaReclamos]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]= useState(null);


    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/misReclamos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {
          console.log("data",data)
          if (data.msj){
            console.log("data",data)
            setMensaje(data.msj)
          }else{
          setListaReclamos(data)
          }

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])

    return (
        <> 
          {loading 
          ? 
          <p>Cargando...</p> 
          : (!mensaje?
         (
          <>
            <h1 className="greeting">{greeting}</h1>
            <ReclamoList listaReclamos={listaReclamos}/>
          </>):<Mensaje msj={mensaje}/>)
          }
 
          <Link to={`/`}>Volver</Link>
        </>
    );
  } 
  
export default UserReclamoListContainer;