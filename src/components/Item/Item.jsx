import "./Item.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { Location } from "../Location/Location";

const Item =({fromSector,id})=>{
    let {idSec,idCont,idItem}= useParams();

    const [item,setItem]= useState([]);
    console.log(item)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null);
    const [locations,setLocations]= useState(null);

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

    const verLocations=async()=>{
     setLocations(true)
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
               { <button onClick={()=>verLocations()} className="btn btn-primary">Ver historial de locations</button>}
                {(item.containerID!=undefined&&item.containerID!=0&&item.containerID!=null&&!fromSector)&&<Link to={`containers/${item.containerID}`}>Ver contenedor</Link>}
                {item.containerID==0||!item.containerID?
                <Link to={`locationChange`}>Agregar a un contenedor</Link>
                :
                !idSec&&
                <Link to={`locationChange`}>Cambiar de contenedor</Link>
                }
                <button onClick={()=>eliminar()} className="btn btn-primary">Eliminar</button>
                </>
                
                ):(<Mensaje msj={mensaje} />)}
                 
            </div>
            <>
              {idSec?<Link to={`/sectors/${idSec}/containers/${idCont}/items`}>Volver</Link>:<Link to={`/items`}>Volver</Link>}
              </>
            </>
             
            :<Location item={item} />

            }

        </>
    )
}

export {Item}