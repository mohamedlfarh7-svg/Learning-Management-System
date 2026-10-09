import express from "express"
import {
    getOneWithResources,
    createModule,
    updateModule
} from "./module.controller.js"
import { authorize } from "../../middleware/authorize.js";

const router = express.Router()

router.get('/:id/resources' , getOneWithResources)
router.post("/", authorize("module:create"), createModule);
router.put('/:id',authorize("module:update"),updateModule)

export default router
