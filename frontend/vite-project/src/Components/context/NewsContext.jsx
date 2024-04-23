import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import getCookiesByName from "../../utils/utils.js";



const URL = import.meta.env.VITE_REACT_APP_LOCAL_URL;

const NewsContext = createContext({
    news: [],
    getNews: () => { }
});


export const NewsProvider = ({ children }) => {
    const [news, setNews] = useState();


    const getNews = async () => {
        const response = fetch(`${URL}/api/news`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (response.ok) {
            const data = response.json();
            setNews(data)
        }

    }

    const createNews = async (data) => {
        const token = getCookiesByName('jwt');
        try {

            const response = fetch(`${URL}/api/news`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const data = response.json();
                console.log("data", data);
            } else{
                console.log("error", response.json())
            }
        } catch (error) {
            console.log(`error ${error}`)
        }
    }


    return (
        <NewsContext.Provider value={{ getNews, news, createNews}}>
            {children}
        </NewsContext.Provider>
    )

}



NewsProvider.propTypes = {
    children: PropTypes.node.isRequired
}

