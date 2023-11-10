import "./Item.css";
import {Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { deleteToken, getToken, isRolUser, validateRol } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { Location } from "../Location/Location";
import { CodigoQR } from "../CodigoQR/CodigoQR";


const Item =({fromSector,id})=>{
    let {idSec,idCont,idItem}= useParams();
    const actualLocation=window.location.href
    const [item,setItem]= useState([]);
    console.log(item)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null);
    const [locations,setLocations]= useState(null);
    const navigate= useNavigate();
    const [qr,setQr]=useState(undefined);

    const generarQr=async()=>{
        setQr(true)
    }

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
          navigate("/login",{state:{from:actualLocation}} )
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
    const navigateTo=(url)=>{
      navigate(url)
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
            {
            !locations?
            <>{!qr?
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
                {item.image==null?
                <button class="button btnPrimary" onClick={()=>navigateTo(`/addImage/${item.id}`)}><span class="btnText">Agregar imagen</span></button>
                :
                <button class="button btnPrimary" onClick={()=>navigateTo(`/addImage/${item.id}`)}><span class="btnText">Modificar imagen</span></button>
                }
                <button class="button btnPrimary" onClick={()=>navigateTo(`updateItem`)}><span class="btnText">Modificar Item</span></button>
                {<button  class="button btnPrimary" onClick={()=>verLocations()}><span class="btnText">Historial de Locations</span></button>}
                {(item.containerID!=undefined&&item.containerID!=0&&item.containerID!=null&&!idSec)&&
                 <button class="button btnPrimary" onClick={()=>navigateTo(`containers/${item.containerID}`)}><span class="btnText">Ver contenedor</span></button>
                }
                {item.containerID==0||!item.containerID?
                <button class="button btnPrimary" onClick={()=>navigateTo(`locationChange`)}><span class="btnText">Asignar contenedor</span></button>
                :
                !idSec&&
                <button class="button btnPrimary" onClick={()=>navigateTo(`locationChange`)}><span class="btnText">Cambiar contenedor</span></button>
                }
                <button class="button btnPrimary"  onClick={()=>generarQr()}><span class="btnText">Generar QR</span></button>
                <button class="button btnPrimary"  onClick={()=>eliminar()}><span class="btnText">Eliminar</span></button>
                
                </>
                
                ):(<Mensaje msj={mensaje} />)}
                 
              </div> :<CodigoQR url={window.location.href} />}
              <>
                {idSec? 
                <button class="button btnPrimary" onClick={()=>navigateTo(`/sectors/${idSec}/containers/${idCont}/items`)}><span class="btnText">Volver</span></button>
                :
                <button class="button btnPrimary" onClick={()=>navigateTo(`/items`)}><span class="btnText">Volver</span></button>}
              </>
            </>
             
            :<Location item={item} />
           
            }
        </>
    )
}

export {Item}