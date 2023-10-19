import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getToken } from "../../utils/auth-utils"

export const UsuarioPut = () => {

    const {dni}= useParams();

    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        if (cliente.nombre==""){cliente.nombre=null;}
        if (cliente.apellido==""){cliente.apellido=null;}
        if (cliente.username==""){cliente.username=null;}
        if (cliente.password==""){cliente.password=null;}
        if (!cliente.nombre&&!cliente.apellido&&!cliente.username&&!cliente.password){ setMensaje("No se ingresaron valores para actualizar")}
        else{
            var url=``;
            if (dni){
                url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`
            }else{
                url=`${process.env.REACT_APP_DOMINIO_BACK}/cambiarPerfil`
            }
            const response= await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(cliente)
            })
            const data = await response.json()
            setMensaje(data.msj)
                
            e.target.reset() //Reset form
                
            }
        }

    return (

        <div>
            {!mensaje?(
                
                <div className="container divForm" >
                    <h2>Cambio en los datos del Usuario</h2>
                    <h3>Ingrese solo los campos que desea modificar</h3>
                    <form onSubmit={consultarForm} ref={datForm}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="nombre" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control" name="apellido" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                            <input type="text" className="form-control" name="username" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" name="password" />
                        </div>

                        <button type="submit" className="btn btn-primary">Actualizar</button>
                        </form>

                    </div>
                ):    <Mensaje msj={mensaje} />
                    
        }
        {dni?<Link to={`/usuarios`}>Volver</Link>:<Link to={`/`}>Volver</Link>}
        </div>
        
    )
}