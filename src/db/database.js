import { Sequelize } from "sequelize";
import { config } from "../config/env.js"; 


export const sequelize = new Sequelize(
  config.database.name,      
  config.database.user,      
  config.database.password,  
  {
    host: config.database.host,  
    port: config.database.port,  
    dialect: "mysql",
    logging: false,
    define: {
      freezeTableName: true,
    },
  }
);
// Conectar a la BD
export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✔ Database connected.");
  } catch (error) {
    console.error(" Error al conectar la base de datos:", error);
    throw error;
  }
}

// Cerrar conexión
export async function closeDB() {
  try {
    await sequelize.close();
    console.log("✔ Database closed.");
  } catch (error) {
    console.error(" Error al cerrar DB:", error);
    throw error;
  }
}
