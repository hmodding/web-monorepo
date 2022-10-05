import { AbstractDataTypeConstructor, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../sequelize';
import { ModBundle, RaftVersion } from './index';
import { Mod } from './ModModel';

export interface ModVersion extends Model {
  id: number;
  modId: string;
  version: string;
  changelog: string;
  downloadUrl: string;
  downloadCount: number;
  minRaftVersionId?: number;
  maxRaftVersionId?: number;
  definiteMaxRaftVersion: boolean;
  mod?: Mod;
  minRaftVersion?: RaftVersion;
  maxRaftVersion?: RaftVersion;
  containingModBundles?: ModBundle[];
  fileHashes?: AbstractDataTypeConstructor;
}

export const modVersionModel = sequelize.define<ModVersion>(
  'mod-versions',
  {
    modId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      references: {
        model: 'mods',
        key: 'id',
      },
    },
    version: {
      // limited length because of file system restrictions
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    changelog: {
      type: DataTypes.TEXT, // markdown
      allowNull: false,
    },
    downloadUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    downloadCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    minRaftVersionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'raft-versions',
        key: 'id',
      },
    },
    maxRaftVersionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'raft-versions',
        key: 'id',
      },
    },
    definiteMaxRaftVersion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fileHashes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['modId', 'version'],
      },
    ],
  },
);