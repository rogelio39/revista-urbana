import { Router } from "express";
import { createPublicity, getAllPublicities, getPublicityById, uploadPublicityImage } from "../controllers/publicity.controller.js";
import upload  from "../config/multer.js";


const publicityRouter = Router();

publicityRouter.get('/get', getAllPublicities);
publicityRouter.get('/find/:id', getPublicityById);
publicityRouter.post('/create', createPublicity);
publicityRouter.post('/upload/:id', upload.array('publicityImage', 6), uploadPublicityImage)


export default publicityRouter