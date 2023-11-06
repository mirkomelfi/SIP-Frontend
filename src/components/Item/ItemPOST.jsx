import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getToken, validateRol } from "../../utils/auth-utils"
import { ItemFilter } from "./ItemFilter"
import { Item } from "./Item"

export const ItemPost = () => {

    const {idItem,idCont}= useParams();
    console.log(idItem,idCont)
    const [mensaje,setMensaje]=useState(null)
    const [itemCreated,setItemCreated]=useState(null)
    const [goBack,setGoBack]= useState(null);
    const navigate= useNavigate()

    const returnToItem=()=>{
        setGoBack(true)
    }



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
        const rol=validateRol(response)
        if (!rol){
            navigate("/login")
        }else{
            const data = await response.json()
            if (data.msj){
                setMensaje(data.msj)
            }else{
                setItemCreated(data)
            }
        }

            
        e.target.reset() //Reset form
            
        }
        

    return (

        <div>
            {!goBack?
                !mensaje?
                    !itemCreated ?
                    <>
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

                            <button type="submit" className="btn-red">Crear</button>
                            </form>
                        <button onClick={()=>returnToItem()} className="btn-red">Volver</button>
                        </div>
                    </>
                    :
                    <>
                    <h2>Item creado correctamente. Agregue una imagen si lo desea.</h2>
                    <Link to={`/items/${itemCreated.id}`}>Ver item creado</Link>
                    </>
                :<Mensaje msh={mensaje} />// en vez de mensaje le pongo el ITEM y le mando la props fromPost={true}
            :<ItemFilter/>
                    
        }
        </div>
        
    )
}