import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import React from 'react'
import './New.css'
import Comments from '../Comments/Comments';
import '@justinribeiro/lite-youtube'
const New = ({ data, isDeleteNews }) => {
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



    const imgWidthForDesktop = 300
    const imgHeightForDesktop = 300




    return (
        <>

            <article className='w-full max-w-screen-lg' itemScope itemType="https://schema.org/NewsArticle">
                {
                    individualNews && (
                        <>
                            <div className={`shadow-md bg-indigo-200 text-justify  shadow-white flex-column m-1 p-5 justify-center items-center mb-5 mt-10 ${individualNews.font}`}>
                                <header>
                                    <h1 itemProp='headline' className='mb-5 sm:text-xl font-bold'>{individualNews.title}</h1>
                                </header>
                                <main>
                                    <article>
                                        <div className='mb-5 flex flex-col justify-center items-center'>
                                            <img src={thumbnailUrl}
                                                width={imgWidthForDesktop}
                                                height={imgHeightForDesktop}
                                                className='animate w-auto'
                                                alt={`Imagen del artículo:${individualNews.title}`}
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
                                        {
                                            !isDeleteNews && <footer>
                                                <section itemProp='keywords' >
                                                    ETIQUETAS:
                                                    <ul className='flex flex-wrap'>
                                                        {
                                                            individualNews.tags && (individualNews.tags.map((tag, k) => (
                                                                <li className='p-1 bg-indigo-200 m-2 rounded hover:shadow-indigo-800 cursor-pointer hover:shadow-md hover:bg-indigo-400 hover:text-white  ' key={k}>{tag}</li>
                                                            )))
                                                        }
                                                    </ul>
                                                </section>
                                                <p className='bg-indigo-400 w-auto    p-1 rounded  text-center hover:bg-indigo-500 hover:border-2 hover:border-indigo-100 hover:text-indigo-50   '><a href={`/newsByCategory/${individualNews.category}`}>Leer más noticias de {individualNews.category}</a></p>
                                            </footer>
                                        }


                                        {
                                            individualNews.url != undefined && individualNews.url.length > 0 && !isDeleteNews && (
                                                <div className=' flex flex-col'>
                                                    <>Ver video</>
                                                    <lite-youtube videoid={individualNews.url}></lite-youtube>
                                                </div>
                                            )
                                        }


                                        {
                                            individualNews.datePublished && !isDeleteNews ? (
                                                <time className='font-bold' dateTime={individualNews.datePublished}>
                                                    Fecha de publicación: {individualNews.datePublished.split('T')[0]}
                                                </time>
                                            ) : <></>
                                        }

                                    </article>

                                </main>
                            </div>
                            {
                                !isDeleteNews && <Comments news_id={individualNews._id} />

                            }
                        </>


                    )
                }
            </article >
        </>

    )
}

New.propTypes = {
    data: PropTypes.object,
    isDeleteNews: PropTypes.bool
}

export default New







/**
className='bg-contain bg-center  bg-no-repeat aspect-w-16 aspect-h-9 w-[250px] h-[250px] sm:w-[500px] sm:h-[300px] md:w-[650px] md:h-[450px] lg:w-[700px] lg:h-[500px]'
 *  **/