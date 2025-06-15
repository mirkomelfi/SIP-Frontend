import { useState } from "react";
import styles from "../Login.module.css";

function LoginUI({ onSubmit }) {
  const [username, setUsername] = useState(null);
  const [passw, setPassw] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      username: username,
      password: passw,
    });
  };

  return (
    <div>
      <div className={styles.divForm}>
        <h3>Formulario de Inicio de Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputForm}>
            <label htmlFor="username" className={styles.formLabel}>
              Nombre de Usuario
            </label>
            <input
              type="text"
              className={styles.formControl}
              name="username"
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </div>

          <div className={styles.mb3}>
            <label htmlFor="password" className={styles.formLabel}>
              Contraseña
            </label>
            <input
              type="password"
              className={styles.formControl}
              name="password"
              onChange={(e) => setPassw(e.currentTarget.value)}
            />
          </div>

          <button type="submit" className={styles.button}>
            <span className={styles.btnText}>Iniciar Sesión</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginUI;
