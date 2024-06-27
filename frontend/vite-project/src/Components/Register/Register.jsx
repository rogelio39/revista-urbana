import { useContext, useRef, useState } from "react"
import Login from "../Login/Login";
import { AuthContext } from "../../context/Authcontext";

const Register = () => {
    const formRef = useRef();
    const [isRegister, setIsRegister] = useState(false);
    const [message, setMessage] = useState('')
    const { register, error } = useContext(AuthContext);





    const handleRegister = async (e) => {
        e.preventDefault()

        try {

            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData);
            if (data) {
                const userRegistered = await register(data);
                if (userRegistered.message == "Usuario registrado con exito") {
                    setMessage('REGISTRO COMPLETADO CON EXITO, LOGUEATE')
                    setIsRegister(true)
                } else {
                    setIsRegister(false)
                    setMessage(userRegistered.message || error.toString())
                }
            }

        } catch (error) {
            setMessage(error.toString())
            console.log("error", error.message)
        }


    }


    return (
        <div className="flex">
            {
                isRegister ? (<div className="flex flex-col m-auto">
                    <p className="m-auto bg-green-300 p-2 rounded font-bold w-fit text-center mt-40">{message}</p>
                    <Login />
                </div>) : <div className="flex flex-col m-auto">

                    <p className={message && "m-auto bg-red-300 p-2 rounded font-bold w-fit text-center mt-40"}>{message}</p>
                    <form ref={formRef} className="mt-40 rounded flex flex-col bg-slate-500 p-10 gap-1 m-auto" onSubmit={handleRegister}>
                        <label htmlFor="first_name">Nombre</label>
                        <input autoComplete="ejemplo: raul" type="text" name="first_name" id="first_name" required />

                        <label htmlFor="last_name">Apellido</label>
                        <input autoComplete="ejemplo: perez" type="text" id="last_name" name="last_name" required />

                        <label htmlFor="age">edad</label>
                        <input autoComplete="ejemplo: 27" type="number" id="age" name="age" required />

                        <label htmlFor="email">Email</label>
                        <input autoComplete="ejemplo@gmail.com" type="email" id="email" name="email" required />

                        <label htmlFor="password">Password</label>
                        <input autoComplete="12345" type="password" id="password" name="password" required />

                        <button className="rounded p-1 bg-blue-400 mt-2 focus:ring-1 ring-blue-700 hover:bg-blue-500" type="submit">registrarse</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default Register

