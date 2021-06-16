const {getConnect} = require('../cnn');

const getCustomers = async (req,res) =>{
    const connection = await getConnect();
    const result  = await connection.execute(`select * from customer`);
    res.json(result.rows)
}

const insertCustomers = async (req,res) =>{
    const connection = await getConnect();
    const result  = await connection.execute(`select * from customer`);
}


module.exports = {
    getCustomers
}
