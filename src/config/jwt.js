import jwt from "jsonwebtoken";
import { config } from "./env.js"; // Carga variables ya validadas

/**
 * Genera un Access Token (válido para autenticación de rutas).
 * El payload suele incluir: user_id, empresa_id, roles.
 */
export function generateAccessToken(payload) {
  return jwt.sign(payload, config.jwt.access.secret, {
    expiresIn: config.jwt.access.expiresIn, 
  });
}

/**
 * Genera un Refresh Token (se usa para renovar sesiones).
 * Importante: no se debe usar para acceder a rutas protegidas.
 */
export function generateRefreshToken(payload) {
  return jwt.sign(payload, config.jwt.refresh.secret, {
    expiresIn: config.jwt.refresh.expiresIn, 
  });
}

/**
 * Verifica un Access Token.
 * Lanza error si el token expiró o está manipulado.
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, config.jwt.access.secret);
}

/**
 * Verifica un Refresh Token.
 * Se usa únicamente en el endpoint de /refresh.
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, config.jwt.refresh.secret);
}
