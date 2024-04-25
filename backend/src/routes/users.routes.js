import { getUsers, getUserById, createUser } from "../controllers/users.controller.js";
import { Router } from "express";
import { passportError, authorization } from "../config/passportError.js";

const userRouter = Router();

userRouter.get('/', passportError('jwt'), authorization(['admin']), getUsers);
userRouter.get('/:id', passportError('jwt'), authorization(['admin']), getUserById);
userRouter.post('/', passportError('jwt'), authorization(['admin']), createUser);


export default userRouter;
