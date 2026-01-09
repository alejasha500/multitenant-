import { v4 as uuidv4 } from 'uuid';


/**
 * Convierte UUID string a Buffer binario(16)
 */
export const uuidToBuffer = (uuidString) => {
  if (!uuidString) return null;
  const hex = uuidString.replace(/-/g, '');
  return Buffer.from(hex, 'hex');
};

/**
 * Convierte Buffer binario(16) a UUID string
 */
export const bufferToUuid = (buffer) => {
  if (!buffer) return null;
  const hex = buffer.toString('hex');
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    hex.substring(12, 16),
    hex.substring(16, 20),
    hex.substring(20, 32)
  ].join('-');
};

/**
 * Genera nuevo UUID como Buffer
 */
export const generateUuidBuffer = () => {
  return uuidToBuffer(uuidv4());
};

/**
 * Genera nuevo UUID como string
 */
export const generateUuidString = () => {
  return uuidv4();
};

/**
 * Convierte objeto de Prisma (con Buffers) a formato legible
 */
export const convertPrismaToReadable = (obj) => {
  if (!obj) return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => convertPrismaToReadable(item));
  }
  
  if (typeof obj === 'object') {
    const converted = {};
    for (const [key, value] of Object.entries(obj)) {
      if (Buffer.isBuffer(value)) {
        converted[key] = bufferToUuid(value);
      } else if (value instanceof Date) {
        converted[key] = value;
      } else if (typeof value === 'object' && value !== null) {
        converted[key] = convertPrismaToReadable(value);
      } else {
        converted[key] = value;
      }
    }
    return converted;
  }
  
  return obj;
};