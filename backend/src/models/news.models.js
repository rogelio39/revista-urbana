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
    thumbnail: []
})

newsSchema.plugin(paginate);

export const newsModels = model('news', newsSchema)