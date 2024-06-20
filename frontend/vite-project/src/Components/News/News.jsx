import New from '../New/New'
import { NewsContext } from '../../context/NewsContext'
import { useContext, useEffect, useState } from 'react'
import NotesContainer from '../notesContainer/NotesContainer';
import Publicidades from '../Publicidades/Publicidades';


const News = () => {
    const { fetchNews } = useContext(NewsContext);
    const [loading, setLoading] = useState(true);
    const [allNews, setAllNews] = useState([]);

    useEffect(() => {
        const getTheNews = async () => {
            try {
                const data = await fetchNews();
                if (data) {
                    setAllNews(data);
                    setLoading(false);
                }
            } catch (error) {
                console.log("error", error)
            }
        }

        getTheNews();
    }, [])



    if (loading) {
        return <div className='mt-36'>Cargando...</div>

    }
    return (
        <div className='p-10 flex flex-col items-center'>

            <Publicidades categoria={0} text= 'PUBLICITA TU NEGOCIO AQUI (CATEGORIA 0)' />


            <div className='border-b-2 mb-10 w-full max-w-screen-lg border-gray-900  text-center  flex flex-wrap justify-center mt-56 items-center  p-1'>
            <Publicidades categoria= {1} text= 'PUBLICITA TU NEGOCIO AQUI (CATEGORIA 1)' />
                {
                    allNews.length > 0 && (

                        <div key={allNews._id} >
                            <h1 className='text-slate-900 text-1xl sm:text-2xl'>ULTIMAS NOTICIAS</h1>
                            <New data={allNews[allNews.length - 1]} />
                        </div>

                    )
                }
            </div>




            <div className='mb-10 ' >
                <h1 className='text-center text-white mb-5 text-xl'>TODAS LAS NOTAS</h1>
                <div className='flex flex-col  justify-start gap-5 items-center sm:flex-row flex-wrap'>
                    {
                        allNews.slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>POLITICA</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.filter(news => news.category === 'politica').slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>SALUD</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.filter(news => news.category === 'salud').slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>NOTAS COLOR</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.filter(news => news.category === 'notas color').slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>DEPORTES</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.filter(news => news.category === 'deportes').slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>ESPECTACULO</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.filter(news => news.category === 'espectaculo').slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>SOCIEDAD</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.filter(news => news.category === 'sociedad').slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>CULTURA</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.filter(news => news.category === 'cultura').slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>




            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>MUNDO</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.filter(news => news.category === 'mundo').slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>

    


            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>DESTACADOS</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.filter(news => news.category === 'destacados').slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>

        
            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>ECONOMIA</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.filter(news => news.category === 'economia').slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>NOTICIAS BANDEÑAS</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.filter(news => news.category === 'noticias bandeñas').slice(-4).map(news => (
                            <div key={news._id}>
                                <NotesContainer data={news} />
                            </div>
                        ))
                    }
                </div>
            </div>



        </div>
    )
}



export default News


