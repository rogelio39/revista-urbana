import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/Auth.context"
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const { login, authenticated } = useContext(AuthContext);
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(false)
    const navigate = useNavigate()



    useEffect(() => {
            if (authenticated) {
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
            setTimeout(() => {
                setLoading(false);
                setShowLogin(true);
                navigate('/profile')

            }, 2000)
        }

    }

    if (loading) {
        return <div>Cargando...</div>
    }
    return (
        <div className="flex flex-col justify-center items-center m-4 rounded bg-blue-200 opacity-100 shadow-xl sm:flex-row">
            {
                showLogin ? (<div>Ya estas logueado</div>) :
                    (<form className="flex flex-col justify-center items-center p-5 gap-5 sm:flex-row" ref={formRef} onSubmit={handleLogin}>
                        <div className="w-full sm:w-auto">
                            <label className="m-2" htmlFor="email">EMAIL:</label>
                            <input  className='w-full sm:w-auto' autoComplete="ejemplo@mail.com" type="text" id="email" name='email' required />
                        </div>
                        <div className="w-full md:w-auto">
                            <label className="m-2" htmlFor="password">PASSWORD:</label>
                            <input className="w-full sm:w-auto" autoComplete="12345"  type="password" id='password' name="password" required />
                        </div>

                        <button className=" bg-red-200 p-2 rounded bg-opacity-100 m-4" type="submit">INICIAR SESION</button>

                    </form>)
            }

        </div>
    )
}

export default Login
