import passport from "passport";

export const passportError = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if(error){
                return next(error);
            }
            if(!user){
                res.status(401).send({error: info.messages ? info.messages : info.toString()})
            }else{
                req.user = user;
                next();
            }
        })(req, res, next)
    }
}


export const authorization = (roles) => {
    return async(req, res, next) => {
        if(!req.user){
            return res.status(401).send("no existe sesion activa. Usuario no autorizado");
        }

        const userRole = req.user.user.rol
        console.log(userRole)

        if(!roles.includes(userRole)){
            return res.status(401).send("no tienes permisos para realizar esta accion");
        }

        next();
    }
}