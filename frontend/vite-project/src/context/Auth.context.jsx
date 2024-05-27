import { createContext } from "react";
import { useState } from "react";
import PropTypes from 'prop-types'


const URL = import.meta.env.VITE_REACT_APP_MODE === 'DEV' ? import.meta.env.VITE_REACT_APP_LOCAL_URL : import.meta.env.VITE_REACT_APP_WEB_URL;




const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [authenticated, setAuthenticated] = useState(false)

    const register = async(data) => {

        try {
            const response = await fetch(`${URL}/api/session/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const responseData = await response.json()
                return responseData;
            }
        } catch (error) {
            console.log("error", error)
        }

    }

    const login = async(data) => {

        try {
            const response = await fetch(`${URL}/api/session/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const responseData = await response.json();
                if (responseData) {
                    setUser(responseData.user);
                    setAuthenticated(true);
                    document.cookie = `jwtCookie=${responseData.token}; expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()}; path=/;`;
                    localStorage.setItem('user', JSON.stringify(responseData.user))
                }
            }

        } catch (error) {
            console.log("error", error);
        }
    }



    return (
        <AuthContext.Provider value={{ user, register, login, authenticated }}>
            {children}
        </AuthContext.Provider>
    )
}



AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export {AuthContext, AuthProvider};






