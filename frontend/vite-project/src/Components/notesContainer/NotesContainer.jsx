import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


const NotesContainer = ({ data }) => {

    const imgWidth = 290
    const imgHeight = 290


    let thumbnailUrl = ''


    if (data) {
        thumbnailUrl = data.thumbnail && data.thumbnail.length > 0 ? `${data.thumbnail[0]}` : '';
    } else {
        return null
    }


    return (
        <div className='bg-white rounded flex justify-center items-center'>
            <Link to={`/newById/${data._id}`}>
                <div  className='hover:shadow-white hover:shadow-2xl  shadow-white shadow-md h-96  flex-column overflow-hidden w-72 justify-between items-center' id={data._id}>
                    <img width={imgWidth} height={imgHeight} className='rounded mb-5' loading='lazy' src={thumbnailUrl} alt={data.title} />
                    <h1 className='m-3 mb-5 text-xl font-bold'>{data.title}</h1>
                </div>
            </Link>
        </div>
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