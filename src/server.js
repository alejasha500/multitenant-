import app from "./app.js";
import { connectDB, closeDB , sequelize } from "./db/database.js";
import { dbModels } from './db/models/index.js';



const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();

    Object.values(dbModels);

    //  CREA LAS TABLAS AUTOMÁTICAMENTE SI NO EXISTEN
    await sequelize.sync({ alter: true });  
    // usa alter: true SOLO si estás modificando columnas durante desarrollo

    const server = app.listen(PORT, () => {
      console.log(` Servidor corriendo en el puerto ${PORT}`);
    });

    const shutdown = async (signal) => {
      console.log(`\n Señal recibida: ${signal}`);
      console.log("Cerrando conexiones...");

      await closeDB();

      server.close(() => {
        console.log(" Servidor cerrado correctamente");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

  } catch (error) {
    console.error(" Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
