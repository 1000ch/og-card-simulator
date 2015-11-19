"use strict";

const rog = require('rog');

module.exports = (request, response) => {
  rog(request.body.url)
    .then(data => response.json(data))
    .catch(error => response.json(error));
};
