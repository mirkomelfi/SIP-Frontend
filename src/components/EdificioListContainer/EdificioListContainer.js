import React from "react";
import "./EdificioListContainer.css";
import { useState, useEffect } from "react";
import {EdificioList} from "../EdificioList/EdificioList"
import {useParams,Link} from "react-router-dom";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";


export const EdificioListContainer = ({greeting}) =>{

    const [listaEdificios,setListaEdificios]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
  
    let url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/edificios`

      useEffect(() => { 
        fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getToken()}`
          }

        })
          .then(response => response.json())
          .then(data => {
            if (data.msj){
              setMensaje(data.msj)
            }else{
              setListaEdificios(data)
              setMensaje(null)
            }

          })
          .catch(error => console.error(error))
          .finally(()=>{
            setLoading(false)
          })
      },[])

    return (
      <>
      <h1 className="greeting">{greeting}</h1>
        <Link to={`/addEdificio`}>Agregar edificio</Link> 
      {!mensaje?(
      <div> 

        {loading ? <p>cargando...</p> : <EdificioList listaEdificios={listaEdificios}/>}
      </div>):<Mensaje msj={mensaje}/>}
      <Link to={`/`}>Volver</Link>
      </>
    );
  }
  
