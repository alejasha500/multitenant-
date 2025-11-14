import { DataTypes } from 'sequelize';
import { sequelize }from '../../database.js';
import { uuidToBuffer, bufferToUuid, generateUuidBuffer } from '../../../utils/uuid.js';

export const permission = sequelize.define(
  'permission',
  {
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

    codigo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'El código del permiso es obligatorio' }
      }
    },

    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La descripción es obligatoria' }
      }
    },

    es_sistema: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'permisos',
    timestamps: false,
    indexes: [
      {
        name: 'ux_permiso_codigo',
        unique: true,
        fields: ['codigo']
      }
    ]
  }
);
