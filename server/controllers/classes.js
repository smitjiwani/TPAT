import db from '../db.js'

const getClasses = async (req, res) => {
    try {
        const classes = await db('classes').select('*');
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getClass = async (req, res) => {
    try {
        const { id } = req.params;
        const clas = await db('classes').where({ id }).first();
        res.json(clas);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createClass = async (req, res) => {
    try {
        const clas = await db('classes').insert(req.body, '*');
        res.json(clas);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const clas = await db('classes').where({ id }).update(req.body, '*');
        res.json(clas);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const clas = await db('classes').where({ id }).del();
        res.json(clas);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getClassStudents = async (req, res) => {
    try {
        const { id } = req.params;
        const students = await db('students').where({ class_id: id }).select('*');
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getClassTeachers = async (req, res) => {
    try {
        const { id } = req.params;
        const teachers = await db('teachers').where({ class_id: id }).select('*');
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

