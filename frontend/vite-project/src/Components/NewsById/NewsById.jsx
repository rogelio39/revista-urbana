import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { NewsContext } from "../../context/NewsContext";

const URL = import.meta.env.VITE_REACT_APP_LOCAL_URL

const NewsById = () => {
    const { id } = useParams();
    const [newData, setNewData] = useState({});
    const { fetchNewsById } = useContext(NewsContext);
    const [error, setError] = useState(null)

    useEffect(() => {
        const getNewById = async () => {
            try {
                const newById = await fetchNewsById(id);
                if (newById) {
                    setNewData(newById);
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
                        <p className='text-justify'>{newData.text}</p>
                    </>)

            }

        </div>

    )
}

export default NewsById
