

const Navbar = () => {
    return (
        <div className="flex justify-between shadow-xl p-4 bg-red-100">
            <h1 className="text-1xl font-bold">REVISTA URBANA</h1>
            <ul className="flex items-center gap-5">
                <li><button className="hover:text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-blue-200 shadow-lg shrink-0 focus:ring-1">DEPORTES</button></li>
                <li><button className="hover:text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-blue-200 shadow-lg shrink-0 focus:ring-1">TECNOLOGIA</button></li>
                <li><button className="hover:text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-blue-200 shadow-lg shrink-0 focus:ring-1">ESPECTACULO</button></li>
                <li><button className="hover:text-white hover:bg-blue-500 rounded p-2 text-1xl  bg-blue-200 shadow-lg shrink-0 focus:ring-1">DESTACADOS</button></li>
            </ul>

        </div>
    )
}

export default Navbar
