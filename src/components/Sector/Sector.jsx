import "./Sector.css";
import {Link, useParams} from "react-router-dom";
import { useState } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { useEffect } from "react";


const Sector =({fromContainer})=>{

    const {idSec}= useParams()
    console.log(idSec)
    const [mensaje,setMensaje]=useState(null);
    const [sector,setSector]=useState();

    const eliminar=async()=>{
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/sectors/${idSec}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        })
        const data = await response.json()
        console.log(data)

        setMensaje(data.msj)
        return;
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
            console.log(data)
            console.log(mensaje)
            if(data.msj){
                setMensaje(data.msj)
                console.log(data)
            }else{
                setSector(data)
                console.log(data)
            }


        })
        .catch(error => console.error(error))
        .finally(()=>{
        })
    },[])


    return(
        <>
            <div className="tarjetaProducto">
                <h1>Sector N°{idSec}</h1>
                {!mensaje?(  <>
                    {sector&&<><h2>Nombre: {sector.name}</h2>
                <h2>Descripcion: {sector.description}</h2></>}
                {!fromContainer&&  <>
                <Link to={`containers`}>Ver Contenedores</Link> 
                <Link to={`/updateSector/${idSec}`}>Modificar sector</Link>
               
                <button onClick={()=>eliminar()} className="btn btn-primary">Eliminar</button></>
                } </>
                ):(<Mensaje msj={mensaje} />)}
            </div>
            <Link to={`/sectors`}>Volver</Link> 
        </>
    )
}

export {Sector}