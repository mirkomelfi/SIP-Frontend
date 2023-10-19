import "./Reclamo.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { ReclamoPost } from "./ReclamoPOST";

const ReclamoUser =()=>{
    const {id}= useParams();

    const [reclamo,setReclamo]= useState([]);
    console.log(reclamo)
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)



    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}`, {
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
                setReclamo(data)
            }
          console.log(reclamo)

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])
    return(
        <>
        {!mensaje?

            (<div className="tarjetaProducto">
               <h1>Reclamo N°{reclamo.id}</h1>
                <h2>Id del Edificio: {reclamo.idEdificio}</h2>
                <h2>Tipo: {reclamo.tipoReclamable}</h2>
                <h2>Id del Reclamable: {reclamo.idReclamable}</h2>

                <h2>Autor del Reclamo: {reclamo.dniUsuario}</h2>
                <h2>Se inicio: {reclamo.fechaDeInicio}</h2>
                
                <h2>Descripcion: {reclamo.descripcion}</h2>
                <Link to={`/addImage/${id}`}>Agregar imagen</Link>
                <Link to={`/verImagenes/${id}`}>Ver imagenes</Link>
            </div>)
            :
            (<Mensaje msj={mensaje} />)
        }
            <Link to={`/usuario/reclamos`}>Volver</Link>
        </>
    )
}

export {ReclamoUser}