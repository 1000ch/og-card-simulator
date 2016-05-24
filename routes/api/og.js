"use strict";

const rog = require('rog');

module.exports = (request, response) => {
  rog(request.body.url, {}, {
    url         : require('rog-plugin-url'),
    title       : require('rog-plugin-title'),
    image       : require('rog-plugin-image'),
    description : require('rog-plugin-description')
  }).then(data => response.json(data))
    .catch(error => response.json(error));
};
