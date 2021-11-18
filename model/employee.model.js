/*
 * File: employee.model.js
 * Project: palador-test
 * File Created: Wednesday, 17th November 2021 10:21:50 am
 * Author: Ananda Yudhistira (anandabayu12@gmail.com)
 * -----
 * Last Modified: Wednesday, 17th November 2021 11:29:36 am
 * Modified By: Ananda Yudhistira (anandabayu12@gmail.com>)
 * -----
 * Copyright 2021 Ananda Yudhistira, -
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Employee = sequelize.define('employee', {
  employeeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
  },
  managerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Employee.hasMany(Employee, { as: 'directReports', foreignKey: 'managerId' });
Employee.belongsTo(Employee, { as: 'manager', foreignKey: 'managerId' });

module.exports = Employee;
