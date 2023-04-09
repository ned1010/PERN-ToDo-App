const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Messidorji@98",
  host: "localhost",
  database: "pern_todo",
  port: "5432",
});

module.exports = pool;
