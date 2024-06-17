import { createContext, useState } from "react";
import { getComments, addComment } from "../config/commentsContext.config";
import PropTypes from 'prop-types';


const CommentContext = createContext();


const CommentProvider = ({children}) => {
    const [error, setError] = useState();

    const comments = async(news_id) => {
        return getComments(setError, news_id)
    }

    const createComments = async(news_id, user_id, content, token) => {
        return addComment(setError, news_id, user_id, content, token);
    }




    return(
        <CommentContext.Provider value={{comments, error, createComments}}>
            {children}
        </CommentContext.Provider>
    )
}


CommentProvider.propTypes = {
    children: PropTypes.node.isRequired
}


export {CommentContext, CommentProvider};