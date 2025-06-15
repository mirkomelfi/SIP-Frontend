import {useNavigate} from "react-router-dom";

const ContainerDetail =({container, isInSector})=>{

    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }
  

    return(
        <>

            <div className="tarjetaProducto">
                <h1>Container N°{container.id}</h1>
                <h2>Nombre: {container.name}</h2>
                <h2>Descripcion: {container.description}</h2>

                <button class="button btnPrimary" onClick={()=>navigateTo(`${container.id}`)}><span class="btnText">Ver container</span></button>

            </div>

        </>
    )
}

export {ContainerDetail}