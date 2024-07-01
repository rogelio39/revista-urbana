import { useEffect } from "react";

const GoogleAdsense = () => {

    useEffect(() => {
        const loadAdSenseScript = () => {
            const script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5685964602459573';
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.body.appendChild(script);
        };

        window.onload = loadAdSenseScript;
    }, []);

    return null
}

export default GoogleAdsense
