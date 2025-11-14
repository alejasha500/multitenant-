import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
    define: {
       freezeTableName: true,
    }
  }
);

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(" Database connected.");
  } catch (error) {
    console.error(" Error al conectar la base de datos:", error);
    throw error;
  }
}

export async function closeDB() {
  try {
    await sequelize.close();
    console.log(" Database closed.");
  } catch (error) {
    console.error(" Error al cerrar DB:", error);
    throw error;
  }
}
