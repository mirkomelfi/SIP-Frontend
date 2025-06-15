import { useState } from "react"
import { useEffect } from "react"
import { useUser } from "../../context/UserContext"

export const CodigoQR = ({url}) => {
    const {tokenState}=useUser()
    const [image,setImage]=useState()
    const ejecutarFetch=async () => {
        let urlToCode=url;
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/generateQRCode?text=${urlToCode}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${tokenState}`
            }
        })
        const data = await response.blob()
        var reader = new FileReader();
        reader.readAsDataURL(data); 
        reader.onloadend = function() {
            var base64data = reader.result;
            const base64finaldata=base64data.substr(base64data.indexOf('base64,') + 7)
            setImage(base64finaldata)
        }          
    }

    useEffect(()=> { 
        ejecutarFetch()
    },[])
    

    return (

        <div className="tarjetaProducto tarjetaById">
            <h2>Codigo QR Generado</h2>
           {image!=undefined&&image!=null&&<img className="qr" src={`data:image/jpeg;base64,${image}`} alt="" />
           }
        </div>

        
    )
}