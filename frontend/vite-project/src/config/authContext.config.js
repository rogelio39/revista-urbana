
const URL = import.meta.env.VITE_REACT_APP_MODE === 'DEV' ? import.meta.env.VITE_REACT_APP_LOCAL_URL : import.meta.env.VITE_REACT_APP_WEB_URL;


export const registerUser = async (setError, data) => {

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
            const dataResponse = await response.json();
            return dataResponse;
        }else {
            const text = await response.text();
            throw new Error(`${text}`);
        }
    } catch (error) {
        setError(error.message)
        throw error
    }

}

export const loginUser = async (data, setUser, setAuthenticated) => {

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


export const logoutUser = async (setUser, setAuthenticated) => {
    try {
        const response = await fetch(`${URL}/api/session/logout`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
        })

        if (response.ok) {
            const message = await response.json();
            setUser('');
            setAuthenticated(false);
            document.cookie = "jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
            localStorage.removeItem('user');
            return message
        }


    } catch (error) {
        console.log("error", error);
    }
}


