import userRouter from "./users.routes.js";
import newsRouter from "./news.routes.js";
import sessionRouter from "./sessions.routes.js";
import { Router } from "express";
import commentsRouter from "./comments.routes.js";

const router = Router();

router.use('/users', userRouter);
router.use('/news', newsRouter);
router.use('/session', sessionRouter);
router.use('/comments', commentsRouter);

export default router