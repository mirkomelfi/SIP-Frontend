import { useRef } from "react"
import { useState,useEffect } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { Mensaje } from "../Mensaje/Mensaje"
import { Link } from "react-router-dom"
import { deleteToken, extractUrl, getToken, setToken } from "../../utils/auth-utils"
import "./Login.css"
export const Login = () => {
    
    const[ loggeado,setLoggeado]=useState(false)
    const[ error,setError]=useState(false)
    const [mensaje,setMensaje]=useState(null)
    const navigate=useNavigate()
    const {state}=useLocation();
    console.log(state,"state")
    const datForm = useRef()

    const consultarLoggeo=async()=>{
        const token= getToken();
        console.log("token",token)

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
        console.log(cliente)
        if (!cliente.username||!cliente.password){
            console.log(cliente)
            setError(true)
            setMensaje("Faltan ingresar datos para el Login")
        }
       
        else{

            const response =  await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente)
            })

            const data=await response.json();
            console.log(data.msj)
            if(response.status == 200) {
                setError(false)
                setLoggeado(true)
                setToken(data.token)
                if (state==null||!state){
                    navigate("/")
                }else{
                    const url=`${state.from}`
                    console.log(url)
                    navigate(extractUrl(url))
                }
     
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

    
    const navigateTo=(url)=>{
        navigate(url)
      }
    
    return (

        <div>
            {!error?(
        <>{
            <div className="container divForm" >
                <h3>Formulario de Inicio de Sesion</h3>
                <form onSubmit={consultarForm} ref={datForm}>

                    <div className="input-form">
                        <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                        <input type="username" className="form-control" name="username" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" name="password" />
                    </div>

                    {!loggeado&&<button type="submit" class="button btnPrimary" >Iniciar Sesion</button>}
                </form>
                {loggeado&&<button class="button btnPrimary" onClick={()=>desloggear()}><span class="btnText">Cerrar sesion</span></button>}
                {loggeado&& <button class="button btnPrimary" onClick={()=>navigateTo(`/`)}><span class="btnText">Menu principal</span></button>
        }
            </div>}
        </>): 
            <>
                <Mensaje msj={mensaje}/>
                <button class="button btnPrimary"  onClick={()=>navigateTo(`/`)}><span class="btnText">Volver a Login</span></button> </>
        }
        </div>
    )
}