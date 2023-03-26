const swaggerAutogen = require('swagger-autogen')();
const dotenv = require("dotenv").config();
const swaggerModelValidator = require('swagger-model-validator');
const mongoose = require("mongoose");
const requireDir = require("require-dir");
requireDir("../models", { recurse: true });
const outputFile = './src/config/swagger-output.json';
const endpointsFiles = ['./src/index.js',];

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: `localhost:${process.env.PORT||5000}`,
  schemes: ['http'],
  definitions:{}
};
for (const model of Object.values(mongoose.models)) {
  const modelName = model.modelName;
  const schema = mongoose.modelSchemas[modelName];
  doc.definitions[modelName] = {
    properties: schema.obj,
  };
}

swaggerAutogen(outputFile, endpointsFiles, doc);

