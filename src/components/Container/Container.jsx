import "./Container.css";
import {Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { deleteToken, getToken, isRolUser, validateRol } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { CodigoQR } from "../CodigoQR/CodigoQR";

const Container =({fromItem,fromLocation})=>{

    const {idSec,idCont,idItem}= useParams();
    const actualLocation=window.location.href
    const [container,setContainer]= useState([]);

    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null);
    
    const [rol,setRol]=useState(undefined);
    const navigate= useNavigate()
    const [qr,setQr]=useState(undefined);

    const generarQr=async()=>{
        setQr(true)
    }


    const ejecutarFetch=async () =>{ 
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/containers/${idCont}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
            
          })
        const rol=validateRol(response)
        if (!rol){
            deleteToken()
            navigate("/login",{state:{from:actualLocation}} )
        }else{
            const data = await response.json()
            setRol(isRolUser(getToken()))
            if (data.msj){
                setMensaje(data.msj)
            }else{
                setContainer(data)
            }
        }

    }
    const eliminar=async()=>{
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/containers/${idCont}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        })
        const rol=validateRol(response)
        if (!rol){
            if (isRolUser(getToken())){
              console.log("rol user")
                setMensaje("No posee los permisos necesarios")
            }else{
                deleteToken()
                navigate("/login")
            }
        }else{
            setRol(isRolUser(getToken()))
            const data = await response.json()
            if (data.msj){
                setMensaje(data.msj)
            }
        }
  
    }

    const changeLocation=async()=>{
      const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}/newLocation/${idCont}`, {
          method: "PUT",
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
            setMensaje(data.msj)
        }

      return;
  }
  const navigateTo=(url)=>{
    navigate(url)
}

    useEffect(() => { 
        ejecutarFetch()
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])
    return(
        <>
            {!qr?<div className="tarjetaProducto">
                <h1>Container N°{container.id}</h1>
                {!mensaje?(<>
                <h2>Nombre: {container.name}</h2>
                <h2>Descripcion: {container.description}</h2>
                <h2>Se encuentra en sector: {container.sectorID}</h2>

               {
               !fromLocation ?
               
               idSec? 
                 <><button class="button btnPrimary" onClick={()=>navigateTo(`items`)}><span class="btnText">Ver items</span></button>
                
                {!rol&&
                <button class="button btnPrimary" onClick={()=>navigateTo(`updateContainer`)}><span class="btnText">Modificar</span></button>
                }
                <button class="button btnPrimary" onClick={()=>generarQr()}><span class="btnText">Generar QR</span></button>
                {!rol&&<button onClick={()=>eliminar()} class="button btnPrimary"><span class="btnText">Eliminar</span></button>}
                  </>
                :
                <button class="button btnPrimary" onClick={()=>navigateTo(`sectors/${container.sectorID}`)}><span class="btnText">Ver sector</span></button>
                :
                <button onClick={()=>changeLocation()} class="button btnPrimary" ><span class="btnText">Seleccionar contenedor</span></button>
                }
                </>
                
                ):(<Mensaje msj={mensaje} />)}
            </div>: <CodigoQR url={window.location.href} />
            }
           { !fromItem&&!fromLocation? 
           <button class="button btnPrimary" onClick={()=>navigateTo(`/sectors/${container.sectorID}/containers`)}><span class="btnText">Volver</span></button>
           :
           <button class="button btnPrimary" onClick={()=>navigateTo(`/items/${idItem}/locationChange`)}><span class="btnText">Volver</span></button>
          }
        </>
    )
}

export {Container}