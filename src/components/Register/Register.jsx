import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteToken, getToken, isRolUser, validateRol } from "../../utils/auth-utils"

export const Register = () => {

    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form
    const navigate= useNavigate()
    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        if (!cliente.username||!cliente.password){

            setMensaje("faltan datos")
        }
       
        else{

            const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(cliente)
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
                setMensaje(data.msj)
            }
                
            e.target.reset() //Reset form
        }
    }

    
    const navigateTo=(url)=>{
        navigate(url)
      }
      
    return (
        <div>
            {!mensaje?(
        <>
        <div className="container divForm" >
            <h3>Formulario de registro</h3>
            <form onSubmit={consultarForm} ref={datForm}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="surname" className="form-label">Apellido</label>
                    <input type="text" className="form-control" name="surname" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                    <input type="text" className="form-control" name="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="password" />
                </div>

                <button type="submit" class="button btnPrimary" >Registrar</button>
                </form>

            </div>
        </>):<><Mensaje msj={mensaje} /></>
        }
        <button class="button btnPrimary" onClick={()=>navigateTo(`/users`)}><span class="btnText">Volver</span></button>
        </div>
    )
}