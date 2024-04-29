import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';

const URL = import.meta.env.VITE_REACT_APP_LOCAL_URL;

const New = ({ data }) => {
    const [individualNews, setIndividualNews] = useState({})

    useEffect(() => {
        setIndividualNews(data)
    },[data])

    let thumbnailUrl = ''

    if(data){
        thumbnailUrl = individualNews.thumbnail && individualNews.thumbnail.length > 0 ? `${URL}/uploads/news/${individualNews.thumbnail[0].name}`: '';
    }
    return (
        <div className='flex-column m-1 p-5 justify-center items-center ' id={individualNews._id}>
            <h1 className='mb-5 text-xl font-bold'>{individualNews.title}</h1>
            <img className='rounded mb-5' src={thumbnailUrl} alt="imagen" />
            <h2 className='font-bold'>{individualNews.subtitle}</h2>
            <p className='text-justify'>{individualNews.text}</p>
        </div>
    )
}

New.propTypes = {
    data: PropTypes.object
}

export default New
