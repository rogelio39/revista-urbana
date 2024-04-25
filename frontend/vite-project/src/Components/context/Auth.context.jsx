import { createContext } from "react";
import { useState } from "react";
import PropTypes from 'prop-types'


const URL = import.meta.env.VITE_REACT_APP_LOCAL_URL;



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({});


    const register = (data) => {

        try {
            const response = fetch(`${URL}/api/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const data = response.json()
                return data;
            }
        } catch (error) {
            console.log("error", error)
        }

    }

    const login = (data) => {

        try {
            const response = fetch(`${URL}/api/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const data = response.json();
                if (data) {
                    setUserData(data);
                }
            }

        } catch (error) {
            console.log("error", error);
        }
    }



    return (
        <AuthContext.Provider value={{ userData, register, login }}>
            {children}
        </AuthContext.Provider>
    )
}



AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}