import { DataTypes, FindOptions, Model, ModelDefined } from 'sequelize';

import sequelize from '../modules/sequelize';
import { ModVersion, modVersionModel } from './ModVersionModel';
import { User } from './UserModel';
import { ScheduledModDeletion } from './ScheduledModDeletionModel';

export interface Mod extends Model {
  id: string;
  title: string;
  description: string;
  readme: string;
  category: string;
  author: string;
  bannerImageUrl?: string;
  iconImageUrl?: string;
  repositoryUrl?: string;
  versions?: ModVersion[];
  likes?: User[];
  deletion?: ScheduledModDeletion;
}

export const modModel = sequelize.define(
  'mods',
  {
    id: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bannerImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    iconImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    repositoryUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeFind(findOptions: FindOptions): void {
        const versionsInclude =
          //@ts-ignore
          findOptions.include?.find(
            (include: any) => include.as === 'versions',
          ) || null;

        if (versionsInclude) {
          findOptions.order = [['versions', 'createdAt', 'desc']];
        } else {
          findOptions.order = [['createdAt', 'desc']];
        }
      },
      beforeCreate({ dataValues: mod }: any) {
        //todo: workaround for description & readme notnull
        const { description, readme } = mod;
        if (!description) {
          mod.description = '';
        }
        if (!readme) {
          mod.readme = '';
        }
      },
      beforeUpdate({ dataValues: mod }: any) {
        //todo: workaround for description & readme notnull
        const { description, readme } = mod;
        if (!description) {
          mod.description = '';
        }
        if (!readme) {
          mod.readme = '';
        }
      },
    },
  },
);
