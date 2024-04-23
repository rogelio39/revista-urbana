
const getCookiesByName= (name) => {

    const token = document.cookie.split(';');

    for(let i = 0; i < token.length; i++){
        const cookie = token[i].trim();
        if(cookie.startsWith(name + '=')){
            return cookie.substring(name.length + 1)
        }
    }

    return null
}


export default getCookiesByName