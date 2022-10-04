import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize';
import { generateToken } from '../../utils';
import { User } from './UserModel';

export interface Session extends Model {
  token: string;
  expires: string;
  deviceInfo?: Record<string, any>;
  user?: User;
  userId: number;
}

export interface SessionDeviceInfo {
  ipHash: string;
  platform?: string;
  userAgent?: string;
  appVersion?: string;
  vendor?: string;
}

export const sessionModel = sequelize.define<Session>(
  'sessions',
  {
    token: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deviceInfo: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    indexes: [
      { unique: true, fields: ['token'] },
      { unique: false, fields: ['userId'] },
    ],
    hooks: {
      beforeCreate(session: Session) {
        session.token = generateToken(null, 36);
      },
      beforeUpdate(session: Session) {
        session.token = generateToken(null, 36);
      },
    },
  },
);
