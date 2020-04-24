require("dotenv").config();

const { API, PORT } = process.env;

const config = {
  API,
  PORT,
};

module.exports = { ...config };
