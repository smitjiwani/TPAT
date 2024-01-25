import { Router } from 'express';
import * as controllers from './controllers.js';

const router = Router();

router.get('/', controllers.getAllClasses);
router.get('/:id', controllers.getClassById);
router.get('/getclassbysubjectid/:subjectID', controllers.getClassBySubjectId);
router.get('/getclassbyteacherid/:teacherID', controllers.getClassByTeacherId);
router.put('/updateclass/:id', controllers.updateClassById);
router.delete('/deleteclass/:id', controllers.deleteClassById);
router.post('/addclass', controllers.addClass);

export default router;

