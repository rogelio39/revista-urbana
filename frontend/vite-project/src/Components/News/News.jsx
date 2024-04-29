import New from '../New/New'
import { NewsContext } from '../../context/NewsContext'
import { useContext, useEffect, useState } from 'react'
import NotesContainer from '../notesContainer/NotesContainer';


const News = () => {
    const { fetchNews } = useContext(NewsContext);
    const [loading, setLoading] = useState(true);
    const [allNews, setAllNews] = useState(null);



    useEffect(() => {
        const getTheNews = async () => {
            const data = await fetchNews();
            if (data) {
                setAllNews(data);
                setLoading(false);
            }
        }

        getTheNews();
    }, [])


    if (loading) {
        return <div>Cargando...</div>
    }
    return (
        <div className='p-10 flex justify-between gap-20 items-center'>

            
            <div className='border-r border-gray-400 h-96 overflow-hidden flex flex-wrap justify-between items-center  p-1'>
                <h1 className=''>ULTIMAS NOTICIAS</h1>
                {
                    allNews.map(news => (
                        <div key={news._id} >
                            <New data={news} />
                        </div>
                    ))
                }
            </div>

            <div className='h-96'>
                <h1>NOTAS</h1>
                <div className='overflow-hidden flex flex-wrap justify-between items-center'>
                {
                    allNews.map(news => (
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
