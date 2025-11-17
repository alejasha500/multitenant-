// =====================================================
//  AppError
//  -----------------------------------------------------
//  Esta es la clase base de todos los errores del
//  sistema. Todas las demás clases heredan de esta.
//  Permite tener un manejo profesional y consistente
//  de errores en todo el backend.
// =====================================================

export class AppError extends Error {
  constructor(message, status = 500, code = "APP_ERROR", details = null) {
    super(message);

    // Código HTTP (400, 404, 500, etc.)
    this.status = status;

    // Código interno para identificar el tipo de error
    this.code = code;

    // Información adicional opcional
    this.details = details;

    // Indica que es un error controlado por la app
    this.isOperational = true;

    // Mantiene la traza del error sin ensuciar el log
    Error.captureStackTrace?.(this, this.constructor);
  }
}
