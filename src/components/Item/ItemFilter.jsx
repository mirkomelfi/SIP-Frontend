import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getToken } from "../../utils/auth-utils"
import ItemListContainer from "../ItemListContainer/ItemListContainer"
import { ItemPost } from "./ItemPOST"
import "./Item.css";
import CreateButton from "../../utils/CreateButton/CreateButton"

export const ItemFilter = () => {

    const [itemName, setItemName] = useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form
    const navigate = useNavigate()


    const consultarForm = async (e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const item = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        if (item.query == "") {
            setItemName(" ")
        } else {
            setItemName(item.query)
        }

        console.log(e)
        e.target.reset() //Reset form

    }

    const navigateTo = (url) => {
        navigate(url)
    }

    return (

        <div>
            {
                 !itemName?(
            <>
                <div className="container divForm" >
                    <h2>Listado de Items</h2>
                    <form onSubmit={consultarForm} ref={datForm}>

                        <div className="mb-3">
                            <label htmlFor="query" className="form-label">Nombre/Descripcion</label>
                            <input type="text" className="form-control" name="query" />
                        </div>

                        <button type="submit" class="button btnPrimary" >Buscar</button>
                    </form>

                </div>
                <button class="button btnPrimary" onClick={() => navigateTo(`/`)}><span class="btnText">Volver</span></button>
                <CreateButton onClick={() => navigate("/items/create")}/>
            </>
            ):    <ItemListContainer filter={itemName} greeting="Listado de Items" />
            }
        </div>

    )
}