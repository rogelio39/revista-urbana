import { Router } from "express";
import { getNews, getNewById, createNews } from "../controllers/news.controller.js";
import { passportError, authorization } from "../config/passportError.js";

const newsRouter = Router();

newsRouter.get('/', getNews);
newsRouter.get('/:id', getNewById);
newsRouter.post('/', passportError('jwt'), authorization(['admin']), createNews);


export default newsRouter;