import React from "react";
import { Navigate, useNavigate, useParams} from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { useState,useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import { deleteToken, getToken, validateRol } from "../../utils/auth-utils";

const ImagenPost = () =>{ 

    const {idItem}= useParams();
    console.log("ImagenPost",idItem)
    const [mensaje,setMensaje]=useState(null)
    const navigate=useNavigate()
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const imagen = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple


        let img=new FormData();
        img.append("archivo",imagen.imagen)

        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/items/${idItem}/updateImage`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            body: img
        })
        const rol=validateRol(response)
        if (!rol){
            deleteToken()
            navigate("/login")
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
                    <h2>Cargado de Imagen</h2>
                    <form onSubmit={consultarForm} ref={datForm}>
                        
                        <div className="mb-3">
                            <label htmlFor="imagen" className="form-label">Imagen</label>
                            <input type="file" className="form-control" name="imagen" required />
                        </div>

                        <button type="submit" className="btn-red">Cargar imagen</button>
                        </form>

                    </div>
                ):    <Mensaje msj={mensaje} />
                    
        }
        <button class="button btnPrimary" onClick={()=>navigateTo(`/items/${idItem}`)}><span class="btnText">Volver</span></button>
        </div>
        
    )
}
  
export default ImagenPost;