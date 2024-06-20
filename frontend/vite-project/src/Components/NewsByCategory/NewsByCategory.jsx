import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { NewsContext } from "../../context/NewsContext";
import New from "../New/New";

const NewsByCategory = () => {
    const { query } = useParams();
    const { fetchNews } = useContext(NewsContext);
    const [loading, setLoading] = useState(true)
    const [newsFiltered, setNewsFiltered] = useState(null)


    useEffect(() => {
        const getNewsByCategory = async () => {
            const allNews = await fetchNews();
            if (allNews) {
                const newsByCategory = allNews.filter(news => news.category == query);
                if (newsByCategory) {
                    newsByCategory.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished))
                    setNewsFiltered(newsByCategory);
                    setLoading(false)
                }
            }
        }

        getNewsByCategory();

    }, [query]);

    if (loading) {
        return <div>Cargando...</div>
    }



    return (
        <div className="flex flex-col justify-center items-center mt-40">
             <div className='w-[150px] h-[500px] text-2xl flex justify-center items-center bg-red-600 right-0 fixed bottom-32 text-center'>PUBLICITA TU NEGOCIO AQUI --CATEGORIA 0</div>
            <div className='w-[900px] h-[200px] text-2xl flex justify-center items-center bg-red-600 text-center'>PUBLICITA TU NEGOCIO AQUI --CATEGORIA--1</div>
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

