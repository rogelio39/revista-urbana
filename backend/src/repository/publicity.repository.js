import { publicityModel } from "../models/publicity.models.js"



class PublicityRepository{

    async getAll(){
        return await publicityModel.find();
    }
    async getById(id){
        console.log("id", id)
        return await publicityModel.findById(id);
    }
    async create(name){
        return await publicityModel.create(name);
    }



} 


export const publicityRepository = new PublicityRepository();