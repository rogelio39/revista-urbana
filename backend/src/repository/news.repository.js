import { newsModels } from "../models/news.models.js";

class NewsRepository {

    async findAll(options){
        if (options.limit > 0){
            return await newsModels.paginate({}, options)
        }else{
            return await newsModels.find();
        }
    }

    async findById(id){
        return await newsModels.findById(id);
    }


    async findByCategory(filter, options){

        const query = filter ? {category : { $regex : filter, $options : 'i'}} : {};
        return await newsModels.paginate(query, options)
    }



    async findByTitle(filter, options){
        const query = filter ? {title: {$regex: title, $options: 'i'}} : {}
        return await newsModels.paginate(query, options);
    }


    async create(newsData){
        return await newsModels.create(newsData);
    }

    async  update(id, updatedFields){
        return await newsModels.findByIdAndUpdate(id, updatedFields, {new: true});
    }


    async delete(id){
        return await newsModels.findByIdAndDelete(id);

    }
}


export const newsRepository = new NewsRepository();