import "./User.css";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { deleteToken, extractRol, getToken, isRolUser, validateRol } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const User =()=>{
    const {idUser}= useParams();
    console.log("Userdni",idUser)
    const [user,setUser]= useState([]);
    console.log(user)
    const [loading,setLoading]= useState(true);


    
    const navigate= useNavigate()
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
            if (isRolUser(getToken())){
              console.log("rol user")
                setMensaje("No posee los permisos necesarios")
            }else{
                navigate("/login")
            }
        }else{
            const data = await response.json()
            setMensaje(data.msj)
        }

  
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
            {!mensaje?(<div className="tarjetaProducto">
            <h1>Numero de usuario: {user.id}</h1>
                <h2>Nombre de usuario: {user.username}</h2>
                <h2>Nombre: {user.name}</h2>
                <h2>Apellido: {user.surname}</h2>
                {idUser?
                <button class="button btnPrimary" onClick={()=>navigateTo(`/updateUser/${idUser}`)}><span class="btnText">Modificar</span></button>
                :
                <button class="button btnPrimary" onClick={()=>navigateTo(`/updateUser`)}><span class="btnText">Modificar</span></button>
                }
                {idUser&&
                <button class="button btnPrimary" onClick={()=>eliminar()}><span class="btnText">Eliminar</span></button>
                }
            </div>):(<Mensaje msj={mensaje} />)}
            {idUser?
            <button class="button btnPrimary" onClick={()=>navigateTo("/users")}><span class="btnText">Volver</span></button>
            :
            <button class="button btnPrimary" onClick={()=>navigateTo("/")}><span class="btnText">Volver</span></button>}
        </>
    )
}

export {User}