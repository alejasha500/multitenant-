import { generateUuidBuffer} from '../../utils/uuid.js';



 // CREAR ROL (ADMIN)
 
export const createRol = async (db, data) => {
  return db.rol.create({
    data: {
      id: generateUuidBuffer(),
      empresa_id: data.empresaId, 
      nombre: data.nombre,        // "ADMIN"
      descripcion: data.descripcion ?? 'ADMIN',
      es_sistema: 1,
      created_at: new Date()
    }
  });
};





// ASIGNAR ROL A USUARIO


export const assignRolToUsuario = async (db, data) => {
  return db.usuarioRol.create({
    data: {
      usuario_id: data.usuarioId, 
      rol_id: data.rolId         
    }
  });
};




