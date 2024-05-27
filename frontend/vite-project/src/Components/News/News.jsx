import New from '../New/New'
import { NewsContext } from '../../context/NewsContext'
import { useContext, useEffect, useState } from 'react'
import NotesContainer from '../notesContainer/NotesContainer';
// import HealthyNews from '../HealthyNews/HealthyNews';


const News = () => {
    const { fetchNews } = useContext(NewsContext);
    const [loading, setLoading] = useState(true);
    const [allNews, setAllNews] = useState(null);
    const [getLastNew, setGetLastNew] = useState(null)

    useEffect(() => {
        const getTheNews = async() => {
            try {
                const data = await fetchNews();
                if (data) {
                    setAllNews(data);
                    setLoading(false);
                    const lastNew = data.slice(-1)[0];
                    setGetLastNew(lastNew);
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
                <div key={getLastNew._id} >
                    <New data={getLastNew} />
                </div>
            </div>


            <div className='mb-10 ' >
                <h1 className='text-center text-white mb-5 text-xl'>TODAS LAS NOTAS</h1>
                <div className='flex flex-col  justify-start gap-5 items-center sm:flex-row flex-wrap'>
                    {
                        allNews.map(news => (
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
                                    <NotesContainer data={news} />
                                </div> : ''
                        ))
                    }
                </div>
            </div>

            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>SALUD</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.map(news => (
                            news.category === 'salud' ?
                                <div key={news._id}>
                                    <NotesContainer data={news} />
                                </div> : ''
                        ))
                    }
                </div>
            </div>

            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>NOTAS COLOR</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.map(news => (
                            news.category === 'notas color' ?
                                <div key={news._id}>
                                    <NotesContainer data={news} />
                                </div> : ''
                        ))
                    }
                </div>
            </div>

            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>DEPORTES</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.map(news => (
                            news.category === 'deportes' ?
                                <div key={news._id}>
                                    <NotesContainer data={news} />
                                </div> : ''
                        ))
                    }
                </div>
            </div>

            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>ESPECTACULO</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.map(news => (
                            news.category === 'espectaculo' ?
                                <div key={news._id}>
                                    <NotesContainer data={news} />
                                </div> : ''
                        ))
                    }
                </div>
            </div>

            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>SOCIEDAD</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.map(news => (
                            news.category === 'sociedad' ?
                                <div key={news._id}>
                                    <NotesContainer data={news} />
                                </div> : ''
                        ))
                    }
                </div>
            </div>

            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>CULTURA</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.map(news => (
                            news.category === 'cultura' ?
                                <div key={news._id}>
                                    <NotesContainer data={news} />
                                </div> : ''
                        ))
                    }
                </div>
            </div>

            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>MUNDO</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.map(news => (
                            news.category === 'mundo' ?
                                <div key={news._id}>
                                    <NotesContainer data={news} />
                                </div> : ''
                        ))
                    }
                </div>
            </div>

            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>DESTACADOS</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.map(news => (
                            news.category === 'destacados' ?
                                <div key={news._id}>
                                    <NotesContainer data={news} />
                                </div> : ''
                        ))
                    }
                </div>
            </div>

            <div className='mb-10 '>
                <h1 className='text-center text-white mb-5 text-xl'>ECONOMIA</h1>
                <div className='flex flex-col flex-wrap justify-start gap-5 items-center sm:flex-row'>
                    {
                        allNews.map(news => (
                            news.category === 'economia' ?
                                <div key={news._id}>
                                    <NotesContainer data={news} />
                                </div> : ''
                        ))
                    }
                </div>
            </div>



        </div>
    )
}



export default News


