import { useLocation, useNavigate } from 'react-router-dom'
import styles from './NavigateBackButton.module.css'
function NavigateBackButton (){
    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = () =>{
        navigate(location.state?.from || "/")
    }
    return( 
        <button className={styles.backButton} onClick={handleClick}>Volver</button>
    )
};
export default NavigateBackButton