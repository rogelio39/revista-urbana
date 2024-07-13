import { useContext, useEffect, useState } from "react"
import { NewsContext } from '../../context/NewsContext'
import New from '../../Components/New/New'
import Pagination from "../Pagination/Pagination";

const DeleteNews = () => {
    const { fetchNews, delNews } = useContext(NewsContext);
    const [allNews, setAllNews] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 10



    useEffect(() => {
        const getNews = async () => {
            const news = await fetchNews(limit, currentPage)
            if (news) {
                setTotalPages(news.totalPages)
                setAllNews(news.docs)
            }
        }

        getNews();

    }, [currentPage])


    const handleDelete = async (new_id) => {
        await delNews(new_id);
    }

    const handlePage = (page) => {
        console.log("page", page)
        setCurrentPage(page)
    }

    return (
        <div className=" mt-36 flex flex-col justify-center items-center gap-2">
            <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={handlePage} />
            {
                allNews && allNews.map((news) =>
                    <div className="rounded border-2 border-indigo-800 bg-indigo-300 mb-20 flex flex-col justify-center items-center" key={news._id}>
                        <New isDeleteNews={true} data={news} />
                        <button className="mb-2 hover:bg-indigo-500 hover:text-white shadow-mg bg-indigo-200 p-2 rounded focus:ring-1" onClick={() => handleDelete(news._id)}>Eliminar</button>
                    </div>
                )
            }
        </div>
    )
}

export default DeleteNews
