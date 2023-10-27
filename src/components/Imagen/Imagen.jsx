
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const Imagen =()=>{
    const {id}= useParams();
    const [imagen,setImagen]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    const [bytes,setBytes]=useState(null)
    let [num,setNum]=useState(1)

    const siguienteImg=()=>{
      setNum(num+1)

  }

  const eliminarImg=async()=>{
    
    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}/imagenes/${num}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    })
    const data = await response.json()
    console.log(data)
    setMensaje(data.msj)



}

    useEffect(() => { 
      
      console.log("entre al usefec, img 1")
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}/imagenes/${num}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {
          if (data.msj){
            
            setMensaje(data.msj)
            }else{
              
            setBytes(data.datosImagen)
            }
       
        })
        
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })

    },[num])
    return( 
        <>
            {!mensaje? <>
            (<div className="tarjetaProducto">
                <h1>Imagen N°{num}</h1>
                <img src={`data:image/jpeg;base64,${bytes}`} alt="" />
                <button onClick={()=>eliminarImg()} className="btn btn-primary">Eliminar imagen</button>
            </div>
            <>
            <button onClick={()=>siguienteImg()} className="btn btn-primary">Siguiente imagen</button>
            </>)</>
            
            :<Mensaje msj={mensaje} />
            }
            <Link to={`/reclamos`}>Volver</Link>
        </>
    )
}

export {Imagen}