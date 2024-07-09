import paginate from 'mongoose-paginate-v2'
import { Schema, model } from 'mongoose'

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: false
    },
    font: {
        type: String,
        required: true
    },
    pieDeImagen : {
        type: String,
    },
    tags : [String],
    thumbnail: [String],
    url : {
        type: String
    },
    datePublished: {
        type : Date,
        default : Date.now
    }
})

newsSchema.plugin(paginate);

newsSchema.pre('save', function(next) {
    if(!this.datePublished){
        this.datePublished = new Date()
    }
    next()
})

export const newsModels = model('news', newsSchema)