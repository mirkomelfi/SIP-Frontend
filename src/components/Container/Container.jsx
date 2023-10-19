import "./Container.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const Container =()=>{
    const {id}= useParams();

    const [container,setContainer]= useState([]);
    console.log(container)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null);

    const eliminar=async()=>{
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/containers/${id}`, {
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
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/containers/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {
          setContainer(data)
          console.log(container)

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])
    return(
        <>
            {<div className="tarjetaProducto">
                <h1>Container N°{container.id}</h1>
                {!mensaje?(<>
                <h2>Nombre: {container.nombre}</h2>
                <h2>piso {container.piso}</h2>
                <h2>numero {container.numero}</h2>
                <h2>estado {container.estado}</h2>
                <Link to={`${container.id}/items`}>Ver items</Link> 
                <Link to={`/updateContainer/${id}`}>Modificar</Link>
                <button onClick={()=>eliminar()} className="btn btn-primary">Eliminar</button>
                </>
                
                ):(<Mensaje msj={mensaje} />)}
            </div>
            }
            <Link to={`/sectors/${container.sectorID}/containers`}>Volver</Link>
        </>
    )
}

export {Container}