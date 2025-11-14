import { DataTypes } from 'sequelize';
import { sequelize }from '../../database.js';
import { uuidToBuffer, bufferToUuid, generateUuidBuffer } from '../../../utils/uuid.js';

export const users = sequelize.define(
  'users',
  {
    id: {
      type: "BINARY(16)", // BINARY(16)
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

    empresa_id: {
      type: "BINARY(16)",
      allowNull: false,
      get() {
        const raw = this.getDataValue('empresa_id');
        return raw ? bufferToUuid(raw) : null;
      },
      set(value) {
        this.setDataValue('empresa_id', uuidToBuffer(value));
      },
      references: {
        model: 'empresas',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },

    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Debe proporcionar un email válido'
        }
      }
    },

    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    activo: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    },

    telefono: {
      type: DataTypes.STRING(25)
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    updated_at: {
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
      {
        name: 'ux_usuarios_empresa_email',
        unique: true,
        fields: ['empresa_id', 'email']
      }
    ]
  }
);
