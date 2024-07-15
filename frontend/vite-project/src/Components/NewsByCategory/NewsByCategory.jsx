import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { NewsContext } from "../../context/NewsContext";
import New from "../New/New";
import Pagination from "../Pagination/Pagination";
import { Helmet } from 'react-helmet-async';
import Publicidades from "../Publicidades/Publicidades";
const NewsByCategory = () => {
    const { category, subcategory } = useParams();
    const { fetchNewsDataByCategory } = useContext(NewsContext);
    const [loading, setLoading] = useState(true)
    const [newsFiltered, setNewsFiltered] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const productsByPage = 10;

    const handlePage = (page) => {
        setCurrentPage(page)
    }

    console.log("categoria",category)
    console.log("subcategory", subcategory)

    useEffect(() => {
        const getNewsByCategory = async () => {
            const allNews = await fetchNewsDataByCategory(category, subcategory, productsByPage, currentPage);
            if (allNews.docs) {
                setNewsFiltered(allNews.docs);
                setTotalPages(allNews.totalPages)
                setLoading(false)
            }
        }
        getNewsByCategory();

    }, [category, subcategory, currentPage]);

    if (loading) {
        return <div>Cargando...</div>
    }




    if(newsFiltered){
        console.log("newsfilter", newsFiltered)
    }


    return (
        <>
        
        
        <div className="flex flex-col justify-center items-center mt-40 mb-40">
        <Publicidades categoria={1} altImg='Publicidad gym ateneo' />
            {
                newsFiltered && (
                    <Helmet>
                        <title>{`REVISTA URBANA - CATEGORIAS ${category} ${subcategory ? subcategory : ''}`}</title>
                        <meta name="description" content={`Bienvenido a REVISTA URBANA. Descubre las últimas noticias de ${category} ${subcategory ? subcategory : ''}. La mejor revista de banda del rio sali.`} />
                        <meta property="og:title" content={`Revista urbana ${category} ${subcategory ? subcategory : ''} `} />
                        <meta property="og:description" content={`Ultimas noticias de $${category} ${subcategory ? subcategory : ''}`} />
                    </Helmet>
                )

            }

            <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={handlePage} />
            <div className="max-w-screen-lg flex flex-col m-auto p-5 justify-center items-center">
                {
                    newsFiltered && (newsFiltered.map(news => (
                        <div key={news._id}>
                            <New data={news} />
                        </div>


                    ))

                    )
                }
            </div>
        </div>
        </>
    )
}

export default NewsByCategory

