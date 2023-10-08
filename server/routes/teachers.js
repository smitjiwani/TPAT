import { Router } from "express";

import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from "../controllers/teachers.js";

const router = Router();

router.get('teachers/', getTeachers);
router.post('teachers/', createTeacher);
router.put('teachers/:id', updateTeacher);
router.delete('teachers/:id', deleteTeacher);

export default teacherRoutes;
