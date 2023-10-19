import "./UserDetail.css";
import {Link} from "react-router-dom";

const UserDetail =({user})=>{
    console.log("vUserDetail",user)
    return(
        <>
            <div className="tarjetaProducto">
                <h1>DNI: {user.dni}</h1>
                <h2>Apellido: {user.apellido}</h2>
                <Link to={`${user.dni}`}>Ver usuario</Link>  
            </div>
        </>
    )
}

export {UserDetail}