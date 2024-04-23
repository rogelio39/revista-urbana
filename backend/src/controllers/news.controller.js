import { newsModels } from "../models/news.models.js";


export const getNews = async(req, res) => {
    try{
        const news = newsModels.find();
        if(news){
            res.status(200).send(news)
        }else{
            res.status(400).send("error al traer noticias")
        }

    }catch(error){
        res.status(500).send(`error al traer noticia ${error}`)
    }
}

export const getNewById = async(req, res) => {
    const {id} = req.params;
    try{
        const news = newsModels.findById(id);
        if(news){
            res.status(200).send(news)
        }else{
            res.status(400).send("error al traer noticias")
        }

    }catch(error){
        res.status(500).send(`error al traer noticia ${error}`)
    }
}

export const createNews = async(req, res) => {
    const {title, subtitle, text} = req.body;
    const files = req.files;

    if(!files || files.length === 0){
        return res.status(400).send("no se encontraron archivos")
    }

    try{
        const news = newsModels.create({title, subtitle, text});

        if(!news){
            return res.status(400).send("no se creo producto")
        }

        const updatedThumnbails = files.map(file => ({
            name: file.filename,
            reference: file.path
        }))

        if(!news.thumbnail){
            news.thumbnail = [];
        }


        news.thumbnail.push(...updatedThumnbails);
        await news.save();
        res.status(200).send("noticia creada exitosamente");


    }catch(error){
        res.status(500).send(`error al traer noticia ${error}`)
    }
}