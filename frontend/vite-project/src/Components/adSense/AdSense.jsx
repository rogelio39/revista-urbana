import { useEffect } from "react"

const AdSense = () => {

    useEffect(() => {
        document.title = "REVISTA URBANA";
        const script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5685964602459573";
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);
    return (
        <ins className="adsbygoogle block"
            data-ad-client="ca-pub-5685964602459573"
            data-ad-slot="1234567890"
            data-ad-format="auto"></ins>

    )
}

export default AdSense
