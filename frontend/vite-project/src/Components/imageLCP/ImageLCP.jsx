import { useContext, useEffect, useState } from "react"
import { NewsContext } from "../../context/NewsContext";


const ImageLCP = () => {
    const { fetchNews } = useContext(NewsContext)
    const [img, setImg] = useState('')

    useEffect(() => {

        const getNews = async () => {
            try {
                const news = await fetchNews();
                if (news) {
                    const newLCP = news[news.length - 1];
                    if (newLCP) {
                        const urlImg = newLCP.thumbnail[0];
                        setImg(urlImg)
                        if (img) {
                            const link = document.createElement("link");
                            link.rel = "preload";
                            link.fetchPriority = "high";
                            link.as = "image";
                            link.href = setImg;
                            link.type = "image/wepb";
                            document.head.appendChild(link);
                        }
                    }
                }

            } catch (error) {
                console.log("error", error);
            }
        }

        getNews()

    }, [])



    return null
}

export default ImageLCP
