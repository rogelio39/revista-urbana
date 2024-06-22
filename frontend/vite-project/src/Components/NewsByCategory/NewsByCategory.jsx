import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { NewsContext } from "../../context/NewsContext";
import New from "../New/New";
import { Helmet } from "react-helmet-async";
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
            <Helmet>
                <title>REVISTA URBANA - Categorias</title>
                <meta name="description" content="Bienvenido a la página categorias de REVISTA URBANA. Descubre las últimas noticias y tendencias urbanas." />
                <meta property="og:title" content="REVISTA URBANA - Categorias" />
                <meta property="og:description" content="Explora las noticias y tendencias más recientes de la cultura urbana." />
                <meta property="og:image" content="https://revista-urbana.com/logo-bg.png" />
            </Helmet>
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

