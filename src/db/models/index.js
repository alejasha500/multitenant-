import { users } from './core/usersModel.js'
import { RolePermission } from './core/rolePermissionModel.js'
import { Roles } from './core/roleModel.js'
import { permission } from './core/permissionModel.js'
import { Company } from './core/companyModel.js'

/* ============================================================
   ========== EMPRESA → ROLES (1:N)
   Una empresa puede tener muchos roles.
   Un rol pertenece a una empresa.
   ============================================================ */
Company.hasMany(Roles, {
  foreignKey: 'empresa_id',
  as: 'roles',
  onDelete: 'CASCADE'
});

Roles.belongsTo(Company, {
  foreignKey: 'empresa_id',
  as: 'empresa'
});

/* ============================================================
   ========== EMPRESA → USUARIOS (1:N)
   Una empresa puede tener muchos usuarios.
   Un usuario pertenece a una empresa.
   ============================================================ */
Company.hasMany(users, {
  foreignKey: 'empresa_id',
  as: 'usuarios',
  onDelete: 'CASCADE'
});

users.belongsTo(Company, {
  foreignKey: 'empresa_id',
  as: 'empresa'
});

/* ============================================================
   ========== USUARIOS ↔ ROLES (N:M)
   Un usuario puede tener varios roles.
   Un rol puede pertenecer a varios usuarios.
   Tabla intermedia: usuario_rol
   ============================================================ */
users.belongsToMany(Roles, {
  through: 'usuario_rol',
  foreignKey: 'usuario_id',
  otherKey: 'rol_id',
  as: 'roles',
  timestamps: false
});

Roles.belongsToMany(users, {
  through: 'usuario_rol',
  foreignKey: 'rol_id',
  otherKey: 'usuario_id',
  as: 'usuarios',
  timestamps: false
});

/* ============================================================
   ========== ROLES ↔ PERMISOS (N:M)
   Un rol puede tener muchos permisos.
   Un permiso puede pertenecer a varios roles.
   Tabla intermedia: RolePermission
   ============================================================ */
Roles.belongsToMany(permission, {
  through: RolePermission,
  foreignKey: 'rol_id',
  otherKey: 'permiso_id',
  as: 'permisos',
  timestamps: false
});

permission.belongsToMany(Roles, {
  through: RolePermission,
  foreignKey: 'permiso_id',
  otherKey: 'rol_id',
  as: 'roles',
  timestamps: false
});

/* ============================================================
   ========== ASOCIACIONES DIRECTAS (Opcional)
   Estas relaciones permiten consultar directamente la tabla
   intermedia role_permiso para auditorías o validaciones.
   ============================================================ */

// ROL → ROL_PERMISO
Roles.hasMany(RolePermission, {
  foreignKey: 'rol_id',
  as: 'rol_permisos'
});

RolePermission.belongsTo(Roles, {
  foreignKey: 'rol_id',
  as: 'rol'
});

// PERMISO → ROL_PERMISO
permission.hasMany(RolePermission, {
  foreignKey: 'permiso_id',
  as: 'rol_permisos'
});

RolePermission.belongsTo(permission, {
  foreignKey: 'permiso_id',
  as: 'permiso'
});

/* ============================================================
   ========== EXPORTACIÓN DE MODELOS
   Se exportan todos los modelos listos para usar en el proyecto.
   ============================================================ */
export const dbModels = {
  users,
  RolePermission,
  Roles,
  permission,
  Company
}
