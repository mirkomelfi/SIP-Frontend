import { useRef } from "react"
import { useState,useEffect } from "react"
import { Navigate } from "react-router-dom"
import { Mensaje } from "../Mensaje/Mensaje"
import { Link } from "react-router-dom"
import { deleteToken, getToken, setToken } from "../../utils/auth-utils"
export const Logout = () => {
    

    const [mensaje,setMensaje]=useState(null)

    const desloggear=async()=>{
        deleteToken()
        setMensaje("Sesion cerrada con exito")
    }

    useEffect(() => { 
        desloggear()
    },[])
    
    return (

        <div className="tarjetaProducto">
            <Mensaje msj={mensaje} />
            <Link to="/login">Inicio de Sesion</Link>
        </div>
    )
}    