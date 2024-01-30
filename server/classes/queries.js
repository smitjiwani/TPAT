import db from '../db.js'

// queries for class table

export const getAllClasses = db('classes').select('*');
export const getClassById = (classID) => db('classes').where({ classID }).select('*');
export const getClassBySubjectId = (subjectID) => db('classes').where({ subjectID }).select('*');
export const getClassByTeacherId = (teacherID) => db('classes').where({ teacherID }).select('*');
export const updateClassById = (classID, newClass) => db('classes').where({ classID }).update(newClass);
export const deleteClassById = (classID) => db('classes').where({ classID }).del();
export const addClass = (newClass) => db('classes').insert(newClass);