const swaggerAutogen = require('swagger-autogen')();
const dotenv = require("dotenv").config();
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
  schemes: ['http',"https"],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions:{}
};
  for (const [modelName, model] of Object.entries(mongoose.models)) {

  doc.definitions[modelName] =  model.schema.obj;
}

swaggerAutogen(outputFile, endpointsFiles, doc);

