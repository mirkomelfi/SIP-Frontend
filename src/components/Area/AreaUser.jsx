import "./Area.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { ReclamoPost } from "../Reclamo/ReclamoPOST";

const AreaUser =()=>{
    const {id}= useParams();

    const [area,setArea]= useState([]);
    console.log(area)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    const [add,setAdd]=useState(null)

     const generarReclamo= ()=>{
        setAdd(true)
    }

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/areas/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {
          setArea(data)
          console.log(area)

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
                <h1>Area N°{area.id}</h1>
                <h2>Nombre: {area.nombre}</h2>
                <h2>piso {area.piso}</h2>
                <h2>numero {area.descripcion}</h2>
                <button onClick={()=>generarReclamo()} className="btn btn-primary">Generar reclamo</button>
                
            </div>)
            :
            (<ReclamoPost isUnit={false} />)
        }
            <Link to={`/usuario/areas`}>Volver</Link>
        </>
    )
}

export {AreaUser}