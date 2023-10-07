import { Router } from "express";

import { getStudents, createStudent, updateStudent, deleteStudent } from "../controllers/students.js";

const router = Router();

router.get('students/', getStudents);
router.post('students/', createStudent);
router.put('students/:id', updateStudent);
router.delete('students/:id', deleteStudent);

export default router;