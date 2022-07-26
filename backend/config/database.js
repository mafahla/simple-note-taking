const { Pool } = require("pg"); //This will help us connect to the database.
require("dotenv").config();
const connectionString = process.env.PSQL_CONNECTION; //The connectionString contains our database’s connection URL.
const pool = new Pool({                                 //a Pool instance and pass in the connectionString into the
  connectionString,
});

module.exports = {
  query: (text, params) => pool.query(text, params),            //Export the query method, which will run SQL commands.
};