// =====================================================
//  UnauthorizedError
//  -----------------------------------------------------
//  Se usa cuando el usuario NO está autenticado.
//  Ejemplo: token inválido, token ausente, sesión expirada.
//  Esto devuelve un 401.
// =====================================================

import { AppError } from './appError.js';

export class UnauthorizedError extends AppError {
  constructor(message = "No autorizado", details = null) {
    super(message, 401, "UNAUTHORIZED", details);
  }
}
