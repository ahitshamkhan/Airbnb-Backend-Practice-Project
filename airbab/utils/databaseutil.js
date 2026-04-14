const mysql=require("mysql2");
const pool=mysql.createPool({
 host: 'localhost',
 user: 'root',
 password: '8787',
 database: 'airbab'
});

module.exports=pool.promise();