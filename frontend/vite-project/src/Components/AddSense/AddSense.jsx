import { useEffect, useState } from "react";

const MODE = import.meta.VITE_REACT_APP_MODE;
const AddSense = () => {
    const [adds, setAdds] = useState('');

    useEffect(() => {
        setAdds("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5685964602459573");
    }, []);

    useEffect(() => {
        if (adds && MODE === 'PROD') {
            const script = document.createElement("script");
            script.src = adds;
            script.async = true;
            script.crossOrigin = "anonymous";
            document.head.appendChild(script);

            return () => {
                document.head.removeChild(script);
            };
        }
    }, [adds]);

    return (
        <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-5685964602459573"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
    );
};

export default AddSense;
