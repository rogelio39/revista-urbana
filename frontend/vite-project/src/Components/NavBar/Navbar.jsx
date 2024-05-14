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
        <div className="flex justify-between shadow-xl p-4 bg-red-100">
            <h1 onClick={goToMain} className="text-red-600 cursor-pointer text-4xl font-bold">REVISTA URBANA</h1>
            <ul className="flex items-center gap-5">
                <li>
                    <form className="flex gap-1" onSubmit={handleSearch}>
                        <input 
                        className="p-1"
                        type="text"
                        value={searchQuery}
                        placeholder="Buscar noticias"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <button className="p-2 shadow-lg bg-blue-200 hover:bg-blue-500 hover:text-white rounded" type="submit">Buscar</button>
                    </form>
                </li>
                <li><button onClick={goToLogin} className="hover:text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-blue-200 shadow-lg shrink-0 focus:ring-1">LOGIN</button></li>
                <li><button onClick={goToHealthy} className="hover:text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-blue-200 shadow-lg shrink-0 focus:ring-1">SALUD</button></li>
                <li><button onClick={goToPolitics} className="hover:text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-blue-200 shadow-lg shrink-0 focus:ring-1">POLITICA</button></li>
                <li><button className="hover:text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-blue-200 shadow-lg shrink-0 focus:ring-1">ESPECTACULO</button></li>
                <li><button className="hover:text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-blue-200 shadow-lg shrink-0 focus:ring-1">DESTACADOS</button></li>
            </ul>

        </div>
    )
}

export default Navbar



