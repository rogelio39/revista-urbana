import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import getCookiesByName from "../utils/utils";

const URL = import.meta.env.VITE_REACT_APP_MODE == 'DEV' ? import.meta.env.VITE_REACT_APP_LOCAL_URL : import.meta.env.VITE_REACT_APP_WEB_URL;


const NewsContext = createContext({
    news: [],
    error: null,
    fetchNews: () =>  {},
    fetchNewsById: () => {},
    createNews: () => {},
    updateNews: () => {},
    uploadImage: () => {}
});


const NewsProvider = ({ children }) => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null)

    const fetchNews = async () => {
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
            } else{
                const text = await response.text();
                throw new Error(`Error ${response.status} ${text}`)
            }
        } catch (error) {
            console.log("error", error);
            setError(error.message);
            throw error;
        }


    }

    const fetchNewsById = async (id) => {
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
    const createNews = async (data, token) => {

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

    const updateNews = async (id, data, token) => {

        try {
            const response = await fetch(`${URL}/api/news/updateNews/${id}`, {
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

    


    const uploadImage = async (idProd, formData) => {
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




    return (
        <NewsContext.Provider value={{ fetchNews, news, createNews, uploadImage, fetchNewsById, updateNews, error }}>
            {children}
        </NewsContext.Provider>
    )

}



NewsProvider.propTypes = {
    children: PropTypes.node.isRequired
}


export {NewsContext, NewsProvider};