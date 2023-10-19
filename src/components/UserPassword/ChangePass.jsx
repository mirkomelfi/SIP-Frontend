import { useRef } from "react"
import { useState } from "react"
import { Mensaje } from "../Mensaje/Mensaje"

export const ChangePass = () => {
    
    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef()

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()
        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
       
        if (!cliente.email||!cliente.password){
            setMensaje("Faltan datos")
        }
       
        else{

            const response =  await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/session/newPass`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente),
                credentials: "include"
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

        <div>
            {!mensaje?(
        
            <div className="container divForm" >
                <h3>Formulario de Cambio de Contraseña</h3>
                <form onSubmit={consultarForm} ref={datForm}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" name="password" />
                    </div>

                    <button type="submit" className="btn btn-primary">Cambiar contraseña</button>
                </form>
            </div>
        ):<Mensaje msj={mensaje} />
        }
        </div>
    )
}