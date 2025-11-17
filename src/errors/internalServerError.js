// =====================================================
//  InternalServerError
//  -----------------------------------------------------
//  Este error se usa cuando ocurre algo inesperado
//  dentro del servidor (errores NO controlados).
//  Ejemplo: fallo en la base de datos, errores lógicos,
//           excepciones no capturadas.
//  Esto devuelve un 500.
// =====================================================

import { AppError } from './appError.js';

export class InternalServerError extends AppError {
  constructor(message = "Error interno del servidor", details = null) {
    super(message, 500, "INTERNAL_SERVER_ERROR", details);
  }
}
