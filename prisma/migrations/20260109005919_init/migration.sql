-- CreateTable
CREATE TABLE `empresas` (
    `id` BINARY(16) NOT NULL,
    `nombre` VARCHAR(150) NOT NULL,
    `nit` VARCHAR(50) NULL,
    `direccion` VARCHAR(255) NULL,
    `telefono` VARCHAR(25) NULL,
    `email` VARCHAR(150) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `empresas_nit_key`(`nit`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permisos` (
    `id` BINARY(16) NOT NULL,
    `codigo` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(255) NOT NULL,
    `es_sistema` TINYINT NULL DEFAULT 1,
    `created_at` DATETIME(3) NULL,

    UNIQUE INDEX `permisos_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` BINARY(16) NOT NULL,
    `empresa_id` BINARY(16) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `es_sistema` TINYINT NULL DEFAULT 0,
    `created_at` DATETIME(3) NULL,

    UNIQUE INDEX `roles_empresa_id_nombre_key`(`empresa_id`, `nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` BINARY(16) NOT NULL,
    `empresa_id` BINARY(16) NOT NULL,
    `nombre` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `activo` TINYINT NULL DEFAULT 1,
    `telefono` VARCHAR(25) NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `usuarios_empresa_id_email_key`(`empresa_id`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_rol` (
    `usuario_id` BINARY(16) NOT NULL,
    `rol_id` BINARY(16) NOT NULL,

    PRIMARY KEY (`usuario_id`, `rol_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rol_permiso` (
    `id` BINARY(16) NOT NULL,
    `rol_id` BINARY(16) NOT NULL,
    `permiso_id` BINARY(16) NOT NULL,

    UNIQUE INDEX `rol_permiso_rol_id_permiso_id_key`(`rol_id`, `permiso_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `roles` ADD CONSTRAINT `roles_empresa_id_fkey` FOREIGN KEY (`empresa_id`) REFERENCES `empresas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_empresa_id_fkey` FOREIGN KEY (`empresa_id`) REFERENCES `empresas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_rol` ADD CONSTRAINT `usuario_rol_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_rol` ADD CONSTRAINT `usuario_rol_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rol_permiso` ADD CONSTRAINT `rol_permiso_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rol_permiso` ADD CONSTRAINT `rol_permiso_permiso_id_fkey` FOREIGN KEY (`permiso_id`) REFERENCES `permisos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
