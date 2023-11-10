import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Item } from "../Item/Item";

const Location =({item})=>{
    const [locations,setLocations]= useState([]);
    const [goBack,setGoBack]= useState(null);

    const returnToItem=()=>{
        setGoBack(true)
    }

    console.log(item.changes)
    useEffect(() => { 
       setLocations(item.changes)
    },[])

    return(
        <>

            {!goBack?
            <div className="tarjetaProducto">
                {locations.length!=0?locations.map(location => 
                    <>
                        <h2>Autor: {location.completeName}</h2>
                        <h3>{location.description}</h3>
                    </>
                ):<h2>No hay historial por el momento</h2>}
                <button class="button btnPrimary" onClick={()=>returnToItem()}><span class="btnText">Volver al Item</span></button>
            </div>:
            <Item />
            }


        </>
    )
}

export {Location}