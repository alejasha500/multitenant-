// =====================================================
//  errorHandler
//  -----------------------------------------------------
//  Middleware global que captura TODOS los errores que
//  se lanzan en la app. Devuelve un JSON consistente
//  con la información del error.
//  Este archivo debe estar al final de todas las rutas.
// =====================================================

export function errorHandler(err, req, res, next) {
  
  // Si no es una instancia de Error (raro, pero pasa)
  if (!(err instanceof Error)) {
    return res.status(500).json({
      message: "Error desconocido",
      status: 500,
      code: "UNKNOWN_ERROR"
    });
  }

  // Código HTTP (por defecto 500)
  const status = err.status || 500;

  res.status(status).json({
    message: err.message,
    status,
    code: err.code || "INTERNAL_SERVER_ERROR",
    details: err.details || null
  });
}



// =====================================================
//  notFound
//  -----------------------------------------------------
//  Middleware que se ejecuta cuando ninguna ruta coincide.
//  Devuelve un 404 personalizado.
// =====================================================



export function notFound(req, res, next) {
    res.status(404).json({
        error: "Not Found",
        message: `La ruta ${req.originalUrl} no existe`
    })
}