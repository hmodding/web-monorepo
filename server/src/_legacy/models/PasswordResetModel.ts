import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize';
import { generateToken } from '../../utils';
import { User } from './UserModel';

export interface PasswordReset extends Model {
  userId: number;
  token: string;
  user?: User;
}

export const passwordResetModel = sequelize.define<PasswordReset>(
  'password-reset',
  {
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    hooks: {
      beforeCreate(passwordReset: PasswordReset) {
        passwordReset.token = generateToken();
      },
    },
  },
);
