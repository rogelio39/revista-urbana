import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const URL = import.meta.env.VITE_REACT_APP_MODE == 'DEV' ? import.meta.env.VITE_REACT_APP_LOCAL_URL : import.meta.env.VITE_REACT_APP_WEB_URL;


const NotesContainer = ({ data }) => {

    let thumbnailUrl = ''

    if (data) {
        thumbnailUrl = data.thumbnail && data.thumbnail.length > 0 ? `${URL}/uploads/news/${data.thumbnail[0].name}` : '';
    }
    return (
        <Link to={`/newById/${data._id}`}>
            <div className='hover:shadow-xl  shadow-md flex-column h-96 overflow-hidden w-72 m-1 justify-between items-center' id={data._id}>
                <img className='rounded mb-5 h-56' src={thumbnailUrl} alt="imagen" />
                <h1 className='mb-5 text-xl font-bold'>{data.title}</h1>
            </div>
        </Link>
    )
}

NotesContainer.propTypes = {
    data: PropTypes.object.isRequired
}

export default NotesContainer;





/* 
Estilos para consultar

hover:shadow-xl hover:shadow-blue-900




*/