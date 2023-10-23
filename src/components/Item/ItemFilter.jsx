import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { Link } from "react-router-dom"
import { getToken } from "../../utils/auth-utils"
import ItemListContainer from "../ItemListContainer/ItemListContainer"
import { ItemPost } from "./ItemPOST"

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

        setItemName(item.name)
        console.log(e)
        e.target.reset() //Reset form
                
        }

    return (

        <div>
            {!add ?
            
            !itemName?(
                <>
                <div className="container divForm" >
                    <h2>Listado de Items</h2>
                    <h3>Si ingresa un nombre, se filtrara por nombre. Sino se visualizaran todos los items</h3>
                    <form onSubmit={consultarForm} ref={datForm}>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="name" />
                        </div>

                        <button type="submit" className="btn btn-primary">Buscar</button>
                        </form>

                    </div>
                    <div >
                        <h1 className="greeting">Agreado de Items</h1> 
                        <button onClick={()=>agregar()} className="btn btn-primary">Agregar Item</button>
                    </div >
                    </>
                ):    <ItemListContainer filter={itemName}  greeting="Listado de Items" />
                :(<ItemPost/>)
                    
        }
       
        </div>
        
    )
}