import "./UsuarioDetail.css";
import {Link} from "react-router-dom";

const UsuarioDetail =({usuario})=>{
    console.log("vUsuarioDetail",usuario)
    return(
        <>
            <div className="tarjetaProducto">
                <h1>DNI: {usuario.dni}</h1>
                <h2>Apellido: {usuario.apellido}</h2>
                <Link to={`${usuario.dni}`}>Ver usuario</Link>  
            </div>
        </>
    )
}

export {UsuarioDetail}