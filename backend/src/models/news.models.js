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
    font: {
        type: String,
        required: true
    },
    pieDeImagen : {
        type: String,
    },
    thumbnail: []
})

newsSchema.plugin(paginate);

export const newsModels = model('news', newsSchema)