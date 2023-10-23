import React from "react";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { ContainerList } from "../ContainerList/ContainerList";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";
import { ContainerPost } from "../Container/ContainerPOST";
import { Mensaje } from "../Mensaje/Mensaje";


const ContainerListContainer = ({greeting, idContainer, idItem}) =>{

    const {idSec}= useParams();

  console.log("ContainerListContainer",idSec,idContainer,idItem)
    const [listaContainers,setListaContainers]= useState([]);
    const [loading,setLoading]= useState(true);
    const [add,setAdd]= useState(false);
    const [mensaje,setMensaje]= useState(null);


    const agregar= () =>{ 
      setAdd(true)
    }

    useEffect(() => { 
      let url=``;
      if (idSec){
        url=`${process.env.REACT_APP_DOMINIO_BACK}/sectors/${idSec}`;
      }else{
        url= `${process.env.REACT_APP_DOMINIO_BACK}/containers/filter?idCont=${idContainer}`; //      /filter?idCont=${idContainer}
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
        
          if (idSec){
            const containers= data.containers
            if (containers.length==0){
              setMensaje(`No hay contenedores cargados en el sector ${idSec}`)
            }else{
              setListaContainers(containers)
            }
          } else{
            setListaContainers(data)
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
            {idSec?<> 
            <button onClick={()=>agregar()} className="btn btn-primary">Agregar contenedor</button>
           <ContainerList listaContainers={listaContainers} isInSector={true}/></>
            :
            <ContainerList listaContainers={listaContainers} idItem={idItem}/>}</>
            :
            <> 
            <button onClick={()=>agregar()} className="btn btn-primary">Agregar contenedor</button>
            <Mensaje msj={mensaje}/>
            </> 
          ):
          (<ContainerPost/>)}
 
          {idSec?<Link to={`/sectors/${idSec}`}>Volver</Link>:
          idItem? <Link to={`/items/${idItem}`}>Volver</Link>:
          <Link to={`/`}>Volver</Link>}
        </>
    );
  } 
  
export default ContainerListContainer;