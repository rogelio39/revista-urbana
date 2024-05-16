import { useState, useRef, useContext, useEffect, lazy } from "react";
import { NewsContext } from "../../context/NewsContext";
import getCookiesByName from "../../utils/utils";

const URL = import.meta.env.VITE_REACT_APP_WEB_URL;


const New = lazy(() => import('../New/New'))



const AddEditNews = () => {
    const [isCreating, setIsCreating] = useState(true);
    //propiedades de la noticia o atributos
    const [subtitles, setSubtitles] = useState(['']);
    const [categorys, setCategorys] = useState(['']);
    const [font, setFont] = useState('');
    const [texts, setTexts] = useState(['']);
    //metodos de context para crear, actualizar y subir imagenes
    const { createNews, updateNews, uploadImage, fetchNews } = useContext(NewsContext);
    //variables de estado para el id de las noticias, las noticias, el formulario, etc.
    const formRef = useRef(null);
    const [idNews, setIdNews] = useState();
    //estados para saber si la noticia fue creada, si fue actualizada, si la imagen fue subida
    const [newsCreated, setNewsCreated] = useState(false);
    const [newsUpdated, setNewsUpdated] = useState(false)
    const [imageUpload, setImageUpload] = useState(false)
    //estados para guardar objetos de noticia creada y de noticia actualizada
    const [updatedNews, setUpdatedNews] = useState({})
    const [lastNew, setLastNew] = useState({})



    useEffect(() => {
        const getTheNews = async () => {
            const data = await fetchNews();
            if (data) {
                const lstNew = data.slice(-1)[0];
                setLastNew(lstNew);
            }
        }

        getTheNews();
    }, [imageUpload])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataForm = new FormData(formRef.current);
            let data = Object.fromEntries(dataForm);
            const token = getCookiesByName('jwtCookie');

            const textWithBold = texts.map(text => text.replace(/<<(.*?)>>/g, '**$1**'));
            const textWithBoldString = textWithBold.join('\n');
            data.text = textWithBoldString;

            if (token) {
                if (isCreating) {
                    const response = await createNews(data, token);
                    if (response) {
                        setIdNews(response._id);
                        setNewsCreated(true);
                    }
                } else {
                    const newsUpdated = await updateNews(idNews, data, token);
                    if (newsUpdated) {
                        setUpdatedNews(newsUpdated);
                        setNewsUpdated(true)
                    }
                    // Handle update success
                }
            }
        } catch (error) {
            console.log("error", error)
        }
    };

    const handleSubmitImage = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            const fileInput = document.getElementById('newsImage');
            formData.append('newsImage', fileInput.files[0]); // Obtener el archivo de la entrada de archivos
            if (formData) {
                const uploadSucces = await uploadImage(idNews, formData);
                if (uploadSucces == "imagen creada exitosamente") {
                    console.log(uploadSucces)
                    setImageUpload(true);
                }

            }
        } catch (error) {
            console.log("Error", error);
        }

    }




    // Other event handlers and helper functions

    const handleSubtitleChange = (event, index) => {
        const newSubtitle = [...subtitles];
        newSubtitle[index] = event.target.value;
        setSubtitles(newSubtitle);
    }


    const handleCategoryChange = (event, index) => {
        const newCategorys = [...categorys];
        newCategorys[index] = event.target.value;
        setCategorys(newCategorys);
    }

    const handleChangeFont = (event) => {
        setFont(event.target.value)
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

    const addCategory = () => {
        setCategorys([...categorys]);
    }




    return (
        <div className="flex-col gap-5">
            <div className="m-3 rounded bg-red-300 p-6 my-4 flex flex-wraps items-center justify-center">


                <form ref={formRef} className={!newsCreated ? 'shadow-lg rounded p-6 bg-red-100 flex flex-col items-center' : 'hidden'} onSubmit={handleSubmit}>
                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-2 flex items-center justify-start gap-5">
                        <label htmlFor="title">Título:</label>
                        <input className="px-2 py-1 rounded-lg border border-blue-300 focus:ring-1" type="text" id="title" name="title" required />
                    </div>

                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-1 flex items-center justify-start gap-5">
                        <label>Subtítulos:</label> {/* No necesita htmlFor porque se generarán múltiples entradas */}
                        {subtitles.map((subtitle, index) => (
                            <div key={index}>
                                <label htmlFor={`subtitle-${index}`}>Subtítulo {index + 1}:</label> {/* Asociando con el id único */}
                                <input
                                    className="px-2 py-1 rounded-lg border border-blue-300 focus:ring-1"
                                    type="text"
                                    id={`subtitle-${index}`}
                                    onChange={(event) => handleSubtitleChange(event, index)}
                                    name={`subtitle-${index}`} // Asegúrate de que el valor se renderice correctamente
                                    value={subtitle}
                                />
                            </div>
                        ))}
                        <button className="hover:bg-blue-500 hover:text-white shadow-md bg-blue-200 p-2 rounded focus:ring-1" type="button" onClick={addSubtitle}>Agregar Subtítulo</button>
                    </div>

                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-1 flex items-center justify-start gap-5">
                        <label>Categorías:</label> {/* No necesita htmlFor porque se generarán múltiples entradas */}
                        {categorys.map((category, index) => (
                            <div key={index}>
                                <label htmlFor={`category-${index}`}>Categoría {index + 1}:</label> {/* Asociando con el id único */}
                                <input
                                    className="px-2 py-1 rounded-lg border border-blue-300 focus:ring-1"
                                    type="text"
                                    id={`category-${index}`}
                                    onChange={(event) => handleCategoryChange(event, index)}
                                    name={`category-${index}`} // Asegúrate de que el valor se renderice correctamente
                                    value={category}
                                />
                            </div>
                        ))}
                        <button className="hover:bg-blue-500 hover:text-white shadow-md bg-blue-200 p-2 rounded focus:ring-1" type="button" onClick={addCategory}>Agregar Categoría</button>
                    </div>

                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-1 flex items-center justify-start gap-5">
                        <select name="font" value={font} onChange={handleChangeFont} className="px-2 py-1 rounded-lg border border-blue-300 focus:ring-1">
                            <option value="font-sans">Font-sans</option>
                            <option value="font-serif">Font-serif</option>
                            <option value="font-mono">Font-mono</option>
                        </select>
                    </div>

                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-1 flex items-center justify-start gap-5">
                        <label>Textos:</label> {/* No necesita htmlFor porque se generarán múltiples entradas */}
                        {texts.map((text, index) => (
                            <div key={index}>
                                <label htmlFor={`text-${index}`}>Texto {index + 1}:</label> {/* Asociando con el id único */}
                                <textarea
                                    className="whitespace-pre-line px-2 py-1 rounded-lg border border-blue-300 focus:ring-1"
                                    id={`text-${index}`}
                                    name={`text-${index}`} // Asegúrate de que el valor se renderice correctamente
                                    onChange={(event) => handleTextChange(index, event)}
                                    rows="24"
                                    cols="80"
                                    value={text}
                                />
                            </div>
                        ))}
                        <button className="hover:bg-blue-500 hover:text-white shadow-md bg-blue-200 p-2 rounded focus:ring-1" type="button" onClick={addText}>Agregar Texto</button>
                    </div>

                    <button className="hover:bg-blue-500 hover:text-white shadow-md bg-blue-200 p-2 rounded focus:ring-1 m-3 w-24 flex items-center justify-center gap-5" type="submit">
                        {newsCreated ? 'cargando' : (isCreating ? 'crear' : 'actualizar')}
                    </button>
                </form>

                <div className={newsCreated ? 'shadow-lg rounded p-6 bg-red-100 flex flex-col items-center' : 'hidden'}>NOTICIA CARGADA CORRECTAMENTE</div>

                <div>
                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-1 flex flex-col items-center justify-center gap-5">
                        <form className="flex items-center gap-2" encType="multipart/form-data">
                            <label htmlFor="newsImage">Imagen de portada:</label>
                            <input type="file" id="newsImage" name="newsImage" accept="image/*" multiple required />
                            <button onClick={handleSubmitImage} className="hover:bg-blue-500 hover:text-white shadow-md bg-blue-200 p-2 rounded focus:ring-1" type="button">SUBIR IMAGEN</button>
                        </form>
                    </div>
                </div>
                
                    <div className="flex items-center justify-center">
                        <button className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" onClick={() => setIsCreating(!isCreating)}>
                            {isCreating ? 'Cambiar para editar' : 'Cambiar para crear'}
                        </button>
                    </div>

                </div>
            </div>
            <div>
                {
                    newsCreated && imageUpload ?
                        <div className="m-4 p-4">
                            <h1 className="bg-red-200 text-center font-bold text-xl">Noticia `{lastNew.title}` actualizada correctamente</h1>
                            <New data={lastNew} />
                        </div>
                        : <p className="hidden"></p>},
            </div>
            <div>
                {
                    newsUpdated && imageUpload && updatedNews.thumbnail.length > 0 ? <div className="flex-column m-10 p-5 justify-center items-center">
                        <h1 className='mb-5 text-xl font-bold'>{updatedNews.title}</h1>
                        <img className='rounded mb-5' src={updatedNews.thumbnail.length > 0`${URL}/uploads/news/${updatedNews.thumbnail[0].name}`} alt="imagen" />
                        <h2 className='font-bold'>{updatedNews.subtitle}</h2>
                        <p>{updatedNews.text}</p>
                    </div> : <p className="hidden"></p>
                }
            </div>

        </div>
    )
}



export default AddEditNews;





















// const textWithBold = texts.map(text => {
//     const regex = /<<([^>]*)>>/;
//     const match = text.match(regex);
//     if (match) {
//         const textBefore = text.split(match[0])[0];
//         const textEnNegrita = match[1];
//         const textAfter = text.split(match[0])[1]
//         return `${textBefore} **${textEnNegrita}** ${textAfter}`
//     }

//     return text;
// })
