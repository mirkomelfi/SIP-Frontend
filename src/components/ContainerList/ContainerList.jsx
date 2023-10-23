import { ContainerDetail } from "../ContainerDetail/ContainerDetail";

const ContainerList = ({listaContainers,isInSector, idItem})=>{

    return (
        <>
           {listaContainers&&
           
            <div className="contenedorProductos">
                {listaContainers.map(container => <ContainerDetail key={container.id} container={container} isInSector={isInSector} idItem={idItem}/>)}
            </div>
            }
        </>
    )
}
export  {ContainerList}