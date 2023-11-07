import "./Item.css";
import {Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { deleteToken, getToken, isRolUser, validateRol } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { Location } from "../Location/Location";

const Item =({fromSector,id})=>{
    let {idSec,idCont,idItem}= useParams();

    const [item,setItem]= useState([]);
    console.log(item)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null);
    const [locations,setLocations]= useState(null);
    const navigate= useNavigate();

    const ejecutarFetch=async () =>{ 
      const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`   
        }
        
      })
      const rol=validateRol(response)
      if (!rol){
          navigate("/login")
      }else{
          const data = await response.json()
          if (data.msj){
            setMensaje(data.msj)
          }else{
            setItem(data)
          }
      }

  }


    const eliminar=async()=>{
      const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/items/${idItem}`, {
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

    const verLocations=async()=>{
     setLocations(true)
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
            {!locations?
          <>
            <div className="tarjetaProducto">
                <h1>Item N°{item.id}</h1>
                {!mensaje?(<>
                <h2>Nombre: {item.name}</h2>
                {item.image!=null&&<img src={`data:image/jpeg;base64,${item.image.imageData}`} alt="" />}
                <h2>Descripcion: {item.description}</h2>
                {item.containerID==0||!item.containerID?
                <h2>No se encuentra en ningun contenedor</h2>
                :
                <h2>Se encuentra en contenedor: {item.containerID}</h2>}
                {item.image==null?<Link to={`/addImage/${item.id}`}>Agregar imagen</Link>:<Link to={`/addImage/${item.id}`}>Modificar imagen</Link>}
                <Link to={`updateItem`}>Modificar Item</Link>
               { <button onClick={()=>verLocations()} >Ver historial de locations</button>}
                {(item.containerID!=undefined&&item.containerID!=0&&item.containerID!=null&&!idSec)&&<Link to={`containers/${item.containerID}`}>Ver contenedor</Link>}
                {item.containerID==0||!item.containerID?
                <Link to={`locationChange`}>Agregar a un contenedor</Link>
                :
                !idSec&&
                <Link to={`locationChange`}>Cambiar de contenedor</Link>
                }
                <button onClick={()=>eliminar()}>Eliminar</button>
                </>
                
                ):(<Mensaje msj={mensaje} />)}
                 
            </div>
            <>
              {idSec? <div className="contenedorBotones"><Link to={`/sectors/${idSec}/containers/${idCont}/items`}>Volver</Link></div>
              :<div className="contenedorBotones"><Link to={`/items`}>Volver</Link></div>}
              </>
            </>
             
            :<Location item={item} />

            }

        </>
    )
}

export {Item}