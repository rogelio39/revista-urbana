import { getComments,  addComment, deleteComments } from "../controllers/comments.controller.js";
import { Router } from "express";


const commentsRouter = Router();

commentsRouter.get('/news/:id', getComments);
commentsRouter.post('/news/:id', addComment);
commentsRouter.delete('/news/:id/comments', deleteComments);

export default commentsRouter;