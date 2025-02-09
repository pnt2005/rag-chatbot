const API_DOMAIN = "http://127.0.0.1:5000/"

export const get = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
    const result = await response.json()
    return result
}

export const post = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": localStorage.getItem("token")
        }, 
        body: JSON.stringify(options)
    })
    const result = await response.json()
    return result
}

export const del = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "DELETE"
    })
    const result = await response.json()
    return result
}

export const patch = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
        }, 
        body: JSON.stringify(options)
    })
    const result = await response.json()
    return result
}

export const signup = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
        }, 
        body: JSON.stringify(options)
    })
    const result = await response.json()
    return result
}

export const login = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
        }, 
        body: JSON.stringify(options)
    })
    const result = await response.json()
    return result
}

export const upload = async (path, options) => {
    const formData = new FormData();
    formData.append("file", options);
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": localStorage.getItem("token")
        }, 
        body: formData
    })
    const result = await response.json()
    return result
}