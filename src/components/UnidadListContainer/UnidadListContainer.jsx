import React from "react";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { UnidadList } from "../UnidadList/UnidadList";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";
import { UnidadPost } from "../Unidad/UnidadPOST";
import { Mensaje } from "../Mensaje/Mensaje";


const UnidadListContainer = ({greeting}) =>{

    const {id}= useParams();

    const [listaUnidades,setListaUnidades]= useState([]);
    const [loading,setLoading]= useState(true);
    const [add,setAdd]= useState(false);
    const [mensaje,setMensaje]= useState(null);


    const agregar= () =>{ 
      setAdd(true)
    }

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/edificios/${id}`, {
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
            
          const unidades= data.unidades
          setListaUnidades(unidades)
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
            <button onClick={()=>agregar()} className="btn btn-primary">Agregar unidad</button>
            <UnidadList pid={id} listaUnidades={listaUnidades} isAdmin={true}/>
          </>:<Mensaje msj={mensaje}/>)
          :
          (<UnidadPost/>)}
 
          <Link to={`/edificios`}>Volver</Link>
        </>
    );
  } 
  
export default UnidadListContainer;