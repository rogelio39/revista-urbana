
const URL = import.meta.env.VITE_REACT_APP_MODE === 'DEV' ? import.meta.env.VITE_REACT_APP_LOCAL_URL : import.meta.env.VITE_REACT_APP_WEB_URL;



export const getComments = async (setError, news_id) => {

    try {
        const response = await fetch(`${URL}/api/comments/news/${news_id}/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        })


        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
        }

    } catch (error) {
        console.log("error", error);
        setError(error.message);
        throw error;
    }

}



export const addComment = async (setError, news_id, user_id, comments, token) => {

    try {
        const response = await fetch(`${URL}/api/comments/news/${news_id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ user_id: user_id, news_id: news_id, comments: comments })
        })


        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
        }

    } catch (error) {
        console.log("error", error);
        setError(error.message);
        throw error;
    }

}