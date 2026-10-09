import { getModuleById } from "./module.service.js"

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
            data: newModule
        });
	}catch(error){
		return next(error);
	}
}

