'use strict';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use('/css', express.static(path.resolve(__dirname, 'public/css')));
app.use('/js', express.static(path.resolve(__dirname, 'public/js')));
app.get('/', require('./routes'));
app.post('/api/og', require('./routes/api/og'));
app.listen(process.env.PORT || 5000);
