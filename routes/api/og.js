'use strict';
const {rog} = require('rog');
const {rogUrl} = require('rog-plugin-url');
const {rogTitle} = require('rog-plugin-title');
const {rogImage} = require('rog-plugin-image');
const {rogDescription} = require('rog-plugin-description');

module.exports = async (request, response) => {
  try {
    const data = await rog(request.body.url, {
      url: rogUrl,
      title: rogTitle,
      image: rogImage,
      description: rogDescription
    });

    response.json(data);
  } catch (error) {
    response.json(error);
  }
};
