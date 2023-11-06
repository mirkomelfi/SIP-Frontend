import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getToken, isRolUser, validateRol } from "../../utils/auth-utils"

export const ContainerPut = () => {

    const {idSec,idCont}= useParams();

    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form
    const navigate= useNavigate()

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const container = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        if (container.name==""){container.name=null;}
        if (container.description==""){container.description=null;}
        if (!container.name&&!container.description){ setMensaje("No se ingresaron valores para actualizar")}
        else{
            const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/containers/${idCont}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(container)
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
                if (data.msj){
                    setMensaje(data.msj)
                }
        }
                
            e.target.reset() //Reset form
                
            }
        }

    return (

        <div>
            {!mensaje?(
                
                <div className="container divForm" >
                    <h2>Cambio en los datos del Container</h2>
                    <h3>Ingrese solo los campos que desea modificar</h3>
                    <form onSubmit={consultarForm} ref={datForm}>
                    <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="name"  />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripcion</label>
                            <input type="text" className="form-control" name="description" />
                        </div>

                        <button type="submit" className="btn btn-primary">Actualizar</button>
                        </form>

                    </div>
                ):    <Mensaje msj={mensaje} />
                    
        }
         <Link to={`/sectors/${idSec}/containers/${idCont}`}>Volver</Link>
        </div>
        
    )
}