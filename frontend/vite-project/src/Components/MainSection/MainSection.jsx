import { lazy } from "react"

const News = lazy(() => import('../News/News'));
const MainSection = () => {
    return (
        <div className="bg-indigo-600 bg-opacity-90 md:mt-8 lg:mt-36">
            <News />
        </div>
    )
}

export default MainSection
