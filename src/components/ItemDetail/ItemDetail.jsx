import "./ItemDetail.css";
import {Link} from "react-router-dom";

const ItemDetail =({item})=>{
    console.log(item)
    return(
        <>
            <div className="tarjetaProducto">
                <h1>Item N°{item.id}</h1>
                <h2>Nombre: {item.name}</h2>
                <h2>Descripcion: {item.description}</h2>
                
                <Link to={`${item.id}`}>Ver item</Link>  

            </div>
        </>
    )
}

export {ItemDetail}