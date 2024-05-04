import { newsModels } from "../models/news.models.js";


export const getNews = async(req, res) => {
    try{
        const news = await newsModels.find();
        if(news){
            res.status(200).send(news)
        }else{
            res.status(400).send({message: "error al traer noticias"})
        }

    }catch(error){
        res.status(500).send({message: "error al traer noticias", error: error})
    }
}

export const getNewById = async(req, res) => {
    const {id} = req.params;
    try{
        const news = await newsModels.findById(id);
        if(news){
            res.status(200).send(news)
        }else{
            res.status(400).send({message: "error al traer noticias"})
        }

    }catch(error){
        res.status(500).send({message: "error al traer noticias", error: error})
    }
}






export const createNews = async(req, res) => {
    const {title, subtitle, category, font, text} = req.body;

    try{
        const news = await newsModels.create({title, subtitle, category, font, text});

        if(!news){
            return res.status(400).send({message: "no se creo noticia"})
        }

        
        // Buscar la noticia recién creada para obtener su _id
        const newNews = await newsModels.findById(news._id);

        if (!newNews) {
            return res.status(400).send({ message: "No se encontró la noticia recién creada" });
        }

        res.status(200).send(news);

    }catch(error){
        res.status(500).send({message: "error del servidor", error: error});
    }
}

export const uploadImage = async(req, res) => {

    const {id} = req.params
    const files = req.files;

    if(!files || files.length === 0){
        return res.status(400).send({message: "no se encontraron archivos"})
    }

    try{
        const news = await newsModels.findById(id);
        if(!news){
            return res.status(400).send({message:"no se encontro noticia" })
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
        res.status(200).json({message:"imagen creada exitosamente" });

    }catch(error){
        res.status(500).send({error: error})
    }

}