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
            <div className='bg-slate-200 text-center rounded flex justify-center items-center '>
                <Link  aria-label={`Leer más sobre: ${data.title}`} to={`/newById/${data._id}`}>
                    <div className='hover:shadow-slate-600 hover:shadow-2xl  h-[25rem] shadow-slate-500 shadow-md  flex-column overflow-hidden justify-between items-center sm:w-96' id={`Imagen del artículo:${data._id}`}>
                        <img width={imgWidth} height={imgHeight} className='rounded mb-5 object-cover w-full h-52' loading='lazy' src={thumbnailUrl} alt={data.title} />
                        <h1 className='m-3 mb-5 sm:text-xl font-bold'>{data.title}</h1>
                    </div>
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