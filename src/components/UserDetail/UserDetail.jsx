import "./UserDetail.css";
import {Link, useNavigate} from "react-router-dom";

const UserDetail =({user})=>{
    console.log("vUserDetail",user)
const navigate=useNavigate()

    const navigateTo=(url)=>{
        navigate(url)
      }

    return(
        <>
            <div className="tarjetaProducto">
                <h1>Usuario N°: {user.id}</h1>
                <h2>Nombre de usuario: {user.username}</h2>
                <button class="button btnPrimary" onClick={()=>navigateTo(`${user.id}`)}><span class="btnText">Ver usuario</span></button>
            </div>
        </>
    )
}

export {UserDetail}