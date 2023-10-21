import { useState } from "react";
import "./ContainerDetail.css";
import {Link} from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";

const ContainerDetail =({container, isInSector, idItem})=>{
    console.log(isInSector)
    const [mensaje,setMensaje]= useState(null)

    const changeLocation=async()=>{
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}/newLocation/${container.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        })
        const data = await response.json()
        setMensaje(data.msj)
        return;
    }

    return(
        <>
        {!mensaje?
            <div className="tarjetaProducto">
                <h1>Container N°{container.id}</h1>
                <h2>Nombre: {container.name}</h2>
                <h2>Descripcion: {container.description}</h2>
                
                {isInSector?
                <Link to={`${container.id}`}>Ver container</Link> 
                : 
                 <button onClick={()=>changeLocation()} className="btn btn-primary">Seleccionar container</button>
                }

            </div>
            :<Mensaje msj={mensaje} />
        }
        </>
    )
}

export {ContainerDetail}