import { Router } from "express";
import * as controller from "./controllers.js";

const router = Router();

router.get("/", controller.getAllTeachers);
router.get("/:id", controller.getTeacherById);
router.get("/email/:email", controller.getTeacherByEmail);
router.post("/", controller.createTeacher);
router.put("/:id", controller.updateTeacher);
router.delete("/:id", controller.deleteTeacher);

export default router;
