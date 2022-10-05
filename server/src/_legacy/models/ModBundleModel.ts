import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize';
import { ModVersion } from './ModVersionModel';
import { User } from './UserModel';

export interface ModBundle extends Model {
  title: string;
  description: string;
  readme: string;
  maintainerId: number;
  bannerImageUrl?: string;
  maintainer?: User;
  modContents?: ModVersion[];
}

export const modBundleModel = sequelize.define<ModBundle>('mod-bundles', {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  readme: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  maintainerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  bannerImageUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});