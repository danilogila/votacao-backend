const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log('%s APP is running at http://localhost:%d in %s mode', chalk.green('✓'), PORT, app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });