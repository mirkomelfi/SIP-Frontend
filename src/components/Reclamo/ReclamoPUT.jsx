import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getToken } from "../../utils/auth-utils"

export const ReclamoPut = () => {

    const {id}= useParams();

    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const reclamo = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        if (reclamo.descripcion==""){reclamo.descripcion=null;}

        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/reclamos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify(reclamo)
        })

        const data = await response.json()
        setMensaje(data.msj)
            
        e.target.reset() //Reset form
            
        }

    return (

        <div>
            {!mensaje?(
                
                <div className="container divForm" >
                    <h2>Cambio en los datos del Reclamo</h2>
                    <h3>Ingrese solo los campos que desea modificar</h3>
                    <form onSubmit={consultarForm} ref={datForm}>

                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label">Descripcion</label>
                            <input type="text" className="form-control" name="descripcion" required/>
                        </div>

                        <button type="submit" className="btn btn-primary">Actualizar</button>
                        </form>

                    </div>
                ):    <Mensaje msj={mensaje} />
                    
        }
         <Link to={`/reclamos/${id} `}>Volver</Link>
        </div>
        
    )
}