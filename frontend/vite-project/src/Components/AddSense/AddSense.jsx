import { useEffect, useState } from "react"

const MODE  = import.meta.VITE_REACT_APP_MODE;
const AddSense = () => {
    const [adds, setAdds] = useState('');

    useEffect(() => {
        setAdds("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5685964602459573")
    }, [])
    return (
        <div>
            <h1>hola soy un adds{adds}</h1>
            {
                adds && MODE === 'PROD' && (<script async src={adds}
                    crossOrigin="anonymous"></script>)
            }
        </div>
    )
}

export default AddSense
