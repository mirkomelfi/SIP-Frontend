import { ContainerDetail } from "../ContainerDetail/ContainerDetail";

const ContainerList = ({listaContainers})=>{

    return (
        <>
           {listaContainers&&
           
            <div className="contenedorProductos">
                {listaContainers.map(container => <ContainerDetail key={container.id} container={container} />)}
            </div>
            }
        </>
    )
}
export  {ContainerList}