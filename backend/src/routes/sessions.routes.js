import { login, logout, register } from "../controllers/sessions.controller.js";
import { Router } from "express";
import { passportError } from "../config/passportError.js";

const sessionRouter = Router()

sessionRouter.post('/register', passportError('register') ,register);
sessionRouter.post('/login', passportError('login'), login);
sessionRouter.get('/logout', logout);

export default sessionRouter;