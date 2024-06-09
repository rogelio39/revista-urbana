import New from '../New/New'
import { NewsContext } from '../../context/NewsContext'
import { useContext, useEffect, useState } from 'react'
import NotesContainer from '../notesContainer/NotesContainer';


const News = () => {
    const { fetchNews } = useContext(NewsContext);
    const [loading, setLoading] = useState(true);
    const [allNews, setAllNews] = useState([]);

    useEffect(() => {
        const getTheNews = async () => {
            try {
                const data = await fetchNews();
                if (data) {
                    console.log("data", data)
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
        return <div>Cargando...</div>
    }
    return (
        <div className='p-10 flex flex-col'>

            <div className='border-b mb-10 border-gray-400 flex flex-wrap justify-between items-center  p-1'>
                <h1 className='text-white'>ULTIMAS NOTICIAS</h1>
                {
                    allNews.length > 0 && (

                        <div key={allNews._id} >
                            <New data={allNews[allNews.length -1 ]} />
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
                        allNews.map(news => (
                            news.category === 'politica' ?
                                <div key={news._id}>
                                    <NotesContainer data={news.slice(-4)} />
                                </div> : ''
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



        </div>
    )
}



export default News


