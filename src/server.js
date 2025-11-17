import app from "./app.js";
import { connectDB, closeDB , sequelize } from "./db/database.js";
import { dbModels } from './db/models/index.js';
import { config } from './config/env.js';



const PORT = config.app.port ;

const startServer = async () => {
  try {
    await connectDB();
       
       //  Registrar todos los modelos en Sequelize
          Object.values(dbModels).forEach(model => {
              if (model.associate) {
              model.associate(sequelize.models);
            }
           });

       //  CREA LAS TABLAS AUTOMÁTICAMENTE SI NO EXISTEN
       // EN PRODUCCIÓN, USAR MIGRACIONES EN LUGAR DE sync() O SOLO USAR sync()
          await sequelize.sync({ alter: true });
           console.log(' Tablas sincronizadas correctamente');
    
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
