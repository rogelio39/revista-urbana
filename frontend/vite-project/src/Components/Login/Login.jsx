import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/Auth.context"

const Login = () => {
    const {login} = useContext(AuthContext);
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);


    const handleLogin = async(e) => {
        e.preventDefault();

        const datForm = new FormData(formRef.current)
        const data = Object.fromEntries(datForm);
        if(data){
            await login(data);
            setLoading(true)
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }

    }

    if(loading){
        return <div>Cargando...</div>
    }
    return (
        <div>
            <form ref={formRef} onSubmit={handleLogin}>
                <label htmlFor="email">EMAIL:</label>
                <input type="text" id="email" name='email' required />

                <label htmlFor="password">PASSWORD:</label>
                <input type="password" id='password' name="password" required />

                <button type="submit">INICIAR SESSION</button>
            </form>
        </div>
    )
}

export default Login
