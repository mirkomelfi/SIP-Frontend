import "./Container.css";
import {Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { deleteToken, getToken, isRolUser, validateRol } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const Container =({fromItem,fromLocation})=>{

    const {idSec,idCont,idItem}= useParams();

    const [container,setContainer]= useState([]);

    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null);
    
    const [rol,setRol]=useState(undefined);
    const navigate= useNavigate()

    const ejecutarFetch=async () =>{ 
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/containers/${idCont}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
            
          })
        const rol=validateRol(response)
        if (!rol){
            deleteToken()
            navigate("/login")
        }else{
            const data = await response.json()
            if (data.msj){
                setMensaje(data.msj)
            }else{
                setContainer(data)
            }
        }

    }
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
            if (isRolUser(getToken())){
              console.log("rol user")
                setMensaje("No posee los permisos necesarios")
            }else{
                deleteToken()
                navigate("/login")
            }
        }else{
            setRol(isRolUser(getToken()))
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
      const rol=validateRol(response)
        if (!rol){
            deleteToken()
            navigate("/login") 
        }else{
            const data = await response.json()
            setMensaje(data.msj)
        }

      return;
  }

    useEffect(() => { 
        ejecutarFetch()
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
                {!rol&&<Link to={`updateContainer`}>Modificar</Link>}
                {!rol&&<button onClick={()=>eliminar()} className="btn-red">Eliminar</button>}
                  </>
                :
                <Link to={`sectors/${container.sectorID}`}>Ver sector</Link>
                :
                <button onClick={()=>changeLocation()} className="btn-red">Seleccionar container</button>
                }
                </>
                
                ):(<Mensaje msj={mensaje} />)}
            </div>
            }
           { !fromItem&&!fromLocation? <div className="contenedorBotones"><Link to={`/sectors/${container.sectorID}/containers`}>Volver</Link></div>:
            <div className="contenedorBotones"><Link to={`/items/${idItem}/locationChange`}>Volver</Link></div>
          }
        </>
    )
}

export {Container}