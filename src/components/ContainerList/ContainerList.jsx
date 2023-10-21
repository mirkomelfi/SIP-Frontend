import { ContainerDetail } from "../ContainerDetail/ContainerDetail";

const ContainerList = ({listaContainers,isInSector, idItem})=>{
    console.log(isInSector)
    return (
        <>
           {listaContainers&&
           
            <div className="contenedorProductos">
                {listaContainers.map(container => <ContainerDetail key={container.id} container={container} isInSector  idItem={idItem}/>)}
            </div>
            }
        </>
    )
}
export  {ContainerList}