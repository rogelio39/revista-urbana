import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = () => {
            const user = localStorage.getItem('user');
            setUserData(JSON.parse(user));
        }
        getUserData();
    }, [])

    const goToAddNews = () => {
        navigate('/add-news')
    }
    const goToDeleteNews = () => {
        navigate('/delete-news')
    }
    return (
        <div className="m-2 mt-40 bg-red-200 flex flex-col justify-center items-center gap-2">

            {
                userData ? (
                    <>
                        <p>Usuario id: {userData._id}</p>
                        <p>Rol: {userData.rol}</p>
                        {
                            userData.rol === "admin" && (
                                <>
                                    <button className="mb-2 hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" onClick={goToAddNews}>CARGAR NOTICIAS</button>
                                    <button className="mb-2 hover:bg-blue-500 hover:text-white shadow-mg bg-blue-200 p-2 rounded focus:ring-1" onClick={goToDeleteNews}>BORRAR NOTICIAS</button>
                                </>
                            )
                        }
                    </>) : <>NECESITAS LOGUEARTE PRIMERO
                </>
            }

        </div>
    )
}

export default Profile
