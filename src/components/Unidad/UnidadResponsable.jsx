import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getToken } from "../../utils/auth-utils"

export const UnidadResponsable = ({responsable}) => {

    const {id}= useParams();

    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const unidad = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/unidades/${id}/${responsable}/${unidad.dni}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        })

        const data = await response.json()
        setMensaje(data.msj)
            
        e.target.reset() //Reset form
            
    }
    

return (

    <div>
        {!mensaje?(
            
            <div className="container divForm" >
                <h2>Cambio en el responsable del Unidad</h2>
                <form onSubmit={consultarForm} ref={datForm}>

                    <div className="mb-3">
                        <label htmlFor="dni" className="form-label">DNI del Responsable a modificar</label>
                        <input type="number" className="form-control" name="dni" required/>
                    </div>

                    <button type="submit" className="btn btn-primary">Actualizar</button>
                    </form>

                </div>
            ):    <Mensaje msj={mensaje} />
                
    }

    </div>
    
)
}