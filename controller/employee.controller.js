/*
 * File: employee.controller.js
 * Project: palador-test
 * File Created: Wednesday, 17th November 2021 10:37:15 am
 * Author: Ananda Yudhistira (anandabayu12@gmail.com)
 * -----
 * Last Modified: Thursday, 18th November 2021 11:34:46 am
 * Modified By: Ananda Yudhistira (anandabayu12@gmail.com>)
 * -----
 * Copyright 2021 Ananda Yudhistira, -
 */
const db = require('../config/database');
const Employee = require('../model/employee.model');

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const { name, status, managerId } = req.body;

  const data = { name, status, managerId };

  try {
    let employee = await Employee.create(data);
    return res.status(201).json({
      message: 'Success to create a new Employee',
      data: employee,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Failed to create a new Employee',
      error: e,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    let employees = await Employee.findAll({
      order: [['employeeId', 'asc']],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'managerId'],
      },
      include: [
        {
          model: Employee,
          as: 'manager',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'managerId'],
          },
        },
        {
          model: Employee,
          as: 'directReports',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'managerId'],
          },
        },
      ],
    });
    return res.json(employees);
  } catch (e) {
    return res.status(500).json({
      message: 'Failed to get Employee List',
      error: e,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { userId } = req.params;
    const { includeReportingTree } = req.query;

    let employee = await getDetailUser(userId, includeReportingTree === 'true');

    if (!employee)
      return res.status(404).json({ message: 'Employee not found' });

    return res.json(employee);
  } catch (e) {
    return res.status(500).json({
      message: 'Failed to get Employee detail',
      error: e,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, status, managerId } = req.body;

    const data = { name, status, managerId };

    let employee = await getDetailUser(userId);

    if (!employee)
      return res.status(404).json({ message: 'Employee not found' });

    employee.update(data).then(async (newemp) => {
      let newdata = await getDetailUser(newemp.employeeId);
      return res.json({ message: 'Employee updated', data: newdata });
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Failed to update Employee',
      error: e,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { userId } = req.params;

    let employee = await getDetailUser(userId);
    if (!employee)
      return res.status(404).json({ message: 'Employee not found' });

    if (employee.directReports.length > 0) {
      return res.status(400).json({
        message: "can't delete this employee because it has direct reports",
      });
    }

    employee.destroy().then(() => {
      return res.json({ message: 'Employee deleted' });
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Failed to delete Employee',
      error: e,
    });
  }
};

const getDetailUser = (userId, tree = false) => {
  return Employee.findByPk(userId, {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'managerId'],
    },

    include: [
      {
        model: Employee,
        as: 'manager',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'managerId'],
        },
      },
      {
        model: Employee,
        as: 'directReports',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'managerId'],
        },
        include: tree
          ? [
              {
                model: Employee,
                as: 'directReports',
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'managerId'],
                },
              },
            ]
          : [],
      },
    ],
  });
};
