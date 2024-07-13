import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/Authcontext"
import { useNavigate } from 'react-router-dom';
import getCookiesByName from "../../utils/utils";

const Login = () => {
    const { login, logout } = useContext(AuthContext);
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(false)
    const navigate = useNavigate();




    useEffect(() => {
        const token = getCookiesByName('jwtCookie')
        if (token) {
            setShowLogin(true);
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();

        const datForm = new FormData(formRef.current)
        const data = Object.fromEntries(datForm);
        if (data) {
            await login(data);
            setLoading(true)
            setLoading(false);
            setShowLogin(true);
            navigate('/profile')
        }

    }

    const closeSession = async() => {
        const message = await logout();
        if(message.resultado === 'usuario deslogueado'){
            setShowLogin(false);
            navigate('/') 
        }
    }

    if (loading) {
        return <div>Cargando...</div>
    }
    return (
        <div className="flex flex-col justify-center items-center m-4 mt-40 rounded bg-indigo-200 opacity-100 shadow-xl sm:flex-row">
            {
                showLogin ? (<div className="flex flex-col justify-center items-center"><h3>Ya estas logueado</h3>
                <button onClick={closeSession} className="m-2 p-2 rounded bg-indigo-300 hover:bg-white hover:text-indigo-500">CERRAR SESION</button>

                </div>) :
                    (<form className="flex flex-col justify-center items-center p-5 gap-5 sm:flex-row" ref={formRef} onSubmit={handleLogin}>
                        <div className="w-full sm:w-auto">
                            <label className="m-2" htmlFor="email">EMAIL:</label>
                            <input className='w-full sm:w-auto' autoComplete="ejemplo@mail.com" type="text" id="email" name='email' required />
                        </div>
                        <div className="w-full md:w-auto">
                            <label className="m-2" htmlFor="password">PASSWORD:</label>
                            <input className="w-full sm:w-auto" autoComplete="12345" type="password" id='password' name="password" required />
                        </div>

                        <button className=" bg-indigo-500 p-2 rounded bg-opacity-100 m-4 hover:bg-indigo-400 hover:text-white" type="submit">INICIAR SESION</button>

                    </form>)
            }

        </div>
    )
}

export default Login
