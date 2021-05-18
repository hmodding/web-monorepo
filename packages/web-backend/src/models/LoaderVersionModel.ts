import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';
import { RaftVersion } from './RaftVersionModel';

export interface LoaderVersion extends Model {
  rmlVersion: string;
  raftVersionId: number;
  timestamp: Date;
  downloadUrl?: string;
  readme?: string;
  raftVersion?: RaftVersion;
}

export const loaderVersionModel = sequelize.define('loader-versions', {
  rmlVersion: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  raftVersionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'raft-versions',
      key: 'id',
    },
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  downloadUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  readme: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
