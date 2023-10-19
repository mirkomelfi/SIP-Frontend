import React from "react";
import "./ReclamoListContainer.css";
import { useState, useEffect } from "react";
import {ReclamoList} from "../ReclamoList/ReclamoList"
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";


export const ReclamoListContainer = ({greeting}) =>{

  const {estado}= useParams();

    const [listaReclamos,setListaReclamos]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    let url="";

      useEffect(() => { 
        if (estado){
          url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/reclamos/filter?estado=${estado}`
        }else{
          url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/reclamos`
        }
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
              setListaReclamos(data)
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
      <Link to={`/filtrarReclamos`}>Filtrar segun estado</Link>
      <h1 className="greeting">{greeting}</h1>
      {!mensaje?(
      <div>
        {loading ? <p>cargando...</p> : <ReclamoList listaReclamos={listaReclamos}/>}
      </div>):<Mensaje msj={mensaje}/>}
      <Link to={`/`}>Volver</Link>
    </>
    );
  }
  
