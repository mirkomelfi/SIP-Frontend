import { useRef } from "react"
import { useState,useEffect } from "react"
import { Navigate } from "react-router-dom"
import { Mensaje } from "../Mensaje/Mensaje"
import { Link } from "react-router-dom"
import { deleteToken, getToken, setToken } from "../../utils/auth-utils"
export const Login = () => {
    
    const[ loggeado,setLoggeado]=useState(false)
    const[ error,setError]=useState(false)
    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef()

    const consultarLoggeo=async()=>{
        const token= getToken();

        if (token){
            setLoggeado(true);
        }

    }

    useEffect(() => { 
        consultarLoggeo()
    },[])



    const desloggear=async()=>{

        deleteToken()
        setLoggeado(false);

    }


    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()
        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
       
        if (!cliente.username||!cliente.password){
            console.log(cliente)
            setError(true)
            setMensaje("Faltan ingresar datos para el Login")
        }
       
        else{

            const response =  await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente)
            })

            const data=await response.json();
            
            if(response.status == 200) {
                setError(false)
                setLoggeado(true)
                setToken(data.token)
     
            } else {

                if (response.status==401){
                    setError(true)
                    setMensaje("Credenciales invalidas")
                    setLoggeado(false)
                }

            }

            e.target.reset() //Reset form
        }
    }
    
    return (

        <div>
            {!error?(
        <>
            <div className="container divForm" >
                <h3>Formulario de Inicio de Sesion</h3>
                <form onSubmit={consultarForm} ref={datForm}>

                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                        <input type="username" className="form-control" name="username" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" name="password" />
                    </div>

                    {!loggeado&&<button type="submit" className="btn btn-primary" >Iniciar Sesion</button>}
                </form>
                {loggeado&&<button onClick={()=>desloggear()} className="btn btn-primary">Cerrar Sesion</button>}
                {loggeado&&<Link to="/"><button>Volver a Inicio</button></Link>}
                {/*!loggeado&&<Link to="/password"><button>Olvide Mi contraseña</button></Link>*/}
            </div>
        </>):<Mensaje msj={mensaje} />
        }
        </div>
    )
}