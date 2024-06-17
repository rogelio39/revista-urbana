import { createContext } from "react";
import { useState } from "react";
import PropTypes from 'prop-types'
import { registerUser, loginUser, logoutUser } from "../config/authContext.config";


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [authenticated, setAuthenticated] = useState(false)

    const register = async(data) => {
        await registerUser(data)
    }

    
    const login = async(data) => {
        await loginUser(data, setUser, setAuthenticated)
    }

    
    const logout = async(data) => {
        await logoutUser(setUser, setAuthenticated, data)
    }



    return (
        <AuthContext.Provider value={{ user, register, login, logout, authenticated }}>
            {children}
        </AuthContext.Provider>
    )
}



AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export {AuthContext, AuthProvider};






