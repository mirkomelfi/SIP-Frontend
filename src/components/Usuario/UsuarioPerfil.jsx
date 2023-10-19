import "./Usuario.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const UsuarioPerfil =()=>{
    console.log("Usuariodni",dni)
    const [usuario,setUsuario]= useState([]);
    console.log(usuario)
    const [loading,setLoading]= useState(true);

    const [mensaje,setMensaje]=useState(null)

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/usuarios/miperfil`, {
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
                setUsuario(data)
            }

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])
    return(
        <>
            <h1>Mi perfil</h1>
            {!mensaje?(<div className="tarjetaProducto">
            <h1>DNI: {usuario.dni}</h1>
                <h2>Nombre de usuario: {usuario.username}</h2>
                <h2>Nombre: {usuario.nombre}</h2>
                <h2>Apellido: {usuario.apellido}</h2>
                <Link to={`/updateUsuario`}>Modificar</Link>
            </div>):(<Mensaje msj={mensaje} />)}
            <Link to={`/home`}>Volver</Link>
        </>
    )
}

export {UsuarioPerfil}