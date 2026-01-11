import { prisma } from '../../db/database.js'
import { hashPassword } from '../../config/bcrypt.js'
import { generateAccessToken, generateRefreshToken } from '../../config/jwt.js'
import { ConflictError } from '../../errors/indexError.js'
import { createEmpresa } from '../empresa/empresaReposity.js'
import { createUsuario } from '../users/userReposity.js'
import { createRol, assignRolToUsuario } from '../role/roleReposity.js'
import { findByEmailWithRoles, findEmpresaByNit } from './authResposity.js'
import { sanitizeUser } from '../../utils/sanitize.js'

export async function registerEmpresaService(data) {
  const { empresa, admin } = data

  // 1️ verificar si ya existe el email
 // const existingUser = await findByEmailWithRoles(admin.email)
 // if (existingUser) {
  //  throw new ConflictError('El email ya está registrado')
  //}


  const existingEmpresa = await findEmpresaByNit(empresa.nit)
if (existingEmpresa) {
  throw new ConflictError('Ya existe una empresa con este NIT')
}


  // 2️ hashear password
  const passwordHash = await hashPassword(admin.password)

  // 3️ transacción
  const result = await prisma.$transaction(async (tx) => {

    const empresaCreada = await createEmpresa(tx, empresa)

    const rolAdmin = await createRol(tx, {
      empresaId: empresaCreada.id,
      nombre: 'ADMIN'
    })

    const usuarioAdmin = await createUsuario(tx, {
      empresaId: empresaCreada.id,
      nombre: admin.nombre,
      email: admin.email,
      passwordHash
    })

    await assignRolToUsuario(tx, {
      usuarioId: usuarioAdmin.id,
      rolId: rolAdmin.id
    })

    return { usuarioAdmin, rolAdmin }
  })

  // 4️ generar tokens
  const accessToken = generateAccessToken({
    id: result.usuarioAdmin.id,
    rol: 'ADMIN'
  })

  const refreshToken = generateRefreshToken({
    id: result.usuarioAdmin.id
  })

  // 5️ sanitize
  const userSanitized = sanitizeUser(result.usuarioAdmin)

  return {
    user: userSanitized,
    accessToken,
    refreshToken
  }
}
