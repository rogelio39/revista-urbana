import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


const NotesContainer = ({ data }) => {

    return (
        <div className='bg-white rounded flex justify-center items-center'>
            <Link to={`/newById/${data._id}`}>
                <div className='hover:shadow-white hover:shadow-2xl  shadow-white shadow-md  flex-column h-96 overflow-hidden w-72 justify-between items-center' id={data._id}>
                    <img className='rounded mb-5 h-56' loading='lazy' src={data.thumbnail[0]} alt={data.title} />
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