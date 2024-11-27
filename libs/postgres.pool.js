const { Pool } = require('pg');

const { config } = require('./../config/config');

const options = {};

if (config.isProd) {
  options.connectionString = config.dbUrl;
  options.ssl =  {
    rejectUnauthorized: false
  };
} else {
  const URI = config.dbUrlDev
  options.connectionString = URI;
}

const pool = new Pool(options);

module.exports = pool;