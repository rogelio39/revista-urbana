import PropTypes from 'prop-types'
import New from '../New/New'

const News = () => {

    return (
        <New />
    )
}


News.propTypes = {
    data : PropTypes.object.is.required
}

export default News
