import "./User.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const UserProfile =()=>{
    console.log("Userdni",dni)
    const [user,setUser]= useState([]);
    console.log(user)
    const [loading,setLoading]= useState(true);

    const [mensaje,setMensaje]=useState(null)

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/users/miperfil`, {
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
                setUser(data)
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
            <h1>DNI: {user.dni}</h1>
                <h2>Nombre de user: {user.username}</h2>
                <h2>Nombre: {user.nombre}</h2>
                <h2>Apellido: {user.apellido}</h2>
                <Link to={`/updateUser`}>Modificar</Link>
            </div>):(<Mensaje msj={mensaje} />)}
            <Link to={`/home`}>Volver</Link>
        </>
    )
}

export {UserProfile}