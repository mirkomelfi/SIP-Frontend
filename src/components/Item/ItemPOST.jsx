import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getToken } from "../../utils/auth-utils"

export const ItemPost = () => {

    const {idItem,idCont}= useParams();
    console.log(idItem,idCont)
    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const item = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        let url=``

        if (idCont){
            url=`${process.env.REACT_APP_DOMINIO_BACK}/containers/${idCont}/addItem`;
        }else{
           url= `${process.env.REACT_APP_DOMINIO_BACK}/items`;
        }

        const response= await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify(item)
        })

        const data = await response.json()
        console.log(data)
        setMensaje(data.msj)
            
        e.target.reset() //Reset form
            
        }
        

    return (

        <div>
            {!mensaje?(
                
                <div className="container divForm" >
                    <h2>Creacion de Item</h2>
                    <form onSubmit={consultarForm} ref={datForm}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="name" required/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripcion</label>
                            <input type="text" className="form-control" name="description" required/>
                        </div>

                        <button type="submit" className="btn btn-primary">Crear</button>
                        </form>

                    </div>
                ):    <Mensaje msj={mensaje} />
                    
        }
        </div>
        
    )
}