import { login, logout, register } from "../controllers/sessions.controller.js";
import passport from "passport";
import { Router } from "express";

const sessionRouter = Router()

sessionRouter.post('/register', passport.authenticate('register') ,register);
sessionRouter.post('/login', passport.authenticate('login'), login);
sessionRouter.get('/logout', logout);

export default sessionRouter;