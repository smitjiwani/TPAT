import { Router } from 'express';
import * as controllers from './controllers.js';

const router = Router();

router.get('/getclasses', controllers.getAllClasses);
router.get('/getclass/:id', controllers.getClassById);
router.get('/getclass/subject/:subjectID', controllers.getClassBySubjectId);
router.get('/getclass/teacher/:teacherID', controllers.getClassByTeacherId);
router.put('/updateclass/:id', controllers.updateClassById);
router.delete('/deleteclass/:id', controllers.deleteClassById);
router.post('/addclass', controllers.addClass);

