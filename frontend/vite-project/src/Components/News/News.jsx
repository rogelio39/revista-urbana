import { NewsContext } from '../../context/NewsContext'
import { lazy, useContext, useEffect, useState, useCallback } from 'react'
// import Publicidades from '../Publicidades/Publicidades';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async"
import './News.css'

const Publicidades = lazy(() => import('../Publicidades/Publicidades'));
const NotesContainer = lazy(() => import('../notesContainer/NotesContainer'));
const News = () => {
    const { fetchNewsDataByCategory, fetchNews } = useContext(NewsContext);
    const [loading, setLoading] = useState(true);
    const [allNews, setAllNews] = useState([]);
    const [imageLCP, setImageLCP] = useState([]);
    const categories = ['politica', 'deportes', 'sociedad', 'cultura', 'mundo', 'destacados', 'economia', 'noticias bandeñas', 'policiales', 'espectaculo', 'salud', 'turismo', 'notas color']
    const imageLCP2 = 'https://nyc3.digitaloceanspaces.com/revista-urbana/35ebe94e-bfb8-412a-ab21-b8e752193134-publicidad-atenea.webp'
    const [lastNew, setLastNew] = useState({});
    const [latestNews, setLatestNew] = useState([]);
    const productsByPage = 4
    const currentPage = 1
    const subcategory = undefined


    useEffect(() => {
        const getTheNews = async () => {
            try {
                const request = await fetchNews(5, 1);

                if (!request && request.length < 0 && !request.docs) {
                    throw new Error("Error al cargar noticias");
                }

                const allDocs = request.docs;

                if (allDocs && allDocs.length > 0 && Array.isArray(allDocs)) {
                    setAllNews(allDocs)
                    const last3News = allDocs.slice(1, 5);
                    setLatestNew(last3News);
                    const lstNew = allDocs[0];
                    setLastNew(allDocs[0]);
                    if (lstNew.thumbnail && lstNew.thumbnail.length > 0) {
                        setImageLCP(lstNew.thumbnail[0]);
                        const imgLcp = lstNew.thumbnail[0];
                        if (imgLcp) {
                            const link = document.createElement("link");
                            link.rel = "preload";
                            link.fetchPriority = "high";
                            link.as = "image";
                            link.href = imgLcp;
                            link.type = "image/webp";
                            document.head.appendChild(link);
                        }

                        if (imageLCP2) {
                            const link2 = document.createElement("link");
                            link2.rel = "preload";
                            link2.fetchPriority = "high";
                            link2.as = "image";
                            link2.href = imageLCP2;
                            link2.type = "image/webp";
                            document.head.appendChild(link2);
                        }
                    }

                    setLoading(false);
                }
            } catch (error) {
                console.log("error", error)
                throw error
            }
        }

        if (loading) {
            getTheNews();
        }

    }, [])


    // Función para cargar noticias por categoría
    const loadNewsByCategory = useCallback(async (category) => {
        const result = await fetchNewsDataByCategory(category, subcategory, productsByPage, currentPage);
        setAllNews((prev) => ({ ...prev, [category]: result.docs }));
    }, [fetchNewsDataByCategory]);

    // Usar IntersectionObserver para cargar noticias por categoría al hacer scroll
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const category = entry.target.getAttribute('data-category');
                    if (!allNews[category]) {
                        loadNewsByCategory(category);
                    }
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1
        });

        const elements = document.querySelectorAll('[data-category]');
        elements.forEach(element => {
            observer.observe(element);
        });

        return () => {
            elements.forEach(element => {
                observer.unobserve(element);
            });
        };
    }, [allNews, loadNewsByCategory]);


    



    if (loading) {
        return <div className='p-2 m-2 text-5xl text-white text-center mt-36'>Cargando...</div>

    }
    return (
        <div className='p-5 md:p-0 flex flex-col items-center'>


            <Helmet>
                <title>REVISTA URBANA - Inicio</title>
                <meta name="description" content="Bienvenido a la página principal de REVISTA URBANA. Descubre las últimas noticias y tendencias urbanas." />
                <meta property="og:title" content="REVISTA URBANA - Inicio" />
                <meta property="og:description" content="Explora las noticias y tendencias más recientes de la cultura urbana." />
                <meta property="og:image" content={imageLCP} />
            </Helmet>

            <div className='hover:bg-indigo-800   bg-white  p-2 rounded mt-12'><h3 className='text-indigo-800 hover:text-white md:text-4xl'>PARA PUBLICITAR TU ESPACIO, CONTACTANOS A TRAVES DE WHATSAPP</h3></div>
            <Publicidades />
            <div><h1 className='text-center text-white mb-5 text-2xl'>ULTIMAS NOTICIAS</h1></div>
            <div className='text-md sm:text-xl rounded border-b-2 mb-10 w-full  border-gray-900  text-center  flex flex-wrap justify-around items-center p-1'>

                {
                    lastNew && (


                        <article key={lastNew._id} className={`animate rounded w-[250px] sm:w-[700px] bg-indigo-50`} itemScope itemType="https://schema.org/NewsArticle" >
                            {/* Imagen del artículo con texto alternativo descriptivo */}
                            <img width={250} height={250} className='w-auto animate rounded sm:w-auto' alt={`Imagen del artículo: ${lastNew.title}`} itemProp='image' src={imageLCP} />

                            <h1 itemProp="headline" className='bg-indigo-50 font-bold  mb-2' > {lastNew.title} </h1>

                            <h2 itemProp="alternativeHeadline" className='font-bold' > {lastNew.subtitle} </h2>

                            <div className='font-bold  border-2 border-indigo-600 bg-indigo-100 rounded p-1 mt-2 hover:bg-indigo-600 hover:text-white w-[10rem] m-auto mb-2' >
                                <Link to={`/newById/${lastNew._id}`} aria-label={`Leer más sobre: ${lastNew.title}`} > Leer más </Link>
                            </div>
                        </article>


                    )
                }
                <div className='text-md sm:text-xl w-[250px] m-2 bg-indigo-50 p-2 rounded flex flex-wrap justify-center items-center gap-1 sm:w-[600px] md:justify-around '>
                    {
                        latestNews &&
                        latestNews.map(news => (
                            <article key={news._id} className='animate rounded w-[200px] h-auto sm:w-[280px] sm:h-full bg-indigo-50 ' itemScope itemType="https://schema.org/NewsArticle" >
                                <img width={200} height={200} className='animate w-auto object-cover rounded' alt={`Imagen del artículo: ${news.title}`} itemProp='image' src={news.thumbnail[0]} />
                                <h1 itemProp="headline" className='bg-indigo-50 font-bold  mb-2 h-[50px] overflow-hidden '>{news.title} </h1>
                                <div className='font-bold  border-2 border-indigo-300 bg-indigo-50 rounded hover:bg-indigo-600 hover:text-white ' >
                                    <Link to={`/newById/${news._id}`} aria-label={`Leer más sobre: ${news.title}`} > Leer más </Link> </div>
                            </article>
                        ))
                    }
                </div>
            </div>


            <div className='md:overflow-hidden md:w-full'>
                {categories.map(category => (
                    <div key={category} className='mb-10 w-auto md:flex md:flex-col' data-category={category}>
                        <h1 className='text-center text-white mb-5 md:mb-10 text-md sm:text-2xl'>{category.toUpperCase()}</h1>
                        <div className='news flex flex-col justify-start gap-4 items-center sm:flex-row sm:flex-wrap sm:justify-center md:bg-white md:p-10 md:w-auto md:flex-nowrap md:justify-between '>
                            {allNews[category] && allNews[category].slice(0, 4).map(news => (
                                <div className='news-slide' key={news._id}>
                                    <NotesContainer data={news} />
                                </div>
                            ))}
                        </div>
                    </div>))
                }
            </div>

        </div >
    )
}



export default News





























