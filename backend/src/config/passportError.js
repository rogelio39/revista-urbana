import passport from "passport";

export const passportError = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if(error){
                return next(error);
            }
            if(!user){
                res.status(401).json({error: info.message ? info.message : info.toString()})
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
            return res.status(401).json({message: "no existe sesion activa. Usuario no autorizado"});
        }

        const userRole = req.user.rol


        if(!roles.includes(userRole)){
            return res.status(401).json({message: "no tienes permisos para realizar esta accion"});
        }

        next();
    }
}