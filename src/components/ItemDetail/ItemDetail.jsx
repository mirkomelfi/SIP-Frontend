import "./ItemDetail.css";
import {Link, useNavigate} from "react-router-dom";

const ItemDetail =({item})=>{
    console.log(item)
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }
  
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
                
                <button class="button btnPrimary" onClick={()=>navigateTo(`${item.id}`)}><span class="btnText">Ver item</span></button>
                    
            </div>
        </>
    )
}

export {ItemDetail}