import passport from 'passport';
import { createHash, validatePassword } from './bcrypt.js';
import jwt from 'passport-jwt';
import local from 'passport-local';
import 'dotenv/config'
import {usersModels} from '../models/users.models.js'


const localStrategy = local.Strategy;
const jwtStrategy = jwt.Strategy;

const jwtExtractor = jwt.ExtractJwt;

const initializePassport = () => {

    const getCookies = (req) => {
        if (req.cookies.jwtCookie) {
            const token = req.cookies.jwtCookie ? req.cookies.jwtCookie : {};
            return token
        }

        const [bearer, token] = req.headers.authorization.split(' ')
        if (bearer == 'Bearer' && token) {
            console.log("token", token)
            return token
        } else {
            console.log("encabezado mal formado")
        }
    }

    passport.use('jwt', new jwtStrategy({
        jwtFromRequest: jwtExtractor.fromExtractors([getCookies]),
        secretOrKey: process.env.JWT_SECRET
    },

        async (payload, done) => {
            try {
                console.log("payload", payload);
                return done(null, payload);

            } catch (error) {
                return done(error);
            }
        }

    ))


    passport.use('register', new localStrategy({
        passReqToCallback: true, usernameField: ('email')
    },
        async (req, username, password, done) => {
            const { first_name, last_name, age, email } = req.body
            try {
                const user = await usersModels.findOne({ email: username })
                if (user) {
                    console.log("user en register passport", user)
                    return done(null, false, { message: 'usuario ya registrado.' })
                }

                const passwordHash = createHash(password);
                const userCreated = await usersModels.create({
                    first_name: first_name,
                    last_name: last_name,
                    age: age,
                    email: email,
                    password: passwordHash
                })

                return done(null, userCreated);

            } catch (error) {
                return done(error);
            }
        }
    ))


    passport.use('login', new localStrategy({
        usernameField: 'email'
    },
    async(username, password, done) => {
        try{
            const user = await usersModels.findOne({email: username})
            if(!user){
                console.log("usuario no existe");
                return done(null, false);
            }

            if(validatePassword(password, user.password)){
                return done(null, user)
            }else{
                console.log("contraseña invalida");
                return done(null, false);
            }

        }catch(error){
            return done(error)
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async(id, done) => {
    const user = await usersModels.findById(id);
    done(null, user);
})

}



export default  initializePassport;