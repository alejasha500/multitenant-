import { prisma } from '../../db/database.js'
import { comparePassword, hashPassword } from '../../config/bcrypt.js'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../config/jwt.js'
import { ConflictError, UnauthorizedError} from '../../errors/indexError.js'
import { createEmpresa } from '../empresa/empresaReposity.js'
import { createUsuario, findUserForLogin } from '../users/userReposity.js'
import { createRol, assignRolToUsuario } from '../role/roleReposity.js'
import {  findEmpresaByNit } from './authResposity.js'
import { sanitizeUser } from '../../utils/sanitize.js'




export async function registerEmpresaService(data) {
  const { empresa, admin } = data

 // 1 muestra el error si el nit es el mismo 
  const existingEmpresa = await findEmpresaByNit(empresa.nit)
if (existingEmpresa) {
  throw new ConflictError('Ya existe una empresa con este NIT')
}


  // 2️ hashear password
  const passwordHash = await hashPassword(admin.password)

  // 3️ transacción
  const result = await prisma.$transaction(async (tx) => {

    const empresaCreada = await createEmpresa(tx, {
       nombre: empresa.nombre,
       nit: empresa.nit,
       direccion: empresa.direccion,
       telefono: empresa.telefono,
       email: empresa.email
    })

    const rolAdmin = await createRol(tx, {
      empresaId: empresaCreada.id,
      nombre: 'ADMIN'
    })

    const usuarioAdmin = await createUsuario(tx, {
      empresaId: empresaCreada.id,
      nombre: admin.nombre_usuario,
      email: admin.email_usuario,
      passwordHash,
      telefono: admin,telefono_usuario
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
    empresaId: result.usuarioAdmin.empresa_id,
    rol: 'ADMIN'
  })

  const refreshToken = generateRefreshToken({
    id: result.usuarioAdmin.id,
    empresaId: result.usuarioAdmin.empresa_id
  })

  // 5️ sanitize
  const userSanitized = sanitizeUser(result.usuarioAdmin)

  return {
    user: userSanitized,
    accessToken,
    refreshToken
  }
}



export async function loginService(data) {
     const { email, password, empresaId } = data;

     const user = await findUserForLogin(prisma, email, empresaId)
     if (!user) throw new UnauthorizedError('credenciales invalidas')

      const isValid = await comparePassword(password, user.password_hash)
      if (!isValid) throw  new UnauthorizedError('contraseña incorrecta')

       
        if(!user.roles || user.roles.length === 0) throw new UnauthorizedError('usuario sin rol asignado')


          const role = user.roles[0].rol.nombre

       
       const accessToken = generateAccessToken({
           id: user.id,
            empresaId: user.empresa_id,
           rol: role
          })


          const refreshToken = generateRefreshToken({
                id: user.id,
                empresaId: user.empresa_id,
               })

       
          const sanitize = sanitizeUser(user)

           return {
             user: sanitize,
             accessToken,
             refreshToken
             }

}



export function refreshService(refreshToken) {
  const payload = verifyRefreshToken(refreshToken)

  return {
    accessToken: generateAccessToken({
      id: payload.id,
      empresaId: payload.empresaId
    })
  }
}
