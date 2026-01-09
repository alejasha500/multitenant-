import { prisma } from '../../db/prisma.js';
import {
  uuidToBuffer,
  convertPrismaToReadable
} from '../../utils/uuid.js';

/**
 * ============================================================
 * LOGIN
 * Buscar usuario por email + empresa con roles y permisos
 * ============================================================
 */
export const findByEmailWithRoles = async (email, empresaId) => {
  const user = await prisma.usuario.findFirst({
    where: {
      email,
      empresa_id: uuidToBuffer(empresaId),
      activo: 1
    },
    select: {
      id: true,
      nombre: true,
      email: true,
      password_hash: true,
      activo: true,

      empresa: {
        select: {
          id: true,
          nombre: true,
          nit: true
        }
      },

      roles: {
        select: {
          rol: {
            select: {
              id: true,
              nombre: true,
              permisos: {
                select: {
                  permiso: {
                    select: {
                      codigo: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  return user ? convertPrismaToReadable(user) : null;
};

/**
 * ============================================================
 * REFRESH TOKEN / PERFIL
 * Buscar usuario por ID con roles y permisos
 * ============================================================
 */
export const findByIdWithRoles = async (userId) => {
  const user = await prisma.usuario.findUnique({
    where: {
      id: uuidToBuffer(userId)
    },
    select: {
      id: true,
      nombre: true,
      email: true,
      activo: true,

      empresa: {
        select: {
          id: true,
          nombre: true
        }
      },

      roles: {
        select: {
          rol: {
            select: {
              id: true,
              nombre: true,
              permisos: {
                select: {
                  permiso: {
                    select: {
                      codigo: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  return user ? convertPrismaToReadable(user) : null;
};

