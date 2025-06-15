import { useLocation, useNavigate } from 'react-router-dom'
import styles from './NavigateBackButton.module.css'
function NavigateBackButton (){
    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate(-1); // vuelve a la página anterior real del historial
        }
    };

    return( 
        <button className={styles.backButton} onClick={handleClick}>Volver</button>
    )
};
export default NavigateBackButton