import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { deleteToken, getToken, validateRol } from "../../utils/auth-utils"
import { ItemFilter } from "./ItemFilter"
import { Item } from "./Item"

export const ItemPost = ({ fromFilter }) => {

    const { idItem, idCont } = useParams();
    const navigate = useNavigate()
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async (e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const item = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        let url = ``

        if (idCont) {
            url = `${process.env.REACT_APP_DOMINIO_BACK}/containers/${idCont}/addItem`;
        } else {
            url = `${process.env.REACT_APP_DOMINIO_BACK}/items`;
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify(item)
        })
        const rol = validateRol(response)
        if (!rol) {
            deleteToken()
            navigate("/login")
        } else {
            const data = await response.json()
            if (data.msj) {
                alert('No se pudo crear el item')
            } else {
                alert('Item creado')
                navigate(-1)
            }
        }


        e.target.reset() //Reset form

    }

    return (
        <div className="container divForm" >
            <h2>Creacion de Item</h2>
            <form onSubmit={consultarForm} ref={datForm}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="name" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripcion</label>
                    <input type="text" className="form-control" name="description" required />
                </div>
                <div className="flex-div">
                    <button type="button" class="button btnPrimary" onClick={() => navigate(-1)} ><span class="btnText">Cancelar</span></button>
                    <button type="submit" class="button btnPrimary"><span class="btnText">Crear</span></button>
                </div>

            </form>
        </div>


    )
}