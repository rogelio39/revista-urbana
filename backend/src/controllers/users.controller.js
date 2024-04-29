import { usersModels } from "../models/users.models.js";


export const getUsers = async(req, res) => {
    try{
        const users = await usersModels.find();
        if(users){
            res.status(200).send(users)
        }else{
            res.status(400).send({message:"error al buscar usuarios"})
        }
        
    }catch(error){
        res.status(500).send(`error al traer usuarios${error}`)
    }
}


export const getUserById = async(req, res) => {
    const {id} = req.params;
    try{
        const user = await usersModels.findById(id);
        if(user){
            res.send(user)
        }else{
            res.status(400).send({message:"error al buscar usuario"})
        }
        
    }catch(error){
        res.send(`error al traer usuario${error}`)
    }
}


export const createUser = async(req, res) => {
    const {first_name, last_name, email, password} = req.body;

    try{
        const user = await usersModels.create({first_name, last_name, email, password});
        if(user){
            res.send(user)
        }else{
            res.status(400).send({message:"error al crear usuario"})
        }
        
    }catch(error){
        res.send(`error al crear usuario${error}`)
    }
}