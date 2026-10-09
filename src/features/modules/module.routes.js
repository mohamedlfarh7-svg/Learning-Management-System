import express from "express"
import {
    getOneWithResources,
    createModule
} from "./module.controller.js"
import { authorize } from "../../middleware/authorize.js";

const router = express.Router()

router.get('/:id/resources' , getOneWithResources)
router.post("/", authorize("module:create"), createModule);

export default router
