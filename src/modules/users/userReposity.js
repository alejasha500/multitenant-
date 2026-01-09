import { generateUuidBuffer} from '../../utils/uuid.js';

export const createUsuario = async (db, data) => {
  return db.usuario.create({
    data: {
      id: generateUuidBuffer(),
      empresa_id: data.empresaId,
      nombre: data.nombre,
      email: data.email,
      password_hash: data.passwordHash,
      telefono: data.telefono ?? null,
      activo: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
  });
};