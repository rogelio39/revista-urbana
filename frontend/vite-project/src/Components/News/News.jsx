import { NewsContext } from '../../context/NewsContext'
import { lazy, useContext, useEffect, useState } from 'react'
// import Publicidades from '../Publicidades/Publicidades';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async"

const Publicidades = lazy(() => import('../Publicidades/Publicidades'));
const NotesContainer = lazy(() => import('../notesContainer/NotesContainer'));
const News = () => {
    const { fetchNewsDataByCategory } = useContext(NewsContext);
    const [loading, setLoading] = useState(true);
    const [allNews, setAllNews] = useState([]);
    const [imageLCP, setImageLCP] = useState([]);
    const imageLCP2 = 'https://nyc3.digitaloceanspaces.com/revista-urbana/35ebe94e-bfb8-412a-ab21-b8e752193134-publicidad-atenea.webp' 
    const [lastNew, setLastNew] = useState({});
    const [latestNews, setLatestNew] = useState([]);
    const categorys = ['politica', 'deportes', 'sociedad', 'cultura', 'mundo', 'destacados', 'economia', 'noticias bandeñas', 'policiales', 'espectaculo', 'salud', 'turismo', 'notas color']
    const productsByPage = 4
    const currentPage = 1
    const subcategory = undefined


    useEffect(() => {
        const getTheNews = async () => {
            try {
                const request = categorys.map(category => fetchNewsDataByCategory(category, subcategory, productsByPage, currentPage));
                const results = await Promise.all(request);

                if (!results) {
                    throw new Error("Error al cargar noticias");
                }

                const allDocs = results.map(result => result.docs);
                const latestnew = allDocs.flat().sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
                const newsByCategory = {}
                latestnew.forEach(news => {
                    const category = news.category.trim().toLowerCase();

                    if(!newsByCategory[category]){
                        newsByCategory[category] = []
                    }
                    newsByCategory[category].push(news)
                })


                if (results && results.length > 0) {
                    setAllNews(newsByCategory);
                    const last3News = latestnew.slice(1,5);
                    setLatestNew(last3News);
                    const lstNew = latestnew[0];
                    setLastNew(latestnew[0]);
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
                }
                

                    setLoading(false);


                } catch (error) {
                console.log("error", error)
                throw error
            }
        }

        if (loading) {
            getTheNews();
        }

    }, [])



    if (loading) {
        return <div className='p-2 m-2 text-5xl text-white text-center mt-36'>Cargando...</div>

    }
    return (
        <div className='p-10 md:p-7 flex flex-col items-center'>

        
            <Helmet>
                <title>REVISTA URBANA - Inicio</title>
                <meta name="description" content="Bienvenido a la página principal de REVISTA URBANA. Descubre las últimas noticias y tendencias urbanas." />
                <meta property="og:title" content="REVISTA URBANA - Inicio" />
                <meta property="og:description" content="Explora las noticias y tendencias más recientes de la cultura urbana." />
                <meta property="og:image" content={imageLCP} />
            </Helmet>

            <div className='hover:bg-indigo-800   bg-white  p-2 rounded mt-12'><h3 className='text-indigo-800 hover:text-white md:text-4xl'>PARA PUBLICITAR TU ESPACIO, CONTACTANOS A TRAVES DE WHATSAPP</h3></div>
            <Publicidades/>
            <div><h1 className='text-center text-white mb-5 text-2xl'>ULTIMAS NOTICIAS</h1></div>
            <div className='rounded border-b-2 mb-10 w-full  border-gray-900  text-center  flex flex-wrap justify-around items-center p-1'>

                {
                    lastNew && (


                        <article  key={lastNew._id} className={`rounded w-[250px] sm:w-[700px] bg-indigo-50`} itemScope itemType="https://schema.org/NewsArticle" >
                            {/* Imagen del artículo con texto alternativo descriptivo */}
                            <img width={250} height={250} className='w-auto animate rounded sm:w-auto' alt={`Imagen del artículo: ${lastNew.title}`} itemProp='image' src={imageLCP} />

                            <h1 itemProp="headline" className='bg-indigo-50 font-bold text-xl mb-2' > {lastNew.title} </h1>

                            <h2 itemProp="alternativeHeadline" className='font-bold' > {lastNew.subtitle} </h2>

                            <div className='font-bold text-xl border-2 border-indigo-600 bg-indigo-100 rounded p-1 mt-2 hover:bg-indigo-600 hover:text-white w-[10rem] m-auto mb-2' >
                                <Link to={`/newById/${lastNew._id}`} aria-label={`Leer más sobre: ${lastNew.title}`} > Leer más </Link>
                            </div>
                        </article>


                    )
                }
                <div className='w-[250px] m-2 bg-indigo-50 p-2 rounded flex flex-wrap justify-center items-center gap-1 sm:w-[600px] md:justify-around '>
                    {
                        latestNews &&
                        latestNews.map(news => (
                            <article key={news._id} className='rounded w-[200px] h-auto sm:w-[280px] sm:h-full bg-indigo-50 ' itemScope itemType="https://schema.org/NewsArticle" >
                                <img width={200} height={200} className='animate w-auto object-cover rounded' alt={`Imagen del artículo: ${news.title}`} itemProp='image' src={news.thumbnail[0]} />
                                <h1 itemProp="headline" className='bg-indigo-50 font-bold text-lg mb-2 h-[50px] overflow-hidden '>{news.title} </h1>
                                <div className='font-bold text-xl border-2 border-indigo-300 bg-indigo-50 rounded hover:bg-indigo-600 hover:text-white ' >
                                    <Link to={`/newById/${news._id}`} aria-label={`Leer más sobre: ${news.title}`} > Leer más </Link> </div>
                            </article>
                        ))
                    }
                </div>
            </div>






            <div className='mb-10 w-auto' width={500} height={500} >
                <h1 className='text-center text-white mb-5 text-xl'>POLITICA</h1>
                <div className={`flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row sm:justify-center animate`}>
                    {
                        allNews &&
                        allNews.politica.slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 w-auto' width={500} height={500} >
                <h1 className='text-center text-white mb-5 text-xl'>SALUD</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row sm:justify-center animate'>
                    {
                        allNews &&
                        allNews.salud.slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 w-auto' width={500} height={500} >
                <h1 className='text-center text-white mb-5 text-xl'>NOTAS COLOR</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row sm:justify-center'>
                    {
                        allNews &&
                        allNews['notas color'].slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 w-auto' width={500} height={500} >
                <h1 className='text-center text-white mb-5 text-xl'>DEPORTES</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row sm:justify-center'>
                    {
                        allNews &&
                        allNews.deportes.slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 w-auto' width={500} height={500} >
                <h1 className='text-center text-white mb-5 text-xl'>ESPECTACULO</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row sm:justify-center'>
                    {
                        allNews &&
                        allNews.espectaculo.slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 w-auto' width={500} height={500} >
                <h1 className='text-center text-white mb-5 text-xl'>SOCIEDAD</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row sm:justify-center'>
                    {
                        allNews &&
                        allNews.sociedad.slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 w-auto' width={500} height={500} >
                <h1 className='text-center text-white mb-5 text-xl'>CULTURA</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row sm:justify-center'>
                    {
                        allNews &&
                        allNews.cultura.slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>




            <div className='mb-10 w-auto' width={500} height={500} >
                <h1 className='text-center text-white mb-5 text-xl'>MUNDO</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row sm:justify-center'>
                    {
                        allNews &&
                        allNews.mundo.slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>




            <div className='mb-10 w-auto' width={500} height={500} >
                <h1 className='text-center text-white mb-5 text-xl'>DESTACADOS</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row sm:justify-center'>
                    {
                        allNews &&
                        allNews.destacados.slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 w-auto' width={500} height={500} >
                <h1 className='text-center text-white mb-5 text-xl'>ECONOMIA</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row sm:justify-center'>
                    {
                        allNews &&
                        allNews.economia.slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 w-auto' width={500} height={500} >
                <h1 className='text-center text-white mb-5 text-xl'>NOTICIAS BANDEÑAS</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row sm:justify-center'>
                    {
                        allNews &&
                        allNews['noticias bandeñas'].slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>

        

        </div >
    )
}



export default News





























// import { NewsContext } from '../../context/NewsContext'
// import { useContext, useEffect, useState } from 'react'
// import NotesContainer from '../notesContainer/NotesContainer';
// // import Publicidades from '../Publicidades/Publicidades';
// import { Link } from 'react-router-dom';
// import Publicidades from '../Publicidades/Publicidades';
// import { Helmet } from "react-helmet-async"

// const News = () => {
//     const { fetchNews } = useContext(NewsContext);
//     const [loading, setLoading] = useState(true);
//     const [allNews, setAllNews] = useState([]);
//     const [imageLCP, setImageLCP] = useState([])
//     const [lastNew, setLastNew] = useState({})


//     useEffect(() => {
//         const getTheNews = async () => {
//             try {
               
//                 const data = await fetchNews();
//                 if (!data) {
//                     throw new Error("Error al cargar noticias");
//                 }
//                 if (data && data.length > 0) {
//                     setLastNew(data[data.length - 1]);
//                     setAllNews(data);
//                     setLoading(false);
//                     const lstNew = data[data.length - 1];
//                     if (lstNew.thumbnail && lstNew.thumbnail.length > 0) {
//                         setImageLCP(lstNew.thumbnail[0]);
//                         const imgLcp = lstNew.thumbnail[0];
//                         if (imgLcp) {
//                             const link = document.createElement("link");
//                             link.rel = "preload";
//                             link.fetchPriority = "high";
//                             link.as = "image";
//                             link.href = imgLcp;
//                             link.type = "image/webp";
//                             document.head.appendChild(link);

//                         }
//                     }

//                 }
//             } catch (error) {
//                 console.log("error", error)
//                 throw error
//             }
//         }

//         if (loading) {
//             getTheNews();
//         }

//     }, [])



//     if (loading) {
//         return <div className='p-2 m-2 text-5xl text-white text-center mt-36'>Cargando...</div>

//     }
//     return (
//         <div className='p-10 flex flex-col items-center'>
//             <Helmet>
//                 <title>REVISTA URBANA - Inicio</title>
//                 <meta name="description" content="Bienvenido a la página principal de REVISTA URBANA. Descubre las últimas noticias y tendencias urbanas." />
//                 <meta property="og:title" content="REVISTA URBANA - Inicio" />
//                 <meta property="og:description" content="Explora las noticias y tendencias más recientes de la cultura urbana." />
//                 <meta property="og:image" content={imageLCP} />
//             </Helmet>

//             <div className='hover:bg-indigo-800  bg-white p-2 rounded mt-10'><h3 className='text-indigo-800 hover:text-white md:text-4xl'>PARA PUBLICITAR TU ESPACIO, CONTACTANOS A TRAVES DE WHATSAPP</h3></div>
//             <Publicidades categoria={1} altImg='Publicidad gym ateneo' />
//             <div><h1 className='text-center text-white mb-5 text-2xl'>ULTIMAS NOTICIAS</h1></div>
//             <div className='rounded border-b-2 mb-10 w-full  border-gray-900  text-center  flex flex-wrap justify-around items-center p-1'>

//                 {
//                     lastNew && (


//                         <article key={lastNew._id} className='rounded w-[700px] bg-indigo-50 ' itemScope itemType="https://schema.org/NewsArticle" >
//                             {/* Imagen del artículo con texto alternativo descriptivo */}
//                             <img width={300} height={300} className='w-auto rounded' alt={`Imagen del artículo: ${lastNew.title}`} itemProp='image' src={imageLCP} />

//                             <h1 itemProp="headline" className='bg-indigo-50 font-bold text-xl mb-2' > {lastNew.title} </h1>

//                             <h2 itemProp="alternativeHeadline" className='font-bold' > {lastNew.subtitle} </h2>

//                             <div className='font-bold text-xl border-2 border-indigo-600 bg-indigo-100 rounded p-1 mt-2 hover:bg-indigo-600 hover:text-white w-[10rem] m-auto mb-2' >
//                                 <Link to={`/newById/${lastNew._id}`} aria-label={`Leer más sobre: ${lastNew.title}`} > Leer más </Link>
//                             </div>
//                         </article>


//                     )
//                 }
//                 <div className='m-2 bg-indigo-50 p-2 rounded w-[600px]  flex flex-wrap justify-center lg:justify-around items-center gap-1'>
//                     {
//                         allNews.slice(-5, -1).map(news => (
//                             <article key={news._id} className='rounded w-[200px] h-auto sm:w-[280px] sm:h-full bg-indigo-50 ' itemScope itemType="https://schema.org/NewsArticle" >
//                                 <img width={200} height={200} className='w-auto object-cover rounded' alt={`Imagen del artículo: ${news.title}`} itemProp='image' src={news.thumbnail[0]} />
//                                 <h1 itemProp="headline" className='bg-indigo-50 font-bold text-lg mb-2 h-[50px] overflow-hidden '>{news.title} </h1>
//                                 <div className='font-bold text-xl border-2 border-indigo-300 bg-indigo-50 rounded hover:bg-indigo-600 hover:text-white ' >
//                                     <Link to={`/newById/${news._id}`} aria-label={`Leer más sobre: ${news.title}`} > Leer más </Link> </div>
//                             </article>
//                         ))
//                     }
//                 </div>
//             </div>




//             {/* <div className='mb-10 w-auto' width={500} height={500} >
//                 <h1 className='text-center text-white mb-5 text-xl'>TODAS LAS NOTAS</h1>
//                 <div className='flex flex-col  justify-start gap-5 items-center sm:flex-row flex-wrap'>
//                     {
//                         allNews.slice(-4).map(news => (
//                             <div key={news._id}>
//                                 <NotesContainer data={news} />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div> */}


//             <div className='mb-10 w-auto' width={500} height={500} >
//                 <h1 className='text-center text-white mb-5 text-xl'>POLITICA</h1>
//                 <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
//                     {
//                         allNews.filter(news => news.category === 'politica').slice(-4).map(news => (
//                             <div key={news._id}>
//                                 <NotesContainer data={news} />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>


//             <div className='mb-10 w-auto' width={500} height={500} >
//                 <h1 className='text-center text-white mb-5 text-xl'>SALUD</h1>
//                 <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
//                     {
//                         allNews.filter(news => news.category === 'salud').slice(-4).map(news => (
//                             <div key={news._id}>
//                                 <NotesContainer data={news} />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>


//             <div className='mb-10 w-auto' width={500} height={500} >
//                 <h1 className='text-center text-white mb-5 text-xl'>NOTAS COLOR</h1>
//                 <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
//                     {
//                         allNews.filter(news => news.category === 'notas color').slice(-4).map(news => (
//                             <div key={news._id}>
//                                 <NotesContainer data={news} />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>


//             <div className='mb-10 w-auto' width={500} height={500} >
//                 <h1 className='text-center text-white mb-5 text-xl'>DEPORTES</h1>
//                 <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
//                     {
//                         allNews.filter(news => news.category === 'deportes').slice(-4).map(news => (
//                             <div key={news._id}>
//                                 <NotesContainer data={news} />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>


//             <div className='mb-10 w-auto' width={500} height={500} >
//                 <h1 className='text-center text-white mb-5 text-xl'>ESPECTACULO</h1>
//                 <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
//                     {
//                         allNews.filter(news => news.category === 'espectaculo').slice(-4).map(news => (
//                             <div key={news._id}>
//                                 <NotesContainer data={news} />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>


//             <div className='mb-10 w-auto' width={500} height={500} >
//                 <h1 className='text-center text-white mb-5 text-xl'>SOCIEDAD</h1>
//                 <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
//                     {
//                         allNews.filter(news => news.category === 'sociedad').slice(-4).map(news => (
//                             <div key={news._id}>
//                                 <NotesContainer data={news} />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>


//             <div className='mb-10 w-auto' width={500} height={500} >
//                 <h1 className='text-center text-white mb-5 text-xl'>CULTURA</h1>
//                 <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
//                     {
//                         allNews.filter(news => news.category === 'cultura').slice(-4).map(news => (
//                             <div key={news._id}>
//                                 <NotesContainer data={news} />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>




//             <div className='mb-10 w-auto' width={500} height={500} >
//                 <h1 className='text-center text-white mb-5 text-xl'>MUNDO</h1>
//                 <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
//                     {
//                         allNews.filter(news => news.category === 'mundo').slice(-4).map(news => (
//                             <div key={news._id}>
//                                 <NotesContainer data={news} />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>




//             <div className='mb-10 w-auto' width={500} height={500} >
//                 <h1 className='text-center text-white mb-5 text-xl'>DESTACADOS</h1>
//                 <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
//                     {
//                         allNews.filter(news => news.category === 'destacados').slice(-4).map(news => (
//                             <div key={news._id}>
//                                 <NotesContainer data={news} />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>


//             <div className='mb-10 w-auto' width={500} height={500} >
//                 <h1 className='text-center text-white mb-5 text-xl'>ECONOMIA</h1>
//                 <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
//                     {
//                         allNews.filter(news => news.category === 'economia').slice(-4).map(news => (
//                             <div key={news._id}>
//                                 <NotesContainer data={news} />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>


//             <div className='mb-10 w-auto' width={500} height={500} >
//                 <h1 className='text-center text-white mb-5 text-xl'>NOTICIAS BANDEÑAS</h1>
//                 <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
//                     {
//                         allNews.filter(news => news.category === 'noticias bandeñas').slice(-4).map(news => (
//                             <div key={news._id}>
//                                 <NotesContainer data={news} />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>



//         </div >
//     )
// }



// export default News



