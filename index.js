#!/usr/bin/env node

const fs = require('fs');
const log4js = require('log4js');
const passport = require('passport');
const expressConfig = require('./config/express');
const router = require('./src/router');

const appDirectory = fs.realpathSync(process.cwd());
const nodeEnv = process.env.NODE_ENV || 'default';
const svlConfig = require('./config/default.json');
let config = {};

try {
  config = require(`${appDirectory}/svl.${nodeEnv}.json`);
} catch (e) {
  console.log(`svl.${nodeEnv}.json not found at ${appDirectory}`);
}

const appConf = { ...config, ...svlConfig };
log4js.configure({
  appenders: { console: { type: 'console' } },
  categories: { default: { appenders: ['console'], level: 'info' } },
});

const logger = log4js.getLogger();
const app = expressConfig(appConf, log4js, logger);
app.use(router);

if (config.svl_auth) {
  require('./src/auth');
  app.use(passport.initialize());
}

app.listen(appConf.svl_port);
logger.info(`App listening on ${appConf.svl_port}`);


