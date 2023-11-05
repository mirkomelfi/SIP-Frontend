import "./Container.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken, validateRol } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const Container =({fromItem,fromLocation})=>{

    const {idSec,idCont,idItem}= useParams();

    const [container,setContainer]= useState([]);

    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null);

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
            setMensaje("No posee los permisos necesarios")
        }else{
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
      const data = await response.json()
      setMensaje(data.msj)
      return;
  }

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/containers/${idCont}`, {
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
                <h2>Nombre: {container.name}</h2>
                <h2>Descripcion: {container.description}</h2>
                <h2>Se encuentra en sector: {container.sectorID}</h2>

               {
               !fromLocation ?
               
               idSec? 
                 <><Link to={`items`}>Ver items</Link> 
                <Link to={`updateContainer`}>Modificar</Link>
                <button onClick={()=>eliminar()} className="btn btn-primary">Eliminar</button>
                  </>
                :
                <Link to={`sectors/${container.sectorID}`}>Ver sector</Link>
                :
                <button onClick={()=>changeLocation()} className="btn btn-primary">Seleccionar container</button>
                }
                </>
                
                ):(<Mensaje msj={mensaje} />)}
            </div>
            }
           { !fromItem&&!fromLocation?<Link to={`/sectors/${container.sectorID}/containers`}>Volver</Link>:
            <Link to={`/items/${idItem}`}>Volver</Link>
          }
        </>
    )
}

export {Container}