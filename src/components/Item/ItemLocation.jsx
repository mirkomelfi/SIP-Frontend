import "./Item.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { useRef } from "react";
import ContainerListContainer from "../ContainerListContainer/ContainerListContainer";

const ItemLocation =()=>{
    const {idItem}= useParams();

    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null);
    const [idCont,setIdCont]=useState(null)
    const [containers,setContainers]=useState(null)

    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const item = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        if (item.idCont){
          setIdCont(item.idCont)
        }
        setContainers(true)
            
      }
      
    return(

        <div>
      {!mensaje?    (!containers)    ?
        
          
        (<div className="container divForm" >
              <h1>Cambio de Location del Item {idItem} </h1>
              <h2>Si no ingresa ningun contenedor, se mostraran todos los posibles para hacer el cambio </h2>
              <form onSubmit={consultarForm} ref={datForm}>

                  <div className="mb-3">
                      <label htmlFor="idCont" className="form-label">Id del nuevo container</label>
                      <input type="text" className="form-control" name="idCont" />
                  </div>

                  <button type="submit" className="btn btn-primary">Ver contenedor/es</button>
                  </form>
                  <Link to={`/items/${idItem}`}>Volver</Link>

              </div>
          )
          
          :<ContainerListContainer fromLoc={true} idContainer={idCont} idItem={idItem} />
          
          :    
          <Mensaje msj={mensaje} />
       
   
  }
  </div>

    )
}

export {ItemLocation}