# Sistema Multi-Empresa para Gestión de Reparaciones

Este proyecto es un sistema backend para la gestión de reparaciones, multi-empresa, con arquitectura modular, autenticación, roles granulares, permisos y endpoints para módulos de clientes, reparaciones, inventario, facturación, notificaciones y reportes.

---

##  Tecnologías principales

- Node.js 18+
- Express.js 5
- Sequelize ORM para MySQL 8
- Redis (cache y sesiones)
- RabbitMQ (cola de mensajes y notificaciones)
- MongoDB (logs estructurados)
- JWT para autenticación
- Joi para validación de datos
- Helmet, CORS, rate-limit y xss-clean para seguridad
- UUID para IDs ofuscados en binario

---

##  Instalación y ejecución

### 1. Clonar el repositorio:
```bash
git clone https://github.com/tu_usuario/multitenant.git
cd multitenant
```

### 2. Instalar dependencias:
```bash
npm install
```

### 3. Crear archivo `.env` en la raíz del proyecto:
```env
DB_HOST=localhost
DB_PORT=tu_puerto
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_nombre_de_base_de_datos
PORT=3000

```

### 4. Ejecutar el servidor en modo desarrollo:
```bash
npm run dev
```

---

## 🗂 Estructura del proyecto
```
multitenant/
├── src/
│   ├── cache/              # Configuración de Redis
│   ├── config/             # Configuraciones de entorno y logging
│   │   ├── env.js
│   │   ├── logging.js
│   │   └── validateEnv.js
│   ├── db/                 # Conexión a MySQL y modelos Sequelize
│   │   ├── models/
│   │   │   ├── auditoria/
│   │   │   ├── campos_personalizados/
│   │   │   ├── clientes/
│   │   │   ├── configuracion/
│   │   │   ├── core/
│   │   │   │   ├── companyModel.js
│   │   │   │   ├── permissionModel.js
│   │   │   │   ├── roleModel.js
│   │   │   │   ├── rolePermissionModel.js
│   │   │   │   └── userModel.js
│   │   │   ├── facturacion/
│   │   │   ├── menus/
│   │   │   ├── notificaciones/
│   │   │   ├── reparaciones/
│   │   │   ├── reportes/
│   │   │   └── index.js
│   │   └── database.js
│   ├── errors/             # Manejo centralizado de errores
│   ├── logs/               # Integración con MongoDB para logs
│   ├── middlewares/        # Middlewares de autenticación, errores, validación
│   │   ├── authMiddlewares.js
│   │   └── errorMiddlewares.js
│   ├── modules/            # Funcionalidades separadas por contexto
│   │   ├── auth/
│   │   │   ├── authController.js
│   │   │   ├── authRoutes.js
│   │   │   └── authService.js
│   │   ├── billing/
│   │   ├── clients/
│   │   ├── companies/
│   │   ├── custom-fields/
│   │   ├── dynamic-menu/
│   │   ├── inventory/
│   │   ├── notifications/
│   │   ├── payments/
│   │   ├── permissions/
│   │   ├── repairs/
│   │   ├── reports/
│   │   ├── roles/
│   │   └── users/
│   ├── queue/              # Integración con RabbitMQ
│   │   └── rabbit.js
│   ├── routes/             # Rutas principales
│   │   └── indexRoutes.js
│   ├── utils/              # Utilidades (UUID helpers, etc.)
│   ├── app.js              # Configuración de Express
│   └── server.js           # Punto de entrada del backend
├── test/                   # Pruebas unitarias e integración
├── .env                    # Variables de entorno (no incluido en git)
├── .gitignore
├── package.json
└── README.md
```

---

## 🔑 Servicios adicionales (opcionales)

El proyecto está preparado para integrar los siguientes servicios, aunque actualmente no estén inicializados:

- **Redis** – para cache y sesiones (`src/cache/redis.js`)
- **RabbitMQ** – para colas de notificaciones y procesamiento asíncrono (`src/queue/rabbit.js`)
- **MongoDB** – para logs estructurados (`src/logs/mongoLog.js`)

Puedes ignorarlos temporalmente si solo deseas levantar el backend principal.

---

## 🔐 Seguridad y buenas prácticas

- Validación y sanitización de datos de entrada
- CORS configurado con políticas restrictivas
- Helmet para headers de seguridad
- Rate limiting y speed limiting
- Uso de JWT con Access Token y Refresh Token
- Ofuscación de IDs con UUID en binario (BINARY(16) en MySQL)

---

## ⚙️ Módulos principales

### 1. **Empresas (Companies)**
- CRUD de empresas
- Configuración por empresa
- Aislamiento de datos (multitenancy)

### 2. **Usuarios y Roles (Users & Roles)**
- CRUD de usuarios
- Roles granulares por empresa
- Sistema de permisos
- Herencia de permisos

### 3. **Clientes (Clients)**
- CRUD de clientes
- Historial de reparaciones
- Búsqueda y filtrado avanzado

### 4. **Reparaciones (Repairs)**
- Registro completo de reparaciones
- Estados del proceso
- Asignación de técnicos
- Diagnóstico y cotización
- Gestión de materiales

### 5. **Inventario (Inventory)**
- Gestión de materiales y repuestos
- Control de stock
- Alertas de stock bajo
- Reportes de consumo

### 6. **Facturación y Pagos (Billing & Payments)**
- Facturas por reparación
- Pagos parciales/múltiples
- Historial de pagos
- Estados de factura

### 7. **Notificaciones (Notifications)**
- Push notifications
- Integración con RabbitMQ
- Plantillas por evento
- Preferencias de usuario

### 8. **Campos Personalizados (Custom Fields)**
- Motor dinámico de campos por módulo
- Tipos de campo: texto, fecha, hora, moneda, selección, foto, firma, tabla
- Validación dinámica
- Almacenamiento flexible

### 9. **Menú Dinámico (Dynamic Menu)**
- Configuración de menú por empresa
- Match con roles
- Caché en Redis
- Ordenamiento y jerarquías

### 10. **Reportes y Dashboard (Reports)**
- Estadísticas de reparaciones
- Métricas de desempeño
- Filtros por fecha, técnico, estado
- Reportes exportables

---

## 🚀 Contribuir

1. Clonar y configurar el proyecto según las instrucciones de arriba.
2. Crear una rama con tu feature: `git checkout -b feature/nombre-feature`
3. Hacer commit de tus cambios: `git commit -m "Descripción del cambio"`
4. Subir tu rama al repositorio remoto: `git push origin feature/nombre-feature`
5. Abrir un Pull Request para revisión y merge.

---

## 📝 Notas

- Todos los módulos siguen la misma arquitectura: **Controller → Service → Model**
- Los modelos usan Sequelize con conversión automática de UUID (string) ↔ BINARY(16)
- Todas las tablas principales incluyen `empresa_id` para aislamiento multiempresa
- Los IDs son UUID v4 almacenados como BINARY(16) para optimización

---

