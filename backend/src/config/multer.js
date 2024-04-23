import multer from 'multer';
import { __dirname } from '../path.js';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {

        let uploadPath = '';

        if(file.fieldname === 'newsImage'){
            uploadPath = path.join(__dirname, 'uploads/news')
        }

        callback(null, uploadPath);

    },
    filename: (req, file, callback) => {
        const fileName = `${Date.now()}-${file.originalname}}`

        callback(null, fileName);
    }   
})

export const upload = multer({storage: storage});