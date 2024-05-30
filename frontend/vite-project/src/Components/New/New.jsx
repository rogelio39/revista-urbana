import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import React from 'react'
import './New.css'


const New = ({ data }) => {
    const [individualNews, setIndividualNews] = useState({});
    const [newsText, setNewsText] = useState([])



    useEffect(() => {
        if (data && data.text) {
            const parts = data.text.split('**');
            setIndividualNews(data);
            if (parts) {
                setNewsText(parts);
            }

        }
    }, [data])

    let thumbnailUrl = ''


    if (individualNews) {
        thumbnailUrl = individualNews.thumbnail && individualNews.thumbnail.length > 0 ? `${individualNews.thumbnail[0]}` : '';
    } else {
        return null
    }





    return (
        <article itemScope itemType="https://schema.org/NewsArticle">
            {
                individualNews && (
                    <div className={`shadow-md bg-neutral-50  shadow-white flex-column m-1 p-5 justify-center items-center mb-5 ${individualNews.font}`}>
                        <h1 itemProp = 'headline' className='mb-5 text-xl font-bold'>{individualNews.title}</h1>
                        <div className='mb-5 flex flex-col justify-center items-center'>
                            <img src={thumbnailUrl} alt="imagen" />
                            <p className='pie-de-imagen' >{individualNews.pieDeImagen ? individualNews.pieDeImagen : ''}</p>
                        </div>
                        <h2 className='font-bold'>{individualNews.subtitle}</h2>
                        <p itemProp='articleBody'>
                            {
                                newsText.map((text, index) => (
                                    index % 2 === 1 ?
                                        (<span className='mb-4 font-bold' key={index}>{text}</span>)
                                        : (
                                            text.split('\n').map((line, j) => (
                                                <React.Fragment key={j}>
                                                    {line}
                                                    {j < text.split('\n').length - 1 && <br />}
                                                </React.Fragment>
                                            ))
                                        )
                                )
                                )
                            }
                        </p>
                        <div>
                            ETIQUETAS:
                            <ul className='flex'>
                                {
                                    individualNews.tags && (individualNews.tags.map((tag, k) => (
                                        <li itemProp='keywords' className='p-1 bg-blue-200 m-2 rounded hover:shadow-slate-800 cursor-pointer hover:shadow-md hover:bg-blue-400 hover:text-white  ' key={k}>{tag}</li>
                                    )))
                                }
                            </ul>
                        </div>
                        <p>VER VIDEO</p>
                    </div>
                )

            }
        </article>
    )
}

New.propTypes = {
    data: PropTypes.object
}

export default New
