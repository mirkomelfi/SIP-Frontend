import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, isRolUser, validateRol } from "../../utils/auth-utils";
import "./Home.css";

export const Home = () => {
  const [rolUser, setRolUser] = useState(true);
  const navigate = useNavigate();

  const ejecutarFetch = async () => {
    let url = `${process.env.REACT_APP_DOMINIO_BACK}/profile`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      }
    });

    const rol = validateRol(response);
    if (!rol) {
      navigate("/login");
    } else {
      setRolUser(isRolUser(getToken()));
    }
  };

  useEffect(() => {
    ejecutarFetch().catch(error => console.error(error));
  }, []);

  const navigateTo = (url) => {
    navigate(url);
  };

  return (
    <div className="home">
      {!rolUser && (
        <button className="home__button" onClick={() => navigateTo(`users`)}>
          Usuarios
        </button>
      )}
      <button className="home__button" onClick={() => navigateTo(`sectors`)}>
        Sectores
      </button>
      <button className="home__button" onClick={() => navigateTo(`items`)}>
        Items
      </button>
      <button className="home__button" onClick={() => navigateTo(`user/current`)}>
        Mi perfil
      </button>
    </div>
  );
};
