import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { Link } from "react-router-dom"
import { getToken } from "../../utils/auth-utils"
import ItemListContainer from "../ItemListContainer/ItemListContainer"
import { ItemPost } from "./ItemPOST"
import "./Item.css";

export const ItemFilter = () => {

    const [itemName,setItemName]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form
    const [add,setAdd]= useState(false);

    const agregar= () =>{ 
      setAdd(true)
    }
    

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const item = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        setItemName(item.query)
        console.log(e)
        e.target.reset() //Reset form
                
        }

    return (

        <div>
            {!add ?
            
            !itemName?(
                <>

                <div>
                    <button onClick={()=>agregar()} className="btn btn-primary">Agregar Item</button>
                </div >

                <div className="container divForm" >
                    <h2>Listado de Items</h2>
                    <h3>Si ingresa un nombre, se filtrara por nombre.
                        <br/>Si ingresa una descripcion, se filtrara por descripcion.
                        <br/> Sino se visualizaran todos los items
                    </h3>
                    <form onSubmit={consultarForm} ref={datForm}>

                        <div className="mb-3">
                            <label htmlFor="query" className="form-label">Nombre/Descripcion</label>
                            <input type="text" className="form-control" name="query" />
                        </div>

                        <button type="submit" className="btn btn-primary">Buscar</button>
                        </form>

                    </div>
                    <Link to={`/`}>Volver</Link>
                    </>
                ):    <ItemListContainer filter={itemName}  greeting="Listado de Items" />
                :(<ItemPost/>)
                    
        }
       
        </div>
        
    )
}