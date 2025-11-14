import { DataTypes } from 'sequelize';
import { sequelize }from '../../database.js';
import { uuidToBuffer, bufferToUuid, generateUuidBuffer } from '../../../utils/uuid.js';

export  const Roles = sequelize.define(
  'roles',
  {
    id: {
      type: "BINARY(16)", 
      primaryKey: true,
      allowNull: false,
      defaultValue: () => generateUuidBuffer(), // UUID → binario
      get() {
        const raw = this.getDataValue('id');
        return raw ? bufferToUuid(raw) : null; // binario → UUID string
      },
      set(value) {
        this.setDataValue('id', uuidToBuffer(value)); // UUID string → binario
      },
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
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.STRING(255),
    },

    es_sistema: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'roles',
    timestamps: false,
    indexes: [
      {
        name: 'ux_roles_empresa_nombre',
        unique: true,
        fields: ['empresa_id', 'nombre'],
      },
    ],
  }
);

