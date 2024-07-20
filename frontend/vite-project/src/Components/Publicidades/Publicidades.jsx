import PropTypes from 'prop-types'
import { NewsContext } from '../../context/NewsContext'
import { useContext, useEffect, useState } from 'react'

const Publicidades = () => {
    const {fetchAllPublicities} = useContext(NewsContext);
    const [allPublicities, setAllPublicities] = useState();
    useEffect(() => {
            const getPublicities = async() => {
                const publicities = await fetchAllPublicities();
                if (publicities){
                    console.log("publicities");
                    setAllPublicities(publicities)
                }
            }

            getPublicities();
    }, [])

const imgWidth = 250
const imgHeight = 100

    return (
        <div className='z-1 flex justify-center items-center p-10 mt-6'>
            {
                allPublicities && allPublicities.map(publicity => 

                    <div className='text-xs flex justify-center items-center' key={publicity._id}>
                        <img className='w-60 sm:object-cover sm:w-auto' width={imgWidth} height={imgHeight} src={publicity.thumbnail[0]} alt={publicity.name} />
                    </div>

                )
            }
        </div>
    )
}


Publicidades.propTypes = {
    categoria: PropTypes.number.isRequired,
    altImg : PropTypes.string.isRequired
}

export default Publicidades




// {
//     categoria === 0 ? (
//         <div className='text-xs flex justify-center items-center'>
//             <img className='w-60 sm:object-cover sm:w-auto' width={imgWidth} height={imgHeight}  src='../../publicidad-atenea.webp' alt={altImg} />
//         </div>
//     ) :  <div className='w-60 sm:object-cover sm:w-full '>
//         <img src='../../publicidad-atenea.webp' alt={altImg} />
//     </div>
// }

