const path = require("path");

/** @type {import('kanel').Config} */
module.exports = {
  connection: {
    host: "localhost",
    user: "postgres",
    password: "example",
    database: "pokemon",
  },
  preRenderHooks: [(input) => {
    Object.values(input).forEach(i => i.declarations.forEach(console.log));
    return input
  }],
  preDeleteOutputFolder: false,
  outputPath: "./src/generated",
  enumStyle: 'enum',
  customTypeMap: {
    "pg_catalog.tsvector": "string",
    "pg_catalog.bpchar": "string",
  },
};
