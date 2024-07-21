

const Footer = () => {




    const logoWidth = 50
    const logoHeight = 50



    return (
        <div height={200} width={1000} className="p-2 fixed bottom-0 w-full h-auto flex justify-center items-center bg-indigo-400" >
            <div className="flex justify-center items-center gap-2">
            <h1 className="text-white text-sm sm:text-xl">Contacto</h1>

            <a  target="_blank" rel="noopener noreferrer" href="https://wa.me/3814123324"> <img width={logoWidth} className="p-1 h-7 w-7 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-green-500  rounded-full" height={logoHeight} loading="lazy" src="https://nyc3.digitaloceanspaces.com/revista-urbana/3c16ea43-103d-4dff-aaae-4f18a6adf054-logo-whatsapp.webp" alt="logo enlace a whatsapp" /></a>
            <a className="text-green-900" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/revistaurbanabrs">  <img className="p-1 h-7 w-7 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-blue-800 rounded-full " width={logoWidth} height={logoHeight} src="https://nyc3.digitaloceanspaces.com/revista-urbana/2da9e94b-5845-4594-9be4-8ff024357c5b-logo-facebook.webp" alt="logo enlace a facebook" /></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/revistaurbana2024?igsh=MWhtcXB6OG9vdm93cQ=="> <img width={logoWidth} className=" p-1 h-7 w-7 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-rose-400 rounded-full" height={logoHeight} loading="lazy" src="https://nyc3.digitaloceanspaces.com/revista-urbana/25c91dc1-243d-4945-ab9a-b2d7b35fc00a-logo-instagram.webp" alt="logo enlace a instagram" /></a>
        </div>
        </div >
    )
}

export default Footer

