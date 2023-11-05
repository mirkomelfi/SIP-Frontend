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
