const oracledb = require('oracledb');

const getConnect = async () =>{
    let connection;
    connection = await oracledb.getConnection({ user: "usr_sakila", password: "sakila", connectionString: "localhost/XEPDB1" });
    return connection
}



exports.getConnect= getConnect;

