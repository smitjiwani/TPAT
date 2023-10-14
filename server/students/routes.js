import { Router } from "express";
import * as controller from "./controllers.js";

const router = Router();

router.get("/", controller.getAllStudents);
router.get("/:id", controller.getStudentById);
router.get("/email/:email", controller.getStudentByEmail);
router.post("/", controller.createStudent);
router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.deleteStudent);


export default router;
