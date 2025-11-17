// =====================================================
//  ConflictError
//  -----------------------------------------------------
//  Se usa cuando hay un conflicto con el estado actual
//  del recurso.
//  Ejemplo:
//    - Crear usuario con email ya existente.
//    - Intentar asignar un rol duplicado.
//    - Registrarse con un documento repetido.
//  Esto devuelve un 409.
// =====================================================

import { AppError } from './appError.js';

export class ConflictError extends AppError {
  constructor(message = "Conflicto con el estado actual", details = null) {
    super(message, 409, "CONFLICT_ERROR", details);
  }
}
