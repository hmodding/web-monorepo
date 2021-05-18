import finale from 'finale-rest';

import app from './app';
import sequelize from './sequelize';

export const base = '/api';

finale.initialize({ app, sequelize, base });
