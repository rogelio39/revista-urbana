import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2';

const UsersSchema = new Schema({
    first_name : {
        type: String,
        required: true
    },
    last_name : {
        type: String,
        index: true,
        required: true
    },
    age : {
        type: Number,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'admin'
    }

})

UsersSchema.plugin(paginate)
export const usersModels = model('users', UsersSchema);