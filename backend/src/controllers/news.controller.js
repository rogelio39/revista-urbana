import { newsRepository } from '../repository/news.repository.js';
import {s3Client, endpoint} from '../libs/s3Client.js';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {v4 as uuidv4} from 'uuid';
import sharp from 'sharp'




export const getNews = async(req, res) => {

    const {limit, page} = req.query

    const options = {
        limit : limit ? parseInt(limit, 10) : 0,
        page: page ? parseInt(page, 10) : 1,
        sort : {datePublished: -1}
    }

    try{
        
        const news = await newsRepository.findAll({}, options);

        if(news){
            res.status(200).json(news)
        }else{
            res.status(400).send({message: "error al traer noticias"})
        }

    }catch(error){
        res.status(500).send({message: "error al traer noticias", error: error})
    }
}

export const getNewsByCategory = async(req, res) => {

    const {limit, page, filter} = req.query

    const options = {
        limit: limit ? parseInt(limit, 10) : 10,
        page : page ? parseInt(page, 10) : 1,
        sort: {datePublished: -1}
    }


    try{

        const news = await newsRepository.findByCategory(filter, options);

        if(news){
            res.status(200).json(news)
        }else{
            res.status(400).send({message: "error al traer noticias"})
        }

    }catch(error){
        res.status(500).send({message: "error al traer noticias", error: error})
    }
}


export const getNewsByTitle = async(req, res) => {

    const {filter, limit, page} = req.query

    const options = {
        limit: limit ? parseInt(limit, 10) : 10,
        page: page ? parseInt(page, 10) : 1,
        sort : {datePublished: -1}
    }


    try{
        const news = await newsRepository.findByTitle(filter, options);

        if(news){
            res.status(200).json(news)
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
        const news = await newsRepository.findById(id);
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
    const {title, subtitle, category, font, text, pieDeImagen, tags, url} = req.body;

    try{
        const news = await newsRepository.create({title, subtitle, category, font, pieDeImagen, text, tags, url});

        if(!news){
            return res.status(400).send({message: "no se creo noticia"})
        }

        
        // Buscar la noticia recién creada para obtener su _id
        const newNews = await newsRepository.findById(news._id);

        if (!newNews) {
            return res.status(400).send({ message: "No se encontró la noticia recién creada" });
        }

        res.status(200).send(news);

    }catch(error){
        res.status(500).send({message: "error del servidor", error: error});
    }
}
export const updateNews = async(req, res) => {
    const {title, subtitle, category, font, text, pieDeImagen, tags, url} = req.body;
    const {id} = req.params;

    const updatedFields = {}

    
    if(title !== undefined){
        updatedFields.title = title;
    }
    if(subtitle !== undefined){
        updatedFields.subtitle = subtitle;
    }
    if(category !== undefined){
        updatedFields.category = category;
    }
    if(font !== undefined){
        updatedFields.font = font;
    }
    if(text !== undefined){
        updatedFields.text = text;
    }
    if(pieDeImagen !== undefined){
        updatedFields.pieDeImagen = pieDeImagen;
    }
    if(tags !== undefined){
        updatedFields.tags = tags;
    }
    if(url !== undefined){
        updatedFields.url = url;
    }
    
    try{
        const updatedNews = await newsRepository.update( id, updatedFields);

        if(!updatedNews){
            return res.status(400).send({message: "no se creo noticia"})
        }

        res.status(200).send(updatedNews);

    }catch(error){
        res.status(500).send({message: "error del servidor", error: error});
    }
}

export const deleteNews = async(req, res) => {
    const {id} = req.params;
    try{
        const delNews = await newsRepository.delete(id);

        if(!delNews){
            return res.status(400).send({message: "no se elimino noticia"})
        }

        res.status(200).send(delNews);

    }catch(error){
        res.status(500).send({message: "error del servidor", error: error});
    }

    
}


export const updateNewsDatePublished = async(req, res) => {

    try{

        const newsWithoutDate = await newsRepository.findAll({datePublished: {$exists : false}})

        if(newsWithoutDate.length === 0){
            res.status(404).json({message: "No hay noticias para actualizar"})
        }

        for (const news of newsWithoutDate){
            news.datePublished = news.createdAt  || new Date('2024-05-06');
            await news.save();
        }

        res.status(200).send({ message: "Noticias actualizadas exitosamente." });

    }catch(error) {
        console.log("error al actualizar ruta");
        res.status(500).send({message: "error del servidor,", error: error})
    }
}


export const uploadImage = async (req, res) => {
    const { id } = req.params;
    const files = req.files;


    if (!files || files.length === 0) {
        return res.status(400).send({ message: "No se encontraron archivos" });
    }

    try {
        const news = await newsRepository.findById(id);
        if (!news) {
            return res.status(400).send({ message: "No se encontró noticia" });
        }

        const file = files[0];
        const buffer = file.buffer;

        
        const uniqueFileName = `${uuidv4()}-${file.originalname}`

        const optimizedBuffer = await sharp(buffer)
        .resize(800)
        .toFormat('webp')
        .toBuffer();

        const bucketParams = {
            Bucket: "revista-urbana", // Solo el nombre del bucket
            Key: uniqueFileName, // O usa un nombre único si es necesario
            Body: optimizedBuffer,
            ACL: 'public-read',
            ContentType: 'image/webp',
            CacheControl: 'max-age=3600'
        };


        const result = await s3Client.send(new PutObjectCommand(bucketParams));
        console.log("result", result)

        if(result.ETag){
            const urlOcean = `${endpoint}/${bucketParams.Bucket}/${bucketParams.Key}`;

            if (!news.thumbnail) {
                news.thumbnail = [];
            }
    
            news.thumbnail.push(urlOcean);
            await news.save();
            res.status(200).json({ message: "Imagen creada exitosamente" });
        }

    } catch (error) {
        console.error("Error en uploadImage", error);
        res.status(500).send({ error: error.message });
    }
};


// Función para actualizar las noticias sin `datePublished`

// export const uploadImage = async(req, res) => {

//     const {id} = req.params
//     const files = req.files;

//     if(!files || files.length === 0){
//         return res.status(400).send({message: "no se encontraron archivos"})
//     }

//     try{
//         const news = await newsModels.findById(id);
//         if(!news){
//             return res.status(400).send({message:"no se encontro noticia" })
//         }

//         const updatedThumnbails = files.map(file => ({
//             name: file.filename,
//             reference: file.path
//         }))
    
//         if(!news.thumbnail){
//             news.thumbnail = [];
//         }
    
    
//         news.thumbnail.push(...updatedThumnbails);
//         await news.save();
//         res.status(200).json({message:"imagen creada exitosamente" });

//     }catch(error){
//         res.status(500).send({error: error})
//     }

// }












// export const getNews = async(req, res) => {

//     const {limit, page} = req.query



//     const options = {
//         limit : limit ? parseInt(limit, 10) : 0,
//         page: page ? parseInt(page, 10) : 1,
//         sort : {datePublished: -1}
//     }

//     try{
//         let news
//         if(limit > 0){
//             news = await newsModels.paginate({}, options);
//         }
//         else {
//             news = await newsModels.find();
//         }

//         if(news){
//             res.status(200).json(news)
//         }else{
//             res.status(400).send({message: "error al traer noticias"})
//         }

//     }catch(error){
//         res.status(500).send({message: "error al traer noticias", error: error})
//     }
// }

// export const getNewsByCategory = async(req, res) => {

//     const {limit, page, filter} = req.query

//     const options = {
//         limit: limit ? parseInt(limit, 10) : 10,
//         page : page ? parseInt(page, 10) : 1,
//         sort: {datePublished: -1}
//     }
//     const query = filter ? { category: { $regex: filter, $options: 'i' } } : {};

//     try{

//         const news = await newsModels.paginate(query, options);

//         if(news){
//             res.status(200).json(news)
//         }else{
//             res.status(400).send({message: "error al traer noticias"})
//         }

//     }catch(error){
//         res.status(500).send({message: "error al traer noticias", error: error})
//     }
// }


// export const getNewsByTitle = async(req, res) => {

//     const {filter, limit, page} = req.query

//     const options = {
//         limit: limit ? parseInt(limit, 10) : 10,
//         page: page ? parseInt(page, 10) : 1,
//         sort : {datePublished: -1}
//     }
//     const query = filter ? { title: { $regex: filter, $options: 'i' } } : {};

//     try{
//         const news = await newsModels.paginate(query, options);

//         if(news){
//             res.status(200).json(news)
//         }else{
//             res.status(400).send({message: "error al traer noticias"})
//         }

//     }catch(error){
//         res.status(500).send({message: "error al traer noticias", error: error})
//     }
// }


// export const getNewById = async(req, res) => {
//     const {id} = req.params;
//     try{
//         const news = await newsModels.findById(id);
//         if(news){
//             res.status(200).send(news)
//         }else{
//             res.status(400).send({message: "error al traer noticias"})
//         }

//     }catch(error){
//         res.status(500).send({message: "error al traer noticias", error: error})
//     }
// }



// export const createNews = async(req, res) => {
//     const {title, subtitle, category, font, text, pieDeImagen, tags, url} = req.body;

//     try{
//         const news = await newsModels.create({title, subtitle, category, font, pieDeImagen, text, tags, url});

//         if(!news){
//             return res.status(400).send({message: "no se creo noticia"})
//         }

        
//         // Buscar la noticia recién creada para obtener su _id
//         const newNews = await newsModels.findById(news._id);

//         if (!newNews) {
//             return res.status(400).send({ message: "No se encontró la noticia recién creada" });
//         }

//         res.status(200).send(news);

//     }catch(error){
//         res.status(500).send({message: "error del servidor", error: error});
//     }
// }
// export const updateNews = async(req, res) => {
//     const {title, subtitle, category, font, text, pieDeImagen, tags, url} = req.body;
//     const {id} = req.params;

//     const updatedFields = {}

    
//     if(title !== undefined){
//         updatedFields.title = title;
//     }
//     if(subtitle !== undefined){
//         updatedFields.subtitle = subtitle;
//     }
//     if(category !== undefined){
//         updatedFields.category = category;
//     }
//     if(font !== undefined){
//         updatedFields.font = font;
//     }
//     if(text !== undefined){
//         updatedFields.text = text;
//     }
//     if(pieDeImagen !== undefined){
//         updatedFields.pieDeImagen = pieDeImagen;
//     }
//     if(tags !== undefined){
//         updatedFields.tags = tags;
//     }
//     if(url !== undefined){
//         updatedFields.url = url;
//     }
    
//     try{
//         const updatedNews = await newsModels.findByIdAndUpdate( id, updatedFields, {new : true});

//         if(!updatedNews){
//             return res.status(400).send({message: "no se creo noticia"})
//         }

//         res.status(200).send(updatedNews);

//     }catch(error){
//         res.status(500).send({message: "error del servidor", error: error});
//     }
// }

// export const deleteNews = async(req, res) => {
//     const {id} = req.params;
//     try{
//         const delNews = await newsModels.findByIdAndDelete( id, {new : true});

//         if(!delNews){
//             return res.status(400).send({message: "no se elimino noticia"})
//         }

//         res.status(200).send(delNews);

//     }catch(error){
//         res.status(500).send({message: "error del servidor", error: error});
//     }

    
// }