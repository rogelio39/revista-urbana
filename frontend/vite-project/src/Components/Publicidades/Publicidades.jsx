import PropTypes from 'prop-types'

const Publicidades = ({categoria, altImg}) => {

const imgWidth = 400
const imgHeight = 100

    return (
        <div className='z-1 flex justify-center items-center p-10'>
            {
                categoria === 0 ? (
                    <div className='text-xs flex justify-center items-center'>
                        <img className='w-[auto] h-[130px] sm:w-[auto] sm:h-[250px] md:w-[auto] md:h-[300px] lg:w-[auto]' width={imgWidth} height={imgHeight}  src='../../publicidad-atenea.jpg' alt={altImg} />
                    </div>
                ) :  <div className='w-[200px] h-[100px] sm:w-[500px] sm:h-[200px] md:w-[600px] md:h-[250px] lg:w-[900px] lg:h-[300px] text-sm lg:text-2xl '>
                    <img src='../../publicidad-atenea.jpg' alt={altImg} />
                </div>
            }

        </div>
    )
}


Publicidades.propTypes = {
    categoria: PropTypes.string.isRequired,
    altImg : PropTypes.string.isRequiered
}

export default Publicidades







// {
//     categoria === 0 ? (
//         <div className='w-[200px] h-[100px] text-xs flex justify-center items-center bottom-10 fixed  sm:top-44 sm:w-[500px] sm:h-[200px]  md:w-[600px] md:h-[250px] lg:text-2xl lg:w-[900px] lg:h-[300px] lg:top-56'>
//             <img width={imgWidth} height={imgHeight}  src='../../publicidad-atenea.jpg' alt={altImg} />
//         </div>
//     ) :  <div className='w-[200px] h-[100px] sm:w-[500px] sm:h-[200px] md:w-[600px] md:h-[250px] lg:w-[900px] lg:h-[300px] text-sm lg:text-2xl '>
//         <img src='../../publicidad-atenea.jpg' alt={altImg} />
//     </div>
// }