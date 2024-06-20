import PropTypes from 'prop-types'

const Publicidades = ({text , categoria}) => {


    console.log("categoria", categoria)
    return (
        <div className='z-1 flex justify-center items-center p-10'>
            {
                categoria === 0 ? (
                    <div className='w-[200px] h-[100px] text-xs flex justify-center items-center bg-red-600 top-36 fixed  text-center sm:top-44 sm:w-[500px] sm:h-[200px]  md:w-[600px] md:h-[250px] lg:text-2xl lg:w-[900px] lg:h-[300px] lg:top-56'>{text}</div>
                ) :  <div className='w-[200px] h-[100px] sm:w-[500px] sm:h-[200px] md:w-[600px] md:h-[250px] lg:w-[900px] lg:h-[300px] text-sm lg:text-2xl bg-red-600 text-center'>{text}</div>
            }


        </div>
    )
}


Publicidades.propTypes = {
    text : PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired
}

export default Publicidades
