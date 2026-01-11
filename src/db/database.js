import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL})


export async function connectDb() {
  try {
    await prisma.$connect();
    console.log(" Conexión a la base de datos exitosa");
    
    await prisma.$queryRaw`SELECT 1`;
    console.log(" Base de datos respondiendo correctamente");
    
  } catch (error) {
    console.error(" Error de conexión a la base de datos:", error);
    process.exit(1);
  }
}

export async function disconnectDb() {
  await prisma.$disconnect();
  console.log(" Desconectado de la base de datos");
}

export default prisma;