import db from '../db';

export const getClasses = () => db('classes').select('*');

export const getClassById = (id) => db('classes').where({ id }).first();

export const getClassByName = (name) => db('classes').where({ name }).first();