import React from "react";
import { Navigate, useParams} from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useState,useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";

const ImagenPost = () =>{ 

    const {id}= useParams();

    const url=""

    /*fetchImagen= () =>{ 
    
    }

    useEffect(() => { 
        
    },[])
*/
    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const imagen = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple


        let img=new FormData();
        img.append("archivo",imagen.imagen)

        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}/imagenes`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            body: img
        })

        const data = await response.json()
        setMensaje(data.msj)
            
        e.target.reset() //Reset form
            
        }
        

    return (

        <div>
            {!mensaje?(
                
                <div className="container divForm" >
                    <h2>Cargado de Imagen</h2>
                    <form onSubmit={consultarForm} ref={datForm}>
                        
                        <div className="mb-3">
                            <label htmlFor="imagen" className="form-label">Imagen</label>
                            <input type="file" className="form-control" name="imagen" required />
                        </div>

                        <button type="submit" className="btn btn-primary">Crear</button>
                        </form>

                    </div>
                ):    <Mensaje msj={mensaje} />
                    
        }
         <Link to={`/reclamos`}>Volver</Link>
        </div>
        
    )
}
  
export default ImagenPost;