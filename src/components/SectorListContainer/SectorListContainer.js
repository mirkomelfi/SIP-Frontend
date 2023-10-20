import React from "react";
import "./SectorListContainer.css";
import { useState, useEffect } from "react";
import {SectorList} from "../SectorList/SectorList"
import {useParams,Link} from "react-router-dom";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";


export const SectorListContainer = ({greeting}) =>{

    const [listaSectors,setListaSectors]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
  
    let url=`${process.env.REACT_APP_DOMINIO_BACK}/sectors`

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
              setListaSectors(data)
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
        <Link to={`/addSector`}>Agregar Sector</Link> 
      {!mensaje?(
      <div> 

        {loading ? <p>cargando...</p> : <SectorList listaSectors={listaSectors}/>}
      </div>):<Mensaje msj={mensaje}/>}
      <Link to={`/`}>Volver</Link>
      </>
    );
  }
  
