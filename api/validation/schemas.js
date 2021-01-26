// importing required packages & modules
const joi = require('joi');

// importing required Validation Error Messages
const { INVALID, REQUIRED, MINMAX, GL } = require('./errorTexts');

// ---> SCHEMAS <---
const authSchema = joi.object({
  email: joi
    .string()
    .email()
    .required()
    .messages({
      'string.email': INVALID('email address'),
      'string.empty': REQUIRED('email'),
      'any.required': REQUIRED('email'),
    }),
  password: joi
    .string()
    .min(6)
    .max(30)
    .required()
    .messages({
      'string.empty': REQUIRED('password'),
      'any.required': REQUIRED('password'),
    }),
});

const attendanceSchema = joi.object({
  userName: joi
    .string()
    .min(2)
    .max(30)
    .required()
    .messages({
      'string.empty': REQUIRED('userName'),
      'any.required': REQUIRED('userName'),
      'string.min': MINMAX('userName', 2, 30),
      'string.max': MINMAX('userName', 2, 30),
    }),
  arrivalTime: joi
    .date()
    .required()
    .messages({
      'date.empty': REQUIRED('arrivalTime'),
      'any.required': REQUIRED('arrivalTime'),
    }),
});

const reportSchema = joi.object({
  gte: joi
    .date()
    .required()
    .messages({
      'date.empty': REQUIRED('gte'),
      'any.required': REQUIRED('gte'),
    }),
  lte: joi
    .date()
    .greater(joi.ref('gte'))
    .required()
    .messages({
      'date.empty': REQUIRED('lte'),
      'any.required': REQUIRED('lte'),
      'date.greater': GL('lte', 'greater', 'gte'),
    }),
  message: joi
    .string()
    .messages({
      'string.empty': REQUIRED('message'),
      'any.required': REQUIRED('message'),
    }),
});

const updateUserSchema = joi.object({
  name: joi
    .string()
    .min(2)
    .max(30)
    .required()
    .messages({
      'string.empty': REQUIRED('name'),
      'any.required': REQUIRED('name'),
      'string.min': MINMAX('name', 2, 30),
      'string.max': MINMAX('name', 2, 30),
    }),
  email: joi
    .string()
    .email()
    .required()
    .messages({
      'string.empty': REQUIRED('email'),
      'any.required': REQUIRED('email'),
      'string.email': INVALID('email address'),
    }),
  admin: joi
    .boolean()
    .required()
    .messages({
      'boolean.empty': REQUIRED('admin'),
      'any.required': REQUIRED('admin'),
    }),
});

const addEmployeeSchema = updateUserSchema.keys({
  password: joi
    .string()
    .min(6)
    .max(30)
    .required()
    .messages({
      'string.min': MINMAX('password', 6, 30),
      'string.max': MINMAX('password', 6, 30),
      'string.empty': REQUIRED('password'),
      'any.required': REQUIRED('password'),
    }),
});

const idValidationSchema = joi.object({
  userId: joi
    .string()
    .length(24)
    .required()
    .messages({
      'string.length': INVALID('userId'),
      'string.empty': REQUIRED('userId'),
    }),
});

module.exports = {
  authSchema,
  attendanceSchema,
  reportSchema,
  updateUserSchema,
  addEmployeeSchema,
  idValidationSchema,
};
