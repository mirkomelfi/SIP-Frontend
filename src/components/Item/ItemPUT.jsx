import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getToken } from "../../utils/auth-utils"

export const ItemPut = () => {

    const {idSec,idCont,idItem}= useParams();

    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const item = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        
        if (item.description==""){item.description=null;}
        if (item.name==""){item.name=null;}
        if (!item.description&&!item.name){ setMensaje("No se ingresaron valores para actualizar")}
        else{
            const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(item)
            })

            const data = await response.json()
            setMensaje(data.msj)
                
            e.target.reset() //Reset form
                
            }
        }

    return (

        <div>
            {!mensaje?(
                
                <div className="container divForm" >
                    <h2>Cambio en los datos del Item</h2>
                    <h3>Ingrese solo los campos que desea modificar</h3>
                    <form onSubmit={consultarForm} ref={datForm}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="name" />
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
       { !idSec?<Link to={`/items/${idItem}`}>Volver</Link>:
       <Link to={`/sectors/${idSec}/containers/${idCont}/items/${idItem}`}>Volver</Link>
       }
        </div>
        
    )
}