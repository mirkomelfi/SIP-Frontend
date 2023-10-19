import React from "react";
import { useState, useEffect } from "react";
import {useParams,Link} from "react-router-dom";
import { AreaList } from "../AreaList/AreaList";
import { getToken } from "../../utils/auth-utils";
import { AreaPost } from "../Area/AreaPOST";


const AreaListContainer = ({greeting}) =>{

    const {id}= useParams();

    const [listaAreas,setListaAreas]= useState([]);
    const [loading,setLoading]= useState(true);
    const [add,setAdd]= useState(false);

    const agregar= () =>{ 
      setAdd(true)
    }

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/edificios/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {
          const areas= data.areasComunes
          setListaAreas(areas)

        })
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    },[])

    return (
        <>
          {loading 
          ? 
          <p>Cargando...</p> 
          : 
          !add ?
          (<>
            <h1 className="greeting">{greeting}</h1>
            <button onClick={()=>agregar()} className="btn btn-primary">Agregar Area comun</button>
            <AreaList pid={id} listaAreas={listaAreas}/>
          </>)
          :
          (<AreaPost/>)}
           <Link to={`/edificios`}>Volver</Link>

        </>
    );
  } 
  
export default AreaListContainer;