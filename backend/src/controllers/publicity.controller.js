import {s3Client, endpoint} from '../libs/s3Client.js';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {v4 as uuidv4} from 'uuid';
import sharp from 'sharp'
import { publicityRepository } from '../repository/publicity.repository.js';

export const getAllPublicities = async(req, res) => {
    try{

        const publicities = await publicityRepository.getAll();
        if(publicities){
            res.status(200).json(publicities)
        }else{
            res.status(400).json({error: "no se encontraron noticias"});
        }

    }catch(error){
        res.status(500).json({error : "error al traer publicidades"})
    }
}

export const getPublicityById = async(req, res) => {

    const {id} = req.params
    try{

        const publicities = await publicityRepository.getById(id);
        if(publicities){
            res.status(200).json(publicities)
        }else{
            res.status(400).json({error: "no se encontraron noticias"});
        }

    }catch(error){
        res.status(500).json({error : "error al traer publicidades"})
    }
}

export const createPublicity = async (req, res) => {

    const {name} = req.body



    try{
        const publicity = await publicityRepository.create({name: name});

        if(publicity){
            console.log("publicidad", publicity)
            res.status(200).json({message: 'Noticia creada correctamente' , id: publicity._id});
        }else{
            res.status(400).json({message: "No se pudo crear noticia"});
        }
    }catch(error){
        res.status(500).json({error: error});
    }
};


export const uploadPublicityImage = async(req, res) => {
    const {id} = req.params
    const files = req.files;


    if (!files || files.length === 0) {
        return res.status(400).send({ message: "No se encontraron archivos" });
    }

    try {
        const publicity = await publicityRepository.getById(id);
        if (!publicity) {
            return res.status(400).send({ message: "No se encontró noticia" });
        }

        console.log("piibl", publicity)
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
            CacheControl: 'max-age=31536000'
        };


        const result = await s3Client.send(new PutObjectCommand(bucketParams));


        if (result.ETag) {
            const urlOcean = `${endpoint}/${bucketParams.Bucket}/${bucketParams.Key}`;

            if (!publicity.thumbnail) {
                publicity.thumbnail = [];
            }

            publicity.thumbnail.push(urlOcean);
            await publicity.save();
            res.status(200).json({ message: "Imagen creada exitosamente" });
        }

    } catch (error) {
        console.error("Error en uploadImage", error);
        res.status(500).send({ error: error.message });
    }
}