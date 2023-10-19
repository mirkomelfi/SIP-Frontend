import "./User.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const User =()=>{
    const {dni}= useParams();
    console.log("Userdni",dni)
    const [user,setUser]= useState([]);
    console.log(user)
    const [loading,setLoading]= useState(true);


    const [mensaje,setMensaje]=useState(null)

    const eliminar=async()=>{
        console.log(dni)
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/users/${dni}`, {
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
        var url=``;
        if (dni){
            url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/users/${dni}`
        }else{
            url=`${process.env.REACT_APP_DOMINIO_BACK}/myProfile`
        }
        fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {
          setUser(data)
          console.log(user)

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])
    return(
        <>
            {!mensaje?(<div className="tarjetaProducto">
            <h1>DNI: {user.dni}</h1>
                <h2>Nombre de user: {user.username}</h2>
                <h2>Nombre: {user.nombre}</h2>
                <h2>Apellido: {user.apellido}</h2>
                {dni?<Link to={`/updateUser/${dni}`}>Modificar</Link>:<Link to={`/updateUser`}>Modificar</Link>}
                {dni&&<button onClick={()=>eliminar()} className="btn btn-primary">Eliminar</button>}
            </div>):(<Mensaje msj={mensaje} />)}
            {dni?<Link to={`/users`}>Volver</Link>:<Link to={`/`}>Volver</Link>}
        </>
    )
}

export {User}