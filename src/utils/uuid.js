import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';

// Convierte UUID string -> buffer binario(16)
export const uuidToBuffer = (uuidString) => {
  const hex = uuidString.replace(/-/g, '');
  return Buffer.from(hex, 'hex');
};

// Convierte buffer binario(16) -> UUID string
export const bufferToUuid = (buffer) => {
  const hex = buffer.toString('hex');
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    hex.substring(12, 16),
    hex.substring(16, 20),
    hex.substring(20)
  ].join('-');
};

// Genera UUID listo para guardar en DB (binario)
export const generateUuidBuffer = () => {
  return uuidToBuffer(uuidv4());
};

// Genera UUID listo para mostrar (string)
export const generateUuidString = () => {
  return uuidv4();
};