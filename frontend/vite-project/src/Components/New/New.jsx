import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import React from 'react'



const New = ({ data }) => {
    const [individualNews, setIndividualNews] = useState({});
    const [newsText, setNewsText] = useState([])
    useEffect(() => {
        if (data) {
            const parts = data.text.split('**');
            setIndividualNews(data);
            if (parts) {
                setNewsText(parts);
            }

        }
    }, [data])

    let thumbnailUrl = ''


    if (data) {
        thumbnailUrl = individualNews.thumbnail && individualNews.thumbnail.length > 0 ? `${individualNews.thumbnail[0]}` : '';
    }
    

    setTimeout(() => {
        console.log("thumbnaik", thumbnailUrl)
    }, 3000)




    return (
        <div>
            {
                individualNews && (
                    <div className={`shadow-md shadow-black flex-column m-1 p-5 justify-center items-center mb-5 ${individualNews.font}`}>
                        <h1 className='mb-5 text-xl font-bold'>{individualNews.title}</h1>
                        <img className='rounded mb-5' src={thumbnailUrl} alt="imagen" />
                        <h2 className='font-bold'>{individualNews.subtitle}</h2>
                        <p>
                            {
                                newsText.map((text, index) => (
                                    index % 2 === 1 ? 
                                    (<span className='mb-4 font-bold' key={index}>{text}</span>) 
                                    : (
                                        text.split('\n').map((line, j) => (
                                            <React.Fragment key={j}>
                                                {line}
                                                {j < text.split('\n').length - 1 && <br/>}
                                            </React.Fragment>
                                        ))
                                    )
                                )
                                )
                            }
                        </p>
                    </div>
                )

            }
        </div>
    )
}

New.propTypes = {
    data: PropTypes.object
}

export default New
