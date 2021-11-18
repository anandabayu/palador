/*
 * File: database.js
 * Project: palador-test
 * File Created: Wednesday, 17th November 2021 10:09:34 am
 * Author: Ananda Yudhistira (anandabayu12@gmail.com)
 * -----
 * Last Modified: Thursday, 18th November 2021 11:08:26 am
 * Modified By: Ananda Yudhistira (anandabayu12@gmail.com>)
 * -----
 * Copyright 2021 Ananda Yudhistira, -
 */
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE } = process.env;

const sequelize = new Sequelize(PG_DATABASE, PG_USERNAME, PG_PASSWORD, {
  host: PG_HOST,
  dialect: 'postgres',
  // logging: console.log,
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
