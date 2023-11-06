import React from "react";
import "./SectorListContainer.css";
import { useState, useEffect } from "react";
import {SectorList} from "../SectorList/SectorList"
import {useParams,Link, useNavigate} from "react-router-dom";
import { getToken, validateRol } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";


export const SectorListContainer = ({greeting}) =>{

    const [listaSectors,setListaSectors]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    const navigate= useNavigate()
  
    const ejecutarFetch=async () =>{ 

      const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/sectors`, {
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
          const data = await response.json()
          if (data.msj){
            setMensaje(data.msj)
          }else{
            setListaSectors(data)
            setMensaje(null)
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
  
