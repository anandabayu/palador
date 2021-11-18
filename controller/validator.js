/*
 * File: validator.js
 * Project: palador-test
 * File Created: Wednesday, 17th November 2021 10:51:11 am
 * Author: Ananda Yudhistira (anandabayu12@gmail.com)
 * -----
 * Last Modified: Thursday, 18th November 2021 11:34:49 am
 * Modified By: Ananda Yudhistira (anandabayu12@gmail.com>)
 * -----
 * Copyright 2021 Ananda Yudhistira, -
 */
const { validationResult } = require('express-validator');

const appValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let e = {};

    errors.array().map((ee) => {
      e[ee.param] = ee.msg;
    });

    return res.status(400).json({
      message: 'Validation errors',
      errors: e,
    });
  }
  return next();
};

module.exports = appValidator;
