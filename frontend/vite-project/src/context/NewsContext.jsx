import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import { fetchNewsData, fetchNewsDataById, createNewsData, updateNewsData, uploadImageData} from "../config/newsContext.config";


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


    const fetchNews = async() => {
        return fetchNewsData(setNews, setError);
    }

    const fetchNewsById = async(id) => {
        return fetchNewsDataById(id)
    }

    const createNews = async(data, token) => {
        return createNewsData(data, token, setNews)
    }
    
    const updateNews = async(id, data, token) => {
        return updateNewsData(id, data, token, setNews)
    }

    const uploadImage = async(idProd, formData) => {
        return uploadImageData(idProd, formData)
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