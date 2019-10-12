const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const partialResponse = require('express-partial-response');

module.exports = (config, log4js, logger) => {
  const app = express();
  app.use(cors());
  if (config.svl_logger)
    app.use(log4js.connectLogger(logger, { level: config.svl_logger_info, format: config.svl_logger_format }));
  app.use(compression());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(partialResponse());
  app.use((_req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });
  app.disable('x-powered-by');
  return app;
};
