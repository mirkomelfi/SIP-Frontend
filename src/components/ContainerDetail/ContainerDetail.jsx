import "./ContainerDetail.css";
import {Link} from "react-router-dom";

const ContainerDetail =({container})=>{
   
    return(
        <>
            <div className="tarjetaProducto">
                <h1>Container N°{container.id}</h1>
                <h2>Nombre: {container.nombre}</h2>
                <h2>Piso: {container.piso}</h2>
                <h2>Num: {container.numero}</h2>
                
                <Link to={`${container.id}`}>Ver container</Link>  

            </div>
        </>
    )
}

export {ContainerDetail}