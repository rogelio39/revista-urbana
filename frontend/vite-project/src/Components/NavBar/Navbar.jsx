import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"


const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const [subMenuOpen, setSubMenuOpen] = useState(false)
    const [menuSociedad, setMenuSociedad] = useState(false)
    const [menuPolitica, setMenuPolitica] = useState(false)
    const [menuDeportes, setMenuDeportes] = useState(false)
    const [menuSalud, setMenuSalud] = useState(false)
    const [menuCultura, setMenuCultura] = useState(false)


    const handleClickOutside = (e) => {
        e.preventDefault()
        if (!e.target.closest('.submenu')) {
            setSubMenuOpen(false)
            setMenuSociedad(false)
            setMenuPolitica(false)
            setMenuDeportes(false)
            setMenuSalud(false)
            setMenuCultura(false)
        }
    }

    useEffect(() => {
        if (subMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [subMenuOpen])

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

    const openSubMenu = (categoria) => {
        if (categoria === "sociedad") {
            setMenuSociedad(!menuSociedad)

        }
        else if (categoria === "politica") {
            setMenuPolitica(!menuPolitica)

        }
        else if (categoria === "deportes") {
            setMenuDeportes(!menuDeportes)
        }
        else if (categoria === "salud") {
            setMenuSalud(!menuSalud)
        }
        else if (categoria === "cultura"){
            setMenuCultura(!menuCultura)
        }


        setSubMenuOpen(!subMenuOpen)

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

    const goToPoliciales = () => {
        navigate('/newsByCategory/policiales')
    }

    const goToNoticiasBandeñas = () => {
        navigate('/newsByCategory/noticias%20bandeñas')
    }

    const goToRegister = () => {
        navigate('/register')
    }
    const goToProfile = () => {
        navigate('/profile')
    }

    const goToTurismo = () => {
        navigate(`/newsByCategory/turismo`)
    }


    const goToPoliticsSubcategorys = (category) => {
        navigate(`/newsByCategory/politica/${category}`)
    }

    const goToSocietySubcategorys = (category) => {
        navigate(`/newsByCategory/sociedad/${category}`)
    }

    const goToSaludSubcategorys = (category) => {
        navigate(`/newsByCategory/salud/${category}`)
    }

    const goToCultureSubcategorys = (category) => {
        navigate(`/newsByCategory/cultura/${category}`)
    }


    const logoWidth = 12

    return (
        <div className="z-50 fixed top-0 w-full bg-opacity-90 flex justify-between items-center bg-indigo-300  shadow-xl p-4">
            <div onClick={goToMain} className="m-2 bg-white rounded-full">
                <img width={logoWidth} className="w-6 h-6 sm:w-12 sm:h-12 md:w-20 md:h-20 lg:w-24 lg:h-24" src="https://nyc3.digitaloceanspaces.com/revista-urbana/a699e5c1-6c00-45be-8655-8d0356449b79-logo-bg.webp" alt="LOGO" />
            </div>
            <>
                <form className="flex gap-2 shadow-md h-8 sm:h-10 " onSubmit={handleSearch}>
                    <input
                        className="bg-indigo-900 w-28 text-sm bg-opacity-90 rounded text-white text-center  sm:text-lg sm:w-44 md:w-56 lg:w-80"
                        type="text"
                        name="search"
                        id="search"
                        value={searchQuery}
                        placeholder="Buscar noticias"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button className="text-sm p-1 shadow-lg bg-indigo-900 hover:bg-indigo-400 hover:border-2 hover:border-indigo-900 hover:text-slate-800 text-white rounded sm:text-lg" type="submit">Buscar</button>
                </form>
            </>


            {
                menuOpen && (
                    <div className=" left-0 top-0 bg-indigo-900 p-10  absolute w-full flex flex-wrap gap-20 justify-around  items-center transition duration-300 ease-in-out">
                        <ul role='z-0 menu'>
                            <li role='menu-item' className=" hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"><button onClick={goToLogin} className="block w-full  text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">LOGIN</button></li>
                            <li role='menu-item' className=" hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"><button onClick={goToRegister} className="block w-full  text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">REGISTER</button></li>
                            <li role='menu-item' className=" hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"><button onClick={goToProfile} className="block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">MI PERFIL</button></li>
                            <ul role='submenu' className="submenu hover:text-slate-800">
                                <div className="hover:bg-indigo-700 hover:border-2 hover:border-indigo-800 flex justify-center items-center p-1">
                                    <button onClick={goToPolitics} className=" block w-full text-white text-1xl  shadow-lg shrink-0 focus:ring-1">POLITICA</button>
                                    <button onClick={() => openSubMenu('politica')} aria-expanded={menuPolitica} aria-haspopup="true" aria-label="Toggle submenu" className=" text-white shrink-0 focus:ring-1">+</button>

                                </div>
                                {
                                    subMenuOpen && menuPolitica &&
                                    <div className="mt-2 transition duration-300 ease-in-out flex flex-col items-start hover:bg-slate-400 text-white">
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700">
                                            <button onClick={() => goToPoliticsSubcategorys('internacional')} className="block   rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">POLITICA INTERNACIONAL</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700">
                                            <button onClick={() => goToPoliticsSubcategorys('nacional')} className="block  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">POLITICA NACIONAL</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"> <button onClick={() => goToPoliticsSubcategorys('provincial')} className="block  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">POLICITA PROVINCIAL</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"> <button onClick={() => goToPoliticsSubcategorys('municipal')} className="block rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">POLITICA MUNICIPAL</button> </li>
                                    </div>

                                }
                            </ul>
                        </ul>
                        <ul role="menu">

                            <ul role='submenu' className="submenu hover:text-slate-800">
                                <div className="hover:bg-indigo-700 hover:border-2 hover:border-indigo-800 flex justify-center items-center p-1">
                                    <button onClick={goToSociety} className=" block w-full text-white text-1xl  shadow-lg shrink-0 focus:ring-1">SOCIEDAD</button>
                                    <button onClick={() => openSubMenu('sociedad')} aria-expanded={menuSociedad} aria-haspopup="true" aria-label="Toggle submenu" className=" text-white shrink-0 focus:ring-1">+</button>
                                </div>
                                {
                                    subMenuOpen && menuSociedad &&
                                    <div className="mt-2 transition duration-300 ease-in-out flex flex-col items-start hover:bg-indigo-400">
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700">
                                            <button onClick={() => goToSocietySubcategorys('eventos')} className="block text-white rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">EVENTOS</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700">
                                            <button onClick={() => goToSocietySubcategorys('casamientos')} className="block text-white rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">CASAMIENTOS</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"> <button onClick={() => goToSocietySubcategorys('cumpleaños15')} className="block   text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">CUMPLEAÑOS DE 15</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"> <button onClick={() => goToSocietySubcategorys('cumpleaños18')} className="block   text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">CUMPLEAÑOS DE 18</button> </li>
                                    </div>

                                }
                            </ul>
                            <ul role='submenu' className="submenu hover:text-slate-800">
                                <div className="hover:bg-indigo-700 hover:border-2 hover:border-indigo-800 flex justify-center items-center p-1">
                                    <button onClick={goToCulture} className=" block w-full text-white text-1xl  shadow-lg shrink-0 focus:ring-1">CULTURA</button>
                                    <button onClick={() => openSubMenu('cultura')} aria-expanded={menuCultura} aria-haspopup="true" aria-label="Toggle submenu" className=" text-white shrink-0 focus:ring-1">+</button>
                                </div>
                                {
                                    subMenuOpen && menuCultura &&
                                    <div className="mt-2 transition duration-300 ease-in-out flex flex-col items-start hover:bg-slate-400">
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700">
                                            <button onClick={() => goToCultureSubcategorys('entrevistas')} className="block text-white rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">ENTREVISTAS EXCLUSIVAS</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700">
                                            <button onClick={() => goToCultureSubcategorys('relatos')} className="block text-white rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">EL SEÑOR DE LOS RELATOS</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-700"> <button onClick={() => goToCultureSubcategorys('historia')} className="block   text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">SOMOS HISTORIA</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"> <button onClick={() => goToCultureSubcategorys('escolar')} className="block   text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">SUMPLEMENTO ESCOLAR</button> </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-700"> <button onClick={() => goToCultureSubcategorys('efemerides')} className="block   text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">EFEMÉRIDES PATRIA
                                        </button> </li>
                                    </div>

                                }
                            </ul>

                            <li role='menu-item' className=" hover:text-indigo-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToWorld}>MUNDO</button></li>
                            <ul role='submenu' className="submenu hover:text-slate-800">
                                <div className="hover:bg-indigo-700 hover:border-2 hover:border-indigo-800 flex justify-center items-center p-1">
                                    <button onClick={goToSports} className=" block w-full text-white text-1xl  shadow-lg shrink-0 focus:ring-1">DEPORTES</button>
                                    <button onClick={() => openSubMenu('deportes')} aria-expanded={menuDeportes} aria-haspopup="true" aria-label="Toggle submenu" className=" text-white shrink-0 focus:ring-1">+</button>

                                </div>
                                {
                                    subMenuOpen && menuDeportes &&
                                    <div className="mt-2 transition duration-300 ease-in-out flex flex-col items-start hover:bg-slate-400">
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700">
                                            <button className="block  text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">FUTBOL INTERNACIONAL</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700">
                                            <button className="block   text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">FUTBOL NACIONAL</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"> <button className="block   text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">FUTBOL AMATEUR</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"> <button className="block   text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">BASQUET</button> </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"> <button className="block   text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">VOLEY</button> </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"> <button className="block   text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">ARTES MARCIALES</button> </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"> <button className="block   text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">GYM</button> </li>
                                    </div>

                                }
                            </ul>

                        </ul>

                        <ul role="menu">
                            <li role='menu-item' className=" hover:text-slate-800 hover:border-2 hover:border-indigoe-800 hover:bg-indigo-700"><button className=" block w-full text-white  rounded p-1 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToDestacados}>DESTACADOS</button></li>
                            <li role='menu-item' className=" hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"><button className=" block w-full text-white  rounded p-1 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToEconomy}>ECONOMIA</button></li>
                            <li role='menu-item' className=" hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"><button className=" block w-full text-white  rounded p-1 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToColorNotes}>BUENAS VIBRAS, BUENA VIDA</button></li>
                            <li role='menu-item' className=" hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"><button className=" block w-full text-white  rounded p-1 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToPoliciales}>POLICIALES</button></li>
                        </ul>
                        <ul role="menu">
                            <li role='menu-item' className=" hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"><button className=" block w-full text-white  rounded p-1 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToNoticiasBandeñas}>NOTICIAS BANDEÑAS</button></li>
                            <li role='menu-item' className=" hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"><button className=" block w-full text-white  rounded p-1 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToShow}>ESPECTACULO</button></li>
                            <ul role='submenu' className="submenu hover:text-slate-800">
                                <div className="hover:bg-slate-700 hover:border-2 hover:border-slate-800 flex justify-center items-center p-1">
                                    <button onClick={goToHealthy} className=" block w-full text-white text-1xl  shadow-lg shrink-0 focus:ring-1">SALUD</button>
                                    <button onClick={() => openSubMenu('salud')} aria-expanded={menuSalud} aria-haspopup="true" aria-label="Toggle submenu" className=" text-white shrink-0 focus:ring-1">+</button>

                                </div>
                                {
                                    subMenuOpen && menuSalud &&
                                    <div className="mt-2 transition duration-300 ease-in-out flex flex-col items-start hover:bg-slate-400">
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700">
                                            <button onClick={() => goToSaludSubcategorys('vidasana')} className="block  text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">VIDA SANA</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700">
                                            <button onClick={() => goToSaludSubcategorys('fitness')} className="block text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">FITNESS</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"> <button onClick={() => goToSaludSubcategorys('taichi')} className="block   text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">TAI CHI</button>  </li>
                                        <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"> <button onClick={() => goToSaludSubcategorys('yoga')} className="block   text-white  rounded p-2 text-xs  shadow-lg shrink-0 focus:ring-1">YOGA</button> </li>
                                    </div>

                                }
                            </ul>
                            <li role='menu-item' className=" hover:text-slate-800 hover:border-2 hover:border-indigo-800 hover:bg-indigo-700"><button className=" block w-full text-white  rounded p-1 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToTurismo}>TURISMO</button></li>
                        </ul>

                    </div>

                )
            }
            <div className="relative menu-container m-2">
                <button aria-expanded={menuOpen} aria-haspopup="true" aria-label="Toggle menu" onClick={openMenu} className="flex flex-col gap-1 cursor-pointer">
                    <span className={!menuOpen ? `w-8 h-1  bg-indigo-900` : 'w-8 h-1  bg-slate-200'}></span>
                    <span className={!menuOpen ? `w-8 h-1  bg-indigo-900` : 'w-8 h-1  bg-slate-200'}></span>
                    <span className={!menuOpen ? `w-8 h-1  bg-indigo-900` : 'w-8 h-1  bg-slate-200'}></span>
                </button>

            </div>

        </div >
    )
}

export default Navbar














// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"


// const Navbar = () => {
//     const [searchQuery, setSearchQuery] = useState('')
//     const [menuOpen, setMenuOpen] = useState(false)



//     const handleClickOutside = (e) => {
//         e.preventDefault()
//         if (!e.target.closest('.menu-container')) {
//             setMenuOpen(false)
//         }
//     }

//     useEffect(() => {
//         if (menuOpen) {
//             document.addEventListener('click', handleClickOutside);
//         }
//         else {
//             document.removeEventListener('click', handleClickOutside);
//         }
//         return () => {
//             document.removeEventListener('click', handleClickOutside)
//         }
//     }, [menuOpen])

//     const navigate = useNavigate();

//     const handleSearch = (e) => {
//         e.preventDefault();

//         navigate(`/search/${searchQuery}`)
//     }

//     const goToMain = () => {
//         navigate('/')
//     }

//     const goToLogin = () => {
//         navigate('/login')
//     }

//     const openMenu = () => {
//         setMenuOpen(!menuOpen)
//     }

//     const goToSports = () => {
//         navigate(`/newsByCategory/deportes`)
//     }

//     const goToHealthy = () => {
//         navigate('/newsByCategory/salud')
//     }

//     const goToPolitics = () => {
//         navigate('/newsByCategory/politica')
//     }

//     const goToShow = () => {
//         navigate('/newsByCategory/espectaculo')
//     }

//     const goToDestacados = () => {
//         navigate('/newsByCategory/destacados')
//     }

//     const goToSociety = () => {
//         navigate('/newsByCategory/sociedad')
//     }

//     const goToCulture = () => {
//         navigate('/newsByCategory/cultura')
//     }

//     const goToWorld = () => {
//         navigate('/newsByCategory/mundo')
//     }

//     const goToEconomy = () => {
//         navigate('/newsByCategory/economia')
//     }

//     const goToColorNotes = () => {
//         navigate('/newsByCategory/notas%20color')
//     }

//     const logoWidth = 28

//     return (
//         <div className="fixed top-0 w-full bg-opacity-90 flex justify-between items-center bg-slate-500  shadow-xl p-4">
//             <div onClick={goToMain} className="m-2 bg-white rounded-full">
//                 <img width={logoWidth} className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24" src="../../logo-bg.png" alt="LOGO" />
//             </div>
//             <>
//                 <form className="flex gap-2 shadow-md h-8 sm:h-10 " onSubmit={handleSearch}>
//                     <input
//                         className="bg-slate-900 text-sm bg-opacity-90 rounded text-white text-center  sm:text-lg sm:w-96"
//                         type="text"
//                         name="search"
//                         id="search"
//                         value={searchQuery}
//                         placeholder="Buscar noticias"
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />

//                     <button className="text-sm p-1 shadow-lg bg-slate-900 hover:bg-slate-400 hover:border-2 hover:border-slate-900 hover:text-slate-800 text-white rounded sm:text-lg" type="submit">Buscar</button>
//                 </form>
//             </>
//             <div className="relative menu-container m-2">
//                 <button   aria-expanded={menuOpen} aria-haspopup="true" aria-label="Toggle menu" onClick={openMenu} className="flex flex-col gap-1 cursor-pointer">
//                     <span className="w-8 h-1  bg-slate-900"></span>
//                     <span className="w-8 h-1  bg-slate-900"></span>
//                     <span className="w-8 h-1  bg-slate-900"></span>
//                 </button>
//                 {
//                     menuOpen && (
//                         <ul className="absolute mt-2 w-48 right-0 flex flex-col items-start gap-5 bg-slate-800 transition duration-300 ease-in-out" role='menu'>
//                             <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-500 bg-slate-800"><button onClick={goToLogin} className="block w-full  text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">LOGIN</button></li>
//                             <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-500 bg-slate-800"><button onClick={goToHealthy} className="block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">SALUD</button></li>
//                             <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-500 bg-slate-800"><button onClick={goToPolitics} className="block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">POLITICA</button></li>
//                             <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-500 bg-slate-800"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToShow}>ESPECTACULO</button></li>
//                             <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-500 bg-slate-800"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToDestacados}>DESTACADOS</button></li>
//                             <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-500 bg-slate-800"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToSociety}>SOCIEDAD</button></li>
//                             <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-500 bg-slate-800"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToCulture}>CULTURA</button></li>
//                             <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-500 bg-slate-800"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToWorld}>MUNDO</button></li>
//                             <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-500 bg-slate-800"><button onClick={goToSports} className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">DEPORTES</button></li>
//                             <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-500 bg-slate-800"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToEconomy}>ECONOMIA</button></li>
//                             <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-500 bg-slate-800"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1" onClick={goToColorNotes}>NOTAS COLOR</button></li>
//                             <li role='menu-item' className="w-full hover:text-slate-800 hover:border-2 hover:border-slate-800 hover:bg-slate-500 bg-slate-800"><button className=" block w-full text-white  rounded p-2 text-1xl  shadow-lg shrink-0 focus:ring-1">---</button></li>
//                         </ul>
//                     )
//                 }
//             </div>

//         </div >
//     )
// }

// export default Navbar



