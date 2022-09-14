import { Sequelize } from 'sequelize';
import { userModel } from 'src/models';
import cfg, { Role } from './cfg';

const { uri, logging, ssl } = cfg.database;

const dialectOptions = {
  dialectOptions: {
    ssl: {
      require: ssl,
      rejectUnauthorized: false, // this is officially recommended this way!
    },
  },
};

export default new Sequelize(uri, {
  dialect: 'postgres',
  logging,
  ssl,
  ...(ssl ? dialectOptions : {}),
});

