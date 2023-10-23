import React from "react";
import { useState, useEffect } from "react";
import {useParams,Link} from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { getToken } from "../../utils/auth-utils";
import { ItemPost } from "../Item/ItemPOST";
import { Mensaje } from "../Mensaje/Mensaje";
import { ItemLocation } from "../Item/ItemLocation";
import { ItemFilter } from "../Item/ItemFilter";


const ItemListContainer = ({greeting,filter}) =>{

    const {idSec,idCont}= useParams();

    const [listaItems,setListaItems]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]= useState(null);
    const [add,setAdd]= useState(false);
    const [error,setError]= useState(null);
    const [goBack,setGoBack]= useState(null);

    const returnToItem=()=>{
        setGoBack(true)
    }

    const agregar= () =>{ 
      setAdd(true)
    }

    useEffect(() => { 
      let url=``
      if (idCont){
        url=`${process.env.REACT_APP_DOMINIO_BACK}/containers/${idCont}`
      }else{
        url=`${process.env.REACT_APP_DOMINIO_BACK}/items/filter?query=${filter}`
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
            if (items.length==0){
              setMensaje(`No hay items cargados en el contenedor ${idCont}`)
            }else{
              setListaItems(items)
            }
          }else{
            if (data.msj){
              setError(true)
              setMensaje(data.msj)
            }else{
              setListaItems(data)
            }
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
          !error ?
            !goBack ?
              !add ?
              (<>
                <h1 className="greeting">{greeting}</h1>
                <button onClick={()=>agregar()} className="btn btn-primary">Agregar Item</button>
                {listaItems.length!=0?<ItemList listaItems={listaItems}/>:<Mensaje msj={mensaje} />}
              </>)
              :(<ItemPost/>)
            :<ItemFilter/>
          : <Mensaje msj={mensaje} />
        }
          {idSec&&<Link to={`/sectors/${idSec}/containers/${idCont}`}>Volver</Link>}
       {   //<Link to={`/`}>Volver</Link>
       }
          {!goBack&&!idSec&&<button onClick={()=>returnToItem()} className="btn btn-primary">Volver</button>}
          

        </>
    );
  } 
  
export default ItemListContainer;