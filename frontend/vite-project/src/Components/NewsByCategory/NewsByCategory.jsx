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
    )
}

export default NewsByCategory

