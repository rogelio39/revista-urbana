import getCookiesByName from "../utils/utils";

const URL = import.meta.env.VITE_REACT_APP_MODE === 'DEV' ? import.meta.env.VITE_REACT_APP_LOCAL_URL : import.meta.env.VITE_REACT_APP_WEB_URL;




export const fetchNewsData = async (setNews, setError) => {
    try {
        const response = await fetch(`${URL}/api/news`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("data datos en contexto", data)
            setNews(data)
            return data
        } else {
            const text = await response.text();
            throw new Error(`Error ${response.status} ${text}`)
        }
    } catch (error) {
        console.log("error", error.message);
        setError(error.message);
        throw error;
    }


}

export const fetchNewsDataById = async (id) => {
    try {
        const response = await fetch(`${URL}/api/news/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log("error", error)
    }


}
export const createNewsData = async (data, token, setNews) => {

    try {
        const response = await fetch(`${URL}/api/news`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const datos = await response.json();

        if (response.ok) {
            setNews(datos)
            return datos;
        } else {
            console.log("error", datos)
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const updateNewsData = async (id, data, token, setNews) => {


    try {
        const response = await fetch(`${URL}/api/news/updateNews/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const datos = await response.json();

        if (response.ok) {
            setNews(datos)
            return datos;
        } else {
            console.log("error", datos)
        }
    } catch (error) {
        console.log("error", error)
    }
}




export const uploadImageData = async (idProd, formData) => {
    try {
        const token = getCookiesByName('jwtCookie');
        if (formData && token) {
            const response = await fetch(`${URL}/api/news/uploadImage/${idProd}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                return data.message
            } else {
                console.log("Error al subir la imagen");
            }
        }
    } catch (error) {
        console.log("Error", error);
    }
}


export const deleteNews = async (idNew) => {
    try {
        const token = getCookiesByName('jwtCookie');
        if (idNew && token) {
            const response = await fetch(`${URL}/api/news/${idNew}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorData = await response.json();
                console.error("Error al eliminar noticia:", errorData.message);
                throw new Error(`Error ${response.status}: ${errorData.message}`);
            }
        } else {
            throw new Error("ID de noticia o token no proporcionado");
        }
    } catch (error) {
        console.error("Error al eliminar noticia:", error.message);
        throw error;
    }
};




export { URL };