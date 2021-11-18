/*
 * File: base.controller.js
 * Project: palador-test
 * File Created: Wednesday, 17th November 2021 10:42:26 am
 * Author: Ananda Yudhistira (anandabayu12@gmail.com)
 * -----
 * Last Modified: Wednesday, 17th November 2021 10:42:43 am
 * Modified By: Ananda Yudhistira (anandabayu12@gmail.com>)
 * -----
 * Copyright 2021 Ananda Yudhistira, -
 */
const errorController = (res, message, error, code = 400) => {
  res.status(code).json({
    success: false,
    message,
    error,
  });
};

const successController = (res, message, data, code = 200) => {
  res.status(code).json({
    success: true,
    message,
    data,
  });
};

module.exports = { errorController, successController };
