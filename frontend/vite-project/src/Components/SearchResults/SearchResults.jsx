import { lazy, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";
// import React from "react";

const New = lazy(() => import('../New/New'))


const SearchResults = () => {
    const { query } = useParams();
    const { fetchNews } = useContext(NewsContext);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [newsBySearch, setNewsBySearch] = useState([])
    const [loading, setLoading] = useState(true)
    // const [newsText, setNewsText] = useState([])



    useEffect(() => {
        const getNewsByQuery = async () => {
            try {
                const newsSearch = await fetchNews();
                if (!newsSearch) {
                    setError(true)
                    setErrorMessage('Las noticias no se encontraron');
                    return; // Salir de la función si no hay noticias
                }
                const newBySearch = newsSearch.filter(news => news.title.toLowerCase().includes(query.toLocaleLowerCase()));
                if (newBySearch.length === 0) {
                    setError(true)
                    console.log('No se encontraron noticias que coincidan con la busqueda')
                    setErrorMessage('No se encontraron noticias por esta búsqueda');
                    return
                }
                const parts = newBySearch.map(news => {
                    return news.text.split('**')
                })
                if (!parts) {
                    setError(true)
                    setErrorMessage('Error al visualizar texto de noticia');
                    return
                }

                // setNewsText(parts)
                setNewsBySearch(newBySearch);
                setLoading(false)
                setError(false)
            }
            catch (error) {
                console.log("error en el servidor", error);
                setError(true)
                setErrorMessage('Error al cargar noticias');
            }
        }
        getNewsByQuery();

    }, [query, loading])

    if (loading) {
        return <div>CARGANDO...</div>
    }

    return (
        <div className='max-w-screen-lg flex m-auto p-5 justify-center items-center'>
            {
                error ? (<p>{errorMessage}</p>) :
                    (<>
                        {
                            newsBySearch.map(newBySearch => (
                                <New key={newBySearch._id} data={newBySearch} />
                            ))
                        }
                    </>)
            }

        </div>
    )
}

export default SearchResults





// {
//     newsText.map((text, index) => (
//         typeof text === 'string' ? (
//             index % 2 === 1 ?
//                 (<span className="font-bold" key={index}>{text}</span>)
//                 :
//                 (
//                     text.split('\n').map((line, j) => (
//                         <React.Fragment key={j}>
//                             {line}
//                             {j < text.split('\n').length - 1 && <br />}
//                         </React.Fragment>
//                     ))
//                 )
//         ) : (
//             <React.Fragment key={index}>
//                 {text}
//             </React.Fragment>
//         )
//     ))
// }



// <div className="mb-20 shadow-xl flex-column m-10 p-5 justify-center items-center " key={newBySearch._id}>
// <h1 className='mb-5 text-xl font-bold'>{newBySearch.title}</h1>
// <img className='rounded mb-5' src={`${URL}/uploads/news/${newBySearch.thumbnail[0].name}`} alt="imagen" />
// <h2 className='font-bold'>{newBySearch.subtitle}</h2>
// {
//     newsText.length > 0 && newsText.map((noticia, index) => (
//         index % 2 === 1 ?
//             (<span className="font-bold" key={index}>{noticia}</span>)
//             :
//             (
//                 noticia[index].split('\n').map((line, j) => (
//                     <React.Fragment key={j}>
//                         {line}
//                         {j < noticia[index].split('\n').length - 1 && <br />}
//                     </React.Fragment>
//                 ))
//             )
//     ))
// }

// </div>