import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/Auth.context"

const Login = () => {
    const { login } = useContext(AuthContext);
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();

        const datForm = new FormData(formRef.current)
        const data = Object.fromEntries(datForm);
        if (data) {
            await login(data);
            setLoading(true)
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }

    }

    if (loading) {
        return <div>Cargando...</div>
    }
    return (
        <div className="flex justify-center items-center m-4 rounded bg-blue-200 opacity-100 shadow-xl">
            <form className="flex justify-start items-center p-5" ref={formRef} onSubmit={handleLogin}>
                <div>
                    <label className="m-2" htmlFor="email">EMAIL:</label>
                    <input  type="text" id="email" name='email' required />
                </div>
                <div>
                    <label className="m-2" htmlFor="password">PASSWORD:</label>
                    <input type="password" id='password' name="password" required />
                </div>

                <button className="bg-red-200 p-2 rounded bg-opacity-100 m-4" type="submit">INICIAR SESSION</button>

            </form>
        </div>
    )
}

export default Login
