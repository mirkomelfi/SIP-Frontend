import {jwtDecode} from "jwt-decode"

export const setToken=(token)=>{
    localStorage.setItem("jwt",token)
}

export const getToken=()=>{
    return localStorage.getItem("jwt")
}

export const deleteToken=()=>{
    localStorage.removeItem("jwt")
}

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

export const extractUrl=(url)=>{
    return url.substr(url.indexOf('http://') + 7)
}

export const isRolUser=(token)=>{
    if (token){
        if (extractRol(token)=="ROL_USER"){
            return true
        }
    }
    return undefined
}