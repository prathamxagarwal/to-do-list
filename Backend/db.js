const { Pool } = require("pg");

const pool = new Pool({
    user:"postgres",
    password:"Postgres@123",
    host:"localhost",
    port:5432,
    database:"todoapp"
});

module.exports=pool;