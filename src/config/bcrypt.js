import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // Nivel de seguridad del hash

/**
 * Hashea una contraseña antes de guardarla en BD.
 * Siempre debes usar este método, nunca guardar contraseñas planas.
 */
export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compara una contraseña enviada por el usuario
 * con el hash almacenado en la base de datos.
 */
export async function comparePassword(password, comparedHash) {
  return bcrypt.compare(password, comparedHash);
}
