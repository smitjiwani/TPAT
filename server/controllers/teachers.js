import db from '../db';

const getTeachers = async(req,res)=>{
    try {
        const teachers = await db('teachers').select('*');
        res.json(teachers);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTeacherById = async(req,res)=>{
    try {
        const { id } = req.params;
        const teacher = await db('teachers').where({ id }).first();
        res.json(teacher);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTeacherByEmail = async(req,res)=>{
    try {
        const { email } = req.params;
        const teacher = await db('teachers').where({ email }).first();
        res.json(teacher);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const createTeacher = async(req,res)=>{
    try {
        const teacher = await db('teachers').insert(req.body, '*');
        res.json(teacher);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const updateTeacher = async(req,res)=>{
    try {
        const { id } = req.params;
        const teacher = await db('teachers').where({ id }).update(req.body, '*');
        res.json(teacher);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteTeacher = async(req,res)=>{
    try {
        const { id } = req.params;
        const teacher = await db('teachers').where({ id }).del();
        res.json(teacher);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTeacherStudents = async(req,res)=>{
    try {
        const { id } = req.params;
        const students = await db('students').where({ teacher_id: id }).select('*');
        res.json(students);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTeacherStudentsByClass = async(req,res)=>{
    try {
        const { id, classId } = req.params;
        const students = await db('students').where({ teacher_id: id, class_id: classId }).select('*');
        res.json(students);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTeacherStudentsByClassAndName = async(req,res)=>{
    try {
        const { id, classId, name } = req.params;
        const students = await db('students').where({ teacher_id: id, class_id: classId }).andWhere('name', 'like', `%${name}%`).select('*');
        res.json(students);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTeacherStudentsByClassAndTag = async(req,res)=>{
    try {
        const { id, classId, tag } = req.params;
        const students = await db('students').where({ teacher_id: id, class_id: classId }).andWhere('tag', 'like', `%${tag}%`).select('*');
        res.json(students);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTeacherStudentsByClassAndNameAndTag = async(req,res)=>{
    try {
        const { id, classId, name, tag } = req.params;
        const students = await db('students').where({ teacher_id: id, class_id: classId }).andWhere('name', 'like', `%${name}%`).andWhere('tag', 'like', `%${tag}%`).select('*');
        res.json(students);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTeacherStudentsByTag = async(req,res)=>{
    try {
        const { id, tag } = req.params;
        const students = await db('students').where({ teacher_id: id }).andWhere('tag', 'like', `%${tag}%`).select('*');
        res.json(students);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTeacherStudentsByName = async(req,res)=>{
    try {
        const { id, name } = req.params;
        const students = await db('students').where({ teacher_id: id }).andWhere('name', 'like', `%${name}%`).select('*');
        res.json(students);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTeacherStudentsByNameAndTag = async(req,res)=>{
    try {
        const { id, name, tag } = req.params;
        const students = await db('students').where({ teacher_id: id }).andWhere('name', 'like', `%${name}%`).andWhere('tag', 'like', `%${tag}%`).select('*');
        res.json(students);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTeacherClasses = async(req,res)=>{
    try {
        const { id } = req.params;
        const classes = await db('classes').where({ teacher_id: id }).select('*');
        res.json(classes);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTeacherClassesByName = async(req,res)=>{
    try {
        const { id, name } = req.params;
        const classes = await db('classes').where({ teacher_id: id }).andWhere('name', 'like', `%${name}%`).select('*');
        res.json(classes);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTeacherClassesByTag = async(req,res)=>{
    try {
        const { id, tag } = req.params;
        const classes = await db('classes').where({ teacher_id: id }).andWhere('tag', 'like', `%${tag}%`).select('*');
        res.json(classes);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export default {
    getTeachers,
    getTeacherById,
    getTeacherByEmail,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacherStudents,
    getTeacherStudentsByClass,
    getTeacherStudentsByClassAndName,
    getTeacherStudentsByClassAndTag,
    getTeacherStudentsByClassAndNameAndTag,
    getTeacherStudentsByTag,
    getTeacherStudentsByName,
    getTeacherStudentsByNameAndTag,
    getTeacherClasses,
    getTeacherClassesByName,
    getTeacherClassesByTag
}
