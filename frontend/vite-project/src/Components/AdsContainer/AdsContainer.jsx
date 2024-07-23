import { useEffect } from 'react';

const AdsContainer = () => {
    useEffect(() => {
        // Crear el primer script
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5685964602459573';
        script1.crossOrigin = 'anonymous';

        // Crear el contenedor del anuncio
        const adIns = document.createElement('ins');
        adIns.className = 'adsbygoogle';
        adIns.style.display = 'block';
        adIns.setAttribute('data-ad-client', 'ca-pub-5685964602459573');
        adIns.setAttribute('data-ad-slot', '5556209586');
        adIns.setAttribute('data-ad-format', 'auto');
        adIns.setAttribute('data-full-width-responsive', 'true');

        // Crear el segundo script
        const script2 = document.createElement('script');
        script2.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';

        // Obtener el contenedor donde se mostrará el anuncio
        const adContainer = document.getElementById('ad-container');

        // Añadir los elementos al contenedor
        if (adContainer) {
            adContainer.appendChild(script1);
            adContainer.appendChild(adIns);
            adContainer.appendChild(script2);
        }

        // Cleanup en caso de que el componente se desmonte
        return () => {
            if (adContainer) {
                adContainer.removeChild(script1);
                adContainer.removeChild(adIns);
                adContainer.removeChild(script2);
            }
        };
    }, []);

    return <div id="ad-container"></div>;
};

export default AdsContainer;
