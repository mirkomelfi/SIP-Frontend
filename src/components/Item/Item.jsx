import "./Item.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { ItemLocation } from "./ItemLocation";

const Item =()=>{
    const {idSec,idCont,idItem}= useParams();

    const [item,setItem]= useState([]);
    console.log(item)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null);
    const [location,setLocation]=useState(null)

    const changeLocation=async()=>{
      setLocation(true);
    }
      
    const eliminar=async()=>{
      const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/items/${idItem}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getToken()}`
          }
      })
      const data = await response.json()
      setMensaje(data.msj)
      return;
    }

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
            
        }
        
      })
        .then(response => response.json())
        .then(data => {
          setItem(data)
          console.log(item)

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])
    return(
        <>
            {!location?<div className="tarjetaProducto">
                <h1>Item N°{item.id}</h1>
                {!mensaje?(<>
                <h2>Nombre: {item.name}</h2>
                <h2>Descripcion: {item.description}</h2>

                <Link to={`/updateItem/${idItem}`}>Modificar Item</Link>
                {!item.containerID?<button onClick={()=>changeLocation()} className="btn btn-primary">Agregar a un contenedor NO ANDA</button>:
                <button onClick={()=>changeLocation()} className="btn btn-primary">Cambiar de contenedor NO ANDA</button>}
                <button onClick={()=>eliminar()} className="btn btn-primary">Eliminar</button>
                </>
                
                ):(<Mensaje msj={mensaje} />)}
            </div>:<ItemLocation />}
            {idSec?<Link to={`/sectors/${idSec}/containers/${idCont}/items`}>Volver</Link>:<Link to={`/items`}>Volver</Link>}
        </>
    )
}

export {Item}