import userRouter from "./users.routes.js";
import newsRouter from "./news.routes.js";
import { Router } from "express";

const routes = Router();

routes.use('/users', userRouter);
routes.use('/news', newsRouter);

export default routes