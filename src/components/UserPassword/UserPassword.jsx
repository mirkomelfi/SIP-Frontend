import { useRef } from "react"
import { useState,useEffect } from "react"
import { Navigate } from "react-router-dom"
import { Mensaje } from "../Mensaje/Mensaje"
import { Link } from "react-router-dom"
export const UserPassword = ({emailll}) =>{

    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef()

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()
        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        if (!cliente.email){
            setMensaje("faltan datos")
        }
       
        else{

            const response =  await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/session/passwordRecovery`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente),
                credentials:"include"
            })
            const data = await response.json()

            if(response.status == 200) {
                setMensaje(data.message)
     
            } else {

                if (response.status==401){
                    setMensaje(data.message)
                }

            }

            e.target.reset() //Reset form
        }
    }
    return (
        <>
        {!mensaje?
            <div className="container divForm" >
                <h3>Formulario de Cambio de Contraseña</h3>
                <form onSubmit={consultarForm} ref={datForm}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" />
                    </div>

                    <button type="submit" className="btn btn-primary">Solicitar cambio</button>
                </form>

            </div>
            :
            <Mensaje msj={mensaje} />}
        </>
   
    );
  }
  