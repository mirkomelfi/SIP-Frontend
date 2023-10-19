import "./Unidad.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { UnidadResponsable } from "./UnidadResponsable";

const Unidad =()=>{
    const {id}= useParams();

    const [unidad,setUnidad]= useState([]);
    console.log(unidad)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null);
    const [updateResponsable,setUpdateResponsable]=useState(null)

    const cambiarPropietario=()=>{
        setUpdateResponsable("propietario")
        return;
    }

    const cambiarInquilino=()=>{
        setUpdateResponsable("inquilino")
        return;
    }

    const eliminar=async()=>{
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/unidades/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        })
        const data = await response.json()
        console.log(data)
        if (response.status==200){
          setMensaje(data.msj)
          return;
        }
  
    }

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/unidades/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {
          setUnidad(data)
          console.log(unidad)

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])
    return(
        <>
            {!updateResponsable?<div className="tarjetaProducto">
                <h1>Unidad N°{unidad.id}</h1>
                {!mensaje?(<>
                <h2>Nombre: {unidad.nombre}</h2>
                <h2>piso {unidad.piso}</h2>
                <h2>numero {unidad.numero}</h2>
                <h2>estado {unidad.estado}</h2>
                {unidad.propietario&&
                <>
                    <h2>propietario:</h2>
                    <h3>dni {unidad.propietario.dni}</h3>
                    <h3>nombre: {unidad.propietario.nombre}</h3>
                    <h3>apellido: {unidad.propietario.apellido}</h3>
                </>
                }
                {unidad.inquilino&&
                <>
                   <h2>inquilino:</h2>
                    <h3>dni {unidad.inquilino.dni}</h3>
                    <h3>nombre: {unidad.inquilino.nombre}</h3>
                    <h3>apellido: {unidad.inquilino.apellido}</h3>
                </>
                } 
                <Link to={`/updateUnidad/${id}`}>Modificar</Link>
                <button onClick={()=>cambiarPropietario()} className="btn btn-primary">Cambiar propietario</button>
                <button onClick={()=>cambiarInquilino()} className="btn btn-primary">Cambiar inquilino</button>
                <button onClick={()=>eliminar()} className="btn btn-primary">Eliminar</button>
                </>
                
                ):(<Mensaje msj={mensaje} />)}
            </div>:<UnidadResponsable responsable={updateResponsable} />}
            <Link to={`/edificios/${unidad.idEdificio}/unidades`}>Volver</Link>
        </>
    )
}

export {Unidad}