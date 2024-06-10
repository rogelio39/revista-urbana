import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { NewsContext } from "../../context/NewsContext";
import New from "../New/New";


const NewsById = () => {
    const { id } = useParams();
    const [newData, setNewData] = useState({});
    const { fetchNewsById } = useContext(NewsContext);
    const [error, setError] = useState(null)



    useEffect(() => {
        const getNewById = async () => {
            try {
                const newById = await fetchNewsById(id);
                if (newById) {
                    setNewData(newById);
                
                } else {
                    setError('La noticia no se encontro');
                }
            } catch (error) {
                console.log("error", error)
                setError('Error al cargar noticia')
            }
        }

        getNewById();




    }, [id])



    return (
        <div className='flex-column m-10 p-5 justify-center items-center '>
            {
                newData  ?  (
                    <New data={newData}/>
                    ) : (<p>{error}</p>) 

            }

        </div>

    )
}



export default NewsById



{/* text.split('\n').map((line, j) => (
                                        <React.Fragment>
                                            {line}
                                            {j < part.split('\n').length - 1 && <br/>}
                                        </React.Fragment>
                                    )) */}

{/* 

index % 2 === 1 ? <span className='mb-4 font-bold' key={index}>{text}</span> :  */}


