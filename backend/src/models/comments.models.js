import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2';


const commentSchema = new Schema({
    news_id : {
        type: String,
        ref: 'news',
        required: true
    },
    user_id : {
        type: String,
        ref: 'users',
        required: true

    },
    created_at : {
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    },
    comments :{
        type: String,
        required: true
    }
})

commentSchema.plugin(paginate);

commentSchema.pre('save', function(next){
    this.updated_at = new Date();
    next();
})


export const commentModels = model('comment', commentSchema);













































