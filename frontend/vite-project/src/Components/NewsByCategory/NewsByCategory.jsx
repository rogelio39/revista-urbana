import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { NewsContext } from "../../context/NewsContext";
import New from "../New/New";
import Comments from "../Comments/Comments";
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
        <div className="mt-10 flex flex-col">
            {
                newsFiltered && (newsFiltered.map(news => (
                    <div className="m-auto" key={news._id}>
                        <New data={news} />
                        <Comments news_id={news._id}/>
                    </div>


                ))

                )
            }
        </div>
    )
}

export default NewsByCategory

