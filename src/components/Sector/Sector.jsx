import "./Sector.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useState } from "react";
import { deleteToken, getToken, isRolUser, validateRol } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { useEffect } from "react";


const Sector =({fromContainer})=>{

    const {idSec,idCont,idItem}= useParams()
    console.log(idSec)
    const [mensaje,setMensaje]=useState(null);
    const [sector,setSector]=useState();
    const navigate= useNavigate()
    const [rol,setRol]=useState(undefined);

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
            navigate("/login")
            
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

    useEffect(() => { 
        ejecutarFetch()
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
                {!rol&&<Link to={`/updateSector/${idSec}`}>Modificar sector</Link>}
               
                {!rol&&<button onClick={()=>eliminar()}>Eliminar</button>}
                
                </>
                } </>
                ):(<Mensaje msj={mensaje} />)}
            </div>
            {!fromContainer? <div className="contenedorBotones"><Link to={`/sectors`}>Volver</Link> </div>
            :<div className="contenedorBotones"><Link to={`/items/${idItem}/containers/${idCont}`}>Volver</Link></div>
            }
        </>
    )
}

export {Sector}