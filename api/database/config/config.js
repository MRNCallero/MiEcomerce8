require('dotenv').config();

const config = {
  "development": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASS || null,
    "database": process.env.DB_NAME || "miEcommerce",
    "host": process.env.DB_HOST || "127.0.0.1",
    "port": process.env.DB_PORT || "3456",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
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
<<<<<<< HEAD

=======
>>>>>>> 4266b1325b8f3ea4b6010b983d032f8764dcd7f2
module.exports = config;
