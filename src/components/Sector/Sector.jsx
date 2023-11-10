import "./Sector.css";
import {Link, Route, redirect, useNavigate, useParams} from "react-router-dom";
import { useState } from "react";
import { deleteToken, getToken, isRolUser, validateRol } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { useEffect } from "react";
import { CodigoQR } from "../CodigoQR/CodigoQR";


const Sector =({fromContainer})=>{
    const {idSec,idCont,idItem}= useParams()
    console.log(idSec)
    const [mensaje,setMensaje]=useState(null);
    const actualLocation=window.location.href
    const [sector,setSector]=useState();
    const navigate= useNavigate()
    const [rol,setRol]=useState(undefined);
    const [qr,setQr]=useState(undefined);

    const generarQr=async()=>{
        setQr(true)
    }

    const ejecutarFetch=async () =>{ 
    
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/sectors/${idSec}`, {
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
            if(data.msj){
                setMensaje(data.msj)
            }else{
                setSector(data)
            }
        }
    }

    const eliminar=async()=>{
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/sectors/${idSec}`, {
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
            const data = await response.json()
            if (data.msj){
                setMensaje(data.msj)
            }
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
        })
    },[])


    return(
        <>
        
            {!qr?
            <div className="tarjetaProducto">
                <h1>Sector N°{idSec}</h1>
                {!mensaje?(  <>
                    {sector&&<><h2>Nombre: {sector.name}</h2>
                <h2>Descripcion: {sector.description}</h2></>}
                {!fromContainer&&  <>
                <button class="button btnPrimary" onClick={()=>navigateTo("containers")}><span class="btnText">Ver Contenedores</span></button>
                {!rol&&
                <button class="button btnPrimary" onClick={()=>navigateTo(`/updateSector/${idSec}`)}><span class="btnText">Modificar sector</span></button>
                }
                <button class="button btnPrimary" onClick={()=>generarQr()}><span class="btnText">Generar QR</span></button>
                {!rol&&<button class="button btnPrimary" onClick={()=>eliminar()}><span class="btnText">Eliminar</span></button>}
                
                </>
                } </>
                ):(<Mensaje msj={mensaje} />)}
            </div> :<CodigoQR url={window.location.href} />}
            {!fromContainer? 
            <button class="button btnPrimary" onClick={()=>navigateTo(`/sectors`)}><span class="btnText">Volver</span></button>
            :
            <button class="button btnPrimary" onClick={()=>navigateTo(`/items/${idItem}/containers/${idCont}`)}><span class="btnText">Volver</span></button>
            }
           
            
        </>
    )
}

export {Sector}