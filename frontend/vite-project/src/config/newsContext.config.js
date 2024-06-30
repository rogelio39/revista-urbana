import getCookiesByName from "../utils/utils";

const URL = import.meta.env.VITE_REACT_APP_MODE === 'DEV' ? import.meta.env.VITE_REACT_APP_LOCAL_URL : import.meta.env.VITE_REACT_APP_WEB_URL;




const fetchNewsData = async (setNews, setError) => {
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

const fetchNewsByCategory = async (setNews, setError, query, productsByPage, currentPage) => {
    try {
        const response = await fetch(`${URL}/api/news/byCategory?filter=${query}&limit=${productsByPage}&page=${currentPage}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("data en news by categori en config", data)
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


const fetchNewsByTitle = async (setNews, setError, filter, productsByPage, currentPage) => {
    try {
        const response = await fetch(`${URL}/api/news/byTitle?filter=${filter}&limit=${productsByPage}&page=${currentPage}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
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
const fetchNewsDataById = async (id) => {
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
const createNewsData = async (data, token, setNews) => {

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

const updateNewsData = async (id, data, token, setNews) => {


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




const uploadImageData = async (idProd, formData) => {
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


const deleteNews = async (idNew) => {
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




export default {fetchNewsData, fetchNewsByCategory, fetchNewsByTitle ,fetchNewsDataById, createNewsData, deleteNews, updateNewsData, uploadImageData, URL}