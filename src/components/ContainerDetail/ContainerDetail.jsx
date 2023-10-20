import "./ContainerDetail.css";
import {Link} from "react-router-dom";

const ContainerDetail =({container})=>{
   
    return(
        <>
            <div className="tarjetaProducto">
                <h1>Container N°{container.id}</h1>
                <h2>Nombre: {container.name}</h2>
                <h2>Descripcion: {container.description}</h2>
                
                <Link to={`${container.id}`}>Ver container</Link>  

            </div>
        </>
    )
}

export {ContainerDetail}