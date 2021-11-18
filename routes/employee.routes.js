/*
 * File: employee.routes.js
 * Project: palador-test
 * File Created: Wednesday, 17th November 2021 10:48:49 am
 * Author: Ananda Yudhistira (anandabayu12@gmail.com)
 * -----
 * Last Modified: Thursday, 18th November 2021 10:10:29 am
 * Modified By: Ananda Yudhistira (anandabayu12@gmail.com>)
 * -----
 * Copyright 2021 Ananda Yudhistira, -
 */
const express = require('express');
const { body } = require('express-validator');
const appValidator = require('../controller/validator');

const employee = require('../controller/employee.controller');
const Employee = require('../model/employee.model');

const router = express.Router();

router.post(
  '/',
  body('name')
    .isString()
    .withMessage('name must be string')
    .notEmpty()
    .withMessage('name is required'),
  body('status')
    .isIn(['active', 'inactive'])
    .withMessage('status must be active or inactive')
    .notEmpty()
    .withMessage('status is required'),
  body('managerId')
    .optional({ nullable: true })
    .custom(async (value) => {
      let em = await Employee.findByPk(value);

      if (!em) throw new Error('manager with the provided id is not found');

      return true;
    })
    .isInt({ gt: 0 })
    .withMessage('managerId must be integer'),
  appValidator,
  employee.create
);

router.get('/', employee.findAll);
router.get('/:userId', employee.findOne);

router.put(
  '/:userId',
  body('name')
    .optional()
    .isString()
    .withMessage('name must be string')
    .notEmpty()
    .withMessage("name can't be blank"),
  body('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('status must be active or inactive')
    .notEmpty()
    .withMessage("status can't be blank"),
  body('managerId')
    .optional({ nullable: true })
    .custom(async (value, { req }) => {
      let emp = await Employee.findByPk(value);

      if (!emp) throw new Error('manager with the provided id is not found');

      let uId = req.params.userId;
      if (+emp.managerId === +uId)
        throw new Error(
          `can't set managerId, employee with id ${value} is direct reports to employee with id ${uId}`
        );

      if (+value === +uId)
        throw new Error(`can't set managerId to employee id itself`);

      return true;
    })
    .isInt({ gt: 0 })
    .withMessage('managerId must be integer'),
  appValidator,
  employee.update
);

router.delete('/:userId', employee.delete);

module.exports = router;
