"use strict";

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const app = express();
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

const CSS_PATH = path.resolve(__dirname, 'public/css');
const JS_PATH = path.resolve(__dirname, 'public/js');
app.use('/css', express.static(CSS_PATH));
app.use('/js', express.static(JS_PATH));

app.get('/', require('./routes/index'));
app.post('/api/og', require('./routes/api/og'));

app.listen(process.env.PORT || 5000);
