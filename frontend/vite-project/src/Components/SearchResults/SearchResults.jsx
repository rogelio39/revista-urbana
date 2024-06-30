import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";
import New from "../New/New";
import Pagination from "../Pagination/Pagination";


const SearchResults = () => {
    const { query } = useParams();
    const { fetchNewsDataByTitle} = useContext(NewsContext);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [newsBySearch, setNewsBySearch] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const productsByPage = 10;

    const handlePage = (page) => {
            console.log("se presiono handlePage")
            setCurrentPage(page)
    }


    useEffect(() => {
        const getNewsByQuery = async () => {
            try {
                const newsSearch = await fetchNewsDataByTitle(query, productsByPage, currentPage);
                if (!newsSearch) {
                    setError(true)
                    setErrorMessage('Las noticias no se encontraron');
                    return; // Salir de la función si no hay noticias
                }
                setTotalPages(newsSearch.totalPages);
                setNewsBySearch(newsSearch.docs)
                const newBySearch = newsSearch.docs;
                // const newBySearch = newsSearch.docs.filter(news => news.title.toLowerCase().includes(query.toLocaleLowerCase()));
                if (newBySearch.length === 0) {
                    setError(true)
                    console.log('No se encontraron noticias que coincidan con la busqueda')
                    setErrorMessage('No se encontraron noticias por esta búsqueda');
                    return
                }

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

    }, [query, currentPage])

    if (loading) {
        return <div>CARGANDO...</div>
    }

    return (
        <div className="flex flex-col justify-center items-center mt-40 mb-40">
            <div className='max-w-screen-lg flex flex-col m-auto p-5 justify-center items-center'>
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

                <Pagination currentPage = {currentPage} totalPages = {totalPages} nextPage = {handlePage} />

            </div>
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