import app from "./app.js";
import { connectDb, disconnectDb } from "./db/database.js";
import { config } from './config/env.js';



const PORT = config.app.port || 3000;



const startServer = async () => {
  try {
    
    await connectDb();
    

    const server = app.listen(PORT, () => {
      console.log(` Servidor corriendo en puerto ${PORT}`);
      console.log(` Entorno: ${process.env.NODE_ENV || 'development'}`);
    });

    
    process.on('SIGINT', async () => {
      console.log('\n Apagando el servidor...');
      await disconnectDb();
      server.close(() => {
        console.log(' Servidor cerrado correctamente');
        process.exit(0);
      });
    });

    process.on('SIGTERM', async () => {
      console.log('\n Servidor terminado...');
      await disconnectDb();
      server.close(() => {
        console.log(' Servidor cerrado correctamente');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error(' Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();