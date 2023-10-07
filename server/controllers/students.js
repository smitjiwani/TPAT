import db from '../db.js'

const getStudents = async(req,res)=>{
    try {
        const students = await db('students').select('*');
        res.json(students);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getStudent = async(req,res)=>{
    try {
        const { id } = req.params;
        const student = await db('students').where({ id }).first();
        res.json(student);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const createStudent = async(req,res)=>{
    try {
        const student = await db('students').insert(req.body, '*');
        res.json(student);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const updateStudent = async(req,res)=>{
    try {
        const { id } = req.params;
        const student = await db('students').where({ id }).update(req.body, '*');
        res.json(student);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteStudent = async(req,res)=>{
    try {
        const { id } = req.params;
        const student = await db('students').where({ id }).del();
        res.json(student);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getStudentTeachers = async(req,res)=>{
    try {
        const { id } = req.params;
        const teachers = await db('teachers').where({ student_id: id }).select('*');
        res.json(teachers);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentTeachers
}
