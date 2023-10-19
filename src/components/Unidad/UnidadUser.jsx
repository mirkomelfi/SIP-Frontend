import "./Unidad.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { ReclamoPost } from "../Reclamo/ReclamoPOST";

const UnidadUser =()=>{
    const {id}= useParams();

    const [unidad,setUnidad]= useState([]);
    console.log(unidad)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    const [add,setAdd]=useState(null)

     const generarReclamo= ()=>{
        setAdd(true)
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
        {!add?

            (<div className="tarjetaProducto">
                <h1>Unidad N°{unidad.id}</h1>
                <h2>Nombre: {unidad.nombre}</h2>
                <h2>piso {unidad.piso}</h2>
                <h2>numero {unidad.numero}</h2>
                <h2>estado {unidad.estado}</h2>
                <button onClick={()=>generarReclamo()} className="btn btn-primary">Generar reclamo</button>
                
            </div>)
            :
            (<ReclamoPost isUnit={true} />)
        }
            <Link to={`/usuario/unidades`}>Volver</Link>
        </>
    )
}

export {UnidadUser}