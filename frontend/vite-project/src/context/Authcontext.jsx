import { createContext } from "react";
import { useState } from "react";
import PropTypes from 'prop-types'
import { registerUser, loginUser, logoutUser } from "../config/authContext.config";


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [authenticated, setAuthenticated] = useState(false)
    const [error, setError] = useState(null)

    const register = async(data) => {
        return registerUser(setError, data)
    }

    
    const login = async(data) => {
        return loginUser(data, setUser, setAuthenticated)
    }

    
    const logout = async(data) => {
        return logoutUser(setUser, setAuthenticated, data)
    }



    return (
        <AuthContext.Provider value={{ user, error, register, login, logout, authenticated }}>
            {children}
        </AuthContext.Provider>
    )
}



AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export {AuthContext, AuthProvider};






