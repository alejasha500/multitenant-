import jwt from "jsonwebtoken";
import { env } from "./env.js"; // Carga variables ya validadas

/**
 * Genera un Access Token (válido para autenticación de rutas).
 * El payload suele incluir: user_id, empresa_id, roles.
 */
export function generateAccessToken(payload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES, 
  });
}

/**
 * Genera un Refresh Token (se usa para renovar sesiones).
 * Importante: no se debe usar para acceder a rutas protegidas.
 */
export function GenerateRefreshToken(payload) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES, 
  });
}

/**
 * Verifica un Access Token.
 * Lanza error si el token expiró o está manipulado.
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
}

/**
 * Verifica un Refresh Token.
 * Se usa únicamente en el endpoint de /refresh.
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
}
