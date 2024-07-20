import { Schema, model } from "mongoose";


const publicitySchema = new Schema({
    name : {
        type: String,
        required: true
    },
    thumbnail: []
})


export const publicityModel = model('publicity', publicitySchema);