import {jwtDecode} from "jwt-decode"

export const getToken = () => localStorage.getItem("jwt");
export const setToken = (token) => localStorage.setItem("jwt", token);
export const deleteToken = () => localStorage.removeItem("jwt");

export const validateRol=(response)=>{
    if (response.status==403){
        return undefined
    }
    return true
}

export const extractRol=(token)=>{
    const decoded= jwtDecode(token)
    return decoded.rol
}

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Error al decodificar token:", err);
    return null;
  }
};

export const extractUrl=(url)=>{
    const url_desarrollo=process.env.REACT_APP_DOMINIO_FRONT
    if (url_desarrollo=="http://localhost:3000"){
        return url.substr(url.indexOf("3000") + 4)
    }
    return url.substr(url.indexOf(".com") + 4)
}

export const isRolUser=(token)=>{
    if (token){
        if (extractRol(token)=="ROL_USER"){
            return true
        }
    }
    return undefined
}
