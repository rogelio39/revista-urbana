import { Schema } from "mongoose";
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
        type: number,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: Number,
        required: true
    }

})

UsersSchema.plugin(paginate)
export const usersModels = model('users', UsersSchema);