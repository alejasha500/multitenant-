import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
     name: "db",                     // nombre del datasource 
    provider: "mysql" as const,     // tipo literal para TypeScript
    url: env("DATABASE_URL"),       // URL de conexión
  },
});
