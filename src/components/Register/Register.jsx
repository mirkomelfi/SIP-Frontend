import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { Link } from "react-router-dom"

export const Register = () => {

    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        if (!cliente.username||!cliente.password){

            setMensaje("faltan datos")
        }
       
        else{

            const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente)
            })

            const data = await response.json()

                if(response.status == 200) {
                    setMensaje("Cuenta creada. Fuiste loggeado automaticamente")
        
                } else {

                    if (response.status==401){
                        setMensaje(data.message)
                    }

                }
                
                
            e.target.reset() //Reset form
        }
    }
    return (
        <div>
            {!mensaje?(
        <>
        <div className="container divForm" >
            <h3>Formulario de registro</h3>
            <form onSubmit={consultarForm} ref={datForm}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="nombre" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input type="text" className="form-control" name="apellido" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                    <input type="text" className="form-control" name="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="dni" className="form-label">DNI</label>
                    <input type="number" className="form-control" name="dni" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="password" />
                </div>

                <button type="submit" className="btn btn-primary">Registrar</button>
                </form>

            </div>
        </>):<><Mensaje msj={mensaje} /><Link to="/"><button>Ir a comprar</button></Link></>
        }
        </div>
    )
}