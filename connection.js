const mysql = require("mysql")
const con = mysql.createConnection({

    //json data

    host: "localhost",
    user: "root",
    password: "root123",
    database: "adi-node",
    port: 3306
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connection created..!!");
});

module.exports.con = con; 
