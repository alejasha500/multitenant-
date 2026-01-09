import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // Nivel de seguridad del hash


export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}


export async function comparePassword(password, comparedHash) {
  return bcrypt.compare(password, comparedHash);
}
