import React from "react";
import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { ContainerList } from "../ContainerList/ContainerList";
import { Link } from "react-router-dom";
import { deleteToken, getToken, validateRol } from "../../utils/auth-utils";
import { ContainerPost } from "../Container/ContainerPOST";
import { Mensaje } from "../Mensaje/Mensaje";


const ContainerListContainer = ({fromLoc, greeting, idContainer, idItem}) =>{

  const {idSec}= useParams();

  if (!idContainer)idContainer="";

  console.log("ContainerListContainer",idSec,idContainer,idItem)
    const [listaContainers,setListaContainers]= useState([]);
    const [loading,setLoading]= useState(true);
    const [add,setAdd]= useState(false);
    const [mensaje,setMensaje]= useState(null);
    const [error,setError]= useState(null);
    const [rol,setRol]= useState(undefined);
    const navigate= useNavigate()

    const agregar= () =>{ 
      setAdd(true)
    }


    const ejecutarFetch=async () =>{ 
      let url=``;
      if (idSec){
        url=`${process.env.REACT_APP_DOMINIO_BACK}/sectors/${idSec}`;
      }else{
        url= `${process.env.REACT_APP_DOMINIO_BACK}/containers/filter?idCont=${idContainer}`; 
      }

      const response= await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })

      const rol=validateRol(response)
        if (!rol){
          deleteToken()
          navigate("/login")
        }else{
          const data = await response.json()
          //setRol(isRolUser(getToken()))
          setRol(true)
          if (idSec){
            const containers= data.containers
            if (containers.length==0){
              setMensaje(`No hay contenedores cargados en el sector ${idSec}`)
            }else{
              setListaContainers(containers)
            }
          } else{
            if (data.msj){
              setError(true)
              setMensaje(data.msj)
            }else{
              setListaContainers(data)
            }
          }
        }
      
    }
    const navigateTo=(url)=>{
      navigate(url)
  }

    useEffect(() => {
      ejecutarFetch()
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
          !error ?
          !add ?
          (!mensaje?<>
            <h1 className="greeting">{greeting}</h1>
            {idSec?
            <> 
              {!rol&&<button  class="button btnPrimary"  onClick={()=>agregar()}><span class="btnText">Agregar contenedor</span></button>}
              <ContainerList listaContainers={listaContainers} isInSector={true}/>
            </>
            :
            <ContainerList listaContainers={listaContainers} idItem={idItem} />  }</>
            :
            <> 
            {!rol&&<button  class="button btnPrimary"  onClick={()=>agregar()}><span class="btnText">Agregar contenedor</span></button>}
            <Mensaje msj={mensaje}/>
            </> 
          ):
          (<ContainerPost/>):
          <Mensaje msj={mensaje}/>
        }
 
          {idSec?
          <button class="button btnPrimary" onClick={()=>navigateTo(`/sectors/${idSec}`)}><span class="btnText">Volver</span></button>
          :
          fromLoc?
          <button class="button btnPrimary" onClick={()=>navigateTo(`/items/${idItem}`)}><span class="btnText">Volver</span></button>
          :
          <button class="button btnPrimary" onClick={()=>navigateTo(`/`)}><span class="btnText">Volver</span></button>}
        </>
    );
  } 
  
export default ContainerListContainer;