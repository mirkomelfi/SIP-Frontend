import "./User.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken, validateRol } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const User =()=>{
    const {idUser}= useParams();
    console.log("Userdni",idUser)
    const [user,setUser]= useState([]);
    console.log(user)
    const [loading,setLoading]= useState(true);


    const [mensaje,setMensaje]=useState(null)

    const ejecutarFetch = async() =>{
        var url=``;
        if (idUser){
            url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/users/${idUser}`
        }else{
            url=`${process.env.REACT_APP_DOMINIO_BACK}/profile`
        }

        const response= await  fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }  
        })

        const rol=validateRol(response)
        if (!rol){
            setMensaje("No posee los permisos necesarios")
        }else{
            const data = await response.json()
            if (data.msj){
                setMensaje(data.msj)
            }else{
                setUser(data)
            }
        }
      }

    const eliminar=async()=>{
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/users/${idUser}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        })
        const rol=validateRol(response)
        if (!rol){
          setMensaje("No posee los permisos necesarios")
        }else{
            const data = await response.json()
            setMensaje(data.msj)
        }

  
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
            {!mensaje?(<div className="tarjetaProducto">
            <h1>Numero de usuario: {user.id}</h1>
                <h2>Nombre de usuario: {user.username}</h2>
                <h2>Nombre: {user.name}</h2>
                <h2>Apellido: {user.surname}</h2>
                {idUser?<Link to={`/updateUser/${idUser}`}>Modificar</Link>:<Link to={`/updateUser`}>Modificar</Link>}
                {idUser&&<button onClick={()=>eliminar()}>Eliminar</button>}
            </div>):(<Mensaje msj={mensaje} />)}
            {idUser?<Link to={`/users`}>Volver</Link>:<Link to={`/`}>Volver</Link>}
        </>
    )
}

export {User}