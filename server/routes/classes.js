import { Router } from "express";

import { getClasses, createClass, updateClass, deleteClass } from "../controllers/classes.js";

const router = Router();

router.get('classes/', getClasses);
router.post('classes/', createClass);
router.put('classes/:id', updateClass);
router.delete('classes/:id', deleteClass);

export default router;
