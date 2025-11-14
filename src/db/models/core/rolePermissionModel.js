import { DataTypes } from 'sequelize';
import { sequelize } from '../../database.js';
import { uuidToBuffer, bufferToUuid, generateUuidBuffer } from '../../../utils/uuid.js';

export const RolePermission = sequelize.define('RolePermission', {
  id: {
    type: "BINARY(16)", 
    primaryKey: true,
    allowNull: false,
    defaultValue: () => generateUuidBuffer(),
    get() {
      const raw = this.getDataValue('id');
      return raw ? bufferToUuid(raw) : null;
    },
    set(value) {
      this.setDataValue('id', typeof value === 'string' ? uuidToBuffer(value) : value);
    }
  },

  rol_id: {
    type: "BINARY(16)",
    allowNull: false,
    get() {
      const raw = this.getDataValue('rol_id');
      return raw ? bufferToUuid(raw) : null;
    },
    set(value) {
      this.setDataValue('rol_id', typeof value === 'string' ? uuidToBuffer(value) : value);
    }
  },

  permiso_id: {
    type: "BINARY(16)",
    allowNull: false,
    get() {
      const raw = this.getDataValue('permiso_id');
      return raw ? bufferToUuid(raw) : null;
    },
    set(value) {
      this.setDataValue('permiso_id', typeof value === 'string' ? uuidToBuffer(value) : value);
    }
  }
}, {
  tableName: 'rol_permiso',
  timestamps: false,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['rol_id', 'permiso_id'],
      name: 'ux_rol_permiso'
    }
  ]
});
