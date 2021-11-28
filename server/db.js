import Pool from "pg";

//const Pool = require("pg").Pool;
const pool = new Pool.Pool({
    user: "postgres",
    password: "joinmeisbest",
    host: "localhost",
    port: 5432,
    database: "joinme"
});

export default pool;