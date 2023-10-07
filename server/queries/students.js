import db from '../db';

export const getStudents = () => db('students').select('*');

export const getStudentById = (id) => db('students').where({ id }).first();

export const getStudentByEmail = (email) => db('students').where({ email }).first();

export const createStudent = (student) => db('students').insert(student, '*');

export const updateStudent = (id, student) => db('students').where({ id }).update(student, '*');

export const deleteStudent = (id) => db('students').where({ id }).del();    

export const getStudentClasses = (id) => db('classes').where({ student_id: id }).select('*');

export const getStudentClassesByName = (id, name) => db('classes').where({ student_id: id }).andWhere('name', 'like', `%${name}%`).select('*');

export const getStudentClassesByTag = (id, tag) => db('classes').where({ student_id: id }).andWhere('tag', 'like', `%${tag}%`).select('*');

export const getStudentClassesByNameAndTag = (id, name, tag) => db('classes').where({ student_id: id }).andWhere('name', 'like', `%${name}%`).andWhere('tag', 'like', `%${tag}%`).select('*');

export const getStudentTeachers = (id) => db('teachers').where({ student_id: id }).select('*');

export const getStudentTeachersByName = (id, name) => db('teachers').where({ student_id: id }).andWhere('name', 'like', `%${name}%`).select('*');

export const getStudentTeachersByTag = (id, tag) => db('teachers').where({ student_id: id }).andWhere('tag', 'like', `%${tag}%`).select('*');

