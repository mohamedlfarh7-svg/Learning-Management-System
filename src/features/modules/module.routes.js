import express from "express"
import {
    getOneWithResources,
    createModule,
    updateModule,
    reorderModules,
    getModule
} from "./module.controller.js"
import { authorize } from "../../middleware/authorize.js";

const router = express.Router()

router.get('/:id/resources' , getOneWithResources)
router.post("/", authorize("module:create"), createModule);
router.put('/:id',authorize("module:update"),updateModule)
router.patch("/reorder", authorize("module:update"), reorderModules);
router.get("/course/:courseId", authorize("module:read"), getModules);

export default router
