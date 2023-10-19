import "./Sector.css";
import {Link} from "react-router-dom";
import { useState } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const Sector =({sector})=>{

    const [mensaje,setMensaje]=useState(null)

    const eliminar=async()=>{
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/sectors/${sector.id}`, {
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

    return(
        <>
            <div className="tarjetaProducto">
                <h1>Sector N°{sector.id}</h1>
                {!mensaje?(  <>
                <h2>Calle: {sector.calle}</h2>
                <h2>Numero: {sector.numero}</h2>
                <h2>Ciudad: {sector.ciudad}</h2>
                <h2>Codigo postal: {sector.codigoPostal}</h2>
                <Link to={`${sector.id}/containers`}>Ver unidades</Link> 
            
                <Link to={`/updateSector/${sector.id}`}>Modificar</Link>
                <button onClick={()=>eliminar()} className="btn btn-primary">Eliminar</button></>
                
                ):(<Mensaje msj={mensaje} />)}
            </div>
        </>
    )
}

export {Sector}