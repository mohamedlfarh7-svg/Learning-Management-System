import { getModuleById,createModuleService,updateModuleService , reorderModulesService,getModulesByCourseService} from "./module.service.js"

async function getOneWithResources(req, res, next) {
	try {

		const module = await getModuleById(req.params.id, ['resources']);

		if (!module) {
			return res.status(404).json({
				success: false,
				message: "Module not found",
			});
		}

		res.status(200).json({
			success: true,
			data: {
				module,
			},
		});
	} catch (error) {
		next(error);
	}
}

export { getOneWithResources }

export async function createModule(req, res, next){
	try{
		const newModule = await createModuleService(req.body);
		return res.status(201).json({
            success: true,
            message: "Module créé avec succès",
            data: {newModule}
        });
	}catch(error){
		return next(error);
	}
}

export async function updateModule(req,res,next) {
	try{
		const { id } = req.params;
        const updateData = req.body;
		const updatedModule =  await updateModuleService(id,updateData);
		return res.status(200).json({
            success: true,
            message: "Module mis à jour avec succès",
            data: {updatedModule}
        });
	}catch(error){
		next(error)
	}
}

export async function reorderModules(req, res, next) {
    try {
        const { modules } = req.body;

        if (!modules || !Array.isArray(modules)) {
            const error = new Error("Format de données invalide. Un tableau de modules est requis.");
            error.statusCode = 400;
            return next(error);
        }

        await reorderModulesService(modules);

        return res.status(200).json({
            success: true,
            message: "L'ordre des modules a été mis à jour avec succès"
        });

    } catch (error) {
        return next(error);
    }
}

export async function getModule(req,res,next) {
	try{
		const {courseID} = req.params
		const modules = await getModulesByCourseService(courseID)
		return res.status(200).json({
            success: true,
			count: modules.length,
            data: {modules}
        });

	}catch(error){
		next(error)
	}
}
