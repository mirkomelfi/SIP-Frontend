import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getToken } from "../../utils/auth-utils"

export const ReclamoEstado = () => {

    const {id}= useParams();

    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const reclamo = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        console.log(reclamo)

        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/reclamos/${id}/estado/${reclamo.estado}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: reclamo.medida
        })

        const data = await response.json()
        setMensaje(data.msj)
            
        e.target.reset() //Reset form
            
        }

    return (

        <div>
            {!mensaje?(
                
                <div className="container divForm" >
                    <h2>Cambio en el Estado del Reclamo</h2>
                    <form onSubmit={consultarForm} ref={datForm}>

                        <div className="mb-3">
                            <label htmlFor="estado" className="form-label">N° Estado</label>
                            <input type="number" className="form-control" name="estado" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="medida" className="form-label">Medida tomada</label>
                            <input type="text" className="form-control" name="medida" required/>
                        </div>

                        <button type="submit" className="btn btn-primary">Actualizar</button>
                        </form>

                    </div>
                ):    <Mensaje msj={mensaje} />
                    
        }
        </div>
        
    )
}