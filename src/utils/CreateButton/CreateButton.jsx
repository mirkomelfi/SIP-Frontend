import styles from './CreateButton.module.css'
function CreateButton ({onClick}){
    return( 
        <button type="button" className={styles.createButton} onClick={onClick}>+</button>
    )
};
export default CreateButton