import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { deleteToken, getToken, isRolUser, validateRol } from "../../utils/auth-utils"

export const SectorPost = () => {

    const {idSec}= useParams();

    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form
    const navigate= useNavigate()
    
    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const sector = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/sectors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify(sector)
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
            }
        }
            
        e.target.reset() //Reset form
            
        }

    const navigateTo=(url)=>{
        navigate(url)
        }

    return (

        <div>
            {!mensaje?(
                
                <div className="container divForm" >
                    <h2>Creacion de Sector</h2>
                    <form onSubmit={consultarForm} ref={datForm}>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="name" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripcion</label>
                            <input type="text" className="form-control" name="description" required/>
                        </div>

                        <button type="submit" class="button btnPrimary"><span class="btnText">Crear</span></button>
                        </form>

                    </div>
                ):    <Mensaje msj={mensaje} />
                    
        }
         <button class="button btnPrimary" onClick={()=>navigateTo(`/sectors`)}><span class="btnText">Volver</span></button>
        </div>
        
    )
}