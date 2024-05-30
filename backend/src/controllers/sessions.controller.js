import generateToken from "../config/jwt.js";


export const register = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ message: "Usuario ya existe" });
        }

        res.status(200).send({ message: "Usuario registrado con exito" });

    } catch (error) {
        res.status(500).send({ message: error });
    }
}


export const login = async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ message: "error al loguarse" });
    }

    const token = generateToken(req.user);
    


    res.cookie('jwtCookie', token, {
        maxAge: 4320000
    })

    res.status(200).send({ message: "usuario logueado con exito", user: req.user.rol, token: token});
}



export const logout = async (req, res) => {
    try {
        // sino, va esto:
        res.clearCookie('jwtCookie');
        res.status(200).send({ resultado: 'usuario deslogueado' })
    } catch (error) {
        res.status(400).send({ error: `error en logout ${error}` });
    }
}