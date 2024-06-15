

const Footer = () => {




    const logoWidth = 50
    const logoHeight = 50



    return (
        <div className="p-2 h-28 flex justify-center items-center bg-slate-600" >
            <div className="flex justify-center items-center gap-2">
                <h1 className="text-white text-sm sm:text-xl">Contacto</h1>
                <a target="_blank" rel="noopener noreferrer" href="https://wa.me/3814123324"> <img width={logoWidth} className=" p-1 bg-green-500 rounded-full" height={logoHeight} loading="lazy" src="../../logo-whatsapp.svg" alt="logo enlace a whatsapp" /></a>
                <a className="text-green-900" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/revistaurbanabrs">  <img className="p-1 bg-blue-800 rounded-full " width={logoWidth} height={logoHeight} src="../../logo-facebook.svg" alt="logo enlace a facebook" /></a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/revistaurbana2024?igsh=MWhtcXB6OG9vdm93cQ=="> <img width={logoWidth} className=" p-1  bg-rose-400 rounded-full" height={logoHeight} loading="lazy" src="../../logo-instagram.png" alt="logo enlace a instagram" /></a>
            </div>
        </div>
    )
}

export default Footer

