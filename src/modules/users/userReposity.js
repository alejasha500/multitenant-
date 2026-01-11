import { generateUuidBuffer} from '../../utils/uuid.js';

export const createUsuario = async (db, data) => {
  return db.usuario.create({
    data: {
      id: generateUuidBuffer(),
      empresa_id: data.empresaId,
      nombre: data.nombre,
      email: data.email,
      password_hash: data.passwordHash, // se guarda
      telefono: data.telefono ?? null,
      activo: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    select: {
      id: true,
      empresa_id: true,
      nombre: true,
      email: true,
      telefono: true,
      activo: true,
      created_at: true,
      updated_at: true
    }
  })
}
