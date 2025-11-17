// =====================================================
//  ForbiddenError
//  -----------------------------------------------------
//  Se usa cuando el usuario SÍ está autenticado, pero
//  NO tiene permisos para ejecutar la acción.
//  Ejemplo: rol sin permisos suficientes.
//  Esto devuelve un 403.
// =====================================================

import { AppError } from './appError.js';

export class ForbiddenError extends AppError {
  constructor(message = "Acceso prohibido", details = null) {
    super(message, 403, "FORBIDDEN", details);
  }
}
