import { useState, useRef, useContext, lazy } from "react";
import { NewsContext } from "../../context/NewsContext";
import getCookiesByName from "../../utils/utils";
import New from "../New/New";

const AddImage = lazy(() => import('../AddImage/AddImage'));


const AddEditNews = () => {
    //propiedades de la noticia o atributos
    const [subtitles, setSubtitles] = useState(['']);
    const [categorys, setCategorys] = useState(['']);
    const [font, setFont] = useState('');
    const [texts, setTexts] = useState(['']);
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState('')
    const [url, setUrl] = useState('');
    const [currentUrl, setCurrentUrl] = useState('')
    //metodos de context para crear, actualizar y subir imagenes
    const { createNews, updateNews, delNews } = useContext(NewsContext);
    //variables de estado para el id de las noticias, las noticias, el formulario, etc.
    const formRef = useRef(null);
    const [idNews, setIdNews] = useState();
    //estados para saber si la noticia fue creada, si fue actualizada, si la imagen fue subida
    const [newsCreated, setNewsCreated] = useState(false);
    //estados para guardar objetos de noticia creada y de noticia actualizada
    const [isCreating, setIsCreating] = useState(true);
    const [updatedNews, setUpdatedNews] = useState({});
    const [newsUpdated, setNewsUpdated] = useState(false);
    const [newDelete, setNewDelete] = useState(false);


    //Funcion para manejar creacion o actualizacion de noticia
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataForm = new FormData(formRef.current);
            let data = Object.fromEntries(dataForm);
            const token = getCookiesByName('jwtCookie');
            const textWithBold = texts.map(text => text.replace(/<<(.*?)>>/g, '**$1**'));
            const textWithBoldString = textWithBold.join('\n');
            data.text = textWithBoldString;
            data.tags = tags;
            data.url = url;
            console.log("url", url)
            console.log("Data", data.url)

            if (token) {
                if (isCreating) {
                    const response = await createNews(data, token);
                    if (response) {
                        setIdNews(response._id);
                        setNewsCreated(true);
                        setNewDelete(false)
                        resetForm();
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


    const resetForm = () => {
        formRef.current.reset();
        setSubtitles(['']);
        setCategorys(['']);
        setTexts(['']);
        setTags([]);
        setUrl('');
        setFont('font-sanzs');
        setCurrentTag('');
        setCurrentUrl('');
    };


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

    const handleTags = (event) => {
        setCurrentTag(event.target.value);
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

    const addTags = () => {

        if (currentTag.trim() != '') {
            setTags([...tags, currentTag.trim()]);
            setCurrentTag('');
        }

    }

    const handleUrl = (e) => {

        setCurrentUrl(e.target.value)
    }

    const addUrl = () => {
        console.log("url", currentUrl)
        setUrl(currentUrl)
        setCurrentUrl('');
    }
    const deleteNew = async () => {
        if (idNews) {
            const deleteNew = await delNews(idNews);
            if (deleteNew) {
                setNewDelete(true)
            }
        }
    }


    return (
        <div className="text-sm sm:text-xl gap-5 mt-40">
            <div className="flex flex-col bg-red-200 m-3 rounded p-6 my-4  sm:flex-row flex-wraps items-center justify-center">
                <form ref={formRef} className={`m-2 sm:shadow-lg w-72 sm:w-auto sm:p-6 shadow-md rounded  bg-red-100 flex-col items-center`} onSubmit={handleSubmit}>

                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-2 flex flex-col sm:flex-row items-center justify-start gap-5">
                        <label htmlFor="title">Título:</label>
                        <input className="px-2 py-1 rounded-lg border border-blue-300 focus-ring-1" type="text" id="title" name="title" required />
                    </div>

                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-2 flex flex-col sm:flex-row items-center justify-start gap-5">

                        <label htmlFor="subtitles">Subtítulos:</label>
                        {subtitles.map((subtitle, index) => (
                            <div key={index}>
                                <input className="px-2 py-1 rounded-lg border border-blue-300 focus-ring-1" type="text" id={`subtitle-${index}`}
                                    onChange={(event) => handleSubtitleChange(event, index)} name={`subtitle`} />
                            </div>
                        ))}
                        <button className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" type="button" onClick={addSubtitle}>Agregar Subtítulo</button>
                    </div>

                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-2 flex flex-col sm:flex-row items-center justify-start gap-5">

                        <label htmlFor="category">Categorias:</label>
                        {categorys.map((category, index) => (
                            <div key={index}>
                                <input className="px-2 py-1 rounded-lg border border-blue-300 focus-ring-1" type="text" id={`category-${index}`}
                                    onChange={(event) => handleCategoryChange(event, index)} name={`category`} />
                            </div>
                        ))}
                        <button className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" type="button" onClick={addCategory}>Agregar Categoria</button>
                    </div>

                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-2 flex flex-col sm:flex-row items-center justify-start  gap-5">
                        <label htmlFor="pieDeImagen">Agregar pie de imagen</label>
                        <input type="text" name="pieDeImagen" id='pieDeImagen' />
                    </div>

                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-2 flex flex-col sm:flex-row items-center justify-start gap-5">

                        <select name="font" value={font} onChange={handleChangeFont}>
                            <option value="font-sanzs">Font-sanzs</option>
                            <option value="font-serif">Font-serif</option>
                            <option value="font-mono">Font-mono</option>
                        </select>
                    </div>

                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-2 flex flex-col sm:flex-row items-center justify-start  gap-5">
                        <label htmlFor="texts">Textos:</label>
                        {texts.map((text, index) => (
                            <div key={index}>
                                <textarea
                                    className="w-60 whitespace-pre-line px-2 py-1 rounded-lg border border-blue-300 focus-ring-1"
                                    id={`text-${index}`}
                                    name={`text`}
                                    onChange={(event) => handleTextChange(index, event)}
                                    rows="24"
                                    cols="40"
                                    value={text} // Renderizar el valor del textarea si es un string simple
                                />
                            </div>
                        ))}
                        <button className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" type="button" onClick={addText}>Agregar Texto</button>

                    </div>

                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-2 flex flex-col sm:flex-row items-center justify-start  gap-5">
                        <label htmlFor="tags">Tags:</label>
                        <input onChange={handleTags} type="text" id='tags' name="tags" />
                        <button className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" type="button" onClick={addTags}>Agregar Tag</button>

                    </div>
                    <div className="hover:shadow-xl hover:shadow-red-400 transition-shadow duration-700 shadow-md bg-red-100 rounded m-3 p-2 flex flex-col sm:flex-row items-center justify-start  gap-5">
                        <label htmlFor="url">Url de youtube:</label>
                        <input onChange={handleUrl} type="text" id='url' name="url" />
                        <button className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" type="button" onClick={addUrl}>Agregar Url</button>

                    </div>
                    <div className="flex justify-center items-center">
                        <button className=" hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1 w-24 mb-2" type="submit">{isCreating ? 'crear' : 'actualizar'}</button>
                    </div>

                </form>

                <div className="flex flex-col justify-center items-center">
                    <div className={newsCreated ? 'm-2 shadow-lg rounded p-6 bg-green-500  flex flex-col items-center sm:hover:bg-white sm:hover:text-green-500 sm:hover:shadow-2xl sm:hover:shadow-green-500' : 'hidden'}>{newsCreated && !newDelete ? 'NOTICA CARGADA CORECTAMENTE' : 'NOTICIA ELIMINADA CORRECTAMENTE'}</div>

                    <button onClick={deleteNew} className={newsCreated ? 'm-2 p-2 shadow-md bg-red-500 rounded sm:hover:bg-white sm:hover:shadow-xl sm:hover:text-red-500 sm:hover:shadow-red-500' : 'hidden'}>Eliminar noticia</button>
                    <div className="flex items-center justify-center mt-2">
                        <button className="mb-2 hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" onClick={() => setIsCreating(!isCreating)}>
                            {isCreating ? 'Cambiar para editar' : 'Cambiar para crear'}
                        </button>
                    </div>

                </div>
            </div>
            {
                idNews && (<AddImage idNews={idNews} />)
            }
            <>
                <h2 className="text-center bg-blue-800 text-white">NOTICIA ACTUALIZADA</h2>
                {
                    newsUpdated && updatedNews.thumbnail.length > 0 ?
                        <New data={updatedNews} />

                        : <p className="hidden"></p>
                }
            </>
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
