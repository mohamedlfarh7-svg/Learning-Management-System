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

export async function updateModuleService(moduleId, updateData) {
    const updateModel=  await Module.findByIdAndUpdate(moduleId,updateData,{new: true,runValidators: true })
    if(!updateModel){
        const error = new Error("Le module spécifié est introuvable");
        error.statusCode = 404;
        throw error;
    }
    return updateModel
}

export async function reorderModulesService(modulesOrder){
    for (const item of modulesOrder){
        await Module.findByIdAndUpdate(item.id,{order:item.order})
    }
    return true
}