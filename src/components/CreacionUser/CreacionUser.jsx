import { useRef, useState } from "react"
import { Mensaje } from "../Mensaje/Mensaje";

export const CreacionUser = () => {

    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const [boton,setBoton]=useState(null)
    const [addRol,setAddRol]=useState(false)
    const [mensaje,setMensaje]=useState(null)
    const [user,setUser]=useState(null)
    
    const botonSeleccionado= (botonSelec) => {
        setBoton(botonSelec)
        if (botonSelec=="Modificar"){
            setAddRol(true)
        }
        return;
    }

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const userData = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        if (boton=="Visualizar"){
            const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/users/${userData.id_user}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials:"include"
            })
            const data = await response.json()
            if (response.status==200){

                setUser(data)
            }
            if (response.status==400||response.status==401){

                setMensaje(data.message)
            }
            if (response.status==500){

                setMensaje("Error de servidor")
            }


        }
        if (boton=="Modificar"){
            const newRol=userData.rol
            if (!newRol){
                setMensaje("dato invalido")
            }else{
                const modifiedRol= {rol:newRol}
                await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/users/${userData.id_user}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:  JSON.stringify(modifiedRol),
                    credentials:"include"
                }).then(response => response.json())
                    .then(data => {

                        setMensaje(data.message)
                    })
                    .catch(error => console.error(error))
            }
        }
            
        if (boton=="Eliminar"){
            await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/api/users/${userData.id_user}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials:"include"
            }).then(response => response.json())
                .then(data => {

                    setMensaje(data.message)
                })
                .catch(error => console.error(error))
        }

        e.target.reset() //Reset form
        
    }
    return (

        <div className="container divAdmin" >
            <h3>Vista ADMIN</h3>
            <h4>Control de Usuarios</h4>
            {!user?(!mensaje?(boton?
                <div className="container divForm" >
                    <form onSubmit={consultarForm} ref={datForm}>
                        <div className="mb-3">
                            <label htmlFor="id_user" className="form-label">Id del Usuario</label>
                            <input type="text" className="form-control" name="id_user" required />
                        </div>
                        {addRol&&<div className="mb-3">
                            <label htmlFor="id_user" className="form-label">Rol</label>
                            <input type="text" className="form-control" name="rol" required />
                        </div>}
                        <button type="submit"  className="btn btn-primary">Solicitar</button>
                    </form>
                </div>
                :
                <div className="container botones" >
                    <button  onClick={()=>botonSeleccionado("Visualizar")} className="btn btn-primary">Visualizar</button>
                    <button  onClick={()=>botonSeleccionado("Modificar")} className="btn btn-primary">Modificar Rol</button>
                    <button  onClick={()=>botonSeleccionado("Eliminar")} className="btn btn-primary">Eliminar</button>
                </div>
            ):<Mensaje msj={mensaje} />):
            <div className="tarjetaProducto">
                <h2>{user.email}</h2>
                <h2>{user.first_name}</h2>
                <h2>{user.last_name}</h2>
                <h3>{user.rol}</h3>
        </div> }
        </div>

    )
}