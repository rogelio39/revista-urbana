import { useContext, useState, useEffect } from "react";
import { NewsContext } from "../../context/NewsContext";
import { lazy } from "react";
import PropTypes from 'prop-types'

const New = lazy(() => import('../New/New'))

const AddImage = ({idNews}) => {
    const [file, setFile] = useState(null);
    const [imageUpload, setImageUpload] = useState(false)
    const { uploadImage, fetchNews } = useContext(NewsContext)
    const [lastNew, setLastNew] = useState({})


    useEffect(() => {
        const getTheNews = async () => {
            try {
                const data = await fetchNews();
                if (data) {
                    const lstNew = data.slice(-1)[0];
                    setLastNew(lstNew);
                }

            } catch (error) {
                console.log("error", error)
            }
        }

        getTheNews();
    }, [imageUpload])

    const handleSubmitImage = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            const fileInput = document.getElementById('newsImage');
            formData.append('newsImage', fileInput.files[0]); // Obtener el archivo de la entrada de archivos
            if (formData) {
                const uploadSucces = await uploadImage(idNews, formData);
                if (uploadSucces == "Imagen creada exitosamente") {
                    console.log(uploadSucces)
                    setImageUpload(true);
                }

            }
        } catch (error) {
            console.log("Error", error);
        }

    }

    return (
        <>
            <div className="mt-2 flex flex-col justify-center items-center bg-blue-300 ml-2 rounded">
                <div className="w-72 hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-2 flex flex-col items-center justify-start gap-5 sm:flex-row sm:w-auto">
                    <form className="flex flex-col sm:flex-row items-center gap-2 " encType="multipart/form-data">
                        <label htmlFor="newsImage">Imagen de portada:</label>
                        <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" id="newsImage" className="w-64" name="newsImage" accept="image/*" multiple required />
                        {
                            !imageUpload &&
                            (
                                <button onClick={handleSubmitImage} className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1 sm:text-xl" type="button">SUBIR IMAGEN</button>
                            )
                        }
                    </form>
                </div>
                <div className="p-4 flex justify-center">

                    {
                        file && (
                            <img className="w-1/2" src={URL.createObjectURL(file)} />
                        )
                    }
                </div>

            </div>
            <div>
                {
                    imageUpload ?
                        <div className="m-4 p-4">
                            <h1 className="bg-blue-400 text-white text-center font-bold text-xl">Imagen agregada correctamente. La noticia esta asi:</h1>
                            <New data={lastNew} />
                        </div>
                        : <p className="hidden"></p>},
            </div>
        </>

    )
}


AddImage.propTypes = {
    idNews: PropTypes.string.isRequired
}

export default AddImage
