import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"


const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)



    const handleClickOutside = (e) => {
        e.preventDefault()
        if (!e.target.closest('.menu-container')) {
            setMenuOpen(false)
        }
    }

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [menuOpen])

    const navigate = useNavigate();

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

    const openMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const goToSports = () => {
        navigate(`/newsByCategory/deportes`)
    }

    const goToHealthy = () => {
        navigate('/newsByCategory/salud')
    }

    const goToPolitics = () => {
        navigate('/newsByCategory/politica')
    }

    const goToShow = () => {
        navigate('/newsByCategory/espectaculo')
    }

    const goToDestacados = () => {
        navigate('/newsByCategory/destacados')
    }

    const goToSociety = () => {
        navigate('/newsByCategory/sociedad')
    }

    const goToCulture = () => {
        navigate('/newsByCategory/cultura')
    }

    const goToWorld = () => {
        navigate('/newsByCategory/mundo')
    }

    const goToEconomy = () => {
        navigate('/newsByCategory/economia')
    }

    const goToColorNotes = () => {
        navigate('/newsByCategory/notas%20color')
    }


    return (
        <div className="flex justify-between items-center bg-cyan-800  shadow-xl p-4">
            <div onClick={goToMain} className="m-2 bg-white rounded-full">
                <img className="w-28" src="../../logo-bg.png" alt="LOGO" />
            </div>
            <div>
                <form className="flex gap-2 shadow-md h-8 sm:h-10 " onSubmit={handleSearch}>
                    <input
                        className="bg-black text-sm bg-opacity-90 rounded text-white text-center  sm:text-lg sm:w-96"
                        type="text"
                        value={searchQuery}
                        placeholder="Buscar noticias"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button className="text-sm p-1 shadow-lg bg-black hover:bg-blue-500 text-white rounded sm:text-lg" type="submit">Buscar</button>
                </form>
            </div>
            <div className="relative menu-container m-2">
                <button   aria-expanded={menuOpen} aria-haspopup="true" aria-label="Toggle menu" onClick={openMenu} className="flex flex-col gap-1 cursor-pointer">
                    <span className="w-8 h-1  bg-black"></span>
                    <span className="w-8 h-1  bg-black"></span>
                    <span className="w-8 h-1  bg-black"></span>
                </button>
                {
                    menuOpen && (
                        <ul className="absolute mt-2 w-48 right-0 flex flex-col items-start gap-5 bg-black transition duration-300 ease-in-out" role='menu'>
                            <li role='menu-item' className="w-full hover:bg-blue-500 bg-black"><button onClick={goToLogin} className="block w-full  text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">LOGIN</button></li>
                            <li role='menu-item' className="w-full hover:bg-blue-500 bg-black"><button onClick={goToHealthy} className="block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">SALUD</button></li>
                            <li role='menu-item' className="w-full hover:bg-blue-500 bg-black"><button onClick={goToPolitics} className="block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">POLITICA</button></li>
                            <li role='menu-item' className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToShow}>ESPECTACULO</button></li>
                            <li role='menu-item' className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToDestacados}>DESTACADOS</button></li>
                            <li role='menu-item' className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToSociety}>SOCIEDAD</button></li>
                            <li role='menu-item' className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToCulture}>CULTURA</button></li>
                            <li role='menu-item' className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToWorld}>MUNDO</button></li>
                            <li role='menu-item' className="w-full hover:bg-blue-500 bg-black"><button onClick={goToSports} className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">DEPORTES</button></li>
                            <li role='menu-item' className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToEconomy}>ECONOMIA</button></li>
                            <li role='menu-item' className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToColorNotes}>NOTAS COLOR</button></li>
                            <li role='menu-item' className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">---</button></li>
                        </ul>
                    )
                }
            </div>

        </div >
    )
}

export default Navbar



