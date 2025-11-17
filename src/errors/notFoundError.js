// =====================================================
//  NotFoundError
//  -----------------------------------------------------
//  Se usa cuando el recurso solicitado NO existe.
//  Ejemplo: usuario no encontrado, producto no existe,
//           empresa inexistente, etc.
//  Esto devuelve un 404.
// =====================================================

import { AppError } from './appError.js';

export class NotFoundError extends AppError {
  constructor(resource = "Recurso", details = null) {
    super(`${resource} no encontrado`, 404, "NOT_FOUND", details);
  }
}
