import PropTypes from 'prop-types'

const New = ({ data }) => {
    return (
        <div id={data._id}>
            <h1>{data.title}</h1>
            <img src={data.thumbnail} alt="" />
            <p>{data.text}</p>
        </div>
    )
}

New.propTypes = {
    data: PropTypes.object.isRequired
}

export default New
