import db from '../db';

export const getTeachers = () => db('teachers').select('*');

export const getTeacherById = (id) => db('teachers').where({ id }).first();

export const getTeacherByEmail = (email) => db('teachers').where({ email }).first();

export const createTeacher = (teacher) => db('teachers').insert(teacher, '*');

export const updateTeacher = (id, teacher) => db('teachers').where({ id }).update(teacher, '*');

export const deleteTeacher = (id) => db('teachers').where({ id }).del();

export const getTeacherStudents = (id) => db('students').where({ teacher_id: id }).select('*');

export const getTeacherStudentsByClass = (id, classId) => db('students').where({ teacher_id: id, class_id: classId }).select('*');

export const getTeacherStudentsByClassAndName = (id, classId, name) => db('students').where({ teacher_id: id, class_id: classId }).andWhere('name', 'like', `%${name}%`).select('*');

export const getTeacherStudentsByClassAndTag = (id, classId, tag) => db('students').where({ teacher_id: id, class_id: classId }).andWhere('tag', 'like', `%${tag}%`).select('*');

export const getTeacherStudentsByClassAndNameAndTag = (id, classId, name, tag) => db('students').where({ teacher_id: id, class_id: classId }).andWhere('name', 'like', `%${name}%`).andWhere('tag', 'like', `%${tag}%`).select('*');

export const getTeacherStudentsByTag = (id, tag) => db('students').where({ teacher_id: id }).andWhere('tag', 'like', `%${tag}%`).select('*');

export const getTeacherStudentsByName = (id, name) => db('students').where({ teacher_id: id }).andWhere('name', 'like', `%${name}%`).select('*');

export const getTeacherStudentsByNameAndTag = (id, name, tag) => db('students').where({ teacher_id: id }).andWhere('name', 'like', `%${name}%`).andWhere('tag', 'like', `%${tag}%`).select('*');

export const getTeacherClasses = (id) => db('classes').where({ teacher_id: id }).select('*');

export const getTeacherClassesByName = (id, name) => db('classes').where({ teacher_id: id }).andWhere('name', 'like', `%${name}%`).select('*');

export const getTeacherClassesByTag = (id, tag) => db('classes').where({ teacher_id: id }).andWhere('tag', 'like', `%${tag}%`).select('*');

