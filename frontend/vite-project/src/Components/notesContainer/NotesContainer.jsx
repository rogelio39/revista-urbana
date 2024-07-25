import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const NotesContainer = ({ data }) => {

    const imgWidth = 290
    const imgHeight = 160



    let thumbnailUrl = ''


    if (data) {
        thumbnailUrl = data.thumbnail && data.thumbnail.length > 0 ? `${data.thumbnail[0]}` : '';
    } else {
        return null
    }


    return (
        <>
            <div className='text-center bg-indigo-200 rounded  flex justify-center items-center'>
                <Link  aria-label={`Leer más sobre: ${data.title}`} to={`/newById/${data._id}`}>
                    <article itemScope itemType="https://schema.org/NewsArticle"  className='hover:shadow-indigo-800 hover:shadow-2xl  h-[25rem] shadow-black shadow-md  flex-column justify-between items-center w-72 md:w-44 lg:w-72 ' id={`Imagen del artículo:${data._id}`}>
                        <img width={imgWidth} itemProp='image' height={imgHeight} className='rounded mb-5 object-cover w-full h-52' loading='lazy' src={thumbnailUrl} alt={data.title} />
                        <h1 className='m-3 mb-5 sm:text-sm font-bold md:text-sm'>{data.title}</h1>
                    </article>
                </Link>
            </div>
        </>
    )
}

NotesContainer.propTypes = {
    data: PropTypes.object
}

export default NotesContainer;





/* 
Estilos para consultar

hover:shadow-xl hover:shadow-blue-900




*/