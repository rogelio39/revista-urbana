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
    const [healthyNews, setHealthyNews] = useState('')

    useEffect(() => {
        const getTheNews = async () => {
            const data = await fetchNews();
            if (data) {
                setAllNews(data);
                setLoading(false);
                const lastNew = data.slice(-1)[0];
                const getHealthyNews = data.filter(news => news.category === 'salud');
                setHealthyNews(getHealthyNews);
                setGetLastNew(lastNew);
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
                <h1 className=''>ULTIMAS NOTICIAS</h1>
                <div key={getLastNew._id} >
                    <New data={getLastNew} />
                </div>
            </div>


            <div className='mb-10 ' >
                <h1 className='text-center mb-5 text-xl'>TODAS LAS NOTAS</h1>
                <div className='flex flex-wrap  justify-start gap-5 items-center'>
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
                <h1 className='text-center mb-5 text-xl'>POLITICA</h1>
                <div className='flex justify-start gap-5 items-center'>
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

            <div className='mb-10  '>
                <h1 className='text-center mb-5 text-xl'>SALUD</h1>
                <div className='flex justify-start gap-5 items-center'>
                    {
                        healthyNews.map(news => (
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




/* 
Estilos para consultar, div contenedor del mainsection
p-10 flex justify-between gap-5

*/