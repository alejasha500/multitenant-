import Joi from 'joi';

export const registerEmpresaSchema = Joi.object({
  
  empresa: Joi.object({
    nombre: Joi.string().min(3).max(150).required(),
    nit: Joi.string().max(50).optional().allow(null, ''),
    direccion: Joi.string().max(255).optional().allow(null, ''),
    telefono: Joi.string().max(25).optional().allow(null, ''),
    email: Joi.string().email().optional().allow(null, '')
  }).required(),

  admin: Joi.object({
    nombre: Joi.string().min(3).max(150).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    telefono: Joi.string().max(25).optional().allow(null, '')
  }).required()
});


// Valida los datos necesarios para el proceso de login

export const loginSchema = Joi.object({

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .required(),
  empresaId: Joi.string()
    .uuid()
    .required()
});
