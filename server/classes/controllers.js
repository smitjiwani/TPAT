import * as queries from './queries.js'

export const getAllClasses = async (req, res) => {
    try {
        const classes = await queries.getAllClasses;
        res.json(classes);
    } catch (error) {
        res.json({ error: error.message || error.toString() });
    }
};


export const getClassById = async (req, res) => {
    try {
        const classID = req.params.classID;
        const classes = await queries.getClassById(classID);
        res.json(classes);
    } catch (error) {
        res.json({ error: error.message || error.toString() });
    }
}

export const getClassBySubjectId = async (req, res) => {
    try {
        const subjectID = req.params.subjectID;
        const classes = await queries.getClassBySubjectId(subjectID);
        res.json(classes);
    } catch (error) {
        res.json({ error: error.message || error.toString() });
    }
}

export const getClassByTeacherId = async (req, res) => {
    try {
        const teacherID = req.params.teacherID;
        const classes = await queries.getClassByTeacherId(teacherID);
        res.json(classes);
    } catch (error) {
        res.json({ error: error.message || error.toString() });
    }
}

export const updateClassById = async (req, res) => {
    try {
        const classID = req.params.classID;
        const newClass = req.body;
        const classes = await queries.updateClassById(classID, newClass);
        res.json(classes);
    } catch (error) {
        res.json({ error: error.message || error.toString() });
    }
}

export const deleteClassById = async (req, res) => {
    try {
        const classID = req.params.classID;
        const classes = await queries.deleteClassById(classID);
        res.json(classes);
    } catch (error) {
        res.json({ error: error.message || error.toString() });
    }
}

export const addClass = async (req, res) => {
    try {
        let newClass = req.body;
        newClass["teacherID"] = req.user.teacherID
        const classes = await queries.addClass(newClass);
        res.status(200).json({ "message": "Class Created Successfully" });
    } catch (error) {
        res.json({ error: error.message || error.toString() });
    }
}
