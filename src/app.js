import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xssClean from "xss-clean";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from './middlewares/errorMiddlewares.js';


// ===============================
//  Inicialización de Express
// ===============================
const app = express();

// Permite recibir JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ===============================
//  Seguridad y middlewares globales
// ===============================

// CORS: permite peticiones desde otros orígenes (como tu frontend)
app.use(cors({ credentials: true, origin: true }));

// Logs de peticiones HTTP (útil para desarrollo)
app.use(morgan("dev"));

// Helmet: agrega cabeceras de seguridad para proteger la API
app.use(helmet());

// Protección contra ataques XSS: sanitiza la entrada del usuario
app.use(xssClean());

// Permite leer cookies (JWT, sesiones, etc)
app.use(cookieParser());

// Rate limit: evita ataques de fuerza bruta limitando peticiones
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // Máximo de solicitudes permitidas por IP
}));


// ===============================
//  Ruta de health check
// ===============================
// Sirve para que servicios como UptimeRobot o Render mantengan activa la API
app.use('/health', (req, res) => {
    res.status(200).json({ message: 'api is healthy' });
});


// ===============================
//  Manejo de errores globales
// ===============================
app.use(errorHandler); // Maneja errores centralizados
app.use(notFound);     // Maneja rutas no existentes


// ===============================
//  Exportar aplicación
// ===============================
export default app;
