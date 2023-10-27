import "./ItemDetail.css";
import {Link} from "react-router-dom";

const ItemDetail =({item})=>{
    console.log(item)
    return(
        <>
            <div className="tarjetaProducto">
                <h1>Item N°{item.id}</h1>
                <h2>Nombre: {item.name}</h2>
                {item.image!=null&&<img src={`data:image/jpeg;base64,${item.image.imageData}`} alt="" />}
                <h2>Descripcion: {item.description}</h2>
                {item.containerID==0||!item.containerID?
                <h2>No se encuentra en ningun contenedor</h2>
                :
                <h2>Se encuentra en contenedor: {item.containerID}</h2>}
                
                <Link to={`${item.id}`}>Ver item</Link>  

            </div>
        </>
    )
}

export {ItemDetail}