import { generateUuidBuffer} from '../../utils/uuid.js';




export const createEmpresa = async (db, data) => {
  return db.empresa.create({
    data: {
      id: generateUuidBuffer(),
      nombre: data.nombre,
      nit: data.nit ?? null,
      direccion: data.direccion ?? null,
      telefono: data.telefono ?? null,
      email: data.email ?? null,
      created_at: new Date(),
      updated_at: new Date()
    }
  });
};