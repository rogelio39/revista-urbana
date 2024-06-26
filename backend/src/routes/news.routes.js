import { Router } from "express";
import { getNews, getNewById, createNews, uploadImage, updateNews, deleteNews, updateNewsDatePublished, getNewsByCategory, getNewsByTitle } from "../controllers/news.controller.js";
import { passportError, authorization } from "../config/passportError.js";
import upload  from "../config/multer.js";


const newsRouter = Router();

newsRouter.get('/', getNews);
newsRouter.get('/byCategory', getNewsByCategory)
newsRouter.get('/byTitle', getNewsByTitle)
newsRouter.get('/:id', getNewById);
newsRouter.post('/', passportError('jwt'), authorization(['admin']), createNews);
newsRouter.post('/uploadImage/:id', passportError('jwt'), authorization(['admin']), upload.array('newsImage', 6), uploadImage);
newsRouter.put('/updateNews/:id', updateNews);
newsRouter.delete('/:id', passportError('jwt'), authorization(['admin']), deleteNews);
newsRouter.post('/updateDatePublished', passportError('jwt'), authorization(['admin']), updateNewsDatePublished);



export default newsRouter;
