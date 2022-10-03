require('dotenv').config();

const config = {
  "development": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASS || "",
    "database": process.env.DB_NAME || "miEcommerce",
    "host": process.env.DB_HOST || "127.0.0.1",
    "port": process.env.DB_PORT || "6543",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASS || "",
    "database": process.env.DB_NAME || "miEcommerce_test",
    "host": process.env.DB_HOST || "127.0.0.1",
    "port": process.env.DB_PORT || "6543",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
module.exports = config;
