import { useState, useRef } from "react"
import { NewsContext } from "../../context/NewsContext";
import { useContext } from "react";
import getCookiesByName from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const AddNew = () => {
    const [subtitles, setSubtitles] = useState(['']);
    const [texts, setTexts] = useState(['']);
    const { createNews, uploadImage } = useContext(NewsContext);
    const formRef = useRef(null)
    const [idNews, setIdNews] = useState();
    const [newsCreated, setNewsCreated] = useState(false)
    const navigate = useNavigate();


const handleSubmitImage = async(e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        const fileInput = document.getElementById('newsImage');
        formData.append('newsImage', fileInput.files[0]); // Obtener el archivo de la entrada de archivos
        if (formData) {
            console.log("data en add", formData)
            const uploadSucces = await uploadImage(idNews, formData);
            if(uploadSucces){
                goToAddNews();
            }
        }
    } catch (error) {
        console.log("Error", error);
    }

}

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataForm = new FormData(formRef.current);
            const data = Object.fromEntries(dataForm);
            const token = getCookiesByName('jwtCookie')
            if (data && token) {
                const response = await createNews(data, token)
                if (response) {
                    console.log("id news en add news", response)
                    setIdNews(response._id);
                    setNewsCreated(true)
                }
            }
        } catch (error) {
            console.log("error", error)
        }
    }


    const handleSubtitleChange = (event, index) => {
        const newSubtitle = [...subtitles];
        newSubtitle[index] = event.target.value;
        setSubtitles(newSubtitle);
    }

    const handleTextChange = (index, event) => {
        const newText = [...texts];
        newText[index] = event.target.value;
        setTexts(newText);
    }

    const addSubtitle = () => {
        setSubtitles([...subtitles]);
    }

    const addText = () => {
        setTexts([...texts]);
    }

    const goToAddNews= () => {
        navigate('/add-news')
    }

    return (
        <div className="m-3 rounded bg-red-300 p-6 my-4 flex items-center justify-center">
            <form ref={formRef} className={!newsCreated ? `shadow-lg rounded p-6 bg-red-100 flex-col items-center` : 'hidden'} onSubmit={handleSubmit}>

                <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-2 flex items-center justify-start gap-5">
                    <label htmlFor="title">Título:</label>
                    <input className="px-2 py-1 rounded-lg border border-blue-300 focus-ring-1" type="text" id="title" name="title" required />
                </div>

                <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 hover:shadow-red-md shadow-md bg-red-100 rounded m-3 p-1 flex items-center justify-start gap-5">

                    <label htmlFor="subtitles">Subtítulos:</label>
                    {subtitles.map((subtitle, index) => (
                        <div key={index}>
                            <input className="px-2 py-1 rounded-lg border border-blue-300 focus-ring-1" type="text" id={`subtitle-${index}`}
                                onChange={(event) => handleSubtitleChange(event, index)} name={`subtitle`} />
                        </div>
                    ))}
                    <button className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" type="button" onClick={addSubtitle}>Agregar Subtítulo</button>
                </div>

                <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 hover:shadow-red-md shadow-md bg-red-100 rounded m-3 p-1 flex items-center justify-start gap-5">
                    <label htmlFor="texts">Textos:</label>
                    {texts.map((text, index) => (
                        <div key={index}>
                            <textarea
                                className="px-2 py-1 rounded-lg border border-blue-300 focus-ring-1"
                                id={`text-${index}`}
                                name={`text`}
                                onChange={(event) => handleTextChange(index, event)}
                                rows="4"
                            />
                        </div>
                    ))}
                    <button className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" type="button" onClick={addText}>Agregar Texto</button>
                </div>

                <button className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1 m-3 w-24 flex items-center justify-center gap-5" type="submit">ENVIAR</button>
                <div className={newsCreated ? 'shadow-lg rounded p-6 bg-red-100 flex-col items-center' : 'hidden'}>Cargando...</div>
            </form>
            <div className={newsCreated ? 'shadow-lg rounded p-6 bg-red-100 flex-col items-center' : 'hidden'}>NOTICA CARGADA CORECTAMENTE</div>

            <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 hover:shadow-red-md shadow-md bg-red-100 rounded m-3 p-1 flex items-center justify-start gap-5">
                <form className="flex items-center gap-2" encType="multipart/form-data">
                    <label htmlFor="newsImage">Imagen de portada:</label>
                    <input onChange={handleSubmitImage} type="file" id="newsImage" name="newsImage" accept="image/*" multiple required />
                    <button onClick={handleSubmitImage} className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" type="button">SUBIR IMAGEN</button>
                </form>
            </div>
        </div>
    )
}


export default AddNew



