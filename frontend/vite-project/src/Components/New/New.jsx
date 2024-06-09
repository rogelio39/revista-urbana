import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import React from 'react'
import './New.css'
import 'lazysizes'

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


    const imgWidthForDesktop = 800
    const imgHeightForDesktop = 600




    return (
        <article itemScope itemType="https://schema.org/NewsArticle">
            {
                individualNews && (
                    <div className={`shadow-md bg-neutral-50  shadow-white flex-column m-1 p-5 justify-center items-center mb-5 ${individualNews.font}`}>
                        <header>
                            <h1 itemProp='headline' className='mb-5 text-xl font-bold'>{individualNews.title}</h1>
                        </header>
                        <main>
                            <article>
                                <div className='mb-5 flex flex-col justify-center items-center'>
                                    <img data-src={thumbnailUrl}
                                        width={imgWidthForDesktop}
                                        height={imgHeightForDesktop}
                                        className='lazyload'
                                        alt={individualNews.title}
                                        itemProp='image' />
                                    <p className='pie-de-imagen' >{individualNews.pieDeImagen ? individualNews.pieDeImagen : ''}</p>
                                </div>

                                <section>
                                    <h2 itemProp='alternativeHeadline' className='font-bold'>{individualNews.subtitle}</h2>
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
                                </section>
                                <footer>
                                    <section itemProp='keywords' >
                                        ETIQUETAS:
                                        <ul className='flex'>
                                            {
                                                individualNews.tags && (individualNews.tags.map((tag, k) => (
                                                    <li className='p-1 bg-blue-200 m-2 rounded hover:shadow-slate-800 cursor-pointer hover:shadow-md hover:bg-blue-400 hover:text-white  ' key={k}>{tag}</li>
                                                )))
                                            }
                                        </ul>
                                    </section>
                                    <p className='bg-blue-200 w-auto    p-1 rounded  text-center hover:bg-blue-400   '><a href={`/newsByCategory/${individualNews.category}`}>Leer más noticias de {individualNews.category}</a></p>
                                </footer>
                                <p>VER VIDEO</p>

                            </article>

                        </main>
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
