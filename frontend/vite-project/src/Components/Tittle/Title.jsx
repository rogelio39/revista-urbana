import { useEffect } from "react"

const Title = () => {

    useEffect(() => {

        document.title = "REVISTA URBANA";

    }, [])
    return null
}

export default Title
