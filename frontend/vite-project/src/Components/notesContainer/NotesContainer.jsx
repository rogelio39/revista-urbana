import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
const URL = import.meta.env.VITE_REACT_APP_LOCAL_URL;

const NotesContainer = ({ data }) => {

    let thumbnailUrl = ''

    if (data) {
        thumbnailUrl = data.thumbnail && data.thumbnail.length > 0 ? `${URL}/uploads/news/${data.thumbnail[0].name}` : '';
    }
    return (
        <Link to={`/newById/${data._id}`}>
            <div className='hover:bg-blue-300 hover:shadow-xl flex-column w-96 m-10 p-5 justify-center items-center bg-blue-100' id={data._id}>
                <img className='rounded mb-5' src={thumbnailUrl} alt="imagen" />
                <h1 className='mb-5 text-xl font-bold'>{data.title}</h1>
            </div>
        </Link>
    )
}

NotesContainer.propTypes = {
    data: PropTypes.object.isRequired
}

export default NotesContainer;
