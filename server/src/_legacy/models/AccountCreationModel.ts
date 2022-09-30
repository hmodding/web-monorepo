import bcrypt from 'bcryptjs';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../sequelize';
import { generateToken } from '../../utils';

export interface AccountCreation extends Model {
  username: string;
  email: string;
  password: string;
  token: string;
}

export const accountCreationModel = sequelize.define<AccountCreation>(
  'account-creation',
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    hooks: {
      beforeCreate: (accountCreation: AccountCreation) => {
        const salt = bcrypt.genSaltSync();

        accountCreation.password = bcrypt.hashSync(
          accountCreation.password,
          salt,
        );
        accountCreation.token = generateToken();
      },
    },
  },
);
