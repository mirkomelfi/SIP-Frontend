import React from "react";
import { useState, useEffect } from "react";
import {useParams,Link} from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { getToken } from "../../utils/auth-utils";
import { ItemPost } from "../Item/ItemPOST";


const ItemListContainer = ({greeting}) =>{

    const {idSec,idCont}= useParams();

    const [listaItems,setListaItems]= useState([]);
    const [loading,setLoading]= useState(true);
    const [add,setAdd]= useState(false);

    const agregar= () =>{ 
      setAdd(true)
    }

    useEffect(() => { 
      let url=``
      if (idCont){
        url=`${process.env.REACT_APP_DOMINIO_BACK}/containers/${idCont}`
      }else{
        url=`${process.env.REACT_APP_DOMINIO_BACK}/items`
      }


        fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        .then(response => response.json())
        .then(data => {
          if (idCont){
            const items= data.items
            setListaItems(items)
          }else{
            setListaItems(data)
          }

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
            <button onClick={()=>agregar()} className="btn btn-primary">Agregar Item</button>
            <ItemList listaItems={listaItems}/>
          </>)
          :
          (<ItemPost/>)}
          {idSec?<Link to={`/sectors/${idSec}/containers/${idCont}`}>Volver</Link>:<Link to={`/`}>Volver</Link>}

        </>
    );
  } 
  
export default ItemListContainer;