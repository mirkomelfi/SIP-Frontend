import React from "react";
import { useState, useEffect } from "react";
import {useParams,Link} from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { getToken } from "../../utils/auth-utils";
import { ItemPost } from "../Item/ItemPOST";


const ItemListContainer = ({greeting}) =>{

    const {id}= useParams();

    const [listaItems,setListaItems]= useState([]);
    const [loading,setLoading]= useState(true);
    const [add,setAdd]= useState(false);

    const agregar= () =>{ 
      setAdd(true)
    }

    useEffect(() => { 
        fetch(`${process.env.REACT_APP_DOMINIO_BACK}/containers/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {
          const items= data.items
          setListaItems(items)

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
            <button onClick={()=>agregar()} className="btn btn-primary">Agregar Item comun</button>
            <ItemList pid={id} listaItems={listaItems}/>
          </>)
          :
          (<ItemPost/>)}
           <Link to={`/containers`}>Volver</Link>

        </>
    );
  } 
  
export default ItemListContainer;