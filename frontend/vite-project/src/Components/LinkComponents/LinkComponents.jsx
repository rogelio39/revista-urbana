import { useEffect } from "react"


const LinkComponents = () => {

    useEffect(() => {

        const link = document.createElement('link');
        link.rel = "canonical"
        link.href = 'url'


    }, [])

    return null
}

export default LinkComponents
