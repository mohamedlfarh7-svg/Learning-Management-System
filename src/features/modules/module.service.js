import Module from "./module.module.js"
import Resource from "../resources/resource.module.js"

async function getModuleById(moduleId, collections = []) {

    let query = Module.findById(moduleId)

    collections.forEach(collection => {
        query = query.populate(collection)
    })

    return query
}


export { getModuleById }

export async function createModuleService (moduleData){
    const course = await course.findOne(moduleData.course);
    if(!course){
        const error = new Error("Le cours spécifié est introuvable");
        error.statusCode, 404;
        throw error;
    }
    const newModule = await Module.create(moduleData);

    return newModule;
}