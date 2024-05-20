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

    const openMenu = () => {
        setMenuOpen(!menuOpen)
        console.log(menuOpen)
    }


    return (
        <div className="flex bg- justify-between items-center shadow-xl  p-4">
            <div className="m-2">
                <h1 onClick={goToMain} className=" text-red-700 cursor-pointer text-1xl font-bold sm:text-2xl md:text-3xl xl:text-4xl">REVISTA</h1>
                <h1 onClick={goToMain} className=" text-blue-800 cursor-pointer text-1xl font-bold sm:text-2xl md:text-3xl xl:text-4xl">URBANA</h1>
            </div>
            <div>
                <form className="flex gap-2 shadow-md h-8 sm:h-10 " onSubmit={handleSearch}>
                    <input
                        className="  w-28 bg-black text-sm bg-opacity-90 rounded text-white text-center  sm:text-lg sm:w-36"
                        type="text"
                        value={searchQuery}
                        placeholder="Buscar noticias"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button className="text-sm p-1 shadow-lg bg-black hover:bg-blue-500 text-white rounded sm:text-lg" type="submit">Buscar</button>
                </form>
            </div>
            <div className="relative menu-container">
                <div onClick={openMenu} className="flex flex-col gap-1 cursor-pointer"  aria-expanded={menuOpen} aria-label="Toggle menu">
                    <span className="w-8 h-1  bg-black"></span>
                    <span className="w-8 h-1  bg-black"></span>
                    <span className="w-8 h-1  bg-black"></span>
                </div>
                {
                    menuOpen && (
                        <ul className="absolute mt-2 w-48 right-0 flex flex-col items-start gap-5 bg-black transition duration-300 ease-in-out">
                            <li className="w-full hover:bg-blue-500 bg-black"><button onClick={goToLogin} className="block w-full  text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">LOGIN</button></li>
                            <li className="w-full hover:bg-blue-500 bg-black"><button onClick={goToHealthy} className="block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">SALUD</button></li>
                            <li className="w-full hover:bg-blue-500 bg-black"><button onClick={goToPolitics} className="block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">POLITICA</button></li>
                            <li className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">ESPECTACULO</button></li>
                            <li className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">DESTACADOS</button></li>
                            <li className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">SOCIEDAD</button></li>
                            <li className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">CULTURA</button></li>
                            <li className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">MUNDO</button></li>
                            <li className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">ECONOMIA</button></li>
                            <li className="w-full hover:bg-blue-500 bg-black"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">---</button></li>
                        </ul>
                    )
                }
            </div>

        </div >
    )
}

export default Navbar



