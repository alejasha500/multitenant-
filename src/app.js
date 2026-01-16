import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xssClean from "xss-clean";
import cookieParser from "cookie-parser";
import { config } from "../src/config/env.js";
import { errorHandler, notFound } from "./middlewares/errorMiddlewares.js";
import userRouter from './modules/auth/authRoutes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({ credentials: true, origin: config.security.corsOrigin }));

// Logging
app.use(morgan("dev"));

// Helmet
app.use(helmet());

// XSS
app.use(xssClean());

// Cookies
app.use(cookieParser());

// RATE LIMIT 
const limiter = rateLimit({
    windowMs: parseRateWindow(config.security.rateLimit.windowMs),
    max: config.security.rateLimit.max,
    message: {
        status: 429,
        message: "Demasiadas solicitudes. Intenta de nuevo más tarde.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

// Función "15m" → ms
function parseRateWindow(windowStr) {
    if (!windowStr) return 15 * 60 * 1000;

    const value = parseInt(windowStr);
    const unit = windowStr.slice(-1);

    switch (unit) {
        case "s": return value * 1000;
        case "m": return value * 60 * 1000;
        case "h": return value * 60 * 60 * 1000;
        case "d": return value * 24 * 60 * 60 * 1000;
        default:  return value;
    }
}


// ruta de auth
app.use('/api/auth', userRouter)

// Health
app.get("/health", (req, res) => {
    res.status(200).json({ message: "API is healthy" });
});

// Errores
app.use(errorHandler);
app.use(notFound);

export default app;
