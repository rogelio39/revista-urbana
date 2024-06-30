import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { NewsContext } from "../../context/NewsContext";
import New from "../New/New";
import Pagination from "../Pagination/Pagination";

const NewsByCategory = () => {
    const { query } = useParams();
    const { fetchNewsDataByCategory } = useContext(NewsContext);
    const [loading, setLoading] = useState(true)
    const [newsFiltered, setNewsFiltered] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const productsByPage = 10;

    const handlePage = (page) => {
        console.log("se presiojjo handle page")
        setCurrentPage(page)
    }


    useEffect(() => {
        const getNewsByCategory = async () => {
            const allNews = await fetchNewsDataByCategory(query, productsByPage, currentPage);
            if (allNews.docs) {
                setNewsFiltered(allNews.docs);
                setTotalPages(allNews.totalPages)
                setLoading(false)
            }
        }
        getNewsByCategory();

    }, [query, currentPage]);

    if (loading) {
        return <div>Cargando...</div>
    }



    return (
        <div className="flex flex-col justify-center items-center mt-40 mb-40">
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
    )
}

export default NewsByCategory

