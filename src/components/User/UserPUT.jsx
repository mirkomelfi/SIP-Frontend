import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getToken, isRolUser, validateRol } from "../../utils/auth-utils"

export const UserPut = () => {

    const {idUser}= useParams();

    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const navigate= useNavigate()
    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        if (cliente.name==""){cliente.name=null;}
        if (cliente.surname==""){cliente.surname=null;}
        if (cliente.username==""){cliente.username=null;}
        if (cliente.password==""){cliente.password=null;}
        if (!cliente.name&&!cliente.surname&&!cliente.username&&!cliente.password){ setMensaje("No se ingresaron valores para actualizar")}
        else{
            var url=``;
            if (idUser){
                url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/users/${idUser}`
            }else{
                url=`${process.env.REACT_APP_DOMINIO_BACK}/updateProfile`
            }

            const response= await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(cliente)
            })
            
            const rol=validateRol(response)
            if (!rol){
                if (isRolUser(getToken())){
                  console.log("rol user")
                    setMensaje("No posee los permisos necesarios")
                }else{
                    navigate("/login")
                }
            }else{
                const data = await response.json()
                if (data.msj){
                    setMensaje(data.msj)
                }
            }
                
            e.target.reset() //Reset form
                
            }
        }

    return (

        <div>
            {!mensaje?(
                
                <div className="container divForm" >
                    <h2>Cambio en los datos del User</h2>
                    <h3>Ingrese solo los campos que desea modificar</h3>
                    <form onSubmit={consultarForm} ref={datForm}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label">Apellido</label>
                            <input type="text" className="form-control" name="surname" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nombre de User</label>
                            <input type="text" className="form-control" name="username" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" name="password" />
                        </div>

                        <button type="submit" className="btn-red">Actualizar</button>
                        </form>

                    </div>
                ):    <Mensaje msj={mensaje} />
                    
        }
        {idUser?<Link to={`/users`}>Volver</Link>:<Link to={`/user/current`}>Volver</Link>}
        </div>
        
    )
}