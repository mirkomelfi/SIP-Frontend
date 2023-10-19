import "./UnidadDetail.css";
import {Link} from "react-router-dom";

const UnidadDetail =({unidad})=>{
    console.log(unidad)
    
    return(
        <>
            <div className="tarjetaProducto">
                <h1>Unidad N°{unidad.id}</h1>
                <h2>Nombre: {unidad.nombre}</h2>
                <h2>Piso: {unidad.piso}</h2>
                <h2>Num: {unidad.numero}</h2>
                
                <Link to={`${unidad.id}`}>Ver unidad</Link>  

            </div>
        </>
    )
}

export {UnidadDetail}