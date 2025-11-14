import { DataTypes } from 'sequelize';
import { sequelize } from '../../database.js';
import { uuidToBuffer, bufferToUuid, generateUuidBuffer } from '../../../utils/uuid.js';

export const Company = sequelize.define('Company', {
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
      this.setDataValue('id', uuidToBuffer(value));
    }
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre de la empresa es requerido' },
      len: { args: [2, 150], msg: 'El nombre debe tener entre 2 y 150 caracteres' }
    }
  },
  nit: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: { name: 'unique_nit', msg: 'Este NIT ya está registrado' }
  },
  direccion: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING(25),
    allowNull: true,
    validate: {
      is: {
        args: /^[\d\s\-\+\(\)]+$/i,
        msg: 'El teléfono contiene caracteres inválidos'
      }
    }
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: true,
    validate: {
      isEmail: { msg: 'Debe proporcionar un email válido' }
    }
  }
}, {
  tableName: 'empresas',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
