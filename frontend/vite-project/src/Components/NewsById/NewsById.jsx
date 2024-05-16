import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { NewsContext } from "../../context/NewsContext";
import React from 'react'


const URL = import.meta.env.VITE_REACT_APP_MODE == 'DEV' ? import.meta.env.VITE_REACT_APP_LOCAL_URL : import.meta.env.VITE_REACT_APP_WEB_URL;


const NewsById = () => {
    const { id } = useParams();
    const [newData, setNewData] = useState({});
    const { fetchNewsById } = useContext(NewsContext);
    const [error, setError] = useState(null)
    const [newsText, setNewsText] = useState([])

    useEffect(() => {
        const getNewById = async () => {
            try {
                const newById = await fetchNewsById(id);
                if (newById) {
                    const parts = newById.text.split('**');
                    setNewData(newById);
                    if (parts) {
                        console.log("parts en newbyid", parts)
                        setNewsText(parts);
                    }
                } else {
                    setError('La noticia no se encontro');
                }

            } catch (error) {
                console.log("error", error)
                setError('Error al cargar noticia')
            }
        }

        getNewById();


    }, [id])




    let thumbnailUrl = ''

    if (newData && newData.thumbnail && newData.thumbnail.length > 0) {
        thumbnailUrl = `${URL}/uploads/news/${newData.thumbnail[0].name}`
    }



    return (
        <div className='flex-column m-10 p-5 justify-center items-center ' id={newData._id}>
            {
                error ? (<p>{error}</p>) :
                    (<>
                        <h1 className='mb-5 text-xl font-bold'>{newData.title}</h1>
                        <img className='rounded mb-5' src={thumbnailUrl} alt="imagen" />
                        <h2 className='font-bold'>{newData.subtitle}</h2>
                        <div>
                            {
                                newsText.map((text, index) => (
                                    index % 2 === 1 ? 
                                    (<span className="font-bold" key={index}>{text}</span>)
                                    : 
                                    (
                                        text.split('\n').map((line, j) => (
                                            <React.Fragment key={j}>
                                                {line}
                                                {j < text.split('\n').length - 1 && <br/>}
                                            </React.Fragment>
                                        ))
                                )
                                ))
                            }

                        </div>
                    </>)

            }

        </div>

    )
}

export default NewsById



{/* text.split('\n').map((line, j) => (
                                        <React.Fragment>
                                            {line}
                                            {j < part.split('\n').length - 1 && <br/>}
                                        </React.Fragment>
                                    )) */}

{/* 

index % 2 === 1 ? <span className='mb-4 font-bold' key={index}>{text}</span> :  */}