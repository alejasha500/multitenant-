// 
// ------------------------------------------------------------------
// Centraliza TODAS las variables de entorno ya validadas por validateEnv().
// Aquí solo exportamos un objeto organizado y limpio que será usado
// en todo el backend.
// ------------------------------------------------------------------
import dotenv from "dotenv";
dotenv.config();
import { validateEnv } from "./validateEnv.js";

// Ejecutamos la validación (devuelve un objeto con todos los env ya limpios)
const env = validateEnv();


export const config = {
    app: {
        name: env.APP_NAME,
        env: env.NODE_ENV,
        port: env.PORT,
    },

    database: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        name: env.DB_NAME,
    },

    jwt: {
        access: {
            secret: env.JWT_ACCESS_SECRET,
            expiresIn: env.JWT_ACCESS_EXPIRES, 
        },
        refresh: {
            secret: env.JWT_REFRESH_SECRET,
            expiresIn: env.JWT_REFRESH_EXPIRES, 
        },
    },

    security: {
        corsOrigin: env.CORS_ORIGIN,
        rateLimit: {
            windowMs: env.RATE_LIMIT_WINDOW,
            max: env.RATE_LIMIT_MAX,
        },
        speedLimit: {
            delayMs: env.SPEED_LIMIT_DELAY,
        },
    },

    logging: {
        level: env.LOG_LEVEL,
        format: env.LOG_FORMAT, // "json", "pretty", etc.
    },
};
