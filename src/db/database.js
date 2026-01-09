import { PrismaClient } from "@prisma/client";


const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'], 
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}


export async function connectDb() {
  try {
    await prisma.$connect();
    console.log("Conexión a la base de datos exitosa");
    
  
    await prisma.$queryRaw`SELECT 1`;
    console.log(" Base de datos respondiendo correctamente");
    
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
    process.exit(1);
  }
}


export async function disconnectDb() {
  await prisma.$disconnect();
  console.log(" Desconectado de la base de datos");
}

export default prisma;