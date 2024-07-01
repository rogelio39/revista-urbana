import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { NewsContext } from "../../context/NewsContext";
import New from "../New/New";
import { Helmet } from 'react-helmet-async';

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


    if (newData) {
        thumbnailUrl = newData.thumbnail && newData.thumbnail.length > 0 ? `${newData.thumbnail[0]}` : '';
    } else {
        return null
    }



    return (
        <div className="flex flex-col justify-center items-center mt-40">
            <div className='w-full max-w-screen-lg flex m-auto p-5 justify-center items-center'>
                {
                    newData ? (<>
                        <Helmet>
                            <title>{`REVISTA URBANA - ${newData.title}`}</title>
                            <meta name="description" content="Bienvenido a REVISTA URBANA. Descubre las últimas noticias. La mejor revista de banda del rio sali." />
                            <meta property="og:title" content={`Revista urbana ${newData.title}`} />
                            <meta property="og:description" content={newData.subtitle} />
                            <meta property="og:image" content={thumbnailUrl} />
                        </Helmet>
                        <New data={newData} />
                    </>
                    ) : (<p>{error}</p>)

                }

            </div>
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


