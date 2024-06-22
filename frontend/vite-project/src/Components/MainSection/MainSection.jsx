import News from "../News/News"
import { Helmet } from "react-helmet-async"
const MainSection = () => {
    return (
        <div className="bg-slate-400 bg-opacity-90 mt-36">
            <Helmet>
                <title>REVISTA URBANA - Inicio</title>
                <meta name="description" content="Bienvenido a la página principal de REVISTA URBANA. Descubre las últimas noticias y tendencias urbanas." />
                <meta property="og:title" content="REVISTA URBANA - Inicio" />
                <meta property="og:description" content="Explora las noticias y tendencias más recientes de la cultura urbana." />
                <meta property="og:image" content="https://revista-urbana.com/logo-bg.png" />
            </Helmet>
            <News />
        </div>
    )
}

export default MainSection
