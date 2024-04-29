import { Router } from "express";
import { getNews, getNewById, createNews, uploadImage } from "../controllers/news.controller.js";
import { passportError, authorization } from "../config/passportError.js";
import { upload } from "../config/multer.js";

const newsRouter = Router();

newsRouter.get('/', getNews);
newsRouter.get('/:id', getNewById);
newsRouter.post('/', passportError('jwt'), authorization(['admin']), createNews);
newsRouter.post('/uploadImage/:id', passportError('jwt'), authorization(['admin']), upload.array('newsImage', 6), uploadImage);


export default newsRouter;