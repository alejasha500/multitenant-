// =====================================================
//  ValidationError
//  -----------------------------------------------------
//  Se usa cuando el cliente envía datos inválidos,
//  incompletos o mal formados.
//  Ejemplo: falta un campo obligatorio, email inválido,
//  formato incorrecto, etc.
// =====================================================

import { AppError } from './appError.js';

export class ValidationError extends AppError {
  constructor(message = "Datos inválidos", details = null) {
    super(message, 400, "VALIDATION_ERROR", details);
  }
}
