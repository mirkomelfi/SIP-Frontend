import React from "react";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { ContainerList } from "../ContainerList/ContainerList";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";
import { ContainerPost } from "../Container/ContainerPOST";
import { Mensaje } from "../Mensaje/Mensaje";


const ContainerListContainer = ({greeting}) =>{

    const {idSec}= useParams();

    const [listaContainers,setListaContainers]= useState([]);
    const [loading,setLoading]= useState(true);
    const [add,setAdd]= useState(false);
    const [mensaje,setMensaje]= useState(null);


    const agregar= () =>{ 
      setAdd(true)
    }

    useEffect(() => { 

        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/sectors/${idSec}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {

          if (data.msj){
            console.log("data",data)
            setMensaje(data.msj)
          }else{
            
          const containers= data.containers
          setListaContainers(containers)
          }

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
          setAdd(false)
        })
    },[])

    return (
        <> 
          {loading 
          ? 
          <p>Cargando...</p> 
          : 
          !add ?
          (!mensaje?<>
            <h1 className="greeting">{greeting}</h1>
            <button onClick={()=>agregar()} className="btn btn-primary">Agregar contenedor</button>
            <ContainerList listaContainers={listaContainers} isAdmin={true}/>
          </>:<Mensaje msj={mensaje}/>)
          :
          (<ContainerPost/>)}
 
          <Link to={`/sectors/${idSec}`}>Volver</Link>
        </>
    );
  } 
  
export default ContainerListContainer;