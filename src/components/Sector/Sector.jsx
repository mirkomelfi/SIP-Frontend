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
            <div className="tarjetaProducto-sec">
                <h1 className="titulo-sec">Sector N°{idSec}</h1>
                {!mensaje ? (
                    <>
                    {sector && (
                        <div className="detalleSector-sec">
                        <p><strong>Nombre:</strong> {sector.name}</p>
                        <p><strong>Descripción:</strong> {sector.description}</p>
                        </div>
                    )}

                    {!fromContainer && (
                        <div className="accionesGrid-sec">
                        <button className="button-sec btnPrimary-sec" onClick={() => navigateTo("containers")}>
                            <span className="btnText-sec">Ver Contenedores</span>
                        </button>
                        {!rol && (
                            <button className="button-sec btnPrimary-sec" onClick={() => navigateTo(`/updateSector/${idSec}`)}>
                            <span className="btnText-sec">Modificar sector</span>
                            </button>
                        )}
                        <button className="button-sec btnPrimary-sec" onClick={generarQr}>
                            <span className="btnText-sec">Generar QR</span>
                        </button>
                        {!rol && (
                            <button className="button-sec btnPrimary-sec danger-sec" onClick={eliminar}>
                            <span className="btnText-sec">Eliminar</span>
                            </button>
                        )}
                        </div>
                    )}
                    </>
                ) : (
                    <Mensaje msj={mensaje} />
                )}
                </div>
                :<CodigoQR url={window.location.href} />}
            {!fromContainer? 
            <button className="button btnPrimary" onClick={()=>navigateTo(`/sectors`)}><span className="btnText">Volver</span></button>
            :
            <button className="button btnPrimary" onClick={()=>navigateTo(`/items/${idItem}/containers/${idCont}`)}><span className="btnText">Volver</span></button>
            }
           
            
        </>
    )
}

export {Sector}