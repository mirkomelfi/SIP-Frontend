import "./AreaDetail.css";
import {Link} from "react-router-dom";

const AreaDetail =({area})=>{
    console.log(area)
    return(
        <>
            <div className="tarjetaProducto">
                <h1>Area N°{area.id}</h1>
                <h2>Nombre: {area.nombre}</h2>
                <h2>Piso: {area.piso}</h2>
                
                <Link to={`${area.id}`}>Ver area</Link>  

            </div>
        </>
    )
}

export {AreaDetail}