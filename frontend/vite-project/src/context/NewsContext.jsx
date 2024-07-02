import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import newsApi from "../config/newsContext.config";


const  { fetchNewsData, fetchNewsByCategory, fetchNewsByTitle, fetchNewsDataById, createNewsData, updateNewsData, uploadImageData, deleteNews} = newsApi

const NewsContext = createContext({
    news: [],
    error: null,
    fetchNews: () =>  {},
    fetchNewsById: () => {},
    createNews: () => {},
    updateNews: () => {},
    uploadImage: () => {},
    delNews: () => {}
});


const NewsProvider = ({ children }) => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null)


    const fetchNews = async() => {
        return fetchNewsData(setNews, setError);
    }

    const fetchNewsDataByCategory = async(query, productsByPage, currentPage) => {
        return fetchNewsByCategory(setNews, setError, query, productsByPage, currentPage);
    }

    const fetchNewsDataByTitle = async(query, productsByPage, currentPage) => {
        return fetchNewsByTitle(setNews, setError, query, productsByPage, currentPage);
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

    const uploadImage = async(idNew, formData) => {
        return uploadImageData(idNew, formData)
    }

    const delNews = async(idNew)=> {
        return deleteNews(idNew); 
    }
    return (
        <NewsContext.Provider value={{ fetchNews, fetchNewsDataByCategory, fetchNewsDataByTitle , news, createNews, uploadImage, fetchNewsById, updateNews, delNews,  error }}>
            {children}
        </NewsContext.Provider>
    )

}



NewsProvider.propTypes = {
    children: PropTypes.node.isRequired
}


export {NewsContext, NewsProvider};