import { useState } from "react";
import { useNavigate } from "react-router-dom"


const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const navigate = useNavigate();

    const goToHealthy = () => {
        navigate('/news/salud')
    }

    const goToPolitics = () => {
        navigate('/news/politica')
    }


    const handleSearch = (e) => {
        e.preventDefault();

        navigate(`/search/${searchQuery}`)
    }

    const goToMain = () => {
        navigate('/')
    }

    const goToLogin = () => {
        navigate('/login')
    }



    return (
        <div className="flex bg- justify-between shadow-xl  p-4">
            <div>
            <h1 onClick={goToMain} className=" text-red-700 cursor-pointer text-4xl font-bold">REVISTA</h1>
            <h1 onClick={goToMain} className=" text-blue-800 cursor-pointer text-4xl font-bold">URBANA</h1>
            </div>
            <ul className="flex items-center gap-5">
                <li>
                    <form className="flex gap-2 shadow-md" onSubmit={handleSearch}>
                        <input 
                        className="p-1 bg-black bg-opacity-90 rounded text-white"
                        type="text"
                        value={searchQuery}
                        placeholder="Buscar noticias"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <button className="p-2 shadow-lg bg-black hover:bg-blue-500 text-white rounded" type="submit">Buscar</button>
                    </form>
                </li>
                <li><button onClick={goToLogin} className="text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-black shadow-lg shrink-0 focus:ring-1">LOGIN</button></li>
                <li><button onClick={goToHealthy} className="text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-black shadow-lg shrink-0 focus:ring-1">SALUD</button></li>
                <li><button onClick={goToPolitics} className="text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-black shadow-lg shrink-0 focus:ring-1">POLITICA</button></li>
                <li><button className="text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-black shadow-lg shrink-0 focus:ring-1">ESPECTACULO</button></li>
                <li><button className="text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-black shadow-lg shrink-0 focus:ring-1">DESTACADOS</button></li>
                <li><button className="text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-black shadow-lg shrink-0 focus:ring-1">SOCIEDAD</button></li>
                <li><button className="text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-black shadow-lg shrink-0 focus:ring-1">CULTURA</button></li>
                <li><button className="text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-black shadow-lg shrink-0 focus:ring-1">MUNDO</button></li>
                <li><button className="text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-black shadow-lg shrink-0 focus:ring-1">ECONOMIA</button></li>
                <li><button className="text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-black shadow-lg shrink-0 focus:ring-1">---</button></li>
            </ul>

        </div>
    )
}

export default Navbar



