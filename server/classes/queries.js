import db from '../db.js'

// queries for class table

export const getAllClasses = db('classes').select('*');
export const getClassById = (classID) => db('class').where({ classID }).select('*');
export const getClassBySubjectId = (subjectID) => db('class').where({ subjectID }).select('*');
export const getClassByTeacherId = (teacherID) => db('class').where({ teacherID }).select('*');
export const updateClassById = (classID, newClass) => db('class').where({ classID }).update(newClass);
export const deleteClassById = (classID) => db('class').where({ classID }).del();
export const addClass = (newClass) => db('class').insert(newClass);