import { useState } from "react"


const AddNew = () => {
    const [subtitles, setSubtitles] = useState(['']);
    const [texts, setTexts] = useState(['']);

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    const handleSubtitleChange = ({ index, event }) => {
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
    return (
        <div className=" p-6 my-4 flex items-center justify-center">
            <form className="shadow-lg rounded p-6 bg-red-200 flex-col items-center" onSubmit={handleSubmit}>

                <div className="shadow-md bg-red-100 rounded m-3 p-2 flex items-center justify-start gap-5">
                    <label htmlFor="title">Título:</label>
                    <input className="px-2 py-1 rounded-lg border border-blue-300 focus-ring-1" type="text" id="title" name="title" required />
                </div>

                <div className="shadow-md bg-red-100 rounded m-3 p-1 flex items-center justify-start gap-5">
                    <label htmlFor="coverImage">Imagen de portada:</label>
                    <input type="file" id="coverImage" name="coverImage" accept="image/*" required />
                </div>


                <div className="shadow-md bg-red-100 rounded m-3 p-1 flex items-center justify-start gap-5">

                    <label htmlFor="subtitles">Subtítulos:</label>
                    {subtitles.map((subtitle, index) => (
                        <div key={index}>
                            <input
                                className="px-2 py-1 rounded-lg border border-blue-300 focus-ring-1"
                                type="text"
                                value={subtitle}
                                onChange={(event) => handleSubtitleChange(index, event)}
                                required
                            />
                        </div>
                    ))}
                    <button className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" type="button" onClick={addSubtitle}>Agregar Subtítulo</button>
                </div>
                <div className="shadow-md bg-red-100 rounded m-3 p-1 flex items-center justify-start gap-5">
                    <label htmlFor="texts">Textos:</label>
                    {texts.map((text, index) => (
                        <div key={index}>
                            <textarea
                                className="px-2 py-1 rounded-lg border border-blue-300 focus-ring-1"
                                value={text}
                                onChange={(event) => handleTextChange(index, event)}
                                rows="4"
                                required
                            />
                        </div>
                    ))}
                    <button className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" type="button" onClick={addText}>Agregar Texto</button>
                </div>



                <button className="hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1 m-3 w-24 flex items-center justify-center gap-5" type="submit">Enviar</button>
            </form>

        </div>
    )
}

export default AddNew
