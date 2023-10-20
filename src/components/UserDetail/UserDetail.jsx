import "./UserDetail.css";
import {Link} from "react-router-dom";

const UserDetail =({user})=>{
    console.log("vUserDetail",user)
    return(
        <>
            <div className="tarjetaProducto">
                <h1>Usuario N°: {user.id}</h1>
                <h2>Apellido: {user.surname}</h2>
                <Link to={`${user.id}`}>Ver usuario</Link>  
            </div>
        </>
    )
}

export {UserDetail}