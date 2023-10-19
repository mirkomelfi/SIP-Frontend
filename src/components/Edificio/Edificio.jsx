import "./Edificio.css";
import {Link} from "react-router-dom";
import { useState } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const Edificio =({edificio})=>{
    console.log(edificio)
    const [mensaje,setMensaje]=useState(null)

    const modificar=async()=>{

    }

    const eliminar=async()=>{
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/edificios/${edificio.id}`, {
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
                <h1>Edificio N°{edificio.id}</h1>
                {!mensaje?(  <>
                <h2>Calle: {edificio.calle}</h2>
                <h2>Numero: {edificio.numero}</h2>
                <h2>Ciudad: {edificio.ciudad}</h2>
                <h2>Codigo postal: {edificio.codigoPostal}</h2>
                <Link to={`${edificio.id}/unidades`}>Ver unidades</Link> 
                <Link to={`${edificio.id}/areas`}>Ver areas</Link> 
            
                <Link to={`/updateEdificio/${edificio.id}`}>Modificar</Link>
                <button onClick={()=>eliminar()} className="btn btn-primary">Eliminar</button></>
                
                ):(<Mensaje msj={mensaje} />)}
            </div>
        </>
    )
}

export {Edificio}