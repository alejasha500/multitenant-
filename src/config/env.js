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

    jwt: {
        access: {
            secret: env.JWT_ACCESS_SECRET,
            expiresIn: env.JWT_ACCESS_EXPIRES,
            cookieMaxAge: env.COOKIE_ACCESS_MAX_AGE,
            secure: env.COOKIE_SECURE,
            sameSite: env.COOKIE_SAMESITE,
        },
        refresh: {
            secret: env.JWT_REFRESH_SECRET,
            expiresIn: env.JWT_REFRESH_EXPIRES,
            cookieMaxAge: env.COOKIE_REFRESH_MAX_AGE,
            secure: env.COOKIE_SECURE,
            sameSite: env.COOKIE_SAMESITE, 
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
